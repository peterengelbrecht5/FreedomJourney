import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;
const YOCO_API_URL = "https://payments.yoco.com/api";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json(contact);
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ error: "Validation failed", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create contact" });
      }
    }
  });

  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.getContact(req.params.id);
      if (!contact) {
        res.status(404).json({ error: "Contact not found" });
        return;
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve contact" });
    }
  });

  app.post("/api/yoco/create-checkout", async (req, res) => {
    try {
      if (!YOCO_SECRET_KEY) {
        console.error("YOCO_SECRET_KEY is not configured");
        res.status(500).json({ error: "Payment gateway is not configured" });
        return;
      }

      const { amount, currency = "ZAR", metadata } = req.body;

      if (!amount || amount < 200) {
        res.status(400).json({ error: "Amount must be at least R2.00 (200 cents)" });
        return;
      }

      const checkoutData = {
        amount,
        currency,
        successUrl: `${req.protocol}://${req.get("host")}/payment/success`,
        cancelUrl: `${req.protocol}://${req.get("host")}/payment`,
        failureUrl: `${req.protocol}://${req.get("host")}/payment/failure`,
        metadata: metadata || {},
      };

      const response = await fetch(`${YOCO_API_URL}/checkouts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${YOCO_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Yoco API Error:", errorData);
        
        let errorMessage = "Failed to create checkout";
        try {
          const errorJson = JSON.parse(errorData);
          if (errorJson.description) {
            if (errorJson.description.includes("HTTP protocol")) {
              errorMessage = "Development mode: Please publish your app to enable payments. Yoco requires HTTPS.";
            } else {
              errorMessage = errorJson.description;
            }
          }
        } catch (e) {
          // If error is not JSON, use default message
        }
        
        res.status(response.status).json({ error: errorMessage });
        return;
      }

      const checkout = await response.json();
      res.json(checkout);
    } catch (error: any) {
      console.error("Checkout creation error:", error);
      res.status(500).json({ error: "Failed to create checkout" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

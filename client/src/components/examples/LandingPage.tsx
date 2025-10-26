import LandingPage from "../../pages/LandingPage";

export default function LandingPageExample() {
  return (
    <LandingPage
      onSubmit={(data) => console.log("Landing page form submitted:", data)}
    />
  );
}

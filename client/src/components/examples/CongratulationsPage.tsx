import CongratulationsPage from "../../pages/CongratulationsPage";

export default function CongratulationsPageExample() {
  return (
    <CongratulationsPage
      onRedirect={() => console.log("Redirecting to payment page")}
    />
  );
}

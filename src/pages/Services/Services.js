import { useState } from "react";
import ServiceCard from "./ServiceCard";
import ServiceForm from "./ServiceForm";
import "./services.css";

export default function Services() {
  const [activeService, setActiveService] = useState(null);

  return (
    <div className="services-page">
      {!activeService && (
        <div className="service-cards">
          <ServiceCard
            title="Registration Certificate"
            onClick={() => setActiveService("RC")}
          />
          <ServiceCard
            title="Chassis Number To Vechile Number"
            onClick={() => setActiveService("RC_MOBILE")}
          />
        </div>
      )}

      {activeService && (
        <ServiceForm
          type={activeService}
          onBack={() => setActiveService(null)}
        />
      )}
    </div>
  );
}

import "./support.css";

export default function Support() {
  return (
    <div className="support-page">
      {/* Header Card */}
      <div className="support-header">
        <h3>Contact us</h3>
        <p>We’re here to help</p>
      </div>

      {/* Contact Options */}
      <div className="support-cards">
        <div className="support-card">
          <h4>📞 Call us</h4>
          <p className="support-value">+91 91245 78108</p>
          <span>Available 9AM - 6PM</span>
        </div>

        <div className="support-card">
          <h4>💬 WhatsApp</h4>
          <p className="support-value">+91 91245 78108</p>
          <span>Instant messaging</span>
        </div>

        <div className="support-card">
          <h4>📧 Mail Us</h4>
          <p className="support-value">
            support@drivesafesolutions.in
          </p>
          <span>Typically replies within 24 hours</span>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="support-footer">
        Need any help?
      </div>
    </div>
  );
}

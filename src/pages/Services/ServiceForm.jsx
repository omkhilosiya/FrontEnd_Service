import { useState } from "react";
import { axiosPrivate } from "../../api/useAxiosPrivate";
import { jsPDF } from "jspdf";
import "./services.css";
import { useSelector } from "react-redux";

export default function ServiceForm({ type, onBack }) {
  const [input, setInput] = useState("");
  const [option, setOption] = useState("PARIVAHAN");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [walletError, setWalletError] = useState(null);

  const auth = useSelector((state) => state.auth);

  const prices = {
    PARIVAHAN: 20,
    SMART: 20,
    DIGILOCKER: 10,
  };

  const SERVICE_MAP = {
    PARIVAHAN: "PARIVAAN_RC",
    SMART: "SMART_RC",
    DIGILOCKER: "DIGI_LOCKER_RC",
  };

  const handleSubmit = async () => {
    if (!input) {
      alert(type === "RC" ? "Enter vehicle number" : "Enter chassis number");
      return;
    }

    try {
      setLoading(true);

      let payload;
      let res;

      if (type === "RC") {
        payload = {
          vehicleNumber: input,
          userId: auth?.dashboard?.walletDetails?.userId,
          service: SERVICE_MAP[option],
        };

        res = await axiosPrivate.post("/rc/verify", payload);
      }

      if (type === "RC_MOBILE") {
        payload = {
          chassisNumber: input,
          userId: auth?.dashboard?.walletDetails?.userId,
          service: SERVICE_MAP[option],
        };

        res = await axiosPrivate.post("/rc/vehicle", payload);
      }

      // Wallet Error Handling
      if (res.data?.success === false) {
        setWalletError(res.data.message || "Insufficient wallet balance");
        return;
      }

      // Success Data
      if (res.data?.result?.data) {
        setData(res.data.result.data);
        setShowModal(true);
      } else {
        alert("No data found");
      }
    } catch (error) {
      console.error(error);
      const msg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      setWalletError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      await axiosPrivate.post("/downloads/savedownload", null, {
        params: {
          userId: auth?.dashboard?.walletDetails?.userId,
          serviceName: SERVICE_MAP[option],
        },
      });

      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text("Service Details", 20, 20);

      doc.setFontSize(11);
      let y = 35;

      if (type === "RC") {
        doc.text(`Owner: ${data.owner}`, 20, y); y += 8;
        doc.text(`Vehicle No: ${data.regNo}`, 20, y); y += 8;
        doc.text(`Model: ${data.model}`, 20, y); y += 8;
        doc.text(`Manufacturer: ${data.vehicleManufacturerName}`, 20, y); y += 8;
        doc.text(`Status: ${data.status}`, 20, y); y += 10;
      } else {
        doc.text(`Vehicle Number: ${data.vehicle_num}`, 20, y); y += 10;
      }

      doc.text(`Service Type: ${option}`, 20, y); y += 8;
      doc.text(`Amount Paid: ₹${prices[option]}`, 20, y); y += 8;
      doc.text(`Date: ${new Date().toLocaleString()}`, 20, y);

      doc.save("service-details.pdf");

      setShowModal(false);
    } catch (error) {
      console.error("Download failed", error);
      alert("Download tracking failed");
    }
  };

  return (
    <>
      <div className="service-form">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        <h2>
          {type === "RC"
            ? "Registration Certificate"
            : "Chassis Number To Vehicle Number"}
        </h2>

        <label>
          {type === "RC" ? "Vehicle Number" : "Chassis Number"}
        </label>

        <input
          type="text"
          placeholder={
            type === "RC" ? "Enter vehicle number" : "Enter chassis number"
          }
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
        />

        <div className="options">
          <label>
            <input
              type="radio"
              value="PARIVAHAN"
              checked={option === "PARIVAHAN"}
              onChange={(e) => setOption(e.target.value)}
            />
            Parivahan RC (₹20)
          </label>

          <label>
            <input
              type="radio"
              value="SMART"
              checked={option === "SMART"}
              onChange={(e) => setOption(e.target.value)}
            />
            Smart RC (₹20)
          </label>

          <label>
            <input
              type="radio"
              value="DIGILOCKER"
              checked={option === "DIGILOCKER"}
              onChange={(e) => setOption(e.target.value)}
            />
            DigiLocker RC (₹10)
          </label>
        </div>

        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>

      {/* RESULT MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Result</h3>

            {type === "RC" ? (
              <>
                <p><b>Owner:</b> {data.owner}</p>
                <p><b>Vehicle No:</b> {data.regNo}</p>
                <p><b>Model:</b> {data.model}</p>
                <p><b>Manufacturer:</b> {data.vehicleManufacturerName}</p>
                <p><b>Status:</b> {data.status}</p>
              </>
            ) : (
              <p><b>Vehicle Number:</b> {data.vehicle_num}</p>
            )}

            <p><b>Service:</b> {option}</p>
            <p><b>Amount:</b> ₹{prices[option]}</p>

            <div className="modal-actions">
              <button className="download-btn" onClick={handleDownload}>
                Download
              </button>

              <button className="close-btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WALLET ERROR MODAL */}
      {walletError && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Wallet Alert</h3>
            <p>{walletError}</p>

            <div className="modal-actions">
              <button className="close-btn" onClick={() => setWalletError(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

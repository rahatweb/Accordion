import QRCode from "qrcode.react";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const QRCodeGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    age: "",
    phoneNumber: "",
  });
  const [showQRCode, setShowQRCode] = useState(false);
  const [showInputFields, setShowInputFields] = useState(true);
  const componentRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the "Age" and "Phone Number" fields to accept only numeric values
    if ((name === "age" || name === "phoneNumber") && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowQRCode(true);
    setShowInputFields(false);
  };

  const handleNewQRCode = () => {
    setShowQRCode(false);
    setShowInputFields(true);
    setFormData({
      name: "",
      occupation: "",
      age: "",
      phoneNumber: "",
    });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPdf = () => {
    handlePrint();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>QR Code Generator</h2>
      {showInputFields && (
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <br />
          <label style={styles.label}>
          Occupation:
            <input
              type="text"
              name="occupation"
              value={formData.accoupation}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <br />
          <label style={styles.label}>
            Age:
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              style={styles.input}
              inputMode="numeric"
              pattern="\d*"
            />
          </label>
          <br />
          <label style={styles.label}>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <br />
          <button type="submit" style={styles.submitButton}>
            Generate QR Code
          </button>
        </form>
      )}
      {showQRCode && (
        <div>
          <div ref={componentRef} style={styles.qrCodeContainer}>
            <QRCode
              value={`Name: ${formData.name}, \nOccupation: ${formData.occupation}, \nAge: ${formData.age}, \nPhone: ${formData.phoneNumber}`}
              size={200}
            />
          </div>
          <button onClick={handleDownloadPdf} style={styles.downloadButton}>
            Download as PDF
          </button>
          <button onClick={handleNewQRCode} style={styles.newQRCodeButton}>
            Generate New QR Code
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
  },
  qrCodeContainer: {
    marginTop: "20px",
  },
  downloadButton: {
    backgroundColor: "#008CBA",
    color: "white",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
    marginRight: "5px",
  },
  newQRCodeButton: {
    backgroundColor: "#FFD700",
    color: "black",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default QRCodeGenerator;

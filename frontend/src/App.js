import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [error, setError] = useState("");

  const generateQRCode = async () => {
    setError("");
    setQrCodeUrl(null);

    if (!text.trim()) {
      setError("Veuillez saisir un texte.");
      return;
    }

    try {
      const response = await fetch("http://localhost/api/qr_service.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.success) {
          setQrCodeUrl(data.qr_code_url);
        } else {
          setError(data.message || "Erreur lors de la génération du QR code.");
        }
      } else {
        const rawText = await response.text();
        console.error("Réponse brute :", rawText);
        setError("Le backend a renvoyé une réponse inattendue.");
      }
    } catch (err) {
      if (!navigator.onLine) {
        setError("Erreur réseau : Vérifiez votre connexion internet.");
      } else {
        setError("Erreur réseau : " + err.message);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Générateur de QR Code</h1>
        <input
          type="text"
          placeholder="Entrez le texte ou URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={generateQRCode}>Générer</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {qrCodeUrl && (
          <div>
            <h3>QR Code généré :</h3>
            <img src={qrCodeUrl} alt="QR Code" />
            <a href={qrCodeUrl} download="qrcode.png">
              Télécharger
            </a>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

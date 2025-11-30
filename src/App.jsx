// App.js
import React, { useState } from "react";
import Correspondence from "./components/Correspondence";
import Biometric from "./components/Biometric";
import Original from "./components/Original";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("correspondence");

  // 🔹 Global state
  const [sharedData, setSharedData] = useState({
    applicationNo: "",
    uci: "",
    appQrPreview: "",
    uciQrPreview: "",
  });

  return (
    <div className="App" style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* Tab Navigation */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("original")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "original" ? "#007bff" : "#f0f0f0",
            color: activeTab === "original" ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
            marginRight: "10px",
          }}
        >
          Original
        </button>

        <button
          onClick={() => setActiveTab("correspondence")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "correspondence" ? "#007bff" : "#f0f0f0",
            color: activeTab === "correspondence" ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Correspondence
        </button>

        <button
          onClick={() => setActiveTab("biometric")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "biometric" ? "#007bff" : "#f0f0f0",
            color: activeTab === "biometric" ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Biometric
        </button>
      </div>

      {/* Tab Content */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "20px",
          backgroundColor: "#fff",
          minHeight: "200px",
        }}
      >
        {activeTab === "correspondence" && (
          <Correspondence sharedData={sharedData} setSharedData={setSharedData} />
        )}

        {activeTab === "biometric" && (
          <Biometric sharedData={sharedData} setSharedData={setSharedData} />
        )}

        {activeTab === "original" && (
          <Original sharedData={sharedData} setSharedData={setSharedData} />
        )}
      </div>
    </div>
  );
}

export default App;

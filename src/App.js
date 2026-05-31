import { dashboardData } from "./dashboardData";


function App() {
  return (
    <div
      style={{
        backgroundColor: "#0B0F14",
        color: "#FFFFFF",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #1E293B",
          paddingBottom: "20px",
          marginBottom: "30px"
        }}
      >
        <h1
          style={{
            color: "#38BDF8",
            margin: "0"
          }}
        >
          OVERWATCH
        </h1>

        <p
          style={{
            color: "#94A3B8",
            marginTop: "10px"
          }}
        >
          Operational Intelligence Platform
        </p>
      </div>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "30px",
          padding: "12px",
          border: "1px solid #14532D",
          backgroundColor: "#052E16",
          color: "#22C55E",
          borderRadius: "6px",
          fontWeight: "bold"
        }}
      >
        SYSTEM STATUS: OPERATIONAL
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "40px"
        }}
      >
        <div
          style={{
            border: "1px solid #334155",
            boxShadow: "0 0 10px rgba(56,189,248,0.15)",
            backgroundColor: "#111827",
            padding: "20px",
            borderRadius: "8px"
          }}
        >
          <h2>GateKeeper</h2>
          <p>
            Status:
            <span
              style={{
                color: "#22C55E",
                fontWeight: "bold",
                marginLeft: "8px"
              }}
            >
              {dashboardData.gatekeeper.status}
            </span>
          </p>

          <p>
            Target: {dashboardData.gatekeeper.target}
          </p>

          <p>
            Findings: {dashboardData.gatekeeper.findings}
          </p>
        </div>

        <div
          style={{
            border: "1px solid #1E293B",
            padding: "20px",
            borderRadius: "8px"
          }}
        >
          <h2>Heimdal</h2>
          <p>
            Classification:
            <span
              style={{
                color: "#FACC15",
                fontWeight: "bold",
                marginLeft: "8px"
              }}
            >
              {dashboardData.heimdal.classification}
            </span>
          </p>

          <p>
            Confidence:
            {" "}
            {dashboardData.heimdal.confidence}
          </p>

          <p>
            Priority:
            {" "}
            {dashboardData.heimdal.priority}
          </p>

        </div>

        <div
          style={{
            border: "1px solid #1E293B",
            padding: "20px",
            borderRadius: "8px"
          }}
        >
          <h2>Monolith</h2>
          <p>
            Records Stored:
            {" "}
            {dashboardData.monolith.recordsStored}
          </p>
        </div>

        <div
          style={{
            border: "1px solid #1E293B",
            padding: "20px",
            borderRadius: "8px"
          }}
        >
          <h2>Odin</h2>
          <p>
            Decision:
            <span
              style={{
                color: "#38BDF8",
                fontWeight: "bold",
                marginLeft: "8px"
              }}
            >
              {dashboardData.odin.decision}
            </span>
          </p>
          <div
            style={{
              border: "1px solid #334155",
              boxShadow: "0 0 10px rgba(56,189,248,0.15)",
              backgroundColor: "#111827",
              padding: "20px",
              borderRadius: "8px"
            }}
          >
            <h2>🐿 Ratatoskr</h2>

            <p>
              Message ID: MSG-000001
            </p>

            <p>
              Source: GateKeeper
            </p>

            <p>
              Destination: Heimdal
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
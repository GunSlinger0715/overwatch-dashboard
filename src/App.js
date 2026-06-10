import overwatchArtwork from "./assets/Overwatch.png";
import { runGateKeeperScan } from "./gatekeeper";
import { useState } from "react";
import { classifyObservation } from "./heimdal";
import { createMessage } from "./ratatoskr";
import { storeObservation, getObservationCount } from "./monolith";
import { generateNarrative } from "./narrativeEngine";
import { generateRecommendation } from "./forge";
import { evaluateObservation } from "./odin";

function App() {

  const [scanData, setScanData] = useState(null);
  const [scanStatus, setScanStatus] = useState("READY_TO_SCAN");
  const [progress, setProgress] = useState(0)
  const [recordCount, setRecordCount] = useState(0);
  const [eventFeed, setEventFeed] = useState([]);
  const [lastObservation, setLastObservation] = useState(null);
  const [target, setTarget] = useState("https://httpbin.org/get");
  const heimdalData = classifyObservation(scanData);
  const odinData = evaluateObservation(heimdalData);
  const [scanHistory, setScanHistory] = useState([]);


  const forgeData =
    generateRecommendation(
      odinData.decision,
      heimdalData
    );

  const operationalNarrative =
    generateNarrative(
      heimdalData,
      recordCount,
      odinData
    );

  const ratatoskrMessage =
    createMessage(
      "GateKeeper",
      "Heimdal",
      "OBSERVATION",
      scanData
    );

  const odinDecisionColor =
    odinData.decision === "ESCALATE"
      ? "#EF4444"
      : odinData.decision === "CORRECTABLE"
        ? "#FACC15"
        : odinData.decision === "APPROVE"
          ? "#22C55E"
          : "38BDF8";

  function getTimestamp() {
    return new Date().toLocaleTimeString();
  }

  async function executionScan() {

    setScanStatus("SCANNING");

    setEventFeed(prev => [
      ...prev,
      `${getTimestamp()} - Scan Started`
    ]);

    setProgress(50);

    const result = await runGateKeeperScan();

    setEventFeed(prev => [...prev, `${getTimestamp()} - GateKeeper Scan Complete`]);

    storeObservation(result);

    setEventFeed(prev => [...prev, `${getTimestamp()} - Observation Stored in Monolith`]);

    setLastObservation(result);

    setRecordCount(getObservationCount());

    setScanData(result);

    setScanStatus("SCAN_COMPLETE");

    setScanHistory(prev => [...prev, `${getTimestamp()} - Scan Complete`]);


    setEventFeed(prev => [...prev, `${getTimestamp()} - Scan Complete`]);

    setProgress(100);
  }

  function resetDashboard() {

    setScanData(null);

    setLastObservation(null);

    setRecordCount(0);

    setScanStatus("READY_TO_SCAN");

    setProgress(0);

    setEventFeed([]);

  }

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
          marginBottom: "30px",
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}
      >
        <div
          style={{
            fontSize: "40px"
          }}
        >
          🛡️
        </div>

        <div>
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
          marginBottom: "30px",
          padding: "12px",
          border: "1px solid #334155",
          backgroundColor: "#111827",
          borderRadius: "6px",
          fontWeight: "bold",
          color: "#FFFFFF",
        }}
      >
        STATUS: {scanStatus}
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: "#1E293B",
          borderRadius: "6px",
          overflow: "hidden",
          marginBottom: "30px"
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "20px",
            backgroundColor:
              scanStatus === "SCAN_COMPLETE"
                ? "#22C55E"
                : scanStatus === "SCANNING"
                  ? "#FACC15"
                  : "#38BDF8",
            transition: "width 0.5s ease"
          }}
        />
      </div>

      <div
        style={{
          border: "1px solid #334155",
          backgroundColor:
            scanStatus === "READY_TO_SCAN"
              ? "#1E3A8A"
              : scanStatus === "SCANNING"
                ? "#854D0E"
                : "#14532D",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px"
        }}
      >
        <h2>Target To Scan</h2>

        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0B0F14",
            color: "#FFFFFF",
            border: "1px solid #334155",
            borderRadius: "4px"
          }}
        />
      </div>

      <button
        onClick={executionScan}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#38BDF8",
          color: "#0B0F14",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Execute Scan
      </button>

      <button
        onClick={resetDashboard}
        style={{
          marginTop: "15px",
          marginLeft: "10px",
          padding: "10px 20px",
          backgroundColor: "#38BDF8",
          color: "#0B0F14",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        RESET
      </button>



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
          <h2
            style={{
              color: "#22C55E"
            }}
          >
            🛡️ GateKeeper
          </h2>
          <p>
            Status:
            <span
              style={{
                color: "#22C55E",
                fontWeight: "bold",
                marginLeft: "8px"
              }}
            >
              {scanStatus}
            </span>
          </p>

          <p>
            Target: {scanData?.target || "Awating Scan"}
          </p>

          <p>
            Findings: {scanData?.findings || 0}
          </p>

          <p>
            Response Time:
            {" "}
            {scanData?.responseTime || 0}
            ms
          </p>
        </div>

        <div
          style={{
            border: "1px solid #1E293B",
            padding: "20px",
            borderRadius: "8px"
          }}
        >
          <h2
            style={{
              color: "#FACC15"
            }}
          >
            👁️ Heimdal
          </h2>
          <p>
            Classification:
            <span
              style={{
                color: "#FACC15",
                fontWeight: "bold",
                marginLeft: "8px"
              }}
            >
              {heimdalData.classification}
            </span>
          </p>

          <p>
            Confidence:
            {" "}
            {heimdalData.confidence}
          </p>

          <p>
            Priority:
            {" "}
            {heimdalData.priority}
          </p>

        </div>

        <div
          style={{
            border: "1px solid #1E293B",
            padding: "20px",
            borderRadius: "8px"
          }}
        >
          <h2
            style={{
              color: "#A855F7"
            }}
          >
            🏛️ Monolith
          </h2>
          <p>
            Records Stored:
            {" "}
            {recordCount}
          </p>

          <p>
            Last Status:
            {" "}
            {lastObservation?.status || "NONE"}
          </p>

          <p>
            Last Target:
            {" "}
            {lastObservation?.target || "NONE"}
          </p>

          <p>
            Last Response:
            {" "}
            {lastObservation?.responseTime || 0}
            ms
          </p>
        </div>

        <div
          style={{
            border: "1px solid #1E293B",
            padding: "20px",
            borderRadius: "8px"
          }}
        >
          <h2
            style={{
              color: "#38BDF8"
            }}
          >
            👤 Odin
          </h2>
          <p>
            Decision:
            <span
              style={{
                color: odinDecisionColor,
                fontWeight: "bold",
                marginLeft: "8px"
              }}
            >
              {odinData.decision}
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
            <p
              style={{
                marginBottom: "20px"
              }}
            >
              Action:
              <span
                style={{
                  color: "#38BDF8",
                  fontWeight: "bold",
                  marginLeft: "8px"
                }}
              >
                {odinData.recommendedAction}
              </span>
            </p>

            <p>
              Reason:{" "}
              <span
                style={{
                  color: "#94A3B8",
                  marginLeft: "8px"
                }}
              >
                {odinData.reason}
              </span>
            </p>

            <p>
              Confidence:
              <span
                style={{
                  color: "#22C55E",
                  fontWeight: "bold",
                  marginLeft: "8px"
                }}
              >
                {(odinData.confidence * 100).toFixed(0)}%
              </span>
            </p>

            <hr
              style={{
                border: "1px solid #334155",
                margin: "15px 0"
              }}
            />
            <h2
              style={{
                color: "#FB923C"
              }}
            >
              🐿️ Ratatoskr
            </h2>

            <p>
              Message ID:
              {" "}
              {ratatoskrMessage.messageId}
            </p>

            <p>
              Source:
              {" "}
              {ratatoskrMessage.source}
            </p>

            <p>
              Destination:
              {" "}
              {ratatoskrMessage.destination}
            </p>

            <p>
              Type:
              {" "}
              {ratatoskrMessage.messageType}
            </p>

            <p>
              TimeStamp:
              {" "}
              {ratatoskrMessage.timestamp}
            </p>
            <h2
              style={{
                color: "#FF8C42"
              }}
            >
              ⚒️ Forge
            </h2>

            <p>
              Action:
              <strong>
                {forgeData.action}
              </strong>
            </p>

            <p>
              Priority:
              <strong>
                {forgeData.priority}
              </strong>
            </p>

            <p>
              Recommended Actions:
            </p>

            <ul>
              {forgeData.recommendations.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
          border: "1px solid #334155",
          backgroundColor: "#0F172A",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(56,189,248,0.15)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px"
          }}
        ></div>
        <div
          style={{
            border: "1px solid #334155",
            backgroundColor: "#0F172A",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 0 10px rgba(56,189,248,0.15)",
            maxHeight: "300px",
            overflowY: "auto"
          }}
        >
          <h2
            style={{
              color: "#38BDF8"
            }}
          >
            Scan History
          </h2>

          <p
            style={{
              color: "#38BDF8",
              fontWeight: "bold",
              marginBottom: "15px"
            }}
          >
            Total Scans: {scanHistory.length}
          </p>

          <p
            style={{
              color: "#22C55E",
              fontWeight: "bold",
              marginBottom: "10px"
            }}
          >
            Successful Scans: {scanHistory.length}
          </p>

          <p
            style={{
              color: "#94A3B8",
              marginBottom: "15px"
            }}
          >
            Last Scan: {scanHistory.length > 0 ? scanHistory[scanHistory.length - 1] : "None"}
          </p>
          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              marginTop: "10px"
            }}
          ></div>

          {scanHistory.map((scan, index) => (
            <p
              key={index}
              style={{
                color: "#FFFFFF",
                marginBottom: "8px"
              }}
            >
              {`Scan #${index + 1} - ${scan}`}
            </p>
          ))}
        </div>
        <div
          style={{
            border: "1px solid #334155",
            backgroundColor: "#111827",
            padding: "20px",
            borderRadius: "8px",
            marginTop: "20px",
            marginBottom: "20px"
          }}
        ><div
          style={{
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
            <img
              src={overwatchArtwork}
              alt="OVERWATCH Ecosystem"
              style={{
                maxWidth: "1100px",
                width: "100%",
                display: "block",
                margin: "0 auto",
                borderRadius: "10px",
                border: "1px solid #334155"
              }}
            />

            <div
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <h3
                style={{
                  color: "#38BDF8",
                  marginBottom: "10px"
                }}
              >
                Observe. Interpret. Remember. Protect.
              </h3>

              <p
                style={{
                  color: "#94A3B8"
                }}
              >
                Transforming Observations Into Operational Understanding
              </p>
            </div>
          </div>
          <h2
            style={{
              color: "#38BDF8"
            }}
          >
            📖 Operational Narrative
          </h2>

          <p
            style={{
              color: "#FFFFFF",
              whiteSpace: "pre-line",
              lineHeight: "1.8"
            }}
          >
            {operationalNarrative}
          </p>
        </div>
        <h2
          style={{
            color: "#38BDF8"
          }}
        >
          Operational Feed
        </h2>

        {eventFeed.map((event, index) => (
          <p
            key={index}
            style={{
              color: "#FFFFFF",
              marginBottom: "8px"
            }}
          >
            {event}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
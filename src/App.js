import { runGateKeeperScan } from "./gatekeeper";
import { useState } from "react";
import { classifyObservation } from "./heimdal";
import { createMessage } from "./ratatoskr";
import { storeObservation, getObservationCount } from "./monolith";
import { generateNarrative } from "./narrativeEngine";
import { generateRecommendation } from "./forge";
import { evaluateObservation } from "./odin";
import yggdrasilImage from "./assets/yggdrasil.png";
import overwatchLogo from "./assets/overwatch-logo.png";
import monolithSpire from "./assets/monolith-spire.png";
import ratatoskrMessenger from "./assets/ratatoskr-messenger.png";
import gatekeeperWatermark from "./assets/gatekeeper-watermark.png";
import heimdalSentinel from "./assets/heimdal-Sentinel.png";
import odinOracle from "./assets/odin-Oracle.png";
import forgeWatermark from "./assets/forge.png";

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

    const result = await runGateKeeperScan(target);

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
          justifyContent: "space-between",
          alignItems: "center",
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
        <div
          style={{
            display: "flex",
            gap: "40px",
            color: "#94A3B8",
            fontSize: "14px"
          }}
        >
          <div>
            <div>REALM STATUS</div>
            <strong style={{ color: "#22C55E" }}>
              OPERATIONAL
            </strong>
          </div>

          <div>
            <div>SUBSYSTEMS</div>
            <strong style={{ color: "#22C55E" }}>
              6 ONLINE
            </strong>
          </div>


          <div>LAST ASSESSMENT</div>
          <strong style={{ color: "#38BDF8" }}>
            {new Date().toLocaleTimeString()}
          </strong>
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
        STATUS: {scanData?.status || "NOT_SCANNED"}
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
            borderRadius: "8px",

            position: "relative",
            overflow: "hidden"
          }}
        >
          <img
            src={gatekeeperWatermark}
            alt="GateKeeper"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",

              transform: "translate(-50%, -50%)",

              width: "260px",

              opacity: 0.05,

              pointerEvents: "none",

              filter:
                "drop-shadow(0 0 15px #22C55E)"
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "20px",

              transform: "translateX(-50%)",

              color: "#22C55E",
              opacity: 0.15,

              fontSize: "12px",
              letterSpacing: "2px",

              pointerEvents: "none"
            }}
          >
            OBSERVATION ENGINE
          </div>
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
              {scanData?.status || "NOT_SCANNED"}
            </span>
          </p>

          <p>
            Target: {scanData?.target || "Awating Scan"}
          </p>

          <p>
            Findings: {scanData?.findings?.length || 0}
          </p>

          <p>
            HTTP STATUS:
            {" "}
            {scanData?.httpStatus || "N/A"}
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
            borderRadius: "8px",

            position: "relative",
            overflow: "hidden"
          }}
        >

          <img
            src={heimdalSentinel}
            alt="Heimdal"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",

              transform: "translate(-50%, -50%)",

              width: "260px",

              opacity: 0.15,

              pointerEvents: "none",

              filter:
                "drop-shadow(0 0 15px #FACC15)"
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "10px",

              transform: "translateX(-50%)",

              color: "#FACC15",
              opacity: 0.15,

              fontSize: "12px",
              letterSpacing: "2px",

              pointerEvents: "none"
            }}
          >
            REALM SENTINEL
          </div>
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
            borderRadius: "8px",

            position: "relative",
            overflow: "hidden"
          }}
        >
          <h2
            style={{
              color: "#A855F7"
            }}
          >
            🏛️ Monolith
          </h2>
          <img
            src={monolithSpire}
            alt="Monolith Spire"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",

              transform:
                "translate(-50%, -50%)",

              width: "500px",

              opacity: 0.10,

              pointerEvents: "none",

              filter:
                "drop-shadow(0 0 15px #A855F7)"
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "20px",

              transform:
                "translateX(-50%)",

              color: "#A855F7",
              opacity: 0.15,

              fontSize: "12px",
              letterSpacing: "2px",

              pointerEvents: "none"
            }}
          >
            MEMORY ARCHIVE
          </div>

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
          <p>
            Last Classification:
            {" "}
            {heimdalData.classification}
          </p>

          <p>
            Last Decision:
            {" "}
            {odinData.decision}
          </p>
        </div>

        <div
          style={{
            border: "1px solid #1E293B",
            padding: "20px",
            borderRadius: "8px",

            position: "relative",
            overflow: "hidden"
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
              borderRadius: "8px",

              position: "relative",
              overflow: "hidden"
            }}
          >

            <img
              src={odinOracle}
              alt="Odin Oracle"
              style={{
                position: "absolute",

                top: "45%",
                left: "50%",

                transform:
                  "translate(-50%, -50%)",

                width: "320px",

                opacity: 0.12,

                pointerEvents: "none",

                filter:
                  "drop-shadow(0 0 15px #38BDF8)"
              }}
            />

            <div
              style={{
                position: "absolute",

                left: "50%",
                bottom: "10px",

                transform:
                  "translateX(-50%)",

                color: "#38BDF8",

                opacity: 0.15,

                fontSize: "12px",

                letterSpacing: "2px",

                pointerEvents: "none"
              }}
            >
              REALM ORACLE
            </div>

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
              Reason:
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
                {odinData.confidence}%
              </span>
            </p>

            <hr
              style={{
                border: "1px solid #334155",
                margin: "15px 0"
              }}
            />

          </div>

          {/* Ratatoskr Starts Here */}

          <h2
            style={{
              color: "#FB923C"
            }}
          >
            🐿️ Ratatoskr
          </h2>
          <div
            style={{
              position: "relative",
              overflow: "hidden"
            }}
          >

            <img
              src={ratatoskrMessenger}
              alt="Realm Messenger"
              style={{
                position: "absolute",

                top: "50%",
                left: "50%",

                transform: "translate(-50%, -50%)",

                width: "220px",

                opacity: 0.08,

                pointerEvents: "none",

                filter: "drop-shadow(0 0 15px #FB923C)"
              }}
            />

            <div
              style={{
                position: "absolute",

                right: "325px",
                bottom: "10px",

                color: "#FB923C",

                opacity: 0.15,

                fontSize: "12px",

                letterSpacing: "2px",

                pointerEvents: "none"
              }}
            >
              REALM MESSENGER
            </div>
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
            <p>
              Transport Status:
              {" "}
              {ratatoskrMessage.transportStatus}
            </p>

            <p>
              Latency:
              {" "}
              {ratatoskrMessage.latency}
            </p>
          </div>
          <h2
            style={{
              color: "#FF8C42"
            }}
          >
            ⚒️ Forge
          </h2>

          <div
            style={{
              position: "relative",
              overflow: "hidden"
            }}
          >

            <img
              src={forgeWatermark}
              alt="Realm Forge"
              style={{
                position: "absolute",

                top: "55%",
                left: "50%",

                transform: "translate(-50%, -50%)",

                width: "250px",

                opacity: 0.12,

                pointerEvents: "none",

                filter: "drop-shadow(0 0 15px #FF8C42)"
              }}
            />

            <div
              style={{
                position: "absolute",

                left: "50%",
                bottom: "10px",

                transform: "translateX(-50%)",

                color: "#FF8C42",
                opacity: 0.12,

                fontSize: "12px",
                letterSpacing: "2px",

                pointerEvents: "none"
              }}
            >
              REALM FORGE
            </div>

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
            overflowY: "auto",

            position: "relative"
          }}
        >
          <h2
            style={{
              color: "#38BDF8"
            }}
          >
            ⚙️ Workflow Status
          </h2>

          <img
            src={overwatchLogo}
            alt="OVERWATCH Core"
            style={{
              position: "absolute",
              left: "50%",
              bottom: "10px",

              transform: "translateX(-50%)",

              width: "250px",

              opacity: 0.05,

              pointerEvents: "none",

              filter:
                "drop-shadow(0 0 15px #38BDF8)"
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "50px",

              transform: "translateX(-50%)",

              color: "#38BDF8",
              opacity: 0.15,

              fontSize: "12px",
              letterSpacing: "2px",

              pointerEvents: "none"
            }}
          >
            OVERWATCH CORE
          </div>

          <div
            style={{
              color: "#FFFFFF",
              lineHeight: "2"
            }}
          >

            <p>
              🛡️ <strong style={{ color: "#22C55E" }}>
                GateKeeper
              </strong>
              {" "} - Observation
            </p>

            <p>
              👁️ <strong style={{ color: "#FACC15" }}>
                Heimdal
              </strong>
              {" "} - Classification
            </p>

            <p>
              👤 <strong style={{ color: "#38BDF8" }}>
                Odin
              </strong>
              {" "} - Decision
            </p>

            <p>
              ⚒️ <strong style={{ color: "#EF4444" }}>
                Forge
              </strong>
              {" "} - Recommendation
            </p>

            <p>
              🏛️ <strong style={{ color: "#A855F7" }}>
                Monolith
              </strong>
              {" "} - Memory
            </p>

            <p>
              🐿️ <strong style={{ color: "#F97316" }}>
                Ratatoskr
              </strong>
              {" "} - Transport
            </p>

          </div>

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
            marginBottom: "20px",

            position: "relative",
            overflow: "hidden"
          }}
        >
          <img
            src={yggdrasilImage}
            alt="Yggdrasil"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",

              transform: "translate(-50%, -50%)",

              width: "900px",

              opacity: 0.06,

              pointerEvents: "none",

              filter:
                "drop-shadow(0 0 15px #38BDF8)"
            }}
          />

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
    </div >
  );
}

export default App;
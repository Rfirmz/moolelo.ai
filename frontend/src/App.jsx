import { useState, useEffect } from "react";
import { vapi, startAssistant, stopAssistant } from "./ai";
import ActiveCallDetails from "./call/ActiveCallDetails";

function App() {
  //useState stores a value that will be changed
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callId, setCallId] = useState("");
  const [callResult, setCallResult] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    vapi
      .on("call-start", () => {
        setLoading(false);
        setStarted(true);
      })
      .on("call-end", () => {
        setLoading(false);
        setStarted(false);
      })
      .on("speech-start", () => {
        setAssistantIsSpeaking(true);
      })
      .on("speech-end", () => {
        setAssistantIsSpeaking(false);
      })
      .on("volume-level", (level) => {
        setVolumeLevel(level);
      }); // later use could have .on("message") for live transcription
  }, []);

  // sets the event to the target value
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleStart = async () => {
    setLoading(true);
    const data = await startAssistant(firstName, lastName, phoneNumber);
    setCallId(data.id);
  };

  const handleStop = () => {
    stopAssistant();
    // get call details after call ends
  };
  const showForm = !loading && !started && !loadingResult && !callResult;
  const allFieldsFilled = firstName && lastName && phoneNumber;

  return (
    <div className="app-container">
      {showForm && (
        <>
          <h1> Contact Details (Required) </h1>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            className="input-field"
            onChange={handleInputChange(setFirstName)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            className="input-field"
            onChange={handleInputChange(setLastName)}
          />
          <input
            type="tel"
            placeholder="Phone Number "
            value={phoneNumber}
            className="input-field"
            onChange={handleInputChange(setPhoneNumber)}
          />
          {!started && (
            <button
              onClick={handleStart}
              disabled={!allFieldsFilled}
              className="button"
            >
              Start Storyteller Call
            </button>
          )}
        </>
      )}
      {(loading || loadingResult) && <div className="loading"></div>}
      {started && (
        <ActiveCallDetails
          assistantisSpeaking={assistantIsSpeaking}
          volumeLevel={volumeLevel}
          endCallCallBack={handleStop}
        />
      )}
    </div>
  );
}

export default App;

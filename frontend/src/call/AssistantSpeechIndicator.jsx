const AssistantSpeechIndicator = ({ isSpeaking }) => {
  return (
    <div className="assistant-speech-editor">
      <div
        className={`speech-indicator ${
          isSpeaking ? "speaking" : "not-speaking"
        }`}
      ></div>
      <p className="speech-status">
        {isSpeaking ? "AssistantSpeaking" : "Assistant not speaking"}
      </p>
    </div>
  );
};

export default AssistantSpeechIndicator
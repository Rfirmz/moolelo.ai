import AssistantSpeechIndicator from "./AssistantSpeechIndicator";
import VolumeLevel from "./VolumeLevel";

const ActiveCallDetails = ({
  assistantisSpeaking,
  volumeLevel,
  endCallCallBack,
}) => {
  return (
    <div className="active-call-detail">
      <div className="call-info"></div>
      <AssistantSpeechIndicator isSpeaking={assistantisSpeaking} />
      <VolumeLevel volume={volumeLevel} />
      <div className="end-call-button">
        <button onClick={endCallCallBack}>End Call</button>
      </div>
    </div>
  );
};

export default ActiveCallDetails;

import { useState } from "react";
import {
  Button,
  Input,
  Image,
  Field,
  SpinButton,
} from "@fluentui/react-components";
import "./Welcome.css";

export function Welcome(props) {

  const [name, setName] = useState();
  const [participants, setParticipants] = useState();
  const [cadence, setCadence] = useState(1);
  const [firstOccurrence, setFirstOccurrence] = useState();
  const [numOccurrences, setNumOccurrences] = useState();
  const [duration, setDuration] = useState();
  const [topics, setTopics] = useState();

  const callAPI = () => {
    fetch('https://speakeasy.azurewebsites.net:443/api/MainFlow/triggers/When_a_HTTP_request_is_received/invoke?api-version=2022-05-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=t2mazjbgmrFspcOpX_1n9WBTfgcim-LzV0qiHTbt9EE', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        cadenceInDays: parseInt(cadence),
        participants: participants,
        firstOccurrence: firstOccurrence,
        numOccurrences: parseInt(numOccurrences),
        durationInMinutes: parseInt(duration),
        relevantTopics: topics
      }),
    });
  }

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Image src="SpeakEasy_1.png" />
        <h1 className="center">SpeakEasy!</h1>
        <form>
          <Field label="Name">
            <Input
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>          
          <Field label="Meeting cadence (days)">
            <SpinButton
              min={1}
              defaultValue={1}
              value={cadence}
              onChange={(e) => setCadence(e.target.value)}
            />
          </Field> 
          <Field label="Participants">
            <Input
              type="text" 
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </Field> 
          <Field label="First occurrence">
            <Input
              type="datetime-local" 
              value={firstOccurrence}
              onChange={(e) => setFirstOccurrence(e.target.value)}
            />
          </Field> 
          <Field label="Number of occurrences">
            <SpinButton
              min={1}
              defaultValue={1}
              max={30}
              value={numOccurrences}
              onChange={(e) => setNumOccurrences(e.target.value)}
            /> 
          </Field>
          <Field label="Duration (minutes)">
            <SpinButton   
              min={1}      
              defaultValue={1}  
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Field>
          <Field label="Relevant topics">
            <Input
              type="text" 
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
            />
          </Field>
          <br></br>
          <Button onClick={callAPI}> Submit </Button>
        </form>
      </div>
    </div>
  );
}

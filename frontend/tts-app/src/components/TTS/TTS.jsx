import React, { useState } from "react";
import { sendAudioForTranscription } from "../../api";
import { toast } from "react-toastify";

const TTS = ({ username, password }) => {
    const [file, setFile] = useState(null); // State to store the uploaded file
    const [transcription, setTranscription] = useState(""); // State to store the transcription result

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            toast.error("Please upload a .wav file!");
            return;
        }

        try {
            const response = await sendAudioForTranscription(file, username, password);
            setTranscription(response.data.transcription); // Assuming the backend returns 'transcription'
            toast.success("Transcription successful!");
        } catch (error) {
            toast.error(
                error.response?.data?.error || "An error occurred during transcription."
            );
        }
    };

    return (
        <div>
            <h2>Speech-to-Text</h2>
            <div>
                <input type="file" accept=".wav" onChange={handleFileChange} />
                <button onClick={handleSubmit}>Transcribe</button>
            </div>
            {transcription && (
                <div>
                    <h3>Transcription Result:</h3>
                    <p>{transcription}</p>
                </div>
            )}
        </div>
    );
};

export default TTS;

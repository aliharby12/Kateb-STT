import React, { useState, useRef } from "react";
import { sendAudioForTranscription } from "../../api";
import { toast } from "react-toastify";

const TTS = ({ username, password }) => {
    const [file, setFile] = useState(null);
    const [words, setWords] = useState([]);
    const [audioSrc, setAudioSrc] = useState(null); // Store the audio file URL
    const audioRef = useRef(null); // Reference to the audio element
    const [currentWordIndex, setCurrentWordIndex] = useState(null); // Current word being highlighted

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setAudioSrc(URL.createObjectURL(e.target.files[0])); // Create a URL for the uploaded audio file
    };

    const handleSubmit = async () => {
        if (!file) {
            toast.error("Please upload a .wav file!");
            return;
        }

        try {
            const response = await sendAudioForTranscription(file, username, password);
            const { json } = response.data;
            setWords(json.words);
            toast.success("Transcription successful!");
        } catch (error) {
            toast.error(
                error.response?.data?.error || "An error occurred during transcription."
            );
        }
    };

    const handleAudioTimeUpdate = () => {
        const currentTime = audioRef.current.currentTime;

        // Find the current word based on audio playback time
        const currentWord = words.findIndex(
            (word) => currentTime >= word.start && currentTime <= word.end
        );
        setCurrentWordIndex(currentWord);
    };

    return (
        <div>
            <h2>Speech-to-Text</h2>
            <div>
                <input type="file" accept=".wav" onChange={handleFileChange} />
                <button onClick={handleSubmit}>Transcribe</button>
            </div>

            {audioSrc && (
                <div>
                    <audio
                        ref={audioRef}
                        src={audioSrc}
                        controls
                        onTimeUpdate={handleAudioTimeUpdate} // Update word highlighting during playback
                    ></audio>
                </div>
            )}

            <div>
                <h3>Transcription Result:</h3>
                <div style={{ lineHeight: "2em" }}>
                    {words.map((word, index) => (
                        <span
                            key={index}
                            style={{
                                color: currentWordIndex === index ? "blue" : word.confidence > 0.5 ? "green" : "red",
                                marginRight: "5px",
                                fontWeight: currentWordIndex === index ? "bold" : "normal",
                            }}
                            title={`Start: ${word.start}s, End: ${word.end}s, Confidence: ${word.confidence.toFixed(
                                2
                            )}`}
                        >
                            {word.text}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TTS;

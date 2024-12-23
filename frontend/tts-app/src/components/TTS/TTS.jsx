import React, { useState } from "react";
import { getTTS } from "../../api";
import { toast } from "react-toastify";

const TTS = ({ token }) => {
    const [text, setText] = useState("");
    const [audioUrl, setAudioUrl] = useState(null);

    const handleTTS = async () => {
        try {
            const response = await getTTS(text, token);
            setAudioUrl(response.data.audio_url); // Assume the response contains an audio URL
            toast.success("TTS successful!");
        } catch (error) {
            toast.error(error.response?.data?.error || "TTS failed.");
        }
    };

    return (
        <div>
            <h2>Text-to-Speech</h2>
            <textarea
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button onClick={handleTTS}>Generate Speech</button>
            {audioUrl && (
                <div>
                    <audio controls>
                        <source src={audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default TTS;

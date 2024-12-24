import React, { useState, useRef } from "react";
import { sendAudioForTranscription } from "../../api";
import { toast } from "react-toastify";

const TTS = ({ username, password }) => {
    const [file, setFile] = useState(null);
    const [words, setWords] = useState([]);
    const [audioSrc, setAudioSrc] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const audioRef = useRef(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setAudioSrc(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = async () => {
        if (!file) {
            toast.error("Please upload a .wav file!");
            return;
        }

        setLoading(true); // Start loading
        try {
            const response = await sendAudioForTranscription(file, username, password);
            const { json } = response.data;
            setWords(json.words);
            toast.success("Transcription successful!");
        } catch (error) {
            toast.error(error.response?.data?.error || "An error occurred during transcription.");
        } finally {
            setLoading(false); // End loading
        }
    };

    const handleAudioTimeUpdate = () => {
        const currentTime = audioRef.current.currentTime;

        const currentWord = words.findIndex(
            (word) => currentTime >= word.start && currentTime <= word.end
        );
        setCurrentWordIndex(currentWord);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
            <div className="w-full max-w-4xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Speech-to-Text</h2>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Upload an Audio File
                    </label>
                    <input
                        type="file"
                        accept=".wav"
                        onChange={handleFileChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={loading} // Disable the button while loading
                >
                    {loading ? "Processing..." : "Transcribe"}
                </button>
            </div>

            {loading && (
                <div className="flex justify-center items-center h-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                </div>
            )}

            {audioSrc && !loading && (
                <div className="w-full max-w-4xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h3 className="text-xl font-semibold mb-4">Audio Playback</h3>
                    <audio
                        ref={audioRef}
                        src={audioSrc}
                        controls
                        onTimeUpdate={handleAudioTimeUpdate}
                        className="w-full"
                    ></audio>
                </div>
            )}

            {words.length > 0 && !loading && (
                <div className="w-full max-w-4xl bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <h3 className="text-xl font-semibold mb-4">Transcription Result</h3>
                    <div
                        className="flex flex-wrap gap-2 justify-end"
                        style={{ direction: "ltr" }} // Add RTL direction
                    >
                        {words
                            .slice() // Create a copy of the array
                            .reverse() // Reverse the array for correct RTL order
                            .map((word, index) => (
                                <span
                                    key={index}
                                    className={`px-2 py-1 rounded ${currentWordIndex === words.length - 1 - index
                                        ? "bg-blue-100 text-blue-700 font-bold"
                                        : word.confidence > 0.5
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                    title={`Start: ${word.start}s, End: ${word.end}s, Confidence: ${word.confidence.toFixed(
                                        2
                                    )}`}
                                >
                                    {word.text}
                                </span>
                            ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default TTS;

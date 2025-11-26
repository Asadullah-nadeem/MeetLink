"use client";

import { useState, useEffect } from "react";

export default function CreateMeetButton() {
    const [meetLink, setMeetLink] = useState<string | null>(null);

    const createMeet = () => {
        window.open("/meet-proxy", "_blank", "noopener");
    };

    useEffect(() => {
        const handler = async (event: MessageEvent) => {
            if (event.data?.meetUrl) {

                const url = event.data.meetUrl;
                setMeetLink(url);
                await fetch("/api/save-meet", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ meetUrl: url }),
                });
            }
        };

        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, []);


    return (
        <div className="flex flex-col items-center">
            <button
                onClick={createMeet}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
            >
                Create Google Meet Link
            </button>

            {meetLink && (
                <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-lg w-full max-w-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">✅ Your Meet Link</h3>

                    <p className="text-gray-600 mb-4">
                        Yeh link database mein save ho chuka hai:
                    </p>

                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 break-words">
                        <a
                            href={meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium underline"
                        >
                            {meetLink}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
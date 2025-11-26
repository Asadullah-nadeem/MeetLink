"use client";

import { useEffect } from "react";

export default function MeetProxy() {
    useEffect(() => {
        const win = window.open("https://meet.google.com/new", "_self");

        const interval = setInterval(() => {
            try {
                const url = window.location.href;

                if (url.includes("meet.google.com") && !url.endsWith("/new")) {
                    window.opener?.postMessage({ meetUrl: url }, "*");
                }
            } catch (e) {}

        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <p>Loading Google Meet…</p>;
}

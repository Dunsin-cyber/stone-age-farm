"use client";

import React, { useEffect, useRef } from "react";

export default function WalletHandler({ onClose }) {
    const iframeRef = useRef(null);

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.src = "/wallet-connect"; // Load the iframe page
        }

        const handleWalletStatus = (event) => {
            if (event.origin !== window.location.origin) return;

            if (event.data === "walletConnected") {
                alert("Wallet connected successfully!");
                onClose();
            }
        };

        window.addEventListener("message", handleWalletStatus);

        return () => {
            window.removeEventListener("message", handleWalletStatus);
        };
    }, [onClose]);

    return (
        <div className="relative bg-white p-4 rounded shadow-lg w-11/12 max-w-lg h-5/6">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-red-500 font-bold"
            >
                Close
            </button>
            <iframe
                ref={iframeRef}
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Wallet Connection"
            />
        </div>
    );
}

"use client";
import React, { useEffect, useRef } from "react";

export default function PaymentHandler({ paymentUrl, onClose }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Set the iframe's source when the component mounts
    if (iframeRef.current) {
      iframeRef.current.src = paymentUrl;
    }

    // Listen for messages from the iframe
    const handlePaymentStatus = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data === "success") {
        alert("Payment was successful!");
        onClose(); // Close the overlay
      } else if (event.data === "failure") {
        alert("Payment failed.");
        onClose(); // Close the overlay
      }
    };

    window.addEventListener("message", handlePaymentStatus);

    return () => {
      window.removeEventListener("message", handlePaymentStatus);
    };
  }, [paymentUrl, onClose]);

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
        title="Payment Page"
      />
    </div>
  );
}

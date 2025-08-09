"use client";
import { useState } from "react";

export default function Home() {
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState([]);

  const sendAll = async () => {
    const fileInput = document.querySelector("#csvUpload");
    const file = fileInput.files[0];
    if (!file) return alert("Please upload a CSV first");

    const formData = new FormData();
    formData.append("csv", file);

    setSending(true);
    setProgress(0);
    setStatus([]);

    try {
      const res = await fetch("/api/send-offer", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setStatus(data.results.map((r) => `${r.status} ${r.email || ""}`));
      } else {
        setStatus([`❌ Failed: ${data.error}`]);
      }
    } catch (err) {
      setStatus([`❌ Error: ${err.message}`]);
    }

    setSending(false);
    setProgress(100);

    setTimeout(() => {
      setProgress(0);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Send Offer Letters via CSV
        </h2>

        <input
          id="csvUpload"
          type="file"
          accept=".csv"
          className="mb-4"
        />

        <button
          onClick={sendAll}
          disabled={sending}
          className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send All"}
        </button>

        {sending && (
          <div className="mt-6 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-700 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {status.length > 0 && (
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            {status.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

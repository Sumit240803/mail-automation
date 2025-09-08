"use client";
import { useState } from "react";

export default function Home() {
  const[sendingIntern,setSendingIntern] = useState(false);
  const[progressIntern,setProgressIntern] = useState(0);
  const[statusIntern,setStatusIntern] = useState([]);



  const[sendingFirstMilestone,setSendingFirstMilestone] = useState(false);
  const[progressFirstMilestone,setProgressFirstMilestone] = useState(0);
  const[statusFirstMilestone,setStatusFirstMilestone] = useState([]);


  const[sendingOpenXAI2,setSendingOpenXAI2] = useState(false);
  const[progressOpenXAI2,setProgressOpenXAI2] = useState(0);
  const[statusOpenXAI2,setStatusOpenXAI2] = useState([]);


  const[sendingOpenXAI,setSendingOpenXAI] = useState(false);
  const[progressOpenXAI,setProgressOpenXAI] = useState(0);
  const[statusOpenXAI,setStatusOpenXAI] = useState([]);



  const sendAllIntern = async () => {
    const fileInput = document.querySelector("#csvUploadInternship");
    const file = fileInput.files[0];
    if (!file) return alert("Please upload a CSV first");

    const formData = new FormData();
    formData.append("csv", file);

    setSendingIntern(true);
    setProgressIntern(0);
    setStatusIntern([]);

    try {
      const res = await fetch("/api/send-internship-certificate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setStatusIntern(data.results.map((r) => `${r.status} ${r.email || ""}`));
      } else {
        setStatusIntern([`❌ Failed: ${data.error}`]);
      }
    } catch (err) {
      setStatusIntern([`❌ Error: ${err.message}`]);
    }

    setSendingIntern(false);
    setProgressIntern(100);

    setTimeout(() => {
      setProgressIntern(0);
    }, 3000);
  };

  const sendAllOpenXAI2 = async () => {
    const fileInput = document.querySelector("#csvUploadOpenxai2");
    const file = fileInput.files[0];
    if (!file) return alert("Please upload a CSV first");

    const formData = new FormData();
    formData.append("csv", file);

    setSendingOpenXAI2(true);
    setProgressOpenXAI2(0);
    setStatusOpenXAI2([]);

    try {
      const res = await fetch("/api/send-openxai-two", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setStatusOpenXAI2(data.results.map((r) => `${r.status} ${r.email || ""}`));
      } else {
        setStatusOpenXAI2([`❌ Failed: ${data.error}`]);
      }
    } catch (err) {
      setStatusOpenXAI2([`❌ Error: ${err.message}`]);
    }

    setSendingOpenXAI2(false);
    setProgressOpenXAI2(100);

    setTimeout(() => {
      setProgressOpenXAI2(0);
    }, 3000);
  }

  const sendAllOpenXAI = async () => {
    const fileInput = document.querySelector("#csvUploadOpenXAi");
    const file = fileInput.files[0];
    if (!file) return alert("Please upload a CSV first");

    const formData = new FormData();
    formData.append("csv", file);

    setSendingOpenXAI(true);
    setProgressOpenXAI(0);
    setStatusOpenXAI([]);

    try {
      const res = await fetch("/api/send-openxai", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setStatusOpenXAI(data.results.map((r) => `${r.status} ${r.email || ""}`));
      } else {
        setStatusOpenXAI([`❌ Failed: ${data.error}`]);
      }
    } catch (err) {
      setStatusOpenXAI([`❌ Error: ${err.message}`]);
    }

    setSendingOpenXAI(false);
    setProgressOpenXAI(100);

    setTimeout(() => {
      setProgressOpenXAI(0);
    }, 3000);
  }




  const sendAllMilestone = async () => {
    const fileInput = document.querySelector("#csvUploadMilestone");
    const file = fileInput.files[0];
    if (!file) return alert("Please upload a CSV first");

    const formData = new FormData();
    formData.append("csv", file);

    setSendingFirstMilestone(true);
    setProgressFirstMilestone(0);
    setStatusFirstMilestone([]);

    try {
      const res = await fetch("/api/first-milestone", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setStatusFirstMilestone(data.results.map((r) => `${r.status} ${r.email || ""}`));
      } else {
        setStatusFirstMilestone([`❌ Failed: ${data.error}`]);
      }
    } catch (err) {
      setStatusFirstMilestone([`❌ Error: ${err.message}`]);
    }

    setSendingFirstMilestone(false);
    setProgressFirstMilestone(100);

    setTimeout(() => {
      setProgressFirstMilestone(0);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="text-center text-2xl font-bold my-5">BlockseBlock Mail Automation System</div>

      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 my-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Send Internship Certificate via CSV
        </h2>

        <input
          id="csvUploadInternship"
          type="file"
          accept=".csv"
          className="mb-4"
        />

        <button
          onClick={sendAllIntern}
          disabled={sendingIntern}
          className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 disabled:opacity-50"
        >
          {sendingIntern ? "Sending..." : "Send All"}
        </button>

        {sendingIntern && (
          <div className="mt-6 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-700 transition-all duration-300"
              style={{ width: `${progressIntern}%` }}
            ></div>
          </div>
        )}

        {statusIntern.length > 0 && (
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            {statusIntern.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}
      </div>






      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 my-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Send First Milestone Certificate via CSV
        </h2>

        <input
          id="csvUploadMilestone"
          type="file"
          accept=".csv"
          className="mb-4"
        />

        <button
          onClick={sendAllMilestone}
          disabled={sendingFirstMilestone}
          className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 disabled:opacity-50"
        >
          {sendingFirstMilestone ? "Sending..." : "Send All"}
        </button>

        {sendingFirstMilestone && (
          <div className="mt-6 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-700 transition-all duration-300"
              style={{ width: `${progressFirstMilestone}%` }}
            ></div>
          </div>
        )}

        {statusFirstMilestone.length > 0 && (
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            {statusFirstMilestone.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}
      </div>







      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 my-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Send 5 Day Training Program Certificate via CSV
        </h2>

        <input
          id="csvUploadOpenxai2"
          type="file"
          accept=".csv"
          className="mb-4"
        />

        <button
          onClick={sendAllOpenXAI2}
          disabled={sendingOpenXAI2}
          className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 disabled:opacity-50"
        >
          {sendingOpenXAI2 ? "Sending..." : "Send All"}
        </button>

        {sendingOpenXAI2 && (
          <div className="mt-6 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-700 transition-all duration-300"
              style={{ width: `${progressOpenXAI2}%` }}
            ></div>
          </div>
        )}

        {statusOpenXAI2.length > 0 && (
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            {statusOpenXAI2.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}
      </div>


      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 my-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Send OpenXAI Certificate via CSV
        </h2>

        <input
          id="csvUploadOpenXAi"
          type="file"
          accept=".csv"
          className="mb-4"
        />

        <button
          onClick={sendAllOpenXAI}
          disabled={sendingOpenXAI}
          className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 disabled:opacity-50"
        >
          {sendingOpenXAI ? "Sending..." : "Send All"}
        </button>

        {sendingOpenXAI && (
          <div className="mt-6 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-700 transition-all duration-300"
              style={{ width: `${progressOpenXAI}%` }}
            ></div>
          </div>
        )}

        {statusOpenXAI.length > 0 && (
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            {statusOpenXAI.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

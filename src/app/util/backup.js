  // const sendAll = async () => {
  //   const fileInput = document.querySelector("#csvUpload");
  //   const file = fileInput.files[0];
  //   if (!file) return alert("Please upload a CSV first");

  //   const formData = new FormData();
  //   formData.append("csv", file);

  //   setSending(true);
  //   setProgress(0);
  //   setStatus([]);

  //   try {
  //     const res = await fetch("/api/send-offer", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     if (data.success) {
  //       setStatus(data.results.map((r) => `${r.status} ${r.email || ""}`));
  //     } else {
  //       setStatus([`❌ Failed: ${data.error}`]);
  //     }
  //   } catch (err) {
  //     setStatus([`❌ Error: ${err.message}`]);
  //   }

  //   setSending(false);
  //   setProgress(100);

  //   setTimeout(() => {
  //     setProgress(0);
  //   }, 3000);
  // };
  // const sendAllParticipation = async () => {
  //   const fileInput = document.querySelector("#csvUploadParticipation");
  //   const file = fileInput.files[0];
  //   if (!file) return alert("Please upload a CSV first");

  //   const formData = new FormData();
  //   formData.append("csv", file);

  //   setSendingParticipation(true);
  //   setProgressParticipation(0);
  //   setStatusParticipation([]);

  //   try {
  //     const res = await fetch("/api/send-participation", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     if (data.success) {
  //       setStatusParticipation(data.results.map((r) => `${r.status} ${r.email || ""}`));
  //     } else {
  //       setStatusParticipation([`❌ Failed: ${data.error}`]);
  //     }
  //   } catch (err) {
  //     setStatusParticipation([`❌ Error: ${err.message}`]);
  //   }

  //   setSendingParticipation(false);
  //   setProgressParticipation(100);

  //   setTimeout(() => {
  //     setProgressParticipation(0);
  //   }, 3000);
  // };
  // const sendAllAchievement = async () => {
  //   const fileInput = document.querySelector("#csvUploadAchievement");
  //   const file = fileInput.files[0];
  //   if (!file) return alert("Please upload a CSV first");

  //   const formData = new FormData();
  //   formData.append("csv", file);

  //   setSendingAchievement(true);
  //   setProgressAchievement(0);
  //   setStatusAchievement([]);

  //   try {
  //     const res = await fetch("/api/send-achievement", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     if (data.success) {
  //       setStatusAchievement(data.results.map((r) => `${r.status} ${r.email || ""}`));
  //     } else {
  //       setStatusAchievement([`❌ Failed: ${data.error}`]);
  //     }
  //   } catch (err) {
  //     setStatusAchievement([`❌ Error: ${err.message}`]);
  //   }

  //   setSendingAchievement(false);
  //   setProgressAchievement(100);

  //   setTimeout(() => {
  //     setProgressAchievement(0);
  //   }, 3000);
  // };



    // const [sending, setSending] = useState(false);
    // const [progress, setProgress] = useState(0);
    // const [status, setStatus] = useState([]);
    // const [sendingParticipation, setSendingParticipation] = useState(false);
    // const [progressParticipation, setProgressParticipation] = useState(0);
    // const [statusParticipation, setStatusParticipation] = useState([]);
    // const [sendingAchievement, setSendingAchievement] = useState(false);
    // const [progressAchievement, setProgressAchievement] = useState(0);
    // const [statusAchievement, setStatusAchievement] = useState([]);
  
    // const[sendingOpenXAI,setSendingOpenXAI] = useState(false);
    // const[progressOpenXAI,setProgressOpenXAI] = useState(0);
    // const[statusOpenXAI,setStatusOpenXAI] = useState([]);



          {/* <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 my-2">
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
      </div> */}
      {/* <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 my-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Send Participation Certificate via CSV
        </h2>

        <input
          id="csvUploadParticipation"
          type="file"
          accept=".csv"
          className="mb-4"
        />

        <button
          onClick={sendAllParticipation}
          disabled={sendingParticipation}
          className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 disabled:opacity-50"
        >
          {sendingParticipation ? "Sending..." : "Send All"}
        </button>

        {sendingParticipation && (
          <div className="mt-6 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-700 transition-all duration-300"
              style={{ width: `${progressParticipation}%` }}
            ></div>
          </div>
        )}

        {statusParticipation.length > 0 && (
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            {statusParticipation.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}
      </div> */}
      {/* <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 my-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Send National Round Certificate via CSV
        </h2>

        <input
          id="csvUploadAchievement"
          type="file"
          accept=".csv"
          className="mb-4"
        />

        <button
          onClick={sendAllAchievement}
          disabled={sendingAchievement}
          className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 disabled:opacity-50"
        >
          {sendingAchievement ? "Sending..." : "Send All"}
        </button>

        {sendingAchievement && (
          <div className="mt-6 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-700 transition-all duration-300"
              style={{ width: `${progressAchievement}%` }}
            ></div>
          </div>
        )}

        {statusAchievement.length > 0 && (
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            {statusAchievement.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}
      </div> */}

            {/* <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 my-2">
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
      </div> */}



      // const sendAllOpenXAI = async () => {
  //   const fileInput = document.querySelector("#csvUploadOpenXAi");
  //   const file = fileInput.files[0];
  //   if (!file) return alert("Please upload a CSV first");

  //   const formData = new FormData();
  //   formData.append("csv", file);

  //   setSendingOpenXAI(true);
  //   setProgressOpenXAI(0);
  //   setStatusOpenXAI([]);

  //   try {
  //     const res = await fetch("/api/send-openxai", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     if (data.success) {
  //       setStatusOpenXAI(data.results.map((r) => `${r.status} ${r.email || ""}`));
  //     } else {
  //       setStatusOpenXAI([`❌ Failed: ${data.error}`]);
  //     }
  //   } catch (err) {
  //     setStatusOpenXAI([`❌ Error: ${err.message}`]);
  //   }

  //   setSendingOpenXAI(false);
  //   setProgressOpenXAI(100);

  //   setTimeout(() => {
  //     setProgressOpenXAI(0);
  //   }, 3000);
  // };

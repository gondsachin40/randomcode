// import { useEffect , useRef , useState } from 'react';
// import './App.css';


// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// function App() {
//   /********** STATES *********************/
//   const [text, setText] = useState("");
//   const [listening, setListening] = useState(false);
//   const [language, setLanguage] = useState("en-IN");
  
//   /********** REFS *********************/
//   const recognitionRef = useRef(null);
//   const isListeningRef = useRef(false);
//   const pendingLangRef = useRef(null);

//   /********** REFS *********************/
//   useEffect(() => {
//     if(!SpeechRecognition){
//       alert("Speech recognition not supported in this browser");
//       return;
//     }
//     const recognition = new SpeechRecognition();
//     recognitionRef.current = recognition;
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = language;

//     recognition.onresult = (event) => {
//       let finalText = "";
//       //let interimText = "";
    
    
//     for (let i = event.resultIndex; i < event.results.length; i++) {
//       const res = event.results[i];
//       const transcript = res[0].transcript;

//       if (res.isFinal) {
//           finalText += transcript + " ";
//         } else {
//           //interimText += transcript;
//         }
//     }
    
//     if (finalText) {
//         setText((prev) => prev + finalText);
//         //setInterim("");
//       } else {
//         //setInterim(interimText);
//       }
//   };

//   recognition.onend = () => {
//     if(pendingLangRef.current){
//       recognition.lang = pendingLangRef.current;
//       pendingLangRef.current = null;
//     }
//     if(isListeningRef.current){
//       recognition.start();
//     }
//   };

//   recognition.onerror = (e) => {
//     console.error("Speech Recognition Error:", e.error);
//   };
//   return () => recognition.stop();

// }, []);

//   /********** Button Start/Stop Function *********************/

//   const toggleListening = () => {
//     const recognition = recognitionRef.current;
//     if(!listening){
//       isListeningRef.current = true;
//       recognition.start();
//       setListening(true);
//     } else {
//       isListeningRef.current = false;
//       recognition.stop();
//       setListening(false);
//       //setInterim("");
      
//     }
//   }

//   /************** LANGUAGE SWITCH  *****************/

//   const handleLanguageChange = (newLang) => {
//     setLanguage(newLang);
//     const recognition = recognitionRef.current;
//     if(!recognition) return;

//     pendingLangRef.current = newLang;

//     if(isListeningRef.current){
//       recognition.stop();
//     } else {
//       recognition.lang = newLang;
//       pendingLangRef.current = null;
//     }

//   }

//   return (
//     <div className="App">
//       <h1>🎤 Voice to Text</h1>
//       <select value={language} 
//       onChange={(e) => handleLanguageChange(e.target.value)}>
//         <option value={"en-IN"}>English</option>
//         <option value={"hi-IN"}>Hindi</option>
//         <option value={"mr-In"}>Marathi</option>
//       </select>

//       <textarea
//         value={text}
//         placeholder="Your speech will appear here..."
//         rows="6"       
//       />

//       <div>
//         <button onClick={toggleListening}>
//           {listening ? "stop Mic" : "start Mic"}
//         </button>        
//     </div>
//     </div>
//   );
// }

// export default App;





/****** CHATGPT DESIGN CODE **************/

// import { useEffect , useRef , useState } from "react";
// import "./App.css";

// const SpeechRecognition =
// window.SpeechRecognition || window.webkitSpeechRecognition;

// function App(){

// /******** STATES ********/

// const [text,setText] = useState("");
// const [listening,setListening] = useState(false);
// const [language,setLanguage] = useState("en-IN");
// const [darkMode,setDarkMode] = useState(true);

// /******** REFS ********/

// const recognitionRef = useRef(null);
// const isListeningRef = useRef(false);
// const pendingLangRef = useRef(null);

// const audioContextRef = useRef(null);
// const analyserRef = useRef(null);
// const barsRef = useRef([]);

// /******** THEME ********/

// useEffect(()=>{

// if(darkMode){
// document.body.classList.add("dark");
// }else{
// document.body.classList.remove("dark");
// }

// },[darkMode]);

// /******** SPEECH ********/

// useEffect(()=>{

// if(!SpeechRecognition){
// alert("Speech recognition not supported");
// return;
// }

// const recognition = new SpeechRecognition();
// recognitionRef.current = recognition;

// recognition.continuous = true;
// recognition.interimResults = true;
// recognition.lang = language;

// recognition.onresult = (event)=>{

// let finalText="";

// for(let i=event.resultIndex;i<event.results.length;i++){

// const res = event.results[i];
// const transcript = res[0].transcript;

// if(res.isFinal){
// finalText += transcript + " ";
// }

// }

// if(finalText){
// setText(prev => prev + finalText);
// }

// };

// recognition.onend = ()=>{

// if(pendingLangRef.current){
// recognition.lang = pendingLangRef.current;
// pendingLangRef.current=null;
// }

// if(isListeningRef.current){
// recognition.start();
// }

// };

// return ()=>recognition.stop();

// },[]);

// /******** VISUALIZER ********/

// const startVisualizer = async ()=>{

// const stream = await navigator.mediaDevices.getUserMedia({audio:true});

// const audioContext = new AudioContext();
// audioContextRef.current = audioContext;

// const analyser = audioContext.createAnalyser();
// analyser.fftSize = 64;

// const source = audioContext.createMediaStreamSource(stream);

// source.connect(analyser);
// analyserRef.current = analyser;

// const bufferLength = analyser.frequencyBinCount;
// const dataArray = new Uint8Array(bufferLength);

// const animate = ()=>{

// if(!listening) return;

// analyser.getByteFrequencyData(dataArray);

// barsRef.current.forEach((bar,i)=>{

// const value = dataArray[i];
// bar.style.height = (value/3)+"px";

// });

// requestAnimationFrame(animate);

// };

// animate();

// };

// /******** MIC ********/

// const toggleListening = async ()=>{

// const recognition = recognitionRef.current;

// if(!listening){

// isListeningRef.current=true;
// recognition.start();
// setListening(true);

// startVisualizer();

// }else{

// isListeningRef.current=false;
// recognition.stop();
// setListening(false);

// }

// };

// /******** LANGUAGE ********/

// const handleLanguageChange = (newLang)=>{

// setLanguage(newLang);

// const recognition = recognitionRef.current;
// if(!recognition) return;

// pendingLangRef.current = newLang;

// if(isListeningRef.current){
// recognition.stop();
// }else{
// recognition.lang = newLang;
// pendingLangRef.current=null;
// }

// };

// return(

// <div className="page">

// {/* TOP BAR */}

// <div className="topbar">

// <h2>OctaVoice AI</h2>

// <div className="controls">

// <select
// value={language}
// onChange={(e)=>handleLanguageChange(e.target.value)}
// >
// <option value="en-IN">English</option>
// <option value="hi-IN">Hindi</option>
// <option value="mr-IN">Marathi</option>
// </select>

// <label className="switch">
// <input
// type="checkbox"
// checked={darkMode}
// onChange={()=>setDarkMode(!darkMode)}
// />
// <span className="slider"></span>
// </label>

// </div>

// </div>

// {/* MAIN */}

// <div className="main">

// <textarea
// value={text}
// placeholder="Start speaking... AI will convert your speech into text."
// />

// <div className="visualizer">

// {Array.from({length:25}).map((_,i)=>(
// <span
// key={i}
// ref={(el)=>barsRef.current[i]=el}
// />
// ))}

// </div>

// <button
// className={`micButton ${listening ? "active":""}`}
// onClick={toggleListening}
// >

// {listening ? "Stop Mic" : "Start Mic"}

// </button>

// </div>

// </div>

// );

// }

// export default App;










// import { useEffect, useRef, useState } from "react";
// import "./App.css";

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// export default function App() {
//   /* ===============================
//      REFS
//   =============================== */
//   const recognitionRef = useRef(null);
//   const isListeningRef = useRef(false);
//   const pendingLangRef = useRef(null);

//   /* ===============================
//      STATE
//   =============================== */
//   const [listening, setListening] = useState(false);
//   const [text, setText] = useState("");
//   const [interim, setInterim] = useState("");
//   const [theme, setTheme] = useState("dark");
//   const [language, setLanguage] = useState("en-IN");

//   /* ===============================
//      INIT SPEECH ENGINE (ONCE)
//   =============================== */
//   useEffect(() => {
//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported in this browser");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognitionRef.current = recognition;

//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = language;

//     recognition.onresult = (event) => {
//       if (!isListeningRef.current) return;

//       let finalText = "";
//       let interimText = "";

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const res = event.results[i];
//         const transcript = res[0].transcript;

//         if (res.isFinal) {
//           finalText += transcript + " ";
//         } else {
//           interimText += transcript;
//         }
//       }

//       if (finalText) {
//         setText((prev) => prev + finalText);
//         setInterim("");
//       } else {
//         setInterim(interimText);
//       }
//     };

//     recognition.onend = () => {
//       // 🌍 Apply pending language safely
//       if (pendingLangRef.current) {
//         recognition.lang = pendingLangRef.current;
//         pendingLangRef.current = null;
//       }

//       // 🔁 Restart only if mic is ON
//       if (isListeningRef.current) {
//         recognition.start();
//       }
//     };

//     recognition.onerror = (e) => {
//       console.error("Speech Recognition Error:", e.error);
//     };

//     return () => recognition.stop();
//   }, []);

//   /* ===============================
//      START / STOP
//   =============================== */
//   const toggleListening = () => {
//     const recognition = recognitionRef.current;
//     if (!recognition) return;

//     if (!listening) {
//       isListeningRef.current = true;
//       recognition.start();
//       setListening(true);
//     } else {
//       isListeningRef.current = false;
//       recognition.stop();
//       setListening(false);
//       setInterim("");
//     }
//   };

//   /* ===============================
//      LANGUAGE SWITCH (SAFE)
//   =============================== */
//   const handleLanguageChange = (newLang) => {
//     setLanguage(newLang);

//     const recognition = recognitionRef.current;
//     if (!recognition) return;

//     // Save language change
//     pendingLangRef.current = newLang;

//     // Stop recognition safely
//     if (isListeningRef.current) {
//       recognition.stop();
//     } else {
//       recognition.lang = newLang;
//       pendingLangRef.current = null;
//     }
//   };

//   /* ===============================
//      UI
//   =============================== */
//   return (
//     <div className={`app ${theme}`}>
//       {/* 🌙 THEME TOGGLE */}
//       <div className="theme-toggle">
//         <span>🌙</span>
//         <label className="switch">
//           <input
//             type="checkbox"
//             checked={theme === "light"}
//             onChange={() =>
//               setTheme((prev) => (prev === "dark" ? "light" : "dark"))
//             }
//           />
//           <span className="slider"></span>
//         </label>
//         <span>☀️</span>
//       </div>

//       <div className="card">
//         <header>
//           <h1>🎙️ OctaVoice to Text</h1>
//           <p>Real-time • Editable • Unlimited</p>
//         </header>

//         {/* 🌍 LANGUAGE SELECT */}
//         <select
//           value={language}
//           onChange={(e) => handleLanguageChange(e.target.value)}
//         >
//           <option value="en-IN">English</option>
//           <option value="hi-IN">Hindi</option>
//           <option value="mr-IN">Marathi</option>
//           <option value="fr-FR">French</option>
//         </select>

//         {/* ✍️ TEXT EDITOR */}
//         <div className="editor-wrapper">
//           <textarea
//             className="editor"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Click start and begin speaking..."
//           />
//           {interim && <div className="interim">{interim}</div>}
//         </div>

//         {/* 🎤 START / STOP */}
//         <button
//           className={`main-btn ${listening ? "active" : ""}`}
//           onClick={toggleListening}
//         >
//           {listening ? "⏹ Stop Listening" : "🎤 Start Listening"}
//         </button>
//       </div>
//     </div>
//   );
// }


/************** new code *******************/

import { useEffect, useRef, useState } from "react";
import "./App.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function App() {
  /* ===============================
     REFS
  =============================== */
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  /* ===============================
     STATE
  =============================== */
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [interim, setInterim] = useState("");
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en-IN");

  /* ===============================
     SAFE START (PREVENT ERROR)
  =============================== */
  const safeStart = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    try {
      recognition.start();
    } catch (err) {
      console.warn("Start prevented:", err.message);
    }
  };

  /* ===============================
     INIT SPEECH ENGINE (ONCE)
  =============================== */
  useEffect(() => {
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      if (!isListeningRef.current) return;

      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        const transcript = res[0].transcript;

        if (res.isFinal) {
          finalText += transcript + " ";
        } else {
          interimText += transcript;
        }
      }

      if (finalText) {
        setText((prev) => prev + finalText);
        setInterim("");
      } else {
        setInterim(interimText);
      }
    };

    recognition.onend = () => {
      // 🔁 Restart safely (only if still listening)
      if (isListeningRef.current) {
        setTimeout(() => {
          safeStart();
        }, 200);
      }
    };

    recognition.onerror = (e) => {
      if (e.error === "aborted") return;
      console.error("Speech Recognition Error:", e.error);
    };

    return () => recognition.stop();
  }, []);

  /* ===============================
     START / STOP
  =============================== */
  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (!listening) {
      isListeningRef.current = true;
      recognition.lang = language;
      safeStart();
      setListening(true);
    } else {
      isListeningRef.current = false;
      recognition.stop();
      setListening(false);
      setInterim("");
    }
  };

  /* ===============================
     LANGUAGE SWITCH (FINAL FIX)
  =============================== */
  const handleLanguageChange = (newLang) => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    setLanguage(newLang);

    // 🛑 Stop first
    isListeningRef.current = false;
    recognition.stop();

    // ⏳ Wait for full stop (important)
    setTimeout(() => {
      recognition.lang = newLang;

      // ▶️ Restart cleanly
      isListeningRef.current = true;
      safeStart();
      setListening(true);
    }, 400);
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className={`app ${theme}`}>
      {/* 🌙 THEME TOGGLE */}
      <div className="theme-toggle">
        <span>🌙</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={theme === "light"}
            onChange={() =>
              setTheme((prev) => (prev === "dark" ? "light" : "dark"))
            }
          />
          <span className="slider"></span>
        </label>
        <span>☀️</span>
      </div>

      <div className="card">
        <header>
          <h1>🎙️ OctaVoice to Text</h1>
          <p>Real-time • Editable • Unlimited</p>
        </header>

        {/* 🌍 LANGUAGE SELECT */}
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="en-IN">English</option>
          <option value="hi-IN">Hindi</option>
          <option value="mr-IN">Marathi</option>
          <option value="fr-FR">French</option>
        </select>

        {/* ✍️ TEXT EDITOR */}
        <div className="editor-wrapper">
          <textarea
            className="editor"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Click start and begin speaking..."
          />
          {interim && <div className="interim">{interim}</div>}
        </div>

        {/* 🎤 BUTTON */}
        <button
          className={`main-btn ${listening ? "active" : ""}`}
          onClick={toggleListening}
        >
          {listening ? "⏹ Stop Listening" : "🎤 Start Listening"}
        </button>
      </div>
    </div>
  );
}



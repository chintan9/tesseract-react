import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';


function App() {
  const [date, setDate] = useState(null);
   const worker = createWorker({
    logger: m => console.log(m),
  });
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    setOcr(text);
  };
  const [ocr, setOcr] = useState('Recognizing...');
  useEffect(() => {
    doOCR();
  });
  useEffect(() => {
    async function getDate() {
      const res = await fetch('/api/date');
      const newDate = await res.text();
      setDate(newDate);
    }
    getDate();
  }, []);
  return (
    <main>
      <div className="App">
      <p>{ocr}</p>
    </div>
      <br />
      <h2>Website Loaded on:</h2>
      <p>{date ? date : 'Loading date...'}</p>
    </main>
  );
}

export default App;
/*
import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';

function App() {
  const worker = createWorker({
    logger: m => console.log(m),
  });
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    setOcr(text);
  };
  const [ocr, setOcr] = useState('Recognizing...');
  useEffect(() => {
    doOCR();
  });
  return (
    <div className="App">
      <p>{ocr}</p>
    </div>
  );
}

export default App;
*/


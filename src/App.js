import { useEffect, useState, useRef } from "react";
import './App.css';
import { sampleData } from "./sort";

function App() {

  const [count, setCount] = useState(0);
  const [componentTime, setComponentTime] = useState(undefined);
  const [workerTime, setWorkerTime] = useState(undefined);
  const workerRef = useRef(new Worker(new URL('./worker.js', import.meta.url)));

  useEffect(() => {
    const a = Date.now();
    sampleData().sort();
    const b = Date.now();
    setComponentTime(b-a);
    console.log("in component", b-a);
    const samples = new Int32Array(sampleData());
    workerRef.current.onmessage = (e) => {
      const { data } = e;
      setWorkerTime(data);
    }
    workerRef.current.postMessage(samples, [samples.buffer]);
  }, [count]);

  return (
    <div className="App">
      <header className="App-header">
        Sorting 500000 item array in React component vs. in WebWorker
        <button onClick={() => setCount(count+1)}>Generate New Array and Sort</button>
        { componentTime ? <h2>Sort time in component: {componentTime} ms</h2> : null }
        { workerTime ? <h2>Sort time in WebWorker: {workerTime} ms</h2> : null }
      </header>
    </div>
  );
}

export default App;

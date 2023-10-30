onmessage = (e) => {
    const { data } = e;
    const a = Date.now();
    data.sort();
    const b = Date.now();
    console.log("in worker", b-a);
    postMessage(b-a);
}
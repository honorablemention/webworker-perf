onmessage=function(o){var a=o.data,e=Date.now();a.sort();var n=Date.now();console.log("in worker",n-e),postMessage(n-e)};
//# sourceMappingURL=329.ab5bb0d9.chunk.js.map
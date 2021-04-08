/// <reference lib="dom"/>
let worker: Worker | undefined = new Worker("./worker.ts");

worker.onmessage = function(event) {
  console.log("Message from worker: ", event.data)
  worker?.terminate()
  worker = undefined
}


export {};

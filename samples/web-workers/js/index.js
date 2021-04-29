let worker = new Worker("./worker.js");
worker.onmessage = function(event) {
  console.log("Message from worker: ", event.data);
  worker.terminate();
  worker = undefined;
};

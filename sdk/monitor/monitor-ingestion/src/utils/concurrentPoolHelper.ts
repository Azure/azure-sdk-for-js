// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Reference - https://stackoverflow.com/a/60833870/2170938

export async function* asyncPool(
  maxConcurrency: number,
  workerArray: Array<any>,
  iteratorFunc: (args: any) => Promise<void>
) {
  return new Promise((executor) => {
    const workerQueue = [...workerArray].reverse();
    let activeCount = 0;

    const promises: Array<any> = [];

    const pollNext = () => {
      if (workerQueue.length === 0 && activeCount === 0) {
        executor(promises);
      } else {
        while (activeCount < maxConcurrency && workerQueue.length) {
          // getting the index for the current worker
          const index = workerArray.length - workerQueue.length;
          const worker = workerQueue.pop();
          activeCount++;
          const currentWorker = iteratorFunc(worker);

          const processCurrentPromise = (currentWorker: any, index: number) => {
            // This maintains the order of promises and input worker array
            // Executes the iterator func and stores the result in appropriate index
            promises[index] = currentWorker;
            activeCount--;
            pollNext();
          };
          currentWorker.then((currentWorker) => processCurrentPromise(currentWorker, index));
        }
      }
    };

    pollNext();
  });
}

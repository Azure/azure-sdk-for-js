// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export async function concurrentRun<T>(
  maxConcurrency: number,
  inputData: Array<T>,
  callback: (args: T) => Promise<void>
): Promise<void> {
  const dataQueue = [...inputData].reverse();
  const promises: Array<Promise<void>> = [];

  function removePromise(p: Promise<void>) {
    promises.splice(promises.indexOf(p), 1);
  }
  while (dataQueue.length) {
    while (dataQueue.length && promises.length < maxConcurrency) {
      const worker = dataQueue.pop();
      const promise = callback(worker!);
      // eslint-disable-next-line promise/catch-or-return
      promise.finally(() => removePromise(promise));
      promises.push(promise);
    }
    if (promises.length === maxConcurrency) {
      await Promise.race(promises);
    }
  }
  await Promise.all(promises);
}

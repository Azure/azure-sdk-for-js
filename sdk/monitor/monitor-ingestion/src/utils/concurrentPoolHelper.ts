// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";

export async function concurrentRun<T>(
  maxConcurrency: number,
  inputData: Array<T>,
  callback: (args: T) => Promise<void>,
  abortSignal?: AbortSignalLike
): Promise<void> {
  const dataQueue = [...inputData].reverse();
  const promises: Array<Promise<void>> = [];

  function removePromise(p: Promise<void>): void {
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
    if (abortSignal?.aborted) {
      await Promise.all(promises);
      return;
    }
  }
  await Promise.all(promises);
}

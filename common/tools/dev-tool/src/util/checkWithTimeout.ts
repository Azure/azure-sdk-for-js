// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { createPrinter } from "./printer";
const log = createPrinter("check-with-timeout");

/**
 *  - Maximum wait duration for the expected event to happen = `10000 ms`(default value is 10 seconds)(= maxWaitTimeInMilliseconds)
 *  - Keep checking whether the predicate is true after every `1000 ms`(default value is 1 second) (= delayBetweenRetriesInMilliseconds)
 */
export async function checkWithTimeout(
  predicate: () => boolean | Promise<boolean>,
  delayBetweenRetriesInMilliseconds = 1000,
  maxWaitTimeInMilliseconds = 10000
): Promise<boolean> {
  const maxTime = Date.now() + maxWaitTimeInMilliseconds;
  while (Date.now() < maxTime) {
    if (await predicate()) {
      log.info(`checkWithTimeout condition returned true`);
      return true;
    }
    await delay(delayBetweenRetriesInMilliseconds);
  }
  return false;
}

async function delay(timeInMs: number) {
  return new Promise((resolve) => {
    log.info(`waiting for ${timeInMs}ms`);
    setTimeout(resolve, timeInMs);
  });
}

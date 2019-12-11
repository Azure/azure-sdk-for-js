// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as dotenv from "dotenv";

// initialize using the .env file in the current folder
dotenv.config();

/**
 * Runs the async sample function, exiting if needed if it fails.
 * @param main The 'main' function for the sample.
 */
export function runSample(main: () => Promise<void>) {
  if (process.env["DO_NOT_EXECUTE_SAMPLE"]) {
    return Promise.resolve();
  }

  return main().catch((err) => {
    console.log("Error occurred: ", err);
    process.exit(1);
  });
}

/**
 * Runs your cleanupFn after waiting for `timeToWaitInSeconds` seconds
 * @param cleanupFn Cleanup function to run.
 * @param timeToWaitInSeconds Seconds to wait.
 */
export function cleanupAfterWaiting(cleanupFn: () => Promise<void>, timeToWaitInSeconds: number): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Waiting for ${timeToWaitInSeconds} seconds...`)

    setTimeout(async () => {
      try {
        await cleanupFn();
        resolve();
      } catch (err) {
        reject(err);
      }
    }, timeToWaitInSeconds * 1000);
  });
}
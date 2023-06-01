// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { delay } from "@azure/core-amqp";

export interface SnapshotOptions {
  /**
   * The name of this test. Used when reporting telemetry in customDimensions['testName'].
   */
  testName: string;
  snapshotIntervalInMs?: number;
  /**
   * Snapshot information is automatically sent to Azure Monitor.
   * This allows you also print the same information to the console.
   *
   * Disabled by default.
   */
  writeSnapshotInfoToConsole?: boolean;
}

/**
 * Loops infinitely with a delay between invocations.
 */
export async function loopForever(
  fn: () => Promise<void>,
  duration: number,
  abortSignal?: AbortSignalLike
) {
  while (abortSignal?.aborted === false && (await delay(duration))) {
    await fn();
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-amqp";
import { AbortSignalLike } from "@azure/abort-controller";

/**
 * @param delayInMs The number of milliseconds to be delayed.
 * @param abortSignal The abortSignal associated with the containing operation.
 * @internal
 * @hidden
 */
export async function delayWithoutThrow(
  delayInMs: number,
  abortSignal?: AbortSignalLike
): Promise<void> {
  try {
    await delay(delayInMs, abortSignal);
  } catch {} // swallow AbortError
}

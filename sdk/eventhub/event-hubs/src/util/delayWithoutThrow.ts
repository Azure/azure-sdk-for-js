// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { delay } from "@azure/core-amqp";
import { AbortSignalLike } from "@azure/abort-controller";

/**
 * @param delayInMs The number of milliseconds to be delayed.
 * @param abortSignal The abortSignal associated with the containing operation.
 * @internal
 * @ignore
 */
export async function delayWithoutThrow(
  delayInMs: number,
  abortSignal?: AbortSignalLike
): Promise<void> {
  try {
    await delay(delayInMs, abortSignal);
  } catch {} // swallow AbortError
}

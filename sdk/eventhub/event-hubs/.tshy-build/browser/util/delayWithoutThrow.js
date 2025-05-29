// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { delay } from "@azure/core-amqp";
/**
 * @param delayInMs - The number of milliseconds to be delayed.
 * @param abortSignal - The abortSignal associated with the containing operation.
 * @internal
 */
export async function delayWithoutThrow(delayInMs, abortSignal) {
    try {
        await delay(delayInMs, abortSignal);
    }
    catch (_a) {
        /* no-op to swallow AbortError */
    }
}
//# sourceMappingURL=delayWithoutThrow.js.map
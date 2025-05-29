"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayWithoutThrow = delayWithoutThrow;
const core_amqp_1 = require("@azure/core-amqp");
/**
 * @param delayInMs - The number of milliseconds to be delayed.
 * @param abortSignal - The abortSignal associated with the containing operation.
 * @internal
 */
async function delayWithoutThrow(delayInMs, abortSignal) {
    try {
        await (0, core_amqp_1.delay)(delayInMs, abortSignal);
    }
    catch (_a) {
        /* no-op to swallow AbortError */
    }
}
//# sourceMappingURL=delayWithoutThrow.js.map
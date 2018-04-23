"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const _1 = require(".");
const debugModule = require("debug");
const debug = debugModule("azure:event-hubs:retry");
function isDelivery(obj) {
    let result = false;
    if (obj && typeof obj.id === "number" && typeof obj.settled === "boolean" &&
        typeof obj.remote_settled === "boolean" && typeof obj.format === "number") {
        result = true;
    }
    return result;
}
/**
 * It will attempt to linearly retry an operation specified number of times with a specified
 * delay in between each retry. The retries will only happen if the error is retryable.
 *
 * @param {Promise<T>} operation    The operation that needs to be retried.
 * @param {number} [times]          Number of times the operation needs to be retried in case of error. Default: 3.
 * @param {number} [delayInSeconds] Amount of time to wait in seconds before making the next attempt. Default: 15.
 *
 * @return {Promise<T>} Promise<T>.
 */
function retry(operation, times, delayInSeconds) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!operation || typeof operation !== "function") {
            throw new Error("'operation' is a required parameter and must be of type 'function'.");
        }
        if (times && typeof times !== "number") {
            throw new Error("'times' must be of type 'number'.");
        }
        if (delayInSeconds && typeof delayInSeconds !== "number") {
            throw new Error("'delayInSeconds' must be of type 'number'.");
        }
        if (!times)
            times = 3;
        if (!delayInSeconds)
            delayInSeconds = 15;
        let lastError;
        let result;
        let success = false;
        for (let i = 0; i < times; i++) {
            const j = i + 1;
            debug("Retry attempt number: %d", j);
            try {
                result = yield operation();
                success = true;
                debug("Success, after attempt number: %d.", j);
                if (!isDelivery(result)) {
                    debug("Success result: %O", result);
                }
                break;
            }
            catch (err) {
                if (!err.translated) {
                    err = errors_1.translate(err);
                }
                lastError = err;
                debug("Error occured in attempt number %d: %O", j, err);
                if (lastError.retryable) {
                    debug("Sleeping for %d seconds.", delayInSeconds);
                    yield _1.delay(delayInSeconds * 1000);
                    continue;
                }
                else {
                    break;
                }
            }
        }
        if (success) {
            return result;
        }
        else {
            throw lastError;
        }
    });
}
exports.retry = retry;
//# sourceMappingURL=retry.js.map
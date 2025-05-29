"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapPoller = wrapPoller;
exports.updateState = updateState;
async function wrapPoller(httpPoller) {
    var _a, _b;
    const abortController = new AbortController();
    const simplePoller = {
        isDone() {
            return httpPoller.isDone;
        },
        isStopped() {
            return abortController.signal.aborted;
        },
        getOperationState() {
            if (!httpPoller.operationState) {
                throw new Error("Operation state is not available. The poller may not have been started and you could await submitted() before calling getOperationState().");
            }
            const mergedState = Object.assign(Object.assign(Object.assign({}, httpPoller.operationState), httpPoller.operationState.result), { isStarted: httpPoller.operationState.status !== "notStarted", isCompleted: httpPoller.operationState.status === "succeeded" ||
                    httpPoller.operationState.status === "failed" ||
                    httpPoller.operationState.status === "canceled" });
            if (mergedState.error === null) {
                mergedState.error = undefined;
            }
            return mergedState;
        },
        getResult() {
            return httpPoller.result;
        },
        toString() {
            if (!httpPoller.operationState) {
                throw new Error("Operation state is not available. The poller may not have been started and you could await submitted() before calling getOperationState().");
            }
            return JSON.stringify({
                state: httpPoller.operationState,
            });
        },
        stopPolling() {
            abortController.abort();
        },
        onProgress: httpPoller.onProgress,
        async poll(options) {
            await httpPoller.poll(options);
        },
        pollUntilDone(pollOptions) {
            function abortListener() {
                abortController.abort();
            }
            const inputAbortSignal = pollOptions === null || pollOptions === void 0 ? void 0 : pollOptions.abortSignal;
            const abortSignal = abortController.signal;
            if (inputAbortSignal === null || inputAbortSignal === void 0 ? void 0 : inputAbortSignal.aborted) {
                abortController.abort();
            }
            else if (!abortSignal.aborted) {
                inputAbortSignal === null || inputAbortSignal === void 0 ? void 0 : inputAbortSignal.addEventListener("abort", abortListener, {
                    once: true,
                });
            }
            return httpPoller.pollUntilDone({ abortSignal: abortController.signal });
        },
    };
    await httpPoller.submitted();
    // clean up the final GET path so that we could skip final GET
    // Workaround for https://github.com/Azure/azure-sdk-for-js/issues/32142
    if ((_b = (_a = httpPoller.operationState) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.resourceLocation) {
        httpPoller.operationState.config.resourceLocation = undefined;
    }
    return simplePoller;
}
/**
 * A helper that standardizes the shape of the result of a long-running operation.
 *
 * smoothing over the differences between `null` and `undefined` sent over the wire in responses.
 */
function updateState(state) {
    var _a, _b, _c, _d, _e;
    var _f;
    if (state.result) {
        state.result = Object.assign(Object.assign({}, state.result), { endTime: (_a = state.result.endTime) !== null && _a !== void 0 ? _a : undefined, startTime: (_b = state.result.startTime) !== null && _b !== void 0 ? _b : undefined, error: (_c = state.result.error) !== null && _c !== void 0 ? _c : undefined, statusDetails: (_d = state.result.statusDetails) !== null && _d !== void 0 ? _d : undefined });
        if ("folderUri" in state.result) {
            (_e = (_f = state.result).folderUri) !== null && _e !== void 0 ? _e : (_f.folderUri = undefined);
        }
    }
}
//# sourceMappingURL=shim.js.map
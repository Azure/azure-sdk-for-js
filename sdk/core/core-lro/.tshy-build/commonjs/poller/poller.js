"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCreatePoller = buildCreatePoller;
const operation_js_1 = require("./operation.js");
const constants_js_1 = require("./constants.js");
const core_util_1 = require("@azure/core-util");
/**
 * Returns a poller factory.
 */
function buildCreatePoller(inputs) {
    const { getOperationLocation, getStatusFromInitialResponse, getStatusFromPollResponse, isOperationError, getResourceLocation, getPollingInterval, getError, resolveOnUnsuccessful, } = inputs;
    return ({ init, poll }, options) => {
        const { processResult, updateState, withOperationLocation: withOperationLocationCallback, intervalInMs = constants_js_1.POLL_INTERVAL_IN_MS, restoreFrom, } = options || {};
        const withOperationLocation = withOperationLocationCallback
            ? (() => {
                let called = false;
                return (operationLocation, isUpdated) => {
                    if (isUpdated)
                        withOperationLocationCallback(operationLocation);
                    else if (!called)
                        withOperationLocationCallback(operationLocation);
                    called = true;
                };
            })()
            : undefined;
        let statePromise;
        let state;
        if (restoreFrom) {
            state = (0, operation_js_1.deserializeState)(restoreFrom);
            statePromise = Promise.resolve(state);
        }
        else {
            statePromise = (0, operation_js_1.initOperation)({
                init,
                processResult,
                getOperationStatus: getStatusFromInitialResponse,
                withOperationLocation,
                setErrorAsResult: !resolveOnUnsuccessful,
            }).then((s) => (state = s));
        }
        let resultPromise;
        const abortController = new AbortController();
        const handlers = new Map();
        const handleProgressEvents = async () => handlers.forEach((h) => h(state));
        const cancelErrMsg = "Operation was canceled";
        let currentPollIntervalInMs = intervalInMs;
        const poller = {
            get operationState() {
                return state;
            },
            get result() {
                return state === null || state === void 0 ? void 0 : state.result;
            },
            get isDone() {
                var _a;
                return ["succeeded", "failed", "canceled"].includes((_a = state === null || state === void 0 ? void 0 : state.status) !== null && _a !== void 0 ? _a : "");
            },
            onProgress: (callback) => {
                const s = Symbol();
                handlers.set(s, callback);
                return () => handlers.delete(s);
            },
            serialize: async () => {
                await statePromise;
                return JSON.stringify({
                    state,
                });
            },
            submitted: async () => {
                await statePromise;
            },
            pollUntilDone: async (pollOptions) => {
                resultPromise !== null && resultPromise !== void 0 ? resultPromise : (resultPromise = (async () => {
                    await statePromise;
                    if (!state) {
                        throw new Error("Poller should be initialized but it is not!");
                    }
                    const { abortSignal: inputAbortSignal } = pollOptions || {};
                    // In the future we can use AbortSignal.any() instead
                    function abortListener() {
                        abortController.abort();
                    }
                    const abortSignal = abortController.signal;
                    if (inputAbortSignal === null || inputAbortSignal === void 0 ? void 0 : inputAbortSignal.aborted) {
                        abortController.abort();
                    }
                    else if (!abortSignal.aborted) {
                        inputAbortSignal === null || inputAbortSignal === void 0 ? void 0 : inputAbortSignal.addEventListener("abort", abortListener, { once: true });
                    }
                    try {
                        if (!poller.isDone) {
                            await poller.poll({ abortSignal });
                            while (!poller.isDone) {
                                await (0, core_util_1.delay)(currentPollIntervalInMs, { abortSignal });
                                await poller.poll({ abortSignal });
                            }
                        }
                    }
                    finally {
                        inputAbortSignal === null || inputAbortSignal === void 0 ? void 0 : inputAbortSignal.removeEventListener("abort", abortListener);
                    }
                    if (resolveOnUnsuccessful) {
                        return poller.result;
                    }
                    else {
                        switch (state.status) {
                            case "succeeded":
                                return poller.result;
                            case "canceled":
                                throw new Error(cancelErrMsg);
                            case "failed":
                                throw state.error;
                            case "notStarted":
                            case "running":
                                throw new Error(`Polling completed without succeeding or failing`);
                        }
                    }
                })().finally(() => {
                    resultPromise = undefined;
                }));
                return resultPromise;
            },
            async poll(pollOptions) {
                await statePromise;
                if (!state) {
                    throw new Error("Poller should be initialized but it is not!");
                }
                if (resolveOnUnsuccessful) {
                    if (poller.isDone)
                        return state;
                }
                else {
                    switch (state.status) {
                        case "succeeded":
                            return state;
                        case "canceled":
                            throw new Error(cancelErrMsg);
                        case "failed":
                            throw state.error;
                    }
                }
                await (0, operation_js_1.pollOperation)({
                    poll,
                    state,
                    getOperationLocation,
                    isOperationError,
                    withOperationLocation,
                    getPollingInterval,
                    getOperationStatus: getStatusFromPollResponse,
                    getResourceLocation,
                    processResult,
                    getError,
                    updateState,
                    options: pollOptions,
                    setDelay: (pollIntervalInMs) => {
                        currentPollIntervalInMs = pollIntervalInMs;
                    },
                    setErrorAsResult: !resolveOnUnsuccessful,
                });
                await handleProgressEvents();
                if (!resolveOnUnsuccessful) {
                    switch (state.status) {
                        case "canceled":
                            throw new Error(cancelErrMsg);
                        case "failed":
                            throw state.error;
                    }
                }
                return state;
            },
            then(onfulfilled, onrejected) {
                return poller.pollUntilDone().then(onfulfilled, onrejected);
            },
            catch(onrejected) {
                return poller.pollUntilDone().catch(onrejected);
            },
            finally(onfinally) {
                return poller.pollUntilDone().finally(onfinally);
            },
            [Symbol.toStringTag]: "Poller",
        };
        return poller;
    };
}
//# sourceMappingURL=poller.js.map
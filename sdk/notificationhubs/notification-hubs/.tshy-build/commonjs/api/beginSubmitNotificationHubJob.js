"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.beginSubmitNotificationHubJob = beginSubmitNotificationHubJob;
const core_util_1 = require("@azure/core-util");
const getNotificationHubJob_js_1 = require("./getNotificationHubJob.js");
const submitNotificationHubJob_js_1 = require("./submitNotificationHubJob.js");
/**
 * Submits a Notification Hub job and creates a poller to poll for results.
 * @param context - The Notification Hubs client.
 * @param notificationHubJob - The Notification Hub import/export job to start.
 * @param options - The operation options.
 * @returns A poller which can be called to poll until completion of the job.
 */
async function beginSubmitNotificationHubJob(context, notificationHubJob, polledOperationOptions = {}) {
    var _a;
    let submittedJob = await (0, submitNotificationHubJob_js_1.submitNotificationHubJob)(context, notificationHubJob, polledOperationOptions);
    const state = {
        status: "notStarted",
    };
    const progressCallbacks = new Map();
    const processProgressCallbacks = async () => progressCallbacks.forEach((h) => h(state));
    let resultPromise;
    const abortController = new AbortController();
    const currentPollIntervalInMs = (_a = polledOperationOptions.updateIntervalInMs) !== null && _a !== void 0 ? _a : 2000;
    const poller = {
        async poll(options) {
            submittedJob = await (0, getNotificationHubJob_js_1.getNotificationHubJob)(context, submittedJob.jobId, options);
            if (submittedJob.status === "Running" || submittedJob.status === "Started") {
                state.status = "running";
            }
            if (submittedJob.status === "Completed") {
                state.status = "succeeded";
                state.result = submittedJob;
            }
            if (submittedJob.status === "Failed") {
                state.status = "failed";
                state.error = new Error(submittedJob.failure);
            }
            await processProgressCallbacks();
            if (state.status === "canceled") {
                throw new Error("Operation was canceled");
            }
            if (state.status === "failed") {
                throw state.error;
            }
            return state;
        },
        pollUntilDone(pollOptions) {
            return (resultPromise !== null && resultPromise !== void 0 ? resultPromise : (resultPromise = (async () => {
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
                switch (state.status) {
                    case "succeeded":
                        return poller.result;
                    case "canceled":
                        throw new Error("Operation was canceled");
                    case "failed":
                        throw state.error;
                    case "notStarted":
                    case "running":
                        throw new Error(`Polling completed without succeeding or failing`);
                }
            })().finally(() => {
                resultPromise = undefined;
            })));
        },
        onProgress(callback) {
            const s = Symbol();
            progressCallbacks.set(s, callback);
            return () => progressCallbacks.delete(s);
        },
        get isDone() {
            return ["succeeded", "failed", "canceled"].includes(state.status);
        },
        get operationState() {
            return state;
        },
        get result() {
            return state.result;
        },
        async serialize() {
            return JSON.stringify({ state });
        },
        async submitted() {
            // No-op
            return;
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
}
//# sourceMappingURL=beginSubmitNotificationHubJob.js.map
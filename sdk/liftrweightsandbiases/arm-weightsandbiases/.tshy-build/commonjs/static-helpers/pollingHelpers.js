"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLongRunningPoller = getLongRunningPoller;
const core_lro_1 = require("@azure/core-lro");
const core_client_1 = require("@azure-rest/core-client");
function getLongRunningPoller(client, processResponseBody, expectedStatuses, options) {
    const { restoreFrom, getInitialResponse } = options;
    if (!restoreFrom && !getInitialResponse) {
        throw new Error("Either restoreFrom or getInitialResponse must be specified");
    }
    let initialResponse = undefined;
    const pollAbortController = new AbortController();
    const poller = {
        sendInitialRequest: async () => {
            if (!getInitialResponse) {
                throw new Error("getInitialResponse is required when initializing a new poller");
            }
            initialResponse = await getInitialResponse();
            return getLroResponse(initialResponse, expectedStatuses);
        },
        sendPollRequest: async (path, pollOptions) => {
            var _a, _b, _c, _d, _e, _f;
            // The poll request would both listen to the user provided abort signal and the poller's own abort signal
            function abortListener() {
                pollAbortController.abort();
            }
            const abortSignal = pollAbortController.signal;
            if ((_a = options.abortSignal) === null || _a === void 0 ? void 0 : _a.aborted) {
                pollAbortController.abort();
            }
            else if ((_b = pollOptions === null || pollOptions === void 0 ? void 0 : pollOptions.abortSignal) === null || _b === void 0 ? void 0 : _b.aborted) {
                pollAbortController.abort();
            }
            else if (!abortSignal.aborted) {
                (_c = options.abortSignal) === null || _c === void 0 ? void 0 : _c.addEventListener("abort", abortListener, {
                    once: true,
                });
                (_d = pollOptions === null || pollOptions === void 0 ? void 0 : pollOptions.abortSignal) === null || _d === void 0 ? void 0 : _d.addEventListener("abort", abortListener, {
                    once: true,
                });
            }
            let response;
            try {
                response = await client.pathUnchecked(path).get({ abortSignal });
            }
            finally {
                (_e = options.abortSignal) === null || _e === void 0 ? void 0 : _e.removeEventListener("abort", abortListener);
                (_f = pollOptions === null || pollOptions === void 0 ? void 0 : pollOptions.abortSignal) === null || _f === void 0 ? void 0 : _f.removeEventListener("abort", abortListener);
            }
            return getLroResponse(response, expectedStatuses);
        },
    };
    return (0, core_lro_1.createHttpPoller)(poller, {
        intervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        resourceLocationConfig: options === null || options === void 0 ? void 0 : options.resourceLocationConfig,
        restoreFrom: options === null || options === void 0 ? void 0 : options.restoreFrom,
        processResult: (result) => {
            return processResponseBody(result);
        },
    });
}
/**
 * Converts a Rest Client response to a response that the LRO implementation understands
 * @param response - a rest client http response
 * @param deserializeFn - deserialize function to convert Rest response to modular output
 * @returns - An LRO response that the LRO implementation understands
 */
function getLroResponse(response, expectedStatuses) {
    if (!expectedStatuses.includes(response.status)) {
        throw (0, core_client_1.createRestError)(response);
    }
    return {
        flatResponse: response,
        rawResponse: Object.assign(Object.assign({}, response), { statusCode: Number.parseInt(response.status), body: response.body }),
    };
}
//# sourceMappingURL=pollingHelpers.js.map
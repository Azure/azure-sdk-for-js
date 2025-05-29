// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getErrorFromResponse, getOperationLocation, getOperationStatus, getResourceLocation, getStatusFromInitialResponse, inferLroMode, isOperationError, parseRetryAfter, } from "./operation.js";
import { buildCreatePoller } from "../poller/poller.js";
import { rewriteUrl } from "./utils.js";
/**
 * Creates a poller that can be used to poll a long-running operation.
 * @param lro - Description of the long-running operation
 * @param options - options to configure the poller
 * @returns an initialized poller
 */
export function createHttpPoller(lro, options) {
    const { resourceLocationConfig, intervalInMs, processResult, restoreFrom, updateState, withOperationLocation, resolveOnUnsuccessful = false, baseUrl, skipFinalGet, } = options || {};
    return buildCreatePoller({
        getStatusFromInitialResponse,
        getStatusFromPollResponse: getOperationStatus,
        isOperationError,
        getOperationLocation,
        getResourceLocation,
        getPollingInterval: parseRetryAfter,
        getError: getErrorFromResponse,
        resolveOnUnsuccessful,
    })({
        init: async () => {
            const response = await lro.sendInitialRequest();
            const config = inferLroMode(response.rawResponse, resourceLocationConfig, skipFinalGet);
            return Object.assign({ response, operationLocation: rewriteUrl({ url: config === null || config === void 0 ? void 0 : config.operationLocation, baseUrl }), resourceLocation: rewriteUrl({ url: config === null || config === void 0 ? void 0 : config.resourceLocation, baseUrl }), initialRequestUrl: config === null || config === void 0 ? void 0 : config.initialRequestUrl, requestMethod: config === null || config === void 0 ? void 0 : config.requestMethod }, ((config === null || config === void 0 ? void 0 : config.mode) ? { metadata: { mode: config.mode } } : {}));
        },
        poll: lro.sendPollRequest,
    }, {
        intervalInMs,
        withOperationLocation,
        restoreFrom,
        updateState,
        processResult: processResult
            ? ({ flatResponse }, state) => processResult(flatResponse, state)
            : ({ flatResponse }) => flatResponse,
    });
}
//# sourceMappingURL=poller.js.map
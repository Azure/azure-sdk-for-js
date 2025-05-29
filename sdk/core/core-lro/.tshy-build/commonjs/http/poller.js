"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpPoller = createHttpPoller;
const operation_js_1 = require("./operation.js");
const poller_js_1 = require("../poller/poller.js");
const utils_js_1 = require("./utils.js");
/**
 * Creates a poller that can be used to poll a long-running operation.
 * @param lro - Description of the long-running operation
 * @param options - options to configure the poller
 * @returns an initialized poller
 */
function createHttpPoller(lro, options) {
    const { resourceLocationConfig, intervalInMs, processResult, restoreFrom, updateState, withOperationLocation, resolveOnUnsuccessful = false, baseUrl, skipFinalGet, } = options || {};
    return (0, poller_js_1.buildCreatePoller)({
        getStatusFromInitialResponse: operation_js_1.getStatusFromInitialResponse,
        getStatusFromPollResponse: operation_js_1.getOperationStatus,
        isOperationError: operation_js_1.isOperationError,
        getOperationLocation: operation_js_1.getOperationLocation,
        getResourceLocation: operation_js_1.getResourceLocation,
        getPollingInterval: operation_js_1.parseRetryAfter,
        getError: operation_js_1.getErrorFromResponse,
        resolveOnUnsuccessful,
    })({
        init: async () => {
            const response = await lro.sendInitialRequest();
            const config = (0, operation_js_1.inferLroMode)(response.rawResponse, resourceLocationConfig, skipFinalGet);
            return Object.assign({ response, operationLocation: (0, utils_js_1.rewriteUrl)({ url: config === null || config === void 0 ? void 0 : config.operationLocation, baseUrl }), resourceLocation: (0, utils_js_1.rewriteUrl)({ url: config === null || config === void 0 ? void 0 : config.resourceLocation, baseUrl }), initialRequestUrl: config === null || config === void 0 ? void 0 : config.initialRequestUrl, requestMethod: config === null || config === void 0 ? void 0 : config.requestMethod }, ((config === null || config === void 0 ? void 0 : config.mode) ? { metadata: { mode: config.mode } } : {}));
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
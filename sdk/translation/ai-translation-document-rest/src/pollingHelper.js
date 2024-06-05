"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLongRunningPoller = void 0;
const core_lro_1 = require("@azure/core-lro");
async function getLongRunningPoller(client, initialResponse, options = {}) {
    var _a;
    const poller = {
        requestMethod: initialResponse.request.method,
        requestPath: initialResponse.request.url,
        sendInitialRequest: async () => {
            // In the case of Rest Clients we are building the LRO poller object from a response that's the reason
            // we are not triggering the initial request here, just extracting the information from the
            // response we were provided.
            return getLroResponse(initialResponse);
        },
        sendPollRequest: async (path) => {
            // This is the callback that is going to be called to poll the service
            // to get the latest status. We use the client provided and the polling path
            // which is an opaque URL provided by caller, the service sends this in one of the following headers: operation-location, azure-asyncoperation or location
            // depending on the lro pattern that the service implements. If non is provided we default to the initial path.
            const response = await client
                .pathUnchecked(path !== null && path !== void 0 ? path : initialResponse.request.url)
                .get();
            const lroResponse = getLroResponse(response);
            lroResponse.rawResponse.headers["x-ms-original-url"] =
                initialResponse.request.url;
            return lroResponse;
        },
    };
    options.resolveOnUnsuccessful = (_a = options.resolveOnUnsuccessful) !== null && _a !== void 0 ? _a : true;
    return (0, core_lro_1.createHttpPoller)(poller, options);
}
exports.getLongRunningPoller = getLongRunningPoller;
/**
 * Converts a Rest Client response to a response that the LRO implementation understands
 * @param response - a rest client http response
 * @returns - An LRO response that the LRO implementation understands
 */
function getLroResponse(response) {
    if (Number.isNaN(response.status)) {
        throw new TypeError(`Status code of the response is not a number. Value: ${response.status}`);
    }
    return {
        flatResponse: response,
        rawResponse: Object.assign(Object.assign({}, response), { statusCode: Number.parseInt(response.status), body: response.body }),
    };
}
//# sourceMappingURL=pollingHelper.js.map
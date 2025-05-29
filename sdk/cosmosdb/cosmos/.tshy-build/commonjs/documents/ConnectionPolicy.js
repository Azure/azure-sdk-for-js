"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConnectionPolicy = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const constants_js_1 = require("../common/constants.js");
const ConnectionMode_js_1 = require("./ConnectionMode.js");
/**
 * @hidden
 */
exports.defaultConnectionPolicy = Object.freeze({
    connectionMode: ConnectionMode_js_1.ConnectionMode.Gateway,
    requestTimeout: 60000,
    enableEndpointDiscovery: true,
    preferredLocations: [],
    retryOptions: {
        maxRetryAttemptCount: constants_js_1.Constants.ThrottledRequestMaxRetryAttemptCount,
        fixedRetryIntervalInMilliseconds: constants_js_1.Constants.ThrottledRequestFixedRetryIntervalInMs,
        maxWaitTimeInSeconds: constants_js_1.Constants.ThrottledRequestMaxWaitTimeInSeconds,
    },
    useMultipleWriteLocations: true,
    endpointRefreshRateInMs: 300000,
    enableBackgroundEndpointRefreshing: true,
});
//# sourceMappingURL=ConnectionPolicy.js.map
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/constants.js";
import { ConnectionMode } from "./ConnectionMode.js";
/**
 * @hidden
 */
export const defaultConnectionPolicy = Object.freeze({
    connectionMode: ConnectionMode.Gateway,
    requestTimeout: 60000,
    enableEndpointDiscovery: true,
    preferredLocations: [],
    retryOptions: {
        maxRetryAttemptCount: Constants.ThrottledRequestMaxRetryAttemptCount,
        fixedRetryIntervalInMilliseconds: Constants.ThrottledRequestFixedRetryIntervalInMs,
        maxWaitTimeInSeconds: Constants.ThrottledRequestMaxWaitTimeInSeconds,
    },
    useMultipleWriteLocations: true,
    endpointRefreshRateInMs: 300000,
    enableBackgroundEndpointRefreshing: true,
});
//# sourceMappingURL=ConnectionPolicy.js.map
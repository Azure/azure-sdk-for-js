"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.imdsRetryPolicy = imdsRetryPolicy;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const core_util_1 = require("@azure/core-util");
// Matches the default retry configuration in expontentialRetryStrategy.ts
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 64;
/**
 * An additional policy that retries on 404 errors. The default retry policy does not retry on
 * 404s, but the IMDS endpoint can return 404s when the token is not yet available. This policy
 * will retry on 404s with an exponential backoff.
 *
 * @param msiRetryConfig - The retry configuration for the MSI credential.
 * @returns - The policy that will retry on 404s.
 */
function imdsRetryPolicy(msiRetryConfig) {
    return (0, core_rest_pipeline_1.retryPolicy)([
        {
            name: "imdsRetryPolicy",
            retry: ({ retryCount, response }) => {
                if ((response === null || response === void 0 ? void 0 : response.status) !== 404) {
                    return { skipStrategy: true };
                }
                return (0, core_util_1.calculateRetryDelay)(retryCount, {
                    retryDelayInMs: msiRetryConfig.startDelayInMs,
                    maxRetryDelayInMs: DEFAULT_CLIENT_MAX_RETRY_INTERVAL,
                });
            },
        },
    ], {
        maxRetries: msiRetryConfig.maxRetries,
    });
}
//# sourceMappingURL=imdsRetryPolicy.js.map
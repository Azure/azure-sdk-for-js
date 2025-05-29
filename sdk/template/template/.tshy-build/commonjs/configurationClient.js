"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationClient = void 0;
const index_js_1 = require("./generated/index.js");
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const core_tracing_1 = require("@azure/core-tracing");
const constants_js_1 = require("./constants.js");
const logger_js_1 = require("./logger.js");
const util_js_1 = require("./util.js");
/**
 * The client class used to interact with the App Configuration service.
 */
class ConfigurationClient {
    /**
     * Creates an instance of a ConfigurationClient.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleCreateClient
     * import { ConfigurationClient } from "@azure/template";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const client = new ConfigurationClient(
     *   process.env.ENDPOINT ?? "<app configuration endpoint>",
     *   new DefaultAzureCredential(),
     * );
     * ```
     * @param endpointUrl - the URL to the App Configuration endpoint
     * @param credential - used to authenticate requests to the service
     * @param options - optional configuration used to send requests to the service
     */
    constructor(endpointUrl, credential, options = {}) {
        // The AAD scope for an API is usually the baseUri + "/.default", but it
        // may be different for your service.
        const authPolicy = (0, core_rest_pipeline_1.bearerTokenAuthenticationPolicy)({
            credential,
            scopes: `${endpointUrl}/.default`,
        });
        const internalClientPipelineOptions = Object.assign(Object.assign(Object.assign({}, options), { deserializationOptions: {
                expectedContentTypes: {
                    json: [
                        "application/vnd.microsoft.appconfig.kvset+json",
                        "application/vnd.microsoft.appconfig.kv+json",
                        "application/vnd.microsoft.appconfig.kvs+json",
                        "application/vnd.microsoft.appconfig.keyset+json",
                        "application/vnd.microsoft.appconfig.revs+json",
                    ],
                },
            } }), {
            loggingOptions: {
                logger: logger_js_1.logger.info,
                // This array contains header names we want to log that are not already
                // included as safe. Unknown/unsafe headers are logged as "<REDACTED>".
                additionalAllowedHeaderNames: ["x-ms-correlation-request-id"],
            },
        });
        this.client = new index_js_1.GeneratedClient(endpointUrl, internalClientPipelineOptions);
        this.client.pipeline.addPolicy(authPolicy);
        this.tracingClient = (0, core_tracing_1.createTracingClient)({
            // The name of the resource provider requests are made against, as described in
            // https://github.com/Azure/azure-sdk/blob/main/docs/tracing/distributed-tracing-conventions.yml#L11-L15
            namespace: "Microsoft.Learn",
            // The package name and version
            packageName: "@azure/template",
            packageVersion: constants_js_1.SDK_VERSION,
        });
    }
    async getConfigurationSetting(keyOrSetting, options = {}) {
        let key;
        let ifNoneMatch;
        return this.tracingClient.withSpan(
        // Span names should take the form "<className>.<methodName>".
        "ConfigurationClient.getConfigurationSetting", options, (updatedOptions) => {
            if (typeof keyOrSetting === "string") {
                key = keyOrSetting;
                if (options.onlyIfChanged) {
                    throw new RangeError("You must pass a ConfigurationSetting instead of a key to perform a conditional fetch.");
                }
            }
            else {
                key = keyOrSetting.key;
                const etag = keyOrSetting.etag;
                if (options.onlyIfChanged) {
                    ifNoneMatch = (0, util_js_1.quoteETag)(etag);
                }
            }
            // You must pass updatedOptions to any calls you make within the callback.
            return this.client.getKeyValue(key, Object.assign(Object.assign({}, updatedOptions), { ifNoneMatch }));
        });
    }
}
exports.ConfigurationClient = ConfigurationClient;
//# sourceMappingURL=configurationClient.js.map
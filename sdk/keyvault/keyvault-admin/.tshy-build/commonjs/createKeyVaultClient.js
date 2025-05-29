"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeyVaultClient = createKeyVaultClient;
const keyVaultClient_js_1 = require("./generated/keyVaultClient.js");
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const keyvault_common_1 = require("@azure/keyvault-common");
const constants_js_1 = require("./constants.js");
const log_js_1 = require("./log.js");
function createKeyVaultClient(vaultUrl, credential, options) {
    var _a, _b;
    const clientOptions = Object.assign(Object.assign({}, options), { apiVersion: options.serviceVersion || constants_js_1.LATEST_API_VERSION, loggingOptions: {
            logger: log_js_1.logger.info,
            additionalAllowedHeaderNames: [
                "x-ms-keyvault-region",
                "x-ms-keyvault-network-info",
                "x-ms-keyvault-service-version",
            ],
        } });
    (_a = clientOptions.userAgentOptions) !== null && _a !== void 0 ? _a : (clientOptions.userAgentOptions = {});
    clientOptions.userAgentOptions.userAgentPrefix = `${(_b = clientOptions.userAgentOptions.userAgentPrefix) !== null && _b !== void 0 ? _b : ""} azsdk-js-keyvault-admin/${constants_js_1.SDK_VERSION}`;
    const client = new keyVaultClient_js_1.KeyVaultClient(vaultUrl, credential, clientOptions);
    client.pipeline.removePolicy({ name: core_rest_pipeline_1.bearerTokenAuthenticationPolicyName });
    client.pipeline.addPolicy((0, keyvault_common_1.keyVaultAuthenticationPolicy)(credential, options));
    // Workaround for: https://github.com/Azure/azure-sdk-for-js/issues/31843
    client.pipeline.addPolicy({
        name: "ContentTypePolicy",
        sendRequest(request, next) {
            var _a;
            const contentType = (_a = request.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "";
            if (contentType.startsWith("application/json")) {
                request.headers.set("Content-Type", "application/json");
            }
            return next(request);
        },
    });
    return client;
}
//# sourceMappingURL=createKeyVaultClient.js.map
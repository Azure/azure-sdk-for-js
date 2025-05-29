"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createClient;
const core_client_1 = require("@azure-rest/core-client");
const core_auth_1 = require("@azure/core-auth");
const logger_js_1 = require("../logger.js");
function createClient(endpoint, credentialOrOptions, options = {}) {
    let credential;
    if ((0, core_auth_1.isTokenCredential)(credentialOrOptions)) {
        credential = credentialOrOptions;
    }
    else {
        options = credentialOrOptions !== null && credentialOrOptions !== void 0 ? credentialOrOptions : {};
    }
    const client = _createClient(endpoint, options);
    (0, core_client_1.addCredentialPipelinePolicy)(client.pipeline, endpoint, { credential, clientOptions: options });
    return client;
}
/**
 * Initialize a new instance of `WidgetServiceContext`
 * @param endpoint - The parameter endpoint
 * @param options - the parameter for all optional parameters
 */
function _createClient(endpoint, options = {}) {
    var _a, _b, _c, _d;
    const baseUrl = (_a = options.baseUrl) !== null && _a !== void 0 ? _a : `${endpoint}`;
    options.apiVersion = (_b = options.apiVersion) !== null && _b !== void 0 ? _b : "1.0.0";
    const userAgentInfo = `azsdk-js-widget-rest/1.0.0-beta.2`;
    const userAgentPrefix = options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
        : `${userAgentInfo}`;
    options = Object.assign(Object.assign({}, options), { userAgentOptions: {
            userAgentPrefix,
        }, loggingOptions: {
            logger: (_d = (_c = options.loggingOptions) === null || _c === void 0 ? void 0 : _c.logger) !== null && _d !== void 0 ? _d : logger_js_1.logger.info,
        } });
    const client = (0, core_client_1.getClient)(baseUrl, options);
    return client;
}
//# sourceMappingURL=widgetServiceClient.js.map
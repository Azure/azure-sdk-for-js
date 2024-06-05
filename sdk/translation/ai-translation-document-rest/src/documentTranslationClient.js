"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const core_client_1 = require("@azure-rest/core-client");
const logger_js_1 = require("./logger.js");
/**
 * Initialize a new instance of `DocumentTranslationClient`
 * @param endpointParam - Supported document Translation endpoint, protocol and hostname, for example: https://{TranslatorResourceName}.cognitiveservices.azure.com/translator.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
function createClient(endpointParam, credentials, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const endpointUrl = (_b = (_a = options.endpoint) !== null && _a !== void 0 ? _a : options.baseUrl) !== null && _b !== void 0 ? _b : `${endpointParam}/translator`;
    options.apiVersion = (_c = options.apiVersion) !== null && _c !== void 0 ? _c : "2024-05-01";
    const userAgentInfo = `azsdk-js-ai-translation-document-rest/1.0.0-beta.1`;
    const userAgentPrefix = options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
        : `${userAgentInfo}`;
    options = Object.assign(Object.assign({}, options), { userAgentOptions: {
            userAgentPrefix,
        }, loggingOptions: {
            logger: (_e = (_d = options.loggingOptions) === null || _d === void 0 ? void 0 : _d.logger) !== null && _e !== void 0 ? _e : logger_js_1.logger.info,
        }, credentials: {
            scopes: (_g = (_f = options.credentials) === null || _f === void 0 ? void 0 : _f.scopes) !== null && _g !== void 0 ? _g : [
                "https://cognitiveservices.azure.com/.default",
            ],
            apiKeyHeaderName: (_j = (_h = options.credentials) === null || _h === void 0 ? void 0 : _h.apiKeyHeaderName) !== null && _j !== void 0 ? _j : "Ocp-Apim-Subscription-Key",
        } });
    const client = (0, core_client_1.getClient)(endpointUrl, credentials, options);
    return client;
}
exports.default = createClient;
//# sourceMappingURL=documentTranslationClient.js.map
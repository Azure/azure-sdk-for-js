"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_client_1 = require("@azure-rest/core-client");
var logger_1 = require("./logger");
/**
 * Initialize a new instance of `AzureHealthInsightsClient`
 * @param endpoint - Supported Cognitive Services endpoints (protocol and hostname, for example: https://westus2.api.cognitive.microsoft.com).
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
function createClient(endpoint, credentials, options) {
    var _a, _b, _c, _d, _e, _f;
    if (options === void 0) { options = {}; }
    var baseUrl = (_a = options.baseUrl) !== null && _a !== void 0 ? _a : "".concat(endpoint, "/health-insights");
    options.apiVersion = (_b = options.apiVersion) !== null && _b !== void 0 ? _b : "2024-04-01";
    var userAgentInfo = "azsdk-js-health-insights-radiologyinsights-rest/1.0.0";
    var userAgentPrefix = options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? "".concat(options.userAgentOptions.userAgentPrefix, " ").concat(userAgentInfo)
        : "".concat(userAgentInfo);
    options = __assign(__assign({}, options), { userAgentOptions: {
            userAgentPrefix: userAgentPrefix,
        }, loggingOptions: {
            logger: (_d = (_c = options.loggingOptions) === null || _c === void 0 ? void 0 : _c.logger) !== null && _d !== void 0 ? _d : logger_1.logger.info,
        }, credentials: {
            apiKeyHeaderName: (_f = (_e = options.credentials) === null || _e === void 0 ? void 0 : _e.apiKeyHeaderName) !== null && _f !== void 0 ? _f : "Ocp-Apim-Subscription-Key",
        } });
    var client = (0, core_client_1.getClient)(baseUrl, credentials, options);
    return client;
}
exports.default = createClient;

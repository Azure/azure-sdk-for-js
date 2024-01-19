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
var core_auth_1 = require("@azure/core-auth");
var communication_common_1 = require("@azure/communication-common");
/**
 * Initialize a new instance of `AzureCommunicationMessagesServiceClient`
 * @param endpoint - The communication resource, for example https://my-resource.communication.azure.com
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
function createClient(arg1, arg2, arg3) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var credentialOrOptions;
    var options;
    var connectionStringOrUrl = arg1;
    // Determine which constructor is being called based on the types of the arguments
    if ((0, core_auth_1.isTokenCredential)(arg2) || (0, communication_common_1.isKeyCredential)(arg2)) {
        credentialOrOptions = arg2;
        options = arg3;
    }
    else {
        options = arg2;
    }
    if (options === undefined) {
        options = {};
    }
    var _j = (0, communication_common_1.parseClientArguments)(connectionStringOrUrl, credentialOrOptions), url = _j.url, credential = _j.credential;
    var baseUrl = (_a = options.baseUrl) !== null && _a !== void 0 ? _a : "".concat(url);
    options.apiVersion = (_b = options.apiVersion) !== null && _b !== void 0 ? _b : "2024-02-01";
    var userAgentInfo = "azsdk-js-communication-messages-rest/1.0.0-beta.2";
    var userAgentPrefix = options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? "".concat(options.userAgentOptions.userAgentPrefix, " ").concat(userAgentInfo)
        : "".concat(userAgentInfo);
    options = __assign(__assign({}, options), { userAgentOptions: {
            userAgentPrefix: userAgentPrefix,
        }, loggingOptions: {
            logger: (_d = (_c = options.loggingOptions) === null || _c === void 0 ? void 0 : _c.logger) !== null && _d !== void 0 ? _d : logger_1.logger.info,
        }, credentials: {
            scopes: (_f = (_e = options.credentials) === null || _e === void 0 ? void 0 : _e.scopes) !== null && _f !== void 0 ? _f : [
                "https://communication.azure.com/.default",
            ],
            apiKeyHeaderName: (_h = (_g = options.credentials) === null || _g === void 0 ? void 0 : _g.apiKeyHeaderName) !== null && _h !== void 0 ? _h : "Authorization",
        } });
    var client = (0, core_client_1.getClient)(baseUrl, options);
    var authPolicy = (0, communication_common_1.createCommunicationAuthPolicy)(credential);
    client.pipeline.addPolicy(authPolicy);
    return client;
}
exports.default = createClient;

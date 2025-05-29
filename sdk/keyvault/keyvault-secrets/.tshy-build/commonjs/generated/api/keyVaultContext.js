"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeyVault = createKeyVault;
const tslib_1 = require("tslib");
const logger_js_1 = require("../logger.js");
const core_client_1 = require("@azure-rest/core-client");
/** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
function createKeyVault(endpointParam, credential, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const endpointUrl = (_b = (_a = options.endpoint) !== null && _a !== void 0 ? _a : options.baseUrl) !== null && _b !== void 0 ? _b : String(endpointParam);
    const prefixFromOptions = (_c = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _c === void 0 ? void 0 : _c.userAgentPrefix;
    const userAgentInfo = `azsdk-js-keyvault-secrets/1.0.0-beta.1`;
    const userAgentPrefix = prefixFromOptions
        ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
        : `azsdk-js-api ${userAgentInfo}`;
    const _j = Object.assign(Object.assign({}, options), { userAgentOptions: { userAgentPrefix }, loggingOptions: { logger: (_e = (_d = options.loggingOptions) === null || _d === void 0 ? void 0 : _d.logger) !== null && _e !== void 0 ? _e : logger_js_1.logger.info }, credentials: {
            scopes: (_g = (_f = options.credentials) === null || _f === void 0 ? void 0 : _f.scopes) !== null && _g !== void 0 ? _g : [
                "https://vault.azure.net/.default",
            ],
        } }), { apiVersion: _ } = _j, updatedOptions = tslib_1.__rest(_j, ["apiVersion"]);
    const clientContext = (0, core_client_1.getClient)(endpointUrl, credential, updatedOptions);
    clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
    const apiVersion = (_h = options.apiVersion) !== null && _h !== void 0 ? _h : "7.6-preview.2";
    clientContext.pipeline.addPolicy({
        name: "ClientApiVersionPolicy",
        sendRequest: (req, next) => {
            // Use the apiVersion defined in request url directly
            // Append one if there is no apiVersion and we have one at client options
            const url = new URL(req.url);
            if (!url.searchParams.get("api-version")) {
                req.url = `${req.url}${Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"}api-version=${apiVersion}`;
            }
            return next(req);
        },
    });
    return Object.assign(Object.assign({}, clientContext), { apiVersion });
}
//# sourceMappingURL=keyVaultContext.js.map
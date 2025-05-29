"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureCliCredential = exports.cliCredentialInternals = void 0;
const tslib_1 = require("tslib");
const tenantIdUtils_js_1 = require("../util/tenantIdUtils.js");
const logging_js_1 = require("../util/logging.js");
const scopeUtils_js_1 = require("../util/scopeUtils.js");
const errors_js_1 = require("../errors.js");
const child_process_1 = tslib_1.__importDefault(require("child_process"));
const tracing_js_1 = require("../util/tracing.js");
const subscriptionUtils_js_1 = require("../util/subscriptionUtils.js");
const logger = (0, logging_js_1.credentialLogger)("AzureCliCredential");
/**
 * Mockable reference to the CLI credential cliCredentialFunctions
 * @internal
 */
exports.cliCredentialInternals = {
    /**
     * @internal
     */
    getSafeWorkingDir() {
        if (process.platform === "win32") {
            let systemRoot = process.env.SystemRoot || process.env["SYSTEMROOT"];
            if (!systemRoot) {
                logger.getToken.warning("The SystemRoot environment variable is not set. This may cause issues when using the Azure CLI credential.");
                systemRoot = "C:\\Windows";
            }
            return systemRoot;
        }
        else {
            return "/bin";
        }
    },
    /**
     * Gets the access token from Azure CLI
     * @param resource - The resource to use when getting the token
     * @internal
     */
    async getAzureCliAccessToken(resource, tenantId, subscription, timeout) {
        let tenantSection = [];
        let subscriptionSection = [];
        if (tenantId) {
            tenantSection = ["--tenant", tenantId];
        }
        if (subscription) {
            // Add quotes around the subscription to handle subscriptions with spaces
            subscriptionSection = ["--subscription", `"${subscription}"`];
        }
        return new Promise((resolve, reject) => {
            try {
                child_process_1.default.execFile("az", [
                    "account",
                    "get-access-token",
                    "--output",
                    "json",
                    "--resource",
                    resource,
                    ...tenantSection,
                    ...subscriptionSection,
                ], { cwd: exports.cliCredentialInternals.getSafeWorkingDir(), shell: true, timeout }, (error, stdout, stderr) => {
                    resolve({ stdout: stdout, stderr: stderr, error });
                });
            }
            catch (err) {
                reject(err);
            }
        });
    },
};
/**
 * This credential will use the currently logged-in user login information
 * via the Azure CLI ('az') commandline tool.
 * To do so, it will read the user access token and expire time
 * with Azure CLI command "az account get-access-token".
 */
class AzureCliCredential {
    /**
     * Creates an instance of the {@link AzureCliCredential}.
     *
     * To use this credential, ensure that you have already logged
     * in via the 'az' tool using the command "az login" from the commandline.
     *
     * @param options - Options, to optionally allow multi-tenant requests.
     */
    constructor(options) {
        if (options === null || options === void 0 ? void 0 : options.tenantId) {
            (0, tenantIdUtils_js_1.checkTenantId)(logger, options === null || options === void 0 ? void 0 : options.tenantId);
            this.tenantId = options === null || options === void 0 ? void 0 : options.tenantId;
        }
        if (options === null || options === void 0 ? void 0 : options.subscription) {
            (0, subscriptionUtils_js_1.checkSubscription)(logger, options === null || options === void 0 ? void 0 : options.subscription);
            this.subscription = options === null || options === void 0 ? void 0 : options.subscription;
        }
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options === null || options === void 0 ? void 0 : options.additionallyAllowedTenants);
        this.timeout = options === null || options === void 0 ? void 0 : options.processTimeoutInMs;
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    async getToken(scopes, options = {}) {
        const tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, options, this.additionallyAllowedTenantIds);
        if (tenantId) {
            (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
        }
        if (this.subscription) {
            (0, subscriptionUtils_js_1.checkSubscription)(logger, this.subscription);
        }
        const scope = typeof scopes === "string" ? scopes : scopes[0];
        logger.getToken.info(`Using the scope ${scope}`);
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async () => {
            var _a, _b, _c, _d;
            try {
                (0, scopeUtils_js_1.ensureValidScopeForDevTimeCreds)(scope, logger);
                const resource = (0, scopeUtils_js_1.getScopeResource)(scope);
                const obj = await exports.cliCredentialInternals.getAzureCliAccessToken(resource, tenantId, this.subscription, this.timeout);
                const specificScope = (_a = obj.stderr) === null || _a === void 0 ? void 0 : _a.match("(.*)az login --scope(.*)");
                const isLoginError = ((_b = obj.stderr) === null || _b === void 0 ? void 0 : _b.match("(.*)az login(.*)")) && !specificScope;
                const isNotInstallError = ((_c = obj.stderr) === null || _c === void 0 ? void 0 : _c.match("az:(.*)not found")) || ((_d = obj.stderr) === null || _d === void 0 ? void 0 : _d.startsWith("'az' is not recognized"));
                if (isNotInstallError) {
                    const error = new errors_js_1.CredentialUnavailableError("Azure CLI could not be found. Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'.");
                    logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
                    throw error;
                }
                if (isLoginError) {
                    const error = new errors_js_1.CredentialUnavailableError("Please run 'az login' from a command prompt to authenticate before using this credential.");
                    logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
                    throw error;
                }
                try {
                    const responseData = obj.stdout;
                    const response = this.parseRawResponse(responseData);
                    logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
                    return response;
                }
                catch (e) {
                    if (obj.stderr) {
                        throw new errors_js_1.CredentialUnavailableError(obj.stderr);
                    }
                    throw e;
                }
            }
            catch (err) {
                const error = err.name === "CredentialUnavailableError"
                    ? err
                    : new errors_js_1.CredentialUnavailableError(err.message || "Unknown error while trying to retrieve the access token");
                logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
                throw error;
            }
        });
    }
    /**
     * Parses the raw JSON response from the Azure CLI into a usable AccessToken object
     *
     * @param rawResponse - The raw JSON response from the Azure CLI
     * @returns An access token with the expiry time parsed from the raw response
     *
     * The expiryTime of the credential's access token, in milliseconds, is calculated as follows:
     *
     * When available, expires_on (introduced in Azure CLI v2.54.0) will be preferred. Otherwise falls back to expiresOn.
     */
    parseRawResponse(rawResponse) {
        const response = JSON.parse(rawResponse);
        const token = response.accessToken;
        // if available, expires_on will be a number representing seconds since epoch.
        // ensure it's a number or NaN
        let expiresOnTimestamp = Number.parseInt(response.expires_on, 10) * 1000;
        if (!isNaN(expiresOnTimestamp)) {
            logger.getToken.info("expires_on is available and is valid, using it");
            return {
                token,
                expiresOnTimestamp,
                tokenType: "Bearer",
            };
        }
        // fallback to the older expiresOn - an RFC3339 date string
        expiresOnTimestamp = new Date(response.expiresOn).getTime();
        // ensure expiresOn is well-formatted
        if (isNaN(expiresOnTimestamp)) {
            throw new errors_js_1.CredentialUnavailableError(`Unexpected response from Azure CLI when getting token. Expected "expiresOn" to be a RFC3339 date string. Got: "${response.expiresOn}"`);
        }
        return {
            token,
            expiresOnTimestamp,
            tokenType: "Bearer",
        };
    }
}
exports.AzureCliCredential = AzureCliCredential;
//# sourceMappingURL=azureCliCredential.js.map
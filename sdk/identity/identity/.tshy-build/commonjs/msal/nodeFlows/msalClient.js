"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMsalConfiguration = generateMsalConfiguration;
exports.createMsalClient = createMsalClient;
const tslib_1 = require("tslib");
const msal = tslib_1.__importStar(require("@azure/msal-node"));
const logging_js_1 = require("../../util/logging.js");
const msalPlugins_js_1 = require("./msalPlugins.js");
const utils_js_1 = require("../utils.js");
const errors_js_1 = require("../../errors.js");
const identityClient_js_1 = require("../../client/identityClient.js");
const regionalAuthority_js_1 = require("../../regionalAuthority.js");
const logger_1 = require("@azure/logger");
const tenantIdUtils_js_1 = require("../../util/tenantIdUtils.js");
/**
 * The default logger used if no logger was passed in by the credential.
 */
const msalLogger = (0, logging_js_1.credentialLogger)("MsalClient");
/**
 * Generates the configuration for MSAL (Microsoft Authentication Library).
 *
 * @param clientId - The client ID of the application.
 * @param  tenantId - The tenant ID of the Azure Active Directory.
 * @param  msalClientOptions - Optional. Additional options for creating the MSAL client.
 * @returns  The MSAL configuration object.
 */
function generateMsalConfiguration(clientId, tenantId, msalClientOptions = {}) {
    var _a, _b, _c;
    const resolvedTenant = (0, tenantIdUtils_js_1.resolveTenantId)((_a = msalClientOptions.logger) !== null && _a !== void 0 ? _a : msalLogger, tenantId, clientId);
    // TODO: move and reuse getIdentityClientAuthorityHost
    const authority = (0, utils_js_1.getAuthority)(resolvedTenant, (0, utils_js_1.getAuthorityHost)(msalClientOptions));
    const httpClient = new identityClient_js_1.IdentityClient(Object.assign(Object.assign({}, msalClientOptions.tokenCredentialOptions), { authorityHost: authority, loggingOptions: msalClientOptions.loggingOptions }));
    const msalConfig = {
        auth: {
            clientId,
            authority,
            knownAuthorities: (0, utils_js_1.getKnownAuthorities)(resolvedTenant, authority, msalClientOptions.disableInstanceDiscovery),
        },
        system: {
            networkClient: httpClient,
            loggerOptions: {
                loggerCallback: (0, utils_js_1.defaultLoggerCallback)((_b = msalClientOptions.logger) !== null && _b !== void 0 ? _b : msalLogger),
                logLevel: (0, utils_js_1.getMSALLogLevel)((0, logger_1.getLogLevel)()),
                piiLoggingEnabled: (_c = msalClientOptions.loggingOptions) === null || _c === void 0 ? void 0 : _c.enableUnsafeSupportLogging,
            },
        },
    };
    return msalConfig;
}
/**
 * Creates an instance of the MSAL (Microsoft Authentication Library) client.
 *
 * @param clientId - The client ID of the application.
 * @param tenantId - The tenant ID of the Azure Active Directory.
 * @param createMsalClientOptions - Optional. Additional options for creating the MSAL client.
 * @returns An instance of the MSAL client.
 *
 * @public
 */
function createMsalClient(clientId, tenantId, createMsalClientOptions = {}) {
    var _a;
    const state = {
        msalConfig: generateMsalConfiguration(clientId, tenantId, createMsalClientOptions),
        cachedAccount: createMsalClientOptions.authenticationRecord
            ? (0, utils_js_1.publicToMsal)(createMsalClientOptions.authenticationRecord)
            : null,
        pluginConfiguration: msalPlugins_js_1.msalPlugins.generatePluginConfiguration(createMsalClientOptions),
        logger: (_a = createMsalClientOptions.logger) !== null && _a !== void 0 ? _a : msalLogger,
    };
    const publicApps = new Map();
    async function getPublicApp(options = {}) {
        const appKey = options.enableCae ? "CAE" : "default";
        let publicClientApp = publicApps.get(appKey);
        if (publicClientApp) {
            state.logger.getToken.info("Existing PublicClientApplication found in cache, returning it.");
            return publicClientApp;
        }
        // Initialize a new app and cache it
        state.logger.getToken.info(`Creating new PublicClientApplication with CAE ${options.enableCae ? "enabled" : "disabled"}.`);
        const cachePlugin = options.enableCae
            ? state.pluginConfiguration.cache.cachePluginCae
            : state.pluginConfiguration.cache.cachePlugin;
        state.msalConfig.auth.clientCapabilities = options.enableCae ? ["cp1"] : undefined;
        publicClientApp = new msal.PublicClientApplication(Object.assign(Object.assign({}, state.msalConfig), { broker: { nativeBrokerPlugin: state.pluginConfiguration.broker.nativeBrokerPlugin }, cache: { cachePlugin: await cachePlugin } }));
        publicApps.set(appKey, publicClientApp);
        return publicClientApp;
    }
    const confidentialApps = new Map();
    async function getConfidentialApp(options = {}) {
        const appKey = options.enableCae ? "CAE" : "default";
        let confidentialClientApp = confidentialApps.get(appKey);
        if (confidentialClientApp) {
            state.logger.getToken.info("Existing ConfidentialClientApplication found in cache, returning it.");
            return confidentialClientApp;
        }
        // Initialize a new app and cache it
        state.logger.getToken.info(`Creating new ConfidentialClientApplication with CAE ${options.enableCae ? "enabled" : "disabled"}.`);
        const cachePlugin = options.enableCae
            ? state.pluginConfiguration.cache.cachePluginCae
            : state.pluginConfiguration.cache.cachePlugin;
        state.msalConfig.auth.clientCapabilities = options.enableCae ? ["cp1"] : undefined;
        confidentialClientApp = new msal.ConfidentialClientApplication(Object.assign(Object.assign({}, state.msalConfig), { broker: { nativeBrokerPlugin: state.pluginConfiguration.broker.nativeBrokerPlugin }, cache: { cachePlugin: await cachePlugin } }));
        confidentialApps.set(appKey, confidentialClientApp);
        return confidentialClientApp;
    }
    async function getTokenSilent(app, scopes, options = {}) {
        if (state.cachedAccount === null) {
            state.logger.getToken.info("No cached account found in local state.");
            throw new errors_js_1.AuthenticationRequiredError({ scopes });
        }
        // Keep track and reuse the claims we received across challenges
        if (options.claims) {
            state.cachedClaims = options.claims;
        }
        const silentRequest = {
            account: state.cachedAccount,
            scopes,
            claims: state.cachedClaims,
        };
        if (state.pluginConfiguration.broker.isEnabled) {
            silentRequest.tokenQueryParameters || (silentRequest.tokenQueryParameters = {});
            if (state.pluginConfiguration.broker.enableMsaPassthrough) {
                silentRequest.tokenQueryParameters["msal_request_type"] = "consumer_passthrough";
            }
        }
        if (options.proofOfPossessionOptions) {
            silentRequest.shrNonce = options.proofOfPossessionOptions.nonce;
            silentRequest.authenticationScheme = "pop";
            silentRequest.resourceRequestMethod = options.proofOfPossessionOptions.resourceRequestMethod;
            silentRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
        }
        state.logger.getToken.info("Attempting to acquire token silently");
        try {
            return await app.acquireTokenSilent(silentRequest);
        }
        catch (err) {
            throw (0, utils_js_1.handleMsalError)(scopes, err, options);
        }
    }
    /**
     * Builds an authority URL for the given request. The authority may be different than the one used when creating the MSAL client
     * if the user is creating cross-tenant requests
     */
    function calculateRequestAuthority(options) {
        if (options === null || options === void 0 ? void 0 : options.tenantId) {
            return (0, utils_js_1.getAuthority)(options.tenantId, (0, utils_js_1.getAuthorityHost)(createMsalClientOptions));
        }
        return state.msalConfig.auth.authority;
    }
    /**
     * Performs silent authentication using MSAL to acquire an access token.
     * If silent authentication fails, falls back to interactive authentication.
     *
     * @param msalApp - The MSAL application instance.
     * @param scopes - The scopes for which to acquire the access token.
     * @param options - The options for acquiring the access token.
     * @param onAuthenticationRequired - A callback function to handle interactive authentication when silent authentication fails.
     * @returns A promise that resolves to an AccessToken object containing the access token and its expiration timestamp.
     */
    async function withSilentAuthentication(msalApp, scopes, options, onAuthenticationRequired) {
        var _a, _b;
        let response = null;
        try {
            response = await getTokenSilent(msalApp, scopes, options);
        }
        catch (e) {
            if (e.name !== "AuthenticationRequiredError") {
                throw e;
            }
            if (options.disableAutomaticAuthentication) {
                throw new errors_js_1.AuthenticationRequiredError({
                    scopes,
                    getTokenOptions: options,
                    message: "Automatic authentication has been disabled. You may call the authentication() method.",
                });
            }
        }
        // Silent authentication failed
        if (response === null) {
            try {
                response = await onAuthenticationRequired();
            }
            catch (err) {
                throw (0, utils_js_1.handleMsalError)(scopes, err, options);
            }
        }
        // At this point we should have a token, process it
        (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
        state.cachedAccount = (_a = response === null || response === void 0 ? void 0 : response.account) !== null && _a !== void 0 ? _a : null;
        state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
        return {
            token: response.accessToken,
            expiresOnTimestamp: response.expiresOn.getTime(),
            refreshAfterTimestamp: (_b = response.refreshOn) === null || _b === void 0 ? void 0 : _b.getTime(),
            tokenType: response.tokenType,
        };
    }
    async function getTokenByClientSecret(scopes, clientSecret, options = {}) {
        var _a;
        state.logger.getToken.info(`Attempting to acquire token using client secret`);
        state.msalConfig.auth.clientSecret = clientSecret;
        const msalApp = await getConfidentialApp(options);
        try {
            const response = await msalApp.acquireTokenByClientCredential({
                scopes,
                authority: calculateRequestAuthority(options),
                azureRegion: (0, regionalAuthority_js_1.calculateRegionalAuthority)(),
                claims: options === null || options === void 0 ? void 0 : options.claims,
            });
            (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
            state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
            return {
                token: response.accessToken,
                expiresOnTimestamp: response.expiresOn.getTime(),
                refreshAfterTimestamp: (_a = response.refreshOn) === null || _a === void 0 ? void 0 : _a.getTime(),
                tokenType: response.tokenType,
            };
        }
        catch (err) {
            throw (0, utils_js_1.handleMsalError)(scopes, err, options);
        }
    }
    async function getTokenByClientAssertion(scopes, clientAssertion, options = {}) {
        var _a;
        state.logger.getToken.info(`Attempting to acquire token using client assertion`);
        state.msalConfig.auth.clientAssertion = clientAssertion;
        const msalApp = await getConfidentialApp(options);
        try {
            const response = await msalApp.acquireTokenByClientCredential({
                scopes,
                authority: calculateRequestAuthority(options),
                azureRegion: (0, regionalAuthority_js_1.calculateRegionalAuthority)(),
                claims: options === null || options === void 0 ? void 0 : options.claims,
                clientAssertion,
            });
            (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
            state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
            return {
                token: response.accessToken,
                expiresOnTimestamp: response.expiresOn.getTime(),
                refreshAfterTimestamp: (_a = response.refreshOn) === null || _a === void 0 ? void 0 : _a.getTime(),
                tokenType: response.tokenType,
            };
        }
        catch (err) {
            throw (0, utils_js_1.handleMsalError)(scopes, err, options);
        }
    }
    async function getTokenByClientCertificate(scopes, certificate, options = {}) {
        var _a;
        state.logger.getToken.info(`Attempting to acquire token using client certificate`);
        state.msalConfig.auth.clientCertificate = certificate;
        const msalApp = await getConfidentialApp(options);
        try {
            const response = await msalApp.acquireTokenByClientCredential({
                scopes,
                authority: calculateRequestAuthority(options),
                azureRegion: (0, regionalAuthority_js_1.calculateRegionalAuthority)(),
                claims: options === null || options === void 0 ? void 0 : options.claims,
            });
            (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
            state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
            return {
                token: response.accessToken,
                expiresOnTimestamp: response.expiresOn.getTime(),
                refreshAfterTimestamp: (_a = response.refreshOn) === null || _a === void 0 ? void 0 : _a.getTime(),
                tokenType: response.tokenType,
            };
        }
        catch (err) {
            throw (0, utils_js_1.handleMsalError)(scopes, err, options);
        }
    }
    async function getTokenByDeviceCode(scopes, deviceCodeCallback, options = {}) {
        state.logger.getToken.info(`Attempting to acquire token using device code`);
        const msalApp = await getPublicApp(options);
        return withSilentAuthentication(msalApp, scopes, options, () => {
            var _a, _b;
            const requestOptions = {
                scopes,
                cancel: (_b = (_a = options === null || options === void 0 ? void 0 : options.abortSignal) === null || _a === void 0 ? void 0 : _a.aborted) !== null && _b !== void 0 ? _b : false,
                deviceCodeCallback,
                authority: calculateRequestAuthority(options),
                claims: options === null || options === void 0 ? void 0 : options.claims,
            };
            const deviceCodeRequest = msalApp.acquireTokenByDeviceCode(requestOptions);
            if (options.abortSignal) {
                options.abortSignal.addEventListener("abort", () => {
                    requestOptions.cancel = true;
                });
            }
            return deviceCodeRequest;
        });
    }
    async function getTokenByUsernamePassword(scopes, username, password, options = {}) {
        state.logger.getToken.info(`Attempting to acquire token using username and password`);
        const msalApp = await getPublicApp(options);
        return withSilentAuthentication(msalApp, scopes, options, () => {
            const requestOptions = {
                scopes,
                username,
                password,
                authority: calculateRequestAuthority(options),
                claims: options === null || options === void 0 ? void 0 : options.claims,
            };
            return msalApp.acquireTokenByUsernamePassword(requestOptions);
        });
    }
    function getActiveAccount() {
        if (!state.cachedAccount) {
            return undefined;
        }
        return (0, utils_js_1.msalToPublic)(clientId, state.cachedAccount);
    }
    async function getTokenByAuthorizationCode(scopes, redirectUri, authorizationCode, clientSecret, options = {}) {
        state.logger.getToken.info(`Attempting to acquire token using authorization code`);
        let msalApp;
        if (clientSecret) {
            // If a client secret is provided, we need to use a confidential client application
            // See https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow#request-an-access-token-with-a-client_secret
            state.msalConfig.auth.clientSecret = clientSecret;
            msalApp = await getConfidentialApp(options);
        }
        else {
            msalApp = await getPublicApp(options);
        }
        return withSilentAuthentication(msalApp, scopes, options, () => {
            return msalApp.acquireTokenByCode({
                scopes,
                redirectUri,
                code: authorizationCode,
                authority: calculateRequestAuthority(options),
                claims: options === null || options === void 0 ? void 0 : options.claims,
            });
        });
    }
    async function getTokenOnBehalfOf(scopes, userAssertionToken, clientCredentials, options = {}) {
        var _a;
        msalLogger.getToken.info(`Attempting to acquire token on behalf of another user`);
        if (typeof clientCredentials === "string") {
            // Client secret
            msalLogger.getToken.info(`Using client secret for on behalf of flow`);
            state.msalConfig.auth.clientSecret = clientCredentials;
        }
        else if (typeof clientCredentials === "function") {
            // Client Assertion
            msalLogger.getToken.info(`Using client assertion callback for on behalf of flow`);
            state.msalConfig.auth.clientAssertion = clientCredentials;
        }
        else {
            // Client certificate
            msalLogger.getToken.info(`Using client certificate for on behalf of flow`);
            state.msalConfig.auth.clientCertificate = clientCredentials;
        }
        const msalApp = await getConfidentialApp(options);
        try {
            const response = await msalApp.acquireTokenOnBehalfOf({
                scopes,
                authority: calculateRequestAuthority(options),
                claims: options.claims,
                oboAssertion: userAssertionToken,
            });
            (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
            msalLogger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
            return {
                token: response.accessToken,
                expiresOnTimestamp: response.expiresOn.getTime(),
                refreshAfterTimestamp: (_a = response.refreshOn) === null || _a === void 0 ? void 0 : _a.getTime(),
                tokenType: response.tokenType,
            };
        }
        catch (err) {
            throw (0, utils_js_1.handleMsalError)(scopes, err, options);
        }
    }
    async function getTokenByInteractiveRequest(scopes, options = {}) {
        msalLogger.getToken.info(`Attempting to acquire token interactively`);
        const app = await getPublicApp(options);
        /**
         * A helper function that supports brokered authentication through the MSAL's public application.
         *
         * When options.useDefaultBrokerAccount is true, the method will attempt to authenticate using the default broker account.
         * If the default broker account is not available, the method will fall back to interactive authentication.
         */
        async function getBrokeredToken(useDefaultBrokerAccount) {
            var _a;
            msalLogger.verbose("Authentication will resume through the broker");
            const interactiveRequest = createBaseInteractiveRequest();
            if (state.pluginConfiguration.broker.parentWindowHandle) {
                interactiveRequest.windowHandle = Buffer.from(state.pluginConfiguration.broker.parentWindowHandle);
            }
            else {
                // this is a bug, as the pluginConfiguration handler should validate this case.
                msalLogger.warning("Parent window handle is not specified for the broker. This may cause unexpected behavior. Please provide the parentWindowHandle.");
            }
            if (state.pluginConfiguration.broker.enableMsaPassthrough) {
                ((_a = interactiveRequest.tokenQueryParameters) !== null && _a !== void 0 ? _a : (interactiveRequest.tokenQueryParameters = {}))["msal_request_type"] =
                    "consumer_passthrough";
            }
            if (useDefaultBrokerAccount) {
                interactiveRequest.prompt = "none";
                msalLogger.verbose("Attempting broker authentication using the default broker account");
            }
            else {
                msalLogger.verbose("Attempting broker authentication without the default broker account");
            }
            if (options.proofOfPossessionOptions) {
                interactiveRequest.shrNonce = options.proofOfPossessionOptions.nonce;
                interactiveRequest.authenticationScheme = "pop";
                interactiveRequest.resourceRequestMethod =
                    options.proofOfPossessionOptions.resourceRequestMethod;
                interactiveRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
            }
            try {
                return await app.acquireTokenInteractive(interactiveRequest);
            }
            catch (e) {
                msalLogger.verbose(`Failed to authenticate through the broker: ${e.message}`);
                // If we tried to use the default broker account and failed, fall back to interactive authentication
                if (useDefaultBrokerAccount) {
                    return getBrokeredToken(/* useDefaultBrokerAccount: */ false);
                }
                else {
                    throw e;
                }
            }
        }
        function createBaseInteractiveRequest() {
            var _a, _b;
            return {
                openBrowser: async (url) => {
                    const open = await import("open");
                    await open.default(url, { wait: true, newInstance: true });
                },
                scopes,
                authority: calculateRequestAuthority(options),
                claims: options === null || options === void 0 ? void 0 : options.claims,
                loginHint: options === null || options === void 0 ? void 0 : options.loginHint,
                errorTemplate: (_a = options === null || options === void 0 ? void 0 : options.browserCustomizationOptions) === null || _a === void 0 ? void 0 : _a.errorMessage,
                successTemplate: (_b = options === null || options === void 0 ? void 0 : options.browserCustomizationOptions) === null || _b === void 0 ? void 0 : _b.successMessage,
                prompt: (options === null || options === void 0 ? void 0 : options.loginHint) ? "login" : "select_account",
            };
        }
        return withSilentAuthentication(app, scopes, options, async () => {
            var _a;
            const interactiveRequest = createBaseInteractiveRequest();
            if (state.pluginConfiguration.broker.isEnabled) {
                return getBrokeredToken((_a = state.pluginConfiguration.broker.useDefaultBrokerAccount) !== null && _a !== void 0 ? _a : false);
            }
            if (options.proofOfPossessionOptions) {
                interactiveRequest.shrNonce = options.proofOfPossessionOptions.nonce;
                interactiveRequest.authenticationScheme = "pop";
                interactiveRequest.resourceRequestMethod =
                    options.proofOfPossessionOptions.resourceRequestMethod;
                interactiveRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
            }
            return app.acquireTokenInteractive(interactiveRequest);
        });
    }
    return {
        getActiveAccount,
        getTokenByClientSecret,
        getTokenByClientAssertion,
        getTokenByClientCertificate,
        getTokenByDeviceCode,
        getTokenByUsernamePassword,
        getTokenByAuthorizationCode,
        getTokenOnBehalfOf,
        getTokenByInteractiveRequest,
    };
}
//# sourceMappingURL=msalClient.js.map
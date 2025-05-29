"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMsalBrowserClient = createMsalBrowserClient;
const tslib_1 = require("tslib");
const msalBrowser = tslib_1.__importStar(require("@azure/msal-browser"));
const utils_js_1 = require("../utils.js");
const errors_js_1 = require("../../errors.js");
const logger_1 = require("@azure/logger");
const logging_js_1 = require("../../util/logging.js");
const tenantIdUtils_js_1 = require("../../util/tenantIdUtils.js");
const constants_js_1 = require("../../constants.js");
// We keep a copy of the redirect hash.
// Check if self and location object is defined.
const isLocationDefined = typeof self !== "undefined" && self.location !== undefined;
/**
 * Generates a MSAL configuration that generally works for browsers
 * @internal
 */
function generateMsalBrowserConfiguration(options) {
    var _a;
    const tenantId = options.tenantId || constants_js_1.DefaultTenantId;
    const authority = (0, utils_js_1.getAuthority)(tenantId, options.authorityHost);
    return {
        auth: {
            clientId: options.clientId,
            authority,
            knownAuthorities: (0, utils_js_1.getKnownAuthorities)(tenantId, authority, options.disableInstanceDiscovery),
            // If the users picked redirect as their login style,
            // but they didn't provide a redirectUri,
            // we can try to use the current page we're in as a default value.
            redirectUri: options.redirectUri || (isLocationDefined ? self.location.origin : undefined),
        },
        cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: true, // Set to true to improve the experience on IE11 and Edge.
        },
        system: {
            loggerOptions: {
                loggerCallback: (0, utils_js_1.defaultLoggerCallback)(options.logger, "Browser"),
                logLevel: (0, utils_js_1.getMSALLogLevel)((0, logger_1.getLogLevel)()),
                piiLoggingEnabled: (_a = options.loggingOptions) === null || _a === void 0 ? void 0 : _a.enableUnsafeSupportLogging,
            },
        },
    };
}
// We keep a copy of the redirect hash.
const redirectHash = isLocationDefined ? self.location.hash : undefined;
/**
 * Uses MSAL Browser 2.X for browser authentication,
 * which uses the [Auth Code Flow](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow).
 * @internal
 */
function createMsalBrowserClient(options) {
    var _a;
    const loginStyle = options.loginStyle;
    if (!options.clientId) {
        throw new errors_js_1.CredentialUnavailableError("A client ID is required in browsers");
    }
    const clientId = options.clientId;
    const logger = options.logger;
    const tenantId = (0, tenantIdUtils_js_1.resolveTenantId)(logger, options.tenantId, options.clientId);
    const additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)((_a = options === null || options === void 0 ? void 0 : options.tokenCredentialOptions) === null || _a === void 0 ? void 0 : _a.additionallyAllowedTenants);
    const authorityHost = options.authorityHost;
    const msalConfig = generateMsalBrowserConfiguration(options);
    const disableAutomaticAuthentication = options.disableAutomaticAuthentication;
    const loginHint = options.loginHint;
    let account;
    if (options.authenticationRecord) {
        account = Object.assign(Object.assign({}, options.authenticationRecord), { tenantId });
    }
    // This variable should only be used through calling `getApp` function
    let app;
    /**
     * Return the MSAL account if not set yet
     * @returns MSAL application
     */
    async function getApp() {
        if (!app) {
            // Prepare the MSAL application
            app = await msalBrowser.PublicClientApplication.createPublicClientApplication(msalConfig);
            // setting the account right after the app is created.
            if (account) {
                app.setActiveAccount((0, utils_js_1.publicToMsal)(account));
            }
        }
        return app;
    }
    /**
     * Loads the account based on the result of the authentication.
     * If no result was received, tries to load the account from the cache.
     * @param result - Result object received from MSAL.
     */
    async function handleBrowserResult(result) {
        try {
            const msalApp = await getApp();
            if (result && result.account) {
                logger.info(`MSAL Browser V2 authentication successful.`);
                msalApp.setActiveAccount(result.account);
                return (0, utils_js_1.msalToPublic)(clientId, result.account);
            }
            // If by this point we happen to have an active account, we should stop trying to parse this.
            const activeAccount = msalApp.getActiveAccount();
            if (activeAccount) {
                return (0, utils_js_1.msalToPublic)(clientId, activeAccount);
            }
            // If we don't have an active account, we try to activate it from all the already loaded accounts.
            const allAccounts = app.getAllAccounts();
            if (allAccounts.length > 1) {
                // If there's more than one account in memory, we force the user to authenticate again.
                // At this point we can't identify which account should this credential work with,
                // since at this point the user won't have provided enough information.
                // We log a message in case that helps.
                logger.info(`More than one account was found authenticated for this Client ID and Tenant ID.
  However, no "authenticationRecord" has been provided for this credential,
  therefore we're unable to pick between these accounts.
  A new login attempt will be requested, to ensure the correct account is picked.
  To work with multiple accounts for the same Client ID and Tenant ID, please provide an "authenticationRecord" when initializing "InteractiveBrowserCredential".`);
                // To safely trigger a new login, we're also ensuring the local cache is cleared up for this MSAL object.
                // However, we want to avoid kicking the user out of their authentication on the Azure side.
                // We do this by calling to logout while specifying a `onRedirectNavigate` that returns false.
                await msalApp.logout({
                    onRedirectNavigate: () => false,
                });
                return;
            }
            // If there's only one account for this MSAL object, we can safely activate it.
            if (allAccounts.length === 1) {
                const msalAccount = allAccounts[0];
                msalApp.setActiveAccount(msalAccount);
                return (0, utils_js_1.msalToPublic)(clientId, msalAccount);
            }
            logger.info(`No accounts were found through MSAL.`);
        }
        catch (e) {
            logger.info(`Failed to acquire token through MSAL. ${e.message}`);
        }
        return;
    }
    /**
     * Handles the MSAL authentication result.
     * If the result has an account, we update the local account reference.
     * If the token received is invalid, an error will be thrown depending on what's missing.
     */
    function handleResult(scopes, result, getTokenOptions) {
        var _a;
        if (result === null || result === void 0 ? void 0 : result.account) {
            account = (0, utils_js_1.msalToPublic)(clientId, result.account);
        }
        (0, utils_js_1.ensureValidMsalToken)(scopes, result, getTokenOptions);
        logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
        return {
            token: result.accessToken,
            expiresOnTimestamp: result.expiresOn.getTime(),
            refreshAfterTimestamp: (_a = result.refreshOn) === null || _a === void 0 ? void 0 : _a.getTime(),
            tokenType: "Bearer",
        };
    }
    /**
     * Uses MSAL to handle the redirect.
     */
    async function handleRedirect() {
        const msalApp = await getApp();
        return handleBrowserResult((await msalApp.handleRedirectPromise(redirectHash)) || undefined);
    }
    /**
     * Uses MSAL to retrieve the active account.
     */
    async function getActiveAccount() {
        const msalApp = await getApp();
        const activeAccount = msalApp.getActiveAccount();
        if (!activeAccount) {
            return;
        }
        return (0, utils_js_1.msalToPublic)(clientId, activeAccount);
    }
    /**
     * Uses MSAL to trigger a redirect or a popup login.
     */
    async function login(scopes = []) {
        const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
        const loginRequest = {
            scopes: arrayScopes,
            loginHint: loginHint,
        };
        const msalApp = await getApp();
        switch (loginStyle) {
            case "redirect": {
                await app.loginRedirect(loginRequest);
                return;
            }
            case "popup":
                return handleBrowserResult(await msalApp.loginPopup(loginRequest));
        }
    }
    /**
     * Tries to retrieve the token silently using MSAL.
     */
    async function getTokenSilent(scopes, getTokenOptions) {
        const activeAccount = await getActiveAccount();
        if (!activeAccount) {
            throw new errors_js_1.AuthenticationRequiredError({
                scopes,
                getTokenOptions,
                message: "Silent authentication failed. We couldn't retrieve an active account from the cache.",
            });
        }
        const parameters = {
            authority: (getTokenOptions === null || getTokenOptions === void 0 ? void 0 : getTokenOptions.authority) || msalConfig.auth.authority,
            correlationId: getTokenOptions === null || getTokenOptions === void 0 ? void 0 : getTokenOptions.correlationId,
            claims: getTokenOptions === null || getTokenOptions === void 0 ? void 0 : getTokenOptions.claims,
            account: (0, utils_js_1.publicToMsal)(activeAccount),
            forceRefresh: false,
            scopes,
        };
        try {
            logger.info("Attempting to acquire token silently");
            const msalApp = await getApp();
            const response = await msalApp.acquireTokenSilent(parameters);
            return handleResult(scopes, response);
        }
        catch (err) {
            throw (0, utils_js_1.handleMsalError)(scopes, err, options);
        }
    }
    /**
     * Attempts to retrieve the token in the browser through interactive methods.
     */
    async function getTokenInteractive(scopes, getTokenOptions) {
        const activeAccount = await getActiveAccount();
        if (!activeAccount) {
            throw new errors_js_1.AuthenticationRequiredError({
                scopes,
                getTokenOptions,
                message: "Silent authentication failed. We couldn't retrieve an active account from the cache.",
            });
        }
        const parameters = {
            authority: (getTokenOptions === null || getTokenOptions === void 0 ? void 0 : getTokenOptions.authority) || msalConfig.auth.authority,
            correlationId: getTokenOptions === null || getTokenOptions === void 0 ? void 0 : getTokenOptions.correlationId,
            claims: getTokenOptions === null || getTokenOptions === void 0 ? void 0 : getTokenOptions.claims,
            account: (0, utils_js_1.publicToMsal)(activeAccount),
            loginHint: loginHint,
            scopes,
        };
        const msalApp = await getApp();
        switch (loginStyle) {
            case "redirect":
                // This will go out of the page.
                // Once the InteractiveBrowserCredential is initialized again,
                // we'll load the MSAL account in the constructor.
                await msalApp.acquireTokenRedirect(parameters);
                return { token: "", expiresOnTimestamp: 0, tokenType: "Bearer" };
            case "popup":
                return handleResult(scopes, await app.acquireTokenPopup(parameters));
        }
    }
    /**
     * Attempts to get token through the silent flow.
     * If failed, get token through interactive method with `doGetToken` method.
     */
    async function getToken(scopes, getTokenOptions = {}) {
        const getTokenTenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(tenantId, getTokenOptions, additionallyAllowedTenantIds) ||
            tenantId;
        if (!getTokenOptions.authority) {
            getTokenOptions.authority = (0, utils_js_1.getAuthority)(getTokenTenantId, authorityHost);
        }
        // We ensure that redirection is handled at this point.
        await handleRedirect();
        if (!(await getActiveAccount()) && !disableAutomaticAuthentication) {
            await login(scopes);
        }
        // Attempts to get the token silently; else, falls back to interactive method.
        try {
            return await getTokenSilent(scopes, getTokenOptions);
        }
        catch (err) {
            if (err.name !== "AuthenticationRequiredError") {
                throw err;
            }
            if (getTokenOptions === null || getTokenOptions === void 0 ? void 0 : getTokenOptions.disableAutomaticAuthentication) {
                throw new errors_js_1.AuthenticationRequiredError({
                    scopes,
                    getTokenOptions,
                    message: "Automatic authentication has been disabled. You may call the authenticate() method.",
                });
            }
            logger.info(`Silent authentication failed, falling back to interactive method ${loginStyle}`);
            return getTokenInteractive(scopes, getTokenOptions);
        }
    }
    return {
        getActiveAccount,
        getToken,
    };
}
//# sourceMappingURL=msalBrowserCommon.js.map
"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualStudioCodeCredential = exports.vsCodeCredentialControl = void 0;
exports.getPropertyFromVSCode = getPropertyFromVSCode;
const tslib_1 = require("tslib");
const logging_js_1 = require("../util/logging.js");
const tenantIdUtils_js_1 = require("../util/tenantIdUtils.js");
const constants_js_1 = require("../constants.js");
const errors_js_1 = require("../errors.js");
const identityClient_js_1 = require("../client/identityClient.js");
const tenantIdUtils_js_2 = require("../util/tenantIdUtils.js");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_os_1 = tslib_1.__importDefault(require("node:os"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const CommonTenantId = "common";
const AzureAccountClientId = "aebc6443-996d-45c2-90f0-388ff96faa56"; // VSC: 'aebc6443-996d-45c2-90f0-388ff96faa56'
const logger = (0, logging_js_1.credentialLogger)("VisualStudioCodeCredential");
let findCredentials = undefined;
exports.vsCodeCredentialControl = {
    setVsCodeCredentialFinder(finder) {
        findCredentials = finder;
    },
};
// Map of unsupported Tenant IDs and the errors we will be throwing.
const unsupportedTenantIds = {
    adfs: "The VisualStudioCodeCredential does not support authentication with ADFS tenants.",
};
function checkUnsupportedTenant(tenantId) {
    // If the Tenant ID isn't supported, we throw.
    const unsupportedTenantError = unsupportedTenantIds[tenantId];
    if (unsupportedTenantError) {
        throw new errors_js_1.CredentialUnavailableError(unsupportedTenantError);
    }
}
const mapVSCodeAuthorityHosts = {
    AzureCloud: constants_js_1.AzureAuthorityHosts.AzurePublicCloud,
    AzureChina: constants_js_1.AzureAuthorityHosts.AzureChina,
    AzureGermanCloud: constants_js_1.AzureAuthorityHosts.AzureGermany,
    AzureUSGovernment: constants_js_1.AzureAuthorityHosts.AzureGovernment,
};
/**
 * Attempts to load a specific property from the VSCode configurations of the current OS.
 * If it fails at any point, returns undefined.
 */
function getPropertyFromVSCode(property) {
    const settingsPath = ["User", "settings.json"];
    // Eventually we can add more folders for more versions of VSCode.
    const vsCodeFolder = "Code";
    const homedir = node_os_1.default.homedir();
    function loadProperty(...pathSegments) {
        const fullPath = node_path_1.default.join(...pathSegments, vsCodeFolder, ...settingsPath);
        const settings = JSON.parse(node_fs_1.default.readFileSync(fullPath, { encoding: "utf8" }));
        return settings[property];
    }
    try {
        let appData;
        switch (process.platform) {
            case "win32":
                appData = process.env.APPDATA;
                return appData ? loadProperty(appData) : undefined;
            case "darwin":
                return loadProperty(homedir, "Library", "Application Support");
            case "linux":
                return loadProperty(homedir, ".config");
            default:
                return;
        }
    }
    catch (e) {
        logger.info(`Failed to load the Visual Studio Code configuration file. Error: ${e.message}`);
        return;
    }
}
/**
 * Connects to Azure using the credential provided by the VSCode extension 'Azure Account'.
 * Once the user has logged in via the extension, this credential can share the same refresh token
 * that is cached by the extension.
 *
 * It's a [known issue](https://github.com/Azure/azure-sdk-for-js/issues/20500) that this credential doesn't
 * work with [Azure Account extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account)
 * versions newer than **0.9.11**. A long-term fix to this problem is in progress. In the meantime, consider
 * authenticating with {@link AzureCliCredential}.
 *
 * @deprecated This credential is deprecated because the VS Code Azure Account extension on which this credential
 * relies has been deprecated. Users should use other dev-time credentials, such as {@link AzureCliCredential},
 * {@link AzureDeveloperCliCredential}, or {@link AzurePowerShellCredential} for their
 * local development needs. See Azure Account extension deprecation notice [here](https://github.com/microsoft/vscode-azure-account/issues/964).
 *
 */
class VisualStudioCodeCredential {
    /**
     * Creates an instance of VisualStudioCodeCredential to use for automatically authenticating via VSCode.
     *
     * **Note**: `VisualStudioCodeCredential` is provided by a plugin package:
     * `@azure/identity-vscode`. If this package is not installed and registered
     * using the plugin API (`useIdentityPlugin`), then authentication using
     * `VisualStudioCodeCredential` will not be available.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(options) {
        // We want to make sure we use the one assigned by the user on the VSCode settings.
        // Or just `AzureCloud` by default.
        this.cloudName = (getPropertyFromVSCode("azure.cloud") || "AzureCloud");
        // Picking an authority host based on the cloud name.
        const authorityHost = mapVSCodeAuthorityHosts[this.cloudName];
        this.identityClient = new identityClient_js_1.IdentityClient(Object.assign({ authorityHost }, options));
        if (options && options.tenantId) {
            (0, tenantIdUtils_js_2.checkTenantId)(logger, options.tenantId);
            this.tenantId = options.tenantId;
        }
        else {
            this.tenantId = CommonTenantId;
        }
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options === null || options === void 0 ? void 0 : options.additionallyAllowedTenants);
        checkUnsupportedTenant(this.tenantId);
    }
    /**
     * Runs preparations for any further getToken request.
     */
    async prepare() {
        // Attempts to load the tenant from the VSCode configuration file.
        const settingsTenant = getPropertyFromVSCode("azure.tenant");
        if (settingsTenant) {
            this.tenantId = settingsTenant;
        }
        checkUnsupportedTenant(this.tenantId);
    }
    /**
     * Runs preparations for any further getToken, but only once.
     */
    prepareOnce() {
        if (!this.preparePromise) {
            this.preparePromise = this.prepare();
        }
        return this.preparePromise;
    }
    /**
     * Returns the token found by searching VSCode's authentication cache or
     * returns null if no token could be found.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                `TokenCredential` implementation might make.
     */
    async getToken(scopes, options) {
        var _a, _b;
        await this.prepareOnce();
        const tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, options, this.additionallyAllowedTenantIds, logger) || this.tenantId;
        if (findCredentials === undefined) {
            throw new errors_js_1.CredentialUnavailableError([
                "No implementation of `VisualStudioCodeCredential` is available.",
                "You must install the identity-vscode plugin package (`npm install --save-dev @azure/identity-vscode`)",
                "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
                "`useIdentityPlugin(vsCodePlugin)` before creating a `VisualStudioCodeCredential`.",
                "To troubleshoot, visit https://aka.ms/azsdk/js/identity/vscodecredential/troubleshoot.",
            ].join(" "));
        }
        let scopeString = typeof scopes === "string" ? scopes : scopes.join(" ");
        // Check to make sure the scope we get back is a valid scope
        if (!scopeString.match(/^[0-9a-zA-Z-.:/]+$/)) {
            const error = new Error("Invalid scope was specified by the user or calling client");
            logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
            throw error;
        }
        if (scopeString.indexOf("offline_access") < 0) {
            scopeString += " offline_access";
        }
        // findCredentials returns an array similar to:
        // [
        //   {
        //     account: "",
        //     password: "",
        //   },
        //   /* ... */
        // ]
        const credentials = await findCredentials();
        // If we can't find the credential based on the name, we'll pick the first one available.
        const { password: refreshToken } = (_b = (_a = credentials.find(({ account }) => account === this.cloudName)) !== null && _a !== void 0 ? _a : credentials[0]) !== null && _b !== void 0 ? _b : {};
        if (refreshToken) {
            const tokenResponse = await this.identityClient.refreshAccessToken(tenantId, AzureAccountClientId, scopeString, refreshToken, undefined);
            if (tokenResponse) {
                logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
                return tokenResponse.accessToken;
            }
            else {
                const error = new errors_js_1.CredentialUnavailableError("Could not retrieve the token associated with Visual Studio Code. Have you connected using the 'Azure Account' extension recently? To troubleshoot, visit https://aka.ms/azsdk/js/identity/vscodecredential/troubleshoot.");
                logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
                throw error;
            }
        }
        else {
            const error = new errors_js_1.CredentialUnavailableError("Could not retrieve the token associated with Visual Studio Code. Did you connect using the 'Azure Account' extension? To troubleshoot, visit https://aka.ms/azsdk/js/identity/vscodecredential/troubleshoot.");
            logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
            throw error;
        }
    }
}
exports.VisualStudioCodeCredential = VisualStudioCodeCredential;
//# sourceMappingURL=visualStudioCodeCredential.js.map
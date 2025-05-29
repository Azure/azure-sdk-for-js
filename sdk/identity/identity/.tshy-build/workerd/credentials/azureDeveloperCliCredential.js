// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { credentialLogger, formatError, formatSuccess } from "../util/logging.js";
import { CredentialUnavailableError } from "../errors.js";
import child_process from "child_process";
import { checkTenantId, processMultiTenantRequest, resolveAdditionallyAllowedTenantIds, } from "../util/tenantIdUtils.js";
import { tracingClient } from "../util/tracing.js";
import { ensureValidScopeForDevTimeCreds } from "../util/scopeUtils.js";
const logger = credentialLogger("AzureDeveloperCliCredential");
/**
 * Mockable reference to the Developer CLI credential cliCredentialFunctions
 * @internal
 */
export const developerCliCredentialInternals = {
    /**
     * @internal
     */
    getSafeWorkingDir() {
        if (process.platform === "win32") {
            let systemRoot = process.env.SystemRoot || process.env["SYSTEMROOT"];
            if (!systemRoot) {
                logger.getToken.warning("The SystemRoot environment variable is not set. This may cause issues when using the Azure Developer CLI credential.");
                systemRoot = "C:\\Windows";
            }
            return systemRoot;
        }
        else {
            return "/bin";
        }
    },
    /**
     * Gets the access token from Azure Developer CLI
     * @param scopes - The scopes to use when getting the token
     * @internal
     */
    async getAzdAccessToken(scopes, tenantId, timeout) {
        let tenantSection = [];
        if (tenantId) {
            tenantSection = ["--tenant-id", tenantId];
        }
        return new Promise((resolve, reject) => {
            try {
                child_process.execFile("azd", [
                    "auth",
                    "token",
                    "--output",
                    "json",
                    ...scopes.reduce((previous, current) => previous.concat("--scope", current), []),
                    ...tenantSection,
                ], {
                    cwd: developerCliCredentialInternals.getSafeWorkingDir(),
                    timeout,
                }, (error, stdout, stderr) => {
                    resolve({ stdout, stderr, error });
                });
            }
            catch (err) {
                reject(err);
            }
        });
    },
};
/**
 * Azure Developer CLI is a command-line interface tool that allows developers to create, manage, and deploy
 * resources in Azure. It's built on top of the Azure CLI and provides additional functionality specific
 * to Azure developers. It allows users to authenticate as a user and/or a service principal against
 * <a href="https://learn.microsoft.com/entra/fundamentals/">Microsoft Entra ID</a>. The
 * AzureDeveloperCliCredential authenticates in a development environment and acquires a token on behalf of
 * the logged-in user or service principal in the Azure Developer CLI. It acts as the Azure Developer CLI logged in user or
 * service principal and executes an Azure CLI command underneath to authenticate the application against
 * Microsoft Entra ID.
 *
 * <h2> Configure AzureDeveloperCliCredential </h2>
 *
 * To use this credential, the developer needs to authenticate locally in Azure Developer CLI using one of the
 * commands below:
 *
 * <ol>
 *     <li>Run "azd auth login" in Azure Developer CLI to authenticate interactively as a user.</li>
 *     <li>Run "azd auth login --client-id clientID --client-secret clientSecret
 *     --tenant-id tenantID" to authenticate as a service principal.</li>
 * </ol>
 *
 * You may need to repeat this process after a certain time period, depending on the refresh token validity in your
 * organization. Generally, the refresh token validity period is a few weeks to a few months.
 * AzureDeveloperCliCredential will prompt you to sign in again.
 */
export class AzureDeveloperCliCredential {
    /**
     * Creates an instance of the {@link AzureDeveloperCliCredential}.
     *
     * To use this credential, ensure that you have already logged
     * in via the 'azd' tool using the command "azd auth login" from the commandline.
     *
     * @param options - Options, to optionally allow multi-tenant requests.
     */
    constructor(options) {
        if (options === null || options === void 0 ? void 0 : options.tenantId) {
            checkTenantId(logger, options === null || options === void 0 ? void 0 : options.tenantId);
            this.tenantId = options === null || options === void 0 ? void 0 : options.tenantId;
        }
        this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(options === null || options === void 0 ? void 0 : options.additionallyAllowedTenants);
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
        const tenantId = processMultiTenantRequest(this.tenantId, options, this.additionallyAllowedTenantIds);
        if (tenantId) {
            checkTenantId(logger, tenantId);
        }
        let scopeList;
        if (typeof scopes === "string") {
            scopeList = [scopes];
        }
        else {
            scopeList = scopes;
        }
        logger.getToken.info(`Using the scopes ${scopes}`);
        return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async () => {
            var _a, _b, _c, _d;
            try {
                scopeList.forEach((scope) => {
                    ensureValidScopeForDevTimeCreds(scope, logger);
                });
                const obj = await developerCliCredentialInternals.getAzdAccessToken(scopeList, tenantId, this.timeout);
                const isNotLoggedInError = ((_a = obj.stderr) === null || _a === void 0 ? void 0 : _a.match("not logged in, run `azd login` to login")) ||
                    ((_b = obj.stderr) === null || _b === void 0 ? void 0 : _b.match("not logged in, run `azd auth login` to login"));
                const isNotInstallError = ((_c = obj.stderr) === null || _c === void 0 ? void 0 : _c.match("azd:(.*)not found")) ||
                    ((_d = obj.stderr) === null || _d === void 0 ? void 0 : _d.startsWith("'azd' is not recognized"));
                if (isNotInstallError || (obj.error && obj.error.code === "ENOENT")) {
                    const error = new CredentialUnavailableError("Azure Developer CLI couldn't be found. To mitigate this issue, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.");
                    logger.getToken.info(formatError(scopes, error));
                    throw error;
                }
                if (isNotLoggedInError) {
                    const error = new CredentialUnavailableError("Please run 'azd auth login' from a command prompt to authenticate before using this credential. For more information, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.");
                    logger.getToken.info(formatError(scopes, error));
                    throw error;
                }
                try {
                    const resp = JSON.parse(obj.stdout);
                    logger.getToken.info(formatSuccess(scopes));
                    return {
                        token: resp.token,
                        expiresOnTimestamp: new Date(resp.expiresOn).getTime(),
                        tokenType: "Bearer",
                    };
                }
                catch (e) {
                    if (obj.stderr) {
                        throw new CredentialUnavailableError(obj.stderr);
                    }
                    throw e;
                }
            }
            catch (err) {
                const error = err.name === "CredentialUnavailableError"
                    ? err
                    : new CredentialUnavailableError(err.message || "Unknown error while trying to retrieve the access token");
                logger.getToken.info(formatError(scopes, error));
                throw error;
            }
        });
    }
}
//# sourceMappingURL=azureDeveloperCliCredential.js.map
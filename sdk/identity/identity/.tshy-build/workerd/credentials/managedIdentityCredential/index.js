// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getLogLevel } from "@azure/logger";
import { ManagedIdentityApplication } from "@azure/msal-node";
import { IdentityClient } from "../../client/identityClient.js";
import { AuthenticationRequiredError, CredentialUnavailableError } from "../../errors.js";
import { getMSALLogLevel, defaultLoggerCallback } from "../../msal/utils.js";
import { imdsRetryPolicy } from "./imdsRetryPolicy.js";
import { formatSuccess, formatError, credentialLogger } from "../../util/logging.js";
import { tracingClient } from "../../util/tracing.js";
import { imdsMsi } from "./imdsMsi.js";
import { tokenExchangeMsi } from "./tokenExchangeMsi.js";
import { mapScopesToResource, serviceFabricErrorMessage } from "./utils.js";
const logger = credentialLogger("ManagedIdentityCredential");
/**
 * Attempts authentication using a managed identity available at the deployment environment.
 * This authentication type works in Azure VMs, App Service instances, Azure Functions applications,
 * Azure Kubernetes Services, Azure Service Fabric instances and inside of the Azure Cloud Shell.
 *
 * More information about configuring managed identities can be found here:
 * https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
 */
export class ManagedIdentityCredential {
    /**
     * @internal
     * @hidden
     */
    constructor(clientIdOrOptions, options) {
        var _a, _b;
        this.msiRetryConfig = {
            maxRetries: 5,
            startDelayInMs: 800,
            intervalIncrement: 2,
        };
        let _options;
        if (typeof clientIdOrOptions === "string") {
            this.clientId = clientIdOrOptions;
            _options = options !== null && options !== void 0 ? options : {};
        }
        else {
            this.clientId = clientIdOrOptions === null || clientIdOrOptions === void 0 ? void 0 : clientIdOrOptions.clientId;
            _options = clientIdOrOptions !== null && clientIdOrOptions !== void 0 ? clientIdOrOptions : {};
        }
        this.resourceId = _options === null || _options === void 0 ? void 0 : _options.resourceId;
        this.objectId = _options === null || _options === void 0 ? void 0 : _options.objectId;
        // For JavaScript users.
        const providedIds = [
            { key: "clientId", value: this.clientId },
            { key: "resourceId", value: this.resourceId },
            { key: "objectId", value: this.objectId },
        ].filter((id) => id.value);
        if (providedIds.length > 1) {
            throw new Error(`ManagedIdentityCredential: only one of 'clientId', 'resourceId', or 'objectId' can be provided. Received values: ${JSON.stringify({ clientId: this.clientId, resourceId: this.resourceId, objectId: this.objectId })}`);
        }
        // ManagedIdentity uses http for local requests
        _options.allowInsecureConnection = true;
        if (((_a = _options.retryOptions) === null || _a === void 0 ? void 0 : _a.maxRetries) !== undefined) {
            this.msiRetryConfig.maxRetries = _options.retryOptions.maxRetries;
        }
        this.identityClient = new IdentityClient(Object.assign(Object.assign({}, _options), { additionalPolicies: [{ policy: imdsRetryPolicy(this.msiRetryConfig), position: "perCall" }] }));
        this.managedIdentityApp = new ManagedIdentityApplication({
            managedIdentityIdParams: {
                userAssignedClientId: this.clientId,
                userAssignedResourceId: this.resourceId,
                userAssignedObjectId: this.objectId,
            },
            system: {
                disableInternalRetries: true,
                networkClient: this.identityClient,
                loggerOptions: {
                    logLevel: getMSALLogLevel(getLogLevel()),
                    piiLoggingEnabled: (_b = _options.loggingOptions) === null || _b === void 0 ? void 0 : _b.enableUnsafeSupportLogging,
                    loggerCallback: defaultLoggerCallback(logger),
                },
            },
        });
        this.isAvailableIdentityClient = new IdentityClient(Object.assign(Object.assign({}, _options), { retryOptions: {
                maxRetries: 0,
            } }));
        const managedIdentitySource = this.managedIdentityApp.getManagedIdentitySource();
        // CloudShell MSI will ignore any user-assigned identity passed as parameters. To avoid confusion, we prevent this from happening as early as possible.
        if (managedIdentitySource === "CloudShell") {
            if (this.clientId || this.resourceId || this.objectId) {
                logger.warning(`CloudShell MSI detected with user-provided IDs - throwing. Received values: ${JSON.stringify({
                    clientId: this.clientId,
                    resourceId: this.resourceId,
                    objectId: this.objectId,
                })}.`);
                throw new CredentialUnavailableError("ManagedIdentityCredential: Specifying a user-assigned managed identity is not supported for CloudShell at runtime. When using Managed Identity in CloudShell, omit the clientId, resourceId, and objectId parameters.");
            }
        }
        // ServiceFabric does not support specifying user-assigned managed identity by client ID or resource ID. The managed identity selected is based on the resource configuration.
        if (managedIdentitySource === "ServiceFabric") {
            if (this.clientId || this.resourceId || this.objectId) {
                logger.warning(`Service Fabric detected with user-provided IDs - throwing. Received values: ${JSON.stringify({
                    clientId: this.clientId,
                    resourceId: this.resourceId,
                    objectId: this.objectId,
                })}.`);
                throw new CredentialUnavailableError(`ManagedIdentityCredential: ${serviceFabricErrorMessage}`);
            }
        }
        logger.info(`Using ${managedIdentitySource} managed identity.`);
        // Check if either clientId, resourceId or objectId was provided and log the value used
        if (providedIds.length === 1) {
            const { key, value } = providedIds[0];
            logger.info(`${managedIdentitySource} with ${key}: ${value}`);
        }
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     * If an unexpected error occurs, an {@link AuthenticationError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    async getToken(scopes, options = {}) {
        logger.getToken.info("Using the MSAL provider for Managed Identity.");
        const resource = mapScopesToResource(scopes);
        if (!resource) {
            throw new CredentialUnavailableError(`ManagedIdentityCredential: Multiple scopes are not supported. Scopes: ${JSON.stringify(scopes)}`);
        }
        return tracingClient.withSpan("ManagedIdentityCredential.getToken", options, async () => {
            var _a;
            try {
                const isTokenExchangeMsi = await tokenExchangeMsi.isAvailable(this.clientId);
                // Most scenarios are handled by MSAL except for two:
                // AKS pod identity - MSAL does not implement the token exchange flow.
                // IMDS Endpoint probing - MSAL does not do any probing before trying to get a token.
                // As a DefaultAzureCredential optimization we probe the IMDS endpoint with a short timeout and no retries before actually trying to get a token
                // We will continue to implement these features in the Identity library.
                const identitySource = this.managedIdentityApp.getManagedIdentitySource();
                const isImdsMsi = identitySource === "DefaultToImds" || identitySource === "Imds"; // Neither actually checks that IMDS endpoint is available, just that it's the source the MSAL _would_ try to use.
                logger.getToken.info(`MSAL Identity source: ${identitySource}`);
                if (isTokenExchangeMsi) {
                    // In the AKS scenario we will use the existing tokenExchangeMsi indefinitely.
                    logger.getToken.info("Using the token exchange managed identity.");
                    const result = await tokenExchangeMsi.getToken({
                        scopes,
                        clientId: this.clientId,
                        identityClient: this.identityClient,
                        retryConfig: this.msiRetryConfig,
                        resourceId: this.resourceId,
                    });
                    if (result === null) {
                        throw new CredentialUnavailableError("Attempted to use the token exchange managed identity, but received a null response.");
                    }
                    return result;
                }
                else if (isImdsMsi) {
                    // In the IMDS scenario we will probe the IMDS endpoint to ensure it's available before trying to get a token.
                    // If the IMDS endpoint is not available and this is the source that MSAL will use, we will fail-fast with an error that tells DAC to move to the next credential.
                    logger.getToken.info("Using the IMDS endpoint to probe for availability.");
                    const isAvailable = await imdsMsi.isAvailable({
                        scopes,
                        clientId: this.clientId,
                        getTokenOptions: options,
                        identityClient: this.isAvailableIdentityClient,
                        resourceId: this.resourceId,
                    });
                    if (!isAvailable) {
                        throw new CredentialUnavailableError(`Attempted to use the IMDS endpoint, but it is not available.`);
                    }
                }
                // If we got this far, it means:
                // - This is not a tokenExchangeMsi,
                // - We already probed for IMDS endpoint availability and failed-fast if it's unreachable.
                // We can proceed normally by calling MSAL for a token.
                logger.getToken.info("Calling into MSAL for managed identity token.");
                const token = await this.managedIdentityApp.acquireToken({
                    resource,
                });
                this.ensureValidMsalToken(scopes, token, options);
                logger.getToken.info(formatSuccess(scopes));
                return {
                    expiresOnTimestamp: token.expiresOn.getTime(),
                    token: token.accessToken,
                    refreshAfterTimestamp: (_a = token.refreshOn) === null || _a === void 0 ? void 0 : _a.getTime(),
                    tokenType: "Bearer",
                };
            }
            catch (err) {
                logger.getToken.error(formatError(scopes, err));
                // AuthenticationRequiredError described as Error to enforce authentication after trying to retrieve a token silently.
                // TODO: why would this _ever_ happen considering we're not trying the silent request in this flow?
                if (err.name === "AuthenticationRequiredError") {
                    throw err;
                }
                if (isNetworkError(err)) {
                    throw new CredentialUnavailableError(`ManagedIdentityCredential: Network unreachable. Message: ${err.message}`, { cause: err });
                }
                throw new CredentialUnavailableError(`ManagedIdentityCredential: Authentication failed. Message ${err.message}`, { cause: err });
            }
        });
    }
    /**
     * Ensures the validity of the MSAL token
     */
    ensureValidMsalToken(scopes, msalToken, getTokenOptions) {
        const createError = (message) => {
            logger.getToken.info(message);
            return new AuthenticationRequiredError({
                scopes: Array.isArray(scopes) ? scopes : [scopes],
                getTokenOptions,
                message,
            });
        };
        if (!msalToken) {
            throw createError("No response.");
        }
        if (!msalToken.expiresOn) {
            throw createError(`Response had no "expiresOn" property.`);
        }
        if (!msalToken.accessToken) {
            throw createError(`Response had no "accessToken" property.`);
        }
    }
}
function isNetworkError(err) {
    // MSAL error
    if (err.errorCode === "network_error") {
        return true;
    }
    // Probe errors
    if (err.code === "ENETUNREACH" || err.code === "EHOSTUNREACH") {
        return true;
    }
    // This is a special case for Docker Desktop which responds with a 403 with a message that contains "A socket operation was attempted to an unreachable network" or "A socket operation was attempted to an unreachable host"
    // rather than just timing out, as expected.
    if (err.statusCode === 403 || err.code === 403) {
        if (err.message.includes("unreachable")) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=index.js.map
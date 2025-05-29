"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentCredential = exports.AllSupportedEnvironmentVariables = void 0;
exports.getSendCertificateChain = getSendCertificateChain;
const errors_js_1 = require("../errors.js");
const logging_js_1 = require("../util/logging.js");
const clientCertificateCredential_js_1 = require("./clientCertificateCredential.js");
const clientSecretCredential_js_1 = require("./clientSecretCredential.js");
const usernamePasswordCredential_js_1 = require("./usernamePasswordCredential.js");
const tenantIdUtils_js_1 = require("../util/tenantIdUtils.js");
const tracing_js_1 = require("../util/tracing.js");
/**
 * Contains the list of all supported environment variable names so that an
 * appropriate error message can be generated when no credentials can be
 * configured.
 *
 * @internal
 */
exports.AllSupportedEnvironmentVariables = [
    "AZURE_TENANT_ID",
    "AZURE_CLIENT_ID",
    "AZURE_CLIENT_SECRET",
    "AZURE_CLIENT_CERTIFICATE_PATH",
    "AZURE_CLIENT_CERTIFICATE_PASSWORD",
    "AZURE_USERNAME",
    "AZURE_PASSWORD",
    "AZURE_ADDITIONALLY_ALLOWED_TENANTS",
    "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN",
];
function getAdditionallyAllowedTenants() {
    var _a;
    const additionallyAllowedValues = (_a = process.env.AZURE_ADDITIONALLY_ALLOWED_TENANTS) !== null && _a !== void 0 ? _a : "";
    return additionallyAllowedValues.split(";");
}
const credentialName = "EnvironmentCredential";
const logger = (0, logging_js_1.credentialLogger)(credentialName);
function getSendCertificateChain() {
    var _a;
    const sendCertificateChain = ((_a = process.env.AZURE_CLIENT_SEND_CERTIFICATE_CHAIN) !== null && _a !== void 0 ? _a : "").toLowerCase();
    const result = sendCertificateChain === "true" || sendCertificateChain === "1";
    logger.verbose(`AZURE_CLIENT_SEND_CERTIFICATE_CHAIN: ${process.env.AZURE_CLIENT_SEND_CERTIFICATE_CHAIN}; sendCertificateChain: ${result}`);
    return result;
}
/**
 * Enables authentication to Microsoft Entra ID using a client secret or certificate.
 */
class EnvironmentCredential {
    /**
     * Creates an instance of the EnvironmentCredential class and decides what credential to use depending on the available environment variables.
     *
     * Required environment variables:
     * - `AZURE_TENANT_ID`: The Microsoft Entra tenant (directory) ID.
     * - `AZURE_CLIENT_ID`: The client (application) ID of an App Registration in the tenant.
     *
     * If setting the AZURE_TENANT_ID, then you can also set the additionally allowed tenants
     * - `AZURE_ADDITIONALLY_ALLOWED_TENANTS`: For multi-tenant applications, specifies additional tenants for which the credential may acquire tokens with a single semicolon delimited string. Use * to allow all tenants.
     *
     * Environment variables used for client credential authentication:
     * - `AZURE_CLIENT_SECRET`: A client secret that was generated for the App Registration.
     * - `AZURE_CLIENT_CERTIFICATE_PATH`: The path to a PEM certificate to use during the authentication, instead of the client secret.
     * - `AZURE_CLIENT_CERTIFICATE_PASSWORD`: (optional) password for the certificate file.
     * - `AZURE_CLIENT_SEND_CERTIFICATE_CHAIN`: (optional) indicates that the certificate chain should be set in x5c header to support subject name / issuer based authentication.
     *
     * Username and password authentication is deprecated, since it doesn't support multifactor authentication (MFA). See https://aka.ms/azsdk/identity/mfa for more details. Users can still provide environment variables for this authentication method:
     * - `AZURE_USERNAME`: Username to authenticate with.
     * - `AZURE_PASSWORD`: Password to authenticate with.
     *
     * If the environment variables required to perform the authentication are missing, a {@link CredentialUnavailableError} will be thrown.
     * If the authentication fails, or if there's an unknown error, an {@link AuthenticationError} will be thrown.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(options) {
        // Keep track of any missing environment variables for error details
        this._credential = undefined;
        const assigned = (0, logging_js_1.processEnvVars)(exports.AllSupportedEnvironmentVariables).assigned.join(", ");
        logger.info(`Found the following environment variables: ${assigned}`);
        const tenantId = process.env.AZURE_TENANT_ID, clientId = process.env.AZURE_CLIENT_ID, clientSecret = process.env.AZURE_CLIENT_SECRET;
        const additionallyAllowedTenantIds = getAdditionallyAllowedTenants();
        const sendCertificateChain = getSendCertificateChain();
        const newOptions = Object.assign(Object.assign({}, options), { additionallyAllowedTenantIds, sendCertificateChain });
        if (tenantId) {
            (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
        }
        if (tenantId && clientId && clientSecret) {
            logger.info(`Invoking ClientSecretCredential with tenant ID: ${tenantId}, clientId: ${clientId} and clientSecret: [REDACTED]`);
            this._credential = new clientSecretCredential_js_1.ClientSecretCredential(tenantId, clientId, clientSecret, newOptions);
            return;
        }
        const certificatePath = process.env.AZURE_CLIENT_CERTIFICATE_PATH;
        const certificatePassword = process.env.AZURE_CLIENT_CERTIFICATE_PASSWORD;
        if (tenantId && clientId && certificatePath) {
            logger.info(`Invoking ClientCertificateCredential with tenant ID: ${tenantId}, clientId: ${clientId} and certificatePath: ${certificatePath}`);
            this._credential = new clientCertificateCredential_js_1.ClientCertificateCredential(tenantId, clientId, { certificatePath, certificatePassword }, newOptions);
            return;
        }
        const username = process.env.AZURE_USERNAME;
        const password = process.env.AZURE_PASSWORD;
        if (tenantId && clientId && username && password) {
            logger.info(`Invoking UsernamePasswordCredential with tenant ID: ${tenantId}, clientId: ${clientId} and username: ${username}`);
            logger.warning("Environment is configured to use username and password authentication. This authentication method is deprecated, as it doesn't support multifactor authentication (MFA). Use a more secure credential. For more details, see https://aka.ms/azsdk/identity/mfa.");
            this._credential = new usernamePasswordCredential_js_1.UsernamePasswordCredential(tenantId, clientId, username, password, newOptions);
        }
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - Optional parameters. See {@link GetTokenOptions}.
     */
    async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${credentialName}.getToken`, options, async (newOptions) => {
            if (this._credential) {
                try {
                    const result = await this._credential.getToken(scopes, newOptions);
                    logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
                    return result;
                }
                catch (err) {
                    const authenticationError = new errors_js_1.AuthenticationError(400, {
                        error: `${credentialName} authentication failed. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.`,
                        error_description: err.message.toString().split("More details:").join(""),
                    });
                    logger.getToken.info((0, logging_js_1.formatError)(scopes, authenticationError));
                    throw authenticationError;
                }
            }
            throw new errors_js_1.CredentialUnavailableError(`${credentialName} is unavailable. No underlying credential could be used. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.`);
        });
    }
}
exports.EnvironmentCredential = EnvironmentCredential;
//# sourceMappingURL=environmentCredential.js.map
"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAzureCredential = exports.UnavailableDefaultCredential = void 0;
exports.createDefaultManagedIdentityCredential = createDefaultManagedIdentityCredential;
exports.createEnvironmentCredential = createEnvironmentCredential;
const index_js_1 = require("./managedIdentityCredential/index.js");
const azureCliCredential_js_1 = require("./azureCliCredential.js");
const azureDeveloperCliCredential_js_1 = require("./azureDeveloperCliCredential.js");
const azurePowerShellCredential_js_1 = require("./azurePowerShellCredential.js");
const chainedTokenCredential_js_1 = require("./chainedTokenCredential.js");
const environmentCredential_js_1 = require("./environmentCredential.js");
const workloadIdentityCredential_js_1 = require("./workloadIdentityCredential.js");
const logging_js_1 = require("../util/logging.js");
const logger = (0, logging_js_1.credentialLogger)("DefaultAzureCredential");
/**
 * Creates a {@link ManagedIdentityCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
function createDefaultManagedIdentityCredential(options = {}) {
    var _a, _b, _c, _d;
    (_a = options.retryOptions) !== null && _a !== void 0 ? _a : (options.retryOptions = {
        maxRetries: 5,
        retryDelayInMs: 800,
    });
    const managedIdentityClientId = (_b = options === null || options === void 0 ? void 0 : options.managedIdentityClientId) !== null && _b !== void 0 ? _b : process.env.AZURE_CLIENT_ID;
    const workloadIdentityClientId = (_c = options === null || options === void 0 ? void 0 : options.workloadIdentityClientId) !== null && _c !== void 0 ? _c : managedIdentityClientId;
    const managedResourceId = options === null || options === void 0 ? void 0 : options.managedIdentityResourceId;
    const workloadFile = process.env.AZURE_FEDERATED_TOKEN_FILE;
    const tenantId = (_d = options === null || options === void 0 ? void 0 : options.tenantId) !== null && _d !== void 0 ? _d : process.env.AZURE_TENANT_ID;
    if (managedResourceId) {
        const managedIdentityResourceIdOptions = Object.assign(Object.assign({}, options), { resourceId: managedResourceId });
        return new index_js_1.ManagedIdentityCredential(managedIdentityResourceIdOptions);
    }
    if (workloadFile && workloadIdentityClientId) {
        const workloadIdentityCredentialOptions = Object.assign(Object.assign({}, options), { tenantId: tenantId });
        return new index_js_1.ManagedIdentityCredential(workloadIdentityClientId, workloadIdentityCredentialOptions);
    }
    if (managedIdentityClientId) {
        const managedIdentityClientOptions = Object.assign(Object.assign({}, options), { clientId: managedIdentityClientId });
        return new index_js_1.ManagedIdentityCredential(managedIdentityClientOptions);
    }
    // We may be able to return a UnavailableCredential here, but that may be a breaking change
    return new index_js_1.ManagedIdentityCredential(options);
}
/**
 * Creates a {@link WorkloadIdentityCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
function createDefaultWorkloadIdentityCredential(options) {
    var _a, _b, _c;
    const managedIdentityClientId = (_a = options === null || options === void 0 ? void 0 : options.managedIdentityClientId) !== null && _a !== void 0 ? _a : process.env.AZURE_CLIENT_ID;
    const workloadIdentityClientId = (_b = options === null || options === void 0 ? void 0 : options.workloadIdentityClientId) !== null && _b !== void 0 ? _b : managedIdentityClientId;
    const workloadFile = process.env.AZURE_FEDERATED_TOKEN_FILE;
    const tenantId = (_c = options === null || options === void 0 ? void 0 : options.tenantId) !== null && _c !== void 0 ? _c : process.env.AZURE_TENANT_ID;
    if (workloadFile && workloadIdentityClientId) {
        const workloadIdentityCredentialOptions = Object.assign(Object.assign({}, options), { tenantId, clientId: workloadIdentityClientId, tokenFilePath: workloadFile });
        return new workloadIdentityCredential_js_1.WorkloadIdentityCredential(workloadIdentityCredentialOptions);
    }
    if (tenantId) {
        const workloadIdentityClientTenantOptions = Object.assign(Object.assign({}, options), { tenantId });
        return new workloadIdentityCredential_js_1.WorkloadIdentityCredential(workloadIdentityClientTenantOptions);
    }
    // We may be able to return a UnavailableCredential here, but that may be a breaking change
    return new workloadIdentityCredential_js_1.WorkloadIdentityCredential(options);
}
/**
 * Creates a {@link AzureDeveloperCliCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
function createDefaultAzureDeveloperCliCredential(options = {}) {
    const processTimeoutInMs = options.processTimeoutInMs;
    return new azureDeveloperCliCredential_js_1.AzureDeveloperCliCredential(Object.assign({ processTimeoutInMs }, options));
}
/**
 * Creates a {@link AzureCliCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
function createDefaultAzureCliCredential(options = {}) {
    const processTimeoutInMs = options.processTimeoutInMs;
    return new azureCliCredential_js_1.AzureCliCredential(Object.assign({ processTimeoutInMs }, options));
}
/**
 * Creates a {@link AzurePowerShellCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
function createDefaultAzurePowershellCredential(options = {}) {
    const processTimeoutInMs = options.processTimeoutInMs;
    return new azurePowerShellCredential_js_1.AzurePowerShellCredential(Object.assign({ processTimeoutInMs }, options));
}
/**
 * Creates an {@link EnvironmentCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
function createEnvironmentCredential(options = {}) {
    return new environmentCredential_js_1.EnvironmentCredential(options);
}
/**
 * A no-op credential that logs the reason it was skipped if getToken is called.
 * @internal
 */
class UnavailableDefaultCredential {
    constructor(credentialName, message) {
        this.credentialName = credentialName;
        this.credentialUnavailableErrorMessage = message;
    }
    getToken() {
        logger.getToken.info(`Skipping ${this.credentialName}, reason: ${this.credentialUnavailableErrorMessage}`);
        return Promise.resolve(null);
    }
}
exports.UnavailableDefaultCredential = UnavailableDefaultCredential;
/**
 * Provides a default {@link ChainedTokenCredential} configuration that works for most
 * applications that use Azure SDK client libraries. For more information, see
 * [DefaultAzureCredential overview](https://aka.ms/azsdk/js/identity/credential-chains#use-defaultazurecredential-for-flexibility).
 *
 * The following credential types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link WorkloadIdentityCredential}
 * - {@link ManagedIdentityCredential}
 * - {@link AzureCliCredential}
 * - {@link AzurePowerShellCredential}
 * - {@link AzureDeveloperCliCredential}
 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 */
class DefaultAzureCredential extends chainedTokenCredential_js_1.ChainedTokenCredential {
    constructor(options) {
        // If AZURE_TOKEN_CREDENTIALS is not set, use the default credential chain.
        const azureTokenCredentials = process.env.AZURE_TOKEN_CREDENTIALS
            ? process.env.AZURE_TOKEN_CREDENTIALS.trim().toLowerCase()
            : undefined;
        const devCredentialFunctions = [
            createDefaultAzureCliCredential,
            createDefaultAzurePowershellCredential,
            createDefaultAzureDeveloperCliCredential,
        ];
        const prodCredentialFunctions = [
            createEnvironmentCredential,
            createDefaultWorkloadIdentityCredential,
            createDefaultManagedIdentityCredential,
        ];
        let credentialFunctions = [];
        // If AZURE_TOKEN_CREDENTIALS is set, use it to determine which credentials to use.
        // The value of AZURE_TOKEN_CREDENTIALS should be either "dev" or "prod".
        if (azureTokenCredentials) {
            switch (azureTokenCredentials) {
                case "dev":
                    // If AZURE_TOKEN_CREDENTIALS is set to "dev", use the developer tool-based credential chain.
                    credentialFunctions = devCredentialFunctions;
                    break;
                case "prod":
                    // If AZURE_TOKEN_CREDENTIALS is set to "prod", use the production credential chain.
                    credentialFunctions = prodCredentialFunctions;
                    break;
                default: {
                    // If AZURE_TOKEN_CREDENTIALS is set to an unsupported value, throw an error.
                    // We will throw an error here to prevent the creation of the DefaultAzureCredential.
                    const errorMessage = `Invalid value for AZURE_TOKEN_CREDENTIALS = ${process.env.AZURE_TOKEN_CREDENTIALS}. Valid values are 'prod' or 'dev'.`;
                    logger.warning(errorMessage);
                    throw new Error(errorMessage);
                }
            }
        }
        else {
            // If AZURE_TOKEN_CREDENTIALS is not set, use the default credential chain.
            credentialFunctions = [...prodCredentialFunctions, ...devCredentialFunctions];
        }
        // Errors from individual credentials should not be thrown in the DefaultAzureCredential constructor, instead throwing on getToken() which is handled by ChainedTokenCredential.
        // When adding new credentials to the default chain, consider:
        // 1. Making the constructor parameters required and explicit
        // 2. Validating any required parameters in the factory function
        // 3. Returning a UnavailableDefaultCredential from the factory function if a credential is unavailable for any reason
        const credentials = credentialFunctions.map((createCredentialFn) => {
            try {
                return createCredentialFn(options);
            }
            catch (err) {
                logger.warning(`Skipped ${createCredentialFn.name} because of an error creating the credential: ${err}`);
                return new UnavailableDefaultCredential(createCredentialFn.name, err.message);
            }
        });
        super(...credentials);
    }
}
exports.DefaultAzureCredential = DefaultAzureCredential;
//# sourceMappingURL=defaultAzureCredential.js.map
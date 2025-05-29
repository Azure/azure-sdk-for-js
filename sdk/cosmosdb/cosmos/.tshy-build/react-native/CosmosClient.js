// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Database, Databases } from "./client/Database/index.js";
import { Offer, Offers } from "./client/Offer/index.js";
import { ClientContext } from "./ClientContext.js";
import { parseConnectionString } from "./common/index.js";
import { Constants } from "./common/constants.js";
import { getUserAgent } from "./common/platform.js";
import { determineDiagnosticLevel, getDiagnosticLevelFromEnvironment, } from "./diagnostics/index.js";
import { DiagnosticNodeType } from "./diagnostics/DiagnosticNodeInternal.js";
import { defaultConnectionPolicy } from "./documents/index.js";
import { EncryptionManager } from "./encryption/EncryptionManager.js";
import { GlobalEndpointManager } from "./globalEndpointManager.js";
import { ResourceResponse } from "./request/index.js";
import { checkURL } from "./utils/checkURL.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "./utils/diagnostics.js";
/**
 * Provides a client-side logical representation of the Azure Cosmos DB database account.
 * This client is used to configure and execute requests in the Azure Cosmos DB database service.
 * @example Instantiate a client and create a new database
 * ```ts snippet:CosmosClientCreate
 * import { CosmosClient } from "@azure/cosmos";
 *
 * const endpoint = "https://your-account.documents.azure.com";
 * const key = "<database account masterkey>";
 * const client = new CosmosClient({ endpoint, key });
 * ```
 * @example Instantiate a client with custom Connection Policy
 * ```ts snippet:CosmosClientWithConnectionPolicy
 * import { CosmosClient } from "@azure/cosmos";
 *
 * const endpoint = "https://your-account.documents.azure.com";
 * const key = "<database account masterkey>";
 * const client = new CosmosClient({
 *   endpoint,
 *   key,
 *   connectionPolicy: {
 *     requestTimeout: 10000,
 *   },
 * });
 * ```
 */
export class CosmosClient {
    constructor(optionsOrConnectionString) {
        var _a, _b;
        if (typeof optionsOrConnectionString === "string") {
            optionsOrConnectionString = parseConnectionString(optionsOrConnectionString);
        }
        else if (optionsOrConnectionString.connectionString) {
            const { endpoint, key } = parseConnectionString(optionsOrConnectionString.connectionString);
            optionsOrConnectionString.endpoint = endpoint;
            optionsOrConnectionString.key = key;
        }
        const endpoint = checkURL(optionsOrConnectionString.endpoint);
        if (!endpoint) {
            throw new Error("Invalid endpoint specified");
        }
        if (optionsOrConnectionString.clientEncryptionOptions) {
            if (!optionsOrConnectionString.clientEncryptionOptions.keyEncryptionKeyResolver) {
                throw new Error("KeyEncryptionKeyResolver needs to be provided to enable client-side encryption.");
            }
            if (optionsOrConnectionString.clientEncryptionOptions.encryptionKeyTimeToLiveInSeconds &&
                optionsOrConnectionString.clientEncryptionOptions.encryptionKeyTimeToLiveInSeconds < 60) {
                throw new Error("EncryptionKeyTimeToLiveInSeconds needs to be >= 60 seconds.");
            }
            this.encryptionManager = new EncryptionManager(optionsOrConnectionString.clientEncryptionOptions.keyEncryptionKeyResolver, optionsOrConnectionString.clientEncryptionOptions.encryptionKeyTimeToLiveInSeconds);
        }
        const clientConfig = this.initializeClientConfigDiagnostic(optionsOrConnectionString);
        optionsOrConnectionString.connectionPolicy = Object.assign({}, defaultConnectionPolicy, optionsOrConnectionString.connectionPolicy);
        optionsOrConnectionString.defaultHeaders = optionsOrConnectionString.defaultHeaders || {};
        optionsOrConnectionString.defaultHeaders[Constants.HttpHeaders.CacheControl] = "no-cache";
        optionsOrConnectionString.defaultHeaders[Constants.HttpHeaders.Version] =
            Constants.CurrentVersion;
        if (optionsOrConnectionString.consistencyLevel !== undefined) {
            optionsOrConnectionString.defaultHeaders[Constants.HttpHeaders.ConsistencyLevel] =
                optionsOrConnectionString.consistencyLevel;
        }
        if (optionsOrConnectionString.throughputBucket !== undefined) {
            optionsOrConnectionString.defaultHeaders[Constants.HttpHeaders.ThroughputBucket] =
                optionsOrConnectionString.throughputBucket;
        }
        const userAgent = getUserAgent(optionsOrConnectionString.userAgentSuffix);
        optionsOrConnectionString.defaultHeaders[Constants.HttpHeaders.UserAgent] = userAgent;
        optionsOrConnectionString.defaultHeaders[Constants.HttpHeaders.CustomUserAgent] = userAgent;
        const globalEndpointManager = new GlobalEndpointManager(optionsOrConnectionString, async (diagnosticNode, opts) => this.getDatabaseAccountInternal(diagnosticNode, opts));
        this.clientContext = new ClientContext(optionsOrConnectionString, globalEndpointManager, clientConfig, determineDiagnosticLevel(optionsOrConnectionString.diagnosticLevel, getDiagnosticLevelFromEnvironment()));
        if (((_a = optionsOrConnectionString.connectionPolicy) === null || _a === void 0 ? void 0 : _a.enableEndpointDiscovery) &&
            ((_b = optionsOrConnectionString.connectionPolicy) === null || _b === void 0 ? void 0 : _b.enableBackgroundEndpointRefreshing)) {
            this.backgroundRefreshEndpointList(globalEndpointManager, optionsOrConnectionString.connectionPolicy.endpointRefreshRateInMs ||
                defaultConnectionPolicy.endpointRefreshRateInMs);
        }
        this.databases = new Databases(this, this.clientContext, this.encryptionManager);
        this.offers = new Offers(this, this.clientContext);
    }
    initializeClientConfigDiagnostic(optionsOrConnectionString) {
        return {
            endpoint: optionsOrConnectionString.endpoint,
            resourceTokensConfigured: optionsOrConnectionString.resourceTokens !== undefined,
            tokenProviderConfigured: optionsOrConnectionString.tokenProvider !== undefined,
            aadCredentialsConfigured: optionsOrConnectionString.aadCredentials !== undefined,
            connectionPolicyConfigured: optionsOrConnectionString.connectionPolicy !== undefined,
            consistencyLevel: optionsOrConnectionString.consistencyLevel,
            defaultHeaders: optionsOrConnectionString.defaultHeaders,
            agentConfigured: optionsOrConnectionString.agent !== undefined,
            userAgentSuffix: optionsOrConnectionString.userAgentSuffix,
            diagnosticLevel: optionsOrConnectionString.diagnosticLevel,
            pluginsConfigured: optionsOrConnectionString.plugins !== undefined,
            sDKVersion: Constants.SDKVersion,
        };
    }
    /**
     * Get information about the current {@link DatabaseAccount} (including which regions are supported, etc.)
     */
    async getDatabaseAccount(options) {
        return withDiagnostics(async (diagnosticNode) => {
            return this.getDatabaseAccountInternal(diagnosticNode, options);
        }, this.clientContext);
    }
    /**
     * @hidden
     */
    async getDatabaseAccountInternal(diagnosticNode, options) {
        const response = await this.clientContext.getDatabaseAccount(diagnosticNode, options);
        return new ResourceResponse(response.result, response.headers, response.code, getEmptyCosmosDiagnostics(), response.substatus);
    }
    /**
     * Gets the currently used write endpoint url. Useful for troubleshooting purposes.
     *
     * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    async getWriteEndpoint() {
        return withDiagnostics(async (diagnosticNode) => {
            return this.clientContext.getWriteEndpoint(diagnosticNode);
        }, this.clientContext);
    }
    /**
     * Gets the currently used read endpoint. Useful for troubleshooting purposes.
     *
     * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    async getReadEndpoint() {
        return withDiagnostics(async (diagnosticNode) => {
            return this.clientContext.getReadEndpoint(diagnosticNode);
        }, this.clientContext);
    }
    /**
     * Gets the known write endpoints. Useful for troubleshooting purposes.
     *
     * The urls may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    getWriteEndpoints() {
        return this.clientContext.getWriteEndpoints();
    }
    /**
     * Gets the currently used read endpoint. Useful for troubleshooting purposes.
     *
     * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    getReadEndpoints() {
        return this.clientContext.getReadEndpoints();
    }
    /**
     * Used for reading, updating, or deleting a existing database by id or accessing containers belonging to that database.
     *
     * This does not make a network call. Use `.read` to get info about the database after getting the {@link Database} object.
     *
     * @param id - The id of the database.
     * @example Create a new container off of an existing database
     * ```ts snippet:CosmosClientDatabaseCreateContainer
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const container = client.database("<database id>").containers.create({
     *   id: "<name here>",
     * });
     * ```
     *
     * @example Delete an existing database
     * ```ts snippet:CosmosClientDatabaseDelete
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * await client.database("<id here>").delete();
     * ```
     */
    database(id) {
        return new Database(this, id, this.clientContext, this.encryptionManager);
    }
    /**
     * Used for reading, or updating a existing offer by id.
     * @param id - The id of the offer.
     */
    offer(id) {
        return new Offer(this, id, this.clientContext);
    }
    /**
     * Clears background endpoint refresher. Use client.dispose() when destroying the CosmosClient within another process.
     */
    dispose() {
        clearTimeout(this.endpointRefresher);
        if (this.clientContext.enableEncryption) {
            clearTimeout(this.encryptionManager.encryptionKeyStoreProvider.cacheRefresher);
            clearTimeout(this.encryptionManager.protectedDataEncryptionKeyCache.cacheRefresher);
        }
    }
    async backgroundRefreshEndpointList(globalEndpointManager, refreshRate) {
        this.endpointRefresher = setInterval(() => {
            try {
                return withDiagnostics(async (diagnosticNode) => {
                    return globalEndpointManager.refreshEndpointList(diagnosticNode);
                }, this.clientContext, DiagnosticNodeType.BACKGROUND_REFRESH_THREAD);
            }
            catch (e) {
                console.warn("Failed to refresh endpoints", e);
            }
        }, refreshRate);
        if (this.endpointRefresher.unref && typeof this.endpointRefresher.unref === "function") {
            this.endpointRefresher.unref();
        }
    }
    /**
     * Update the host framework. If provided host framework will be used to generate the defualt SDK user agent.
     * @param hostFramework - A custom string.
     * @internal
     */
    async updateHostFramework(hostFramework) {
        this.clientContext.refreshUserAgent(hostFramework);
    }
}
//# sourceMappingURL=CosmosClient.js.map
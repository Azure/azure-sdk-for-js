"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosClient = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const index_js_1 = require("./client/Database/index.js");
const index_js_2 = require("./client/Offer/index.js");
const ClientContext_js_1 = require("./ClientContext.js");
const index_js_3 = require("./common/index.js");
const constants_js_1 = require("./common/constants.js");
const platform_js_1 = require("./common/platform.js");
const index_js_4 = require("./diagnostics/index.js");
const DiagnosticNodeInternal_js_1 = require("./diagnostics/DiagnosticNodeInternal.js");
const index_js_5 = require("./documents/index.js");
const EncryptionManager_js_1 = require("./encryption/EncryptionManager.js");
const globalEndpointManager_js_1 = require("./globalEndpointManager.js");
const index_js_6 = require("./request/index.js");
const checkURL_js_1 = require("./utils/checkURL.js");
const diagnostics_js_1 = require("./utils/diagnostics.js");
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
class CosmosClient {
    constructor(optionsOrConnectionString) {
        var _a, _b;
        if (typeof optionsOrConnectionString === "string") {
            optionsOrConnectionString = (0, index_js_3.parseConnectionString)(optionsOrConnectionString);
        }
        else if (optionsOrConnectionString.connectionString) {
            const { endpoint, key } = (0, index_js_3.parseConnectionString)(optionsOrConnectionString.connectionString);
            optionsOrConnectionString.endpoint = endpoint;
            optionsOrConnectionString.key = key;
        }
        const endpoint = (0, checkURL_js_1.checkURL)(optionsOrConnectionString.endpoint);
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
            this.encryptionManager = new EncryptionManager_js_1.EncryptionManager(optionsOrConnectionString.clientEncryptionOptions.keyEncryptionKeyResolver, optionsOrConnectionString.clientEncryptionOptions.encryptionKeyTimeToLiveInSeconds);
        }
        const clientConfig = this.initializeClientConfigDiagnostic(optionsOrConnectionString);
        optionsOrConnectionString.connectionPolicy = Object.assign({}, index_js_5.defaultConnectionPolicy, optionsOrConnectionString.connectionPolicy);
        optionsOrConnectionString.defaultHeaders = optionsOrConnectionString.defaultHeaders || {};
        optionsOrConnectionString.defaultHeaders[constants_js_1.Constants.HttpHeaders.CacheControl] = "no-cache";
        optionsOrConnectionString.defaultHeaders[constants_js_1.Constants.HttpHeaders.Version] =
            constants_js_1.Constants.CurrentVersion;
        if (optionsOrConnectionString.consistencyLevel !== undefined) {
            optionsOrConnectionString.defaultHeaders[constants_js_1.Constants.HttpHeaders.ConsistencyLevel] =
                optionsOrConnectionString.consistencyLevel;
        }
        if (optionsOrConnectionString.throughputBucket !== undefined) {
            optionsOrConnectionString.defaultHeaders[constants_js_1.Constants.HttpHeaders.ThroughputBucket] =
                optionsOrConnectionString.throughputBucket;
        }
        const userAgent = (0, platform_js_1.getUserAgent)(optionsOrConnectionString.userAgentSuffix);
        optionsOrConnectionString.defaultHeaders[constants_js_1.Constants.HttpHeaders.UserAgent] = userAgent;
        optionsOrConnectionString.defaultHeaders[constants_js_1.Constants.HttpHeaders.CustomUserAgent] = userAgent;
        const globalEndpointManager = new globalEndpointManager_js_1.GlobalEndpointManager(optionsOrConnectionString, async (diagnosticNode, opts) => this.getDatabaseAccountInternal(diagnosticNode, opts));
        this.clientContext = new ClientContext_js_1.ClientContext(optionsOrConnectionString, globalEndpointManager, clientConfig, (0, index_js_4.determineDiagnosticLevel)(optionsOrConnectionString.diagnosticLevel, (0, index_js_4.getDiagnosticLevelFromEnvironment)()));
        if (((_a = optionsOrConnectionString.connectionPolicy) === null || _a === void 0 ? void 0 : _a.enableEndpointDiscovery) &&
            ((_b = optionsOrConnectionString.connectionPolicy) === null || _b === void 0 ? void 0 : _b.enableBackgroundEndpointRefreshing)) {
            this.backgroundRefreshEndpointList(globalEndpointManager, optionsOrConnectionString.connectionPolicy.endpointRefreshRateInMs ||
                index_js_5.defaultConnectionPolicy.endpointRefreshRateInMs);
        }
        this.databases = new index_js_1.Databases(this, this.clientContext, this.encryptionManager);
        this.offers = new index_js_2.Offers(this, this.clientContext);
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
            sDKVersion: constants_js_1.Constants.SDKVersion,
        };
    }
    /**
     * Get information about the current {@link DatabaseAccount} (including which regions are supported, etc.)
     */
    async getDatabaseAccount(options) {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            return this.getDatabaseAccountInternal(diagnosticNode, options);
        }, this.clientContext);
    }
    /**
     * @hidden
     */
    async getDatabaseAccountInternal(diagnosticNode, options) {
        const response = await this.clientContext.getDatabaseAccount(diagnosticNode, options);
        return new index_js_6.ResourceResponse(response.result, response.headers, response.code, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)(), response.substatus);
    }
    /**
     * Gets the currently used write endpoint url. Useful for troubleshooting purposes.
     *
     * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    async getWriteEndpoint() {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            return this.clientContext.getWriteEndpoint(diagnosticNode);
        }, this.clientContext);
    }
    /**
     * Gets the currently used read endpoint. Useful for troubleshooting purposes.
     *
     * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
     */
    async getReadEndpoint() {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
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
        return new index_js_1.Database(this, id, this.clientContext, this.encryptionManager);
    }
    /**
     * Used for reading, or updating a existing offer by id.
     * @param id - The id of the offer.
     */
    offer(id) {
        return new index_js_2.Offer(this, id, this.clientContext);
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
                return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
                    return globalEndpointManager.refreshEndpointList(diagnosticNode);
                }, this.clientContext, DiagnosticNodeInternal_js_1.DiagnosticNodeType.BACKGROUND_REFRESH_THREAD);
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
exports.CosmosClient = CosmosClient;
//# sourceMappingURL=CosmosClient.js.map
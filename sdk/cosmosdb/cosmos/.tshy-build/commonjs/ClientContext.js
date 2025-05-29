"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientContext = void 0;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const constants_js_1 = require("./common/constants.js");
const helper_js_1 = require("./common/helper.js");
const statusCodes_js_1 = require("./common/statusCodes.js");
const index_js_1 = require("./documents/index.js");
const Plugin_js_1 = require("./plugins/Plugin.js");
const queryIterator_js_1 = require("./queryIterator.js");
const request_js_1 = require("./request/request.js");
const RequestHandler_js_1 = require("./request/RequestHandler.js");
const sessionContainer_js_1 = require("./session/sessionContainer.js");
const checkURL_js_1 = require("./utils/checkURL.js");
const supportedQueryFeaturesBuilder_js_1 = require("./utils/supportedQueryFeaturesBuilder.js");
const logger_1 = require("@azure/logger");
const DiagnosticWriter_js_1 = require("./diagnostics/DiagnosticWriter.js");
const DiagnosticFormatter_js_1 = require("./diagnostics/DiagnosticFormatter.js");
const CosmosDbDiagnosticLevel_js_1 = require("./diagnostics/CosmosDbDiagnosticLevel.js");
const core_util_1 = require("@azure/core-util");
const platform_js_1 = require("./common/platform.js");
const logger = (0, logger_1.createClientLogger)("ClientContext");
const QueryJsonContentType = "application/query+json";
const HttpHeaders = constants_js_1.Constants.HttpHeaders;
/**
 * @hidden
 * @hidden
 */
class ClientContext {
    constructor(cosmosClientOptions, globalEndpointManager, clientConfig, diagnosticLevel) {
        this.cosmosClientOptions = cosmosClientOptions;
        this.globalEndpointManager = globalEndpointManager;
        this.clientConfig = clientConfig;
        this.diagnosticLevel = diagnosticLevel;
        /** boolean flag to support operations with client-side encryption */
        this.enableEncryption = false;
        if (cosmosClientOptions.clientEncryptionOptions) {
            this.enableEncryption = true;
        }
        this.connectionPolicy = cosmosClientOptions.connectionPolicy;
        this.sessionContainer = new sessionContainer_js_1.SessionContainer();
        this.partitionKeyDefinitionCache = {};
        this.pipeline = null;
        if (cosmosClientOptions.aadCredentials) {
            this.pipeline = (0, core_rest_pipeline_1.createEmptyPipeline)();
            const hrefEndpoint = (0, checkURL_js_1.sanitizeEndpoint)(cosmosClientOptions.endpoint);
            const scope = `${hrefEndpoint}/.default`;
            this.pipeline.addPolicy((0, core_rest_pipeline_1.bearerTokenAuthenticationPolicy)({
                credential: cosmosClientOptions.aadCredentials,
                scopes: scope,
                challengeCallbacks: {
                    async authorizeRequest({ request, getAccessToken }) {
                        const tokenResponse = await getAccessToken([scope], {});
                        const AUTH_PREFIX = `type=aad&ver=1.0&sig=`;
                        const authorizationToken = `${AUTH_PREFIX}${tokenResponse.token}`;
                        request.headers.set("Authorization", authorizationToken);
                    },
                },
            }));
        }
        this.initializeDiagnosticSettings(diagnosticLevel);
    }
    /** @hidden */
    async read({ path, resourceType, resourceId, options = {}, partitionKey, diagnosticNode, }) {
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: constants_js_1.HTTPMethod.get, path, operationType: constants_js_1.OperationType.Read, resourceId,
                options,
                resourceType,
                partitionKey });
            diagnosticNode.addData({
                operationType: constants_js_1.OperationType.Read,
                resourceType,
            });
            request.headers = await this.buildHeaders(request);
            if (resourceType === constants_js_1.ResourceType.clientencryptionkey) {
                request.headers[HttpHeaders.AllowCachedReadsHeader] = true;
                if (options.databaseRid) {
                    request.headers[HttpHeaders.DatabaseRidHeader] = options.databaseRid;
                }
            }
            this.applySessionToken(request);
            // read will use ReadEndpoint since it uses GET operation
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await (0, Plugin_js_1.executePlugins)(diagnosticNode, request, RequestHandler_js_1.RequestHandler.request, Plugin_js_1.PluginOn.operation);
            this.captureSessionToken(undefined, path, constants_js_1.OperationType.Read, response.headers);
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, constants_js_1.OperationType.Upsert, err.headers);
            throw err;
        }
    }
    async queryFeed({ path, resourceType, resourceId, resultFn, query, options, diagnosticNode, partitionKeyRangeId, partitionKey, startEpk, endEpk, correlatedActivityId, }) {
        // Query operations will use ReadEndpoint even though it uses
        // GET(for queryFeed) and POST(for regular query operations)
        const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: constants_js_1.HTTPMethod.get, path, operationType: constants_js_1.OperationType.Query, partitionKeyRangeId,
            resourceId,
            resourceType,
            options, body: query, partitionKey });
        diagnosticNode.addData({
            operationType: constants_js_1.OperationType.Query,
            resourceType,
        });
        const requestId = (0, core_util_1.randomUUID)();
        if (query !== undefined) {
            request.method = constants_js_1.HTTPMethod.post;
        }
        request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
        request.headers = await this.buildHeaders(request);
        if (startEpk !== undefined && endEpk !== undefined) {
            request.headers[HttpHeaders.StartEpk] = startEpk;
            request.headers[HttpHeaders.EndEpk] = endEpk;
            request.headers[HttpHeaders.ReadFeedKeyType] = "EffectivePartitionKeyRange";
        }
        if (query !== undefined) {
            if (correlatedActivityId !== undefined) {
                request.headers[HttpHeaders.CorrelatedActivityId] = correlatedActivityId;
            }
            request.headers[HttpHeaders.IsQuery] = "true";
            request.headers[HttpHeaders.ContentType] = QueryJsonContentType;
            if (typeof query === "string") {
                request.body = { query }; // Converts query text to query object.
            }
        }
        this.applySessionToken(request);
        logger.info("query " +
            requestId +
            " started" +
            (request.partitionKeyRangeId ? " pkrid: " + request.partitionKeyRangeId : ""));
        logger.verbose(request);
        const start = Date.now();
        const response = await RequestHandler_js_1.RequestHandler.request(request, diagnosticNode);
        logger.info("query " + requestId + " finished - " + (Date.now() - start) + "ms");
        this.captureSessionToken(undefined, path, constants_js_1.OperationType.Query, response.headers);
        return this.processQueryFeedResponse(response, !!query, resultFn);
    }
    async getQueryPlan(path, resourceType, resourceId, query, options = {}, diagnosticNode, correlatedActivityId) {
        const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: constants_js_1.HTTPMethod.post, path, operationType: constants_js_1.OperationType.Read, resourceId,
            resourceType,
            options, body: query });
        diagnosticNode.addData({
            operationType: constants_js_1.OperationType.Read,
            resourceType,
        });
        request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
        request.headers = await this.buildHeaders(request);
        if (correlatedActivityId !== undefined) {
            request.headers[HttpHeaders.CorrelatedActivityId] = correlatedActivityId;
        }
        request.headers[HttpHeaders.IsQueryPlan] = "True";
        request.headers[HttpHeaders.QueryVersion] = "1.4";
        request.headers[HttpHeaders.ContentType] = QueryJsonContentType;
        request.headers[HttpHeaders.SupportedQueryFeatures] = (0, supportedQueryFeaturesBuilder_js_1.supportedQueryFeaturesBuilder)(options);
        if (typeof query === "string") {
            request.body = { query }; // Converts query text to query object.
        }
        this.applySessionToken(request);
        const response = await RequestHandler_js_1.RequestHandler.request(request, diagnosticNode);
        this.captureSessionToken(undefined, path, constants_js_1.OperationType.Query, response.headers);
        return response;
    }
    queryPartitionKeyRanges(collectionLink, query, options) {
        const path = (0, helper_js_1.getPathFromLink)(collectionLink, constants_js_1.ResourceType.pkranges);
        const id = (0, helper_js_1.getIdFromLink)(collectionLink);
        const cb = async (diagNode, innerOptions) => {
            const response = await this.queryFeed({
                path,
                resourceType: constants_js_1.ResourceType.pkranges,
                resourceId: id,
                resultFn: (result) => result.PartitionKeyRanges,
                query,
                options: innerOptions,
                diagnosticNode: diagNode,
            });
            return response;
        };
        return new queryIterator_js_1.QueryIterator(this, query, options, cb);
    }
    async delete({ path, resourceType, resourceId, options = {}, partitionKey, method = constants_js_1.HTTPMethod.delete, diagnosticNode, }) {
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: method, operationType: constants_js_1.OperationType.Delete, path,
                resourceType,
                options,
                resourceId,
                partitionKey });
            diagnosticNode.addData({
                operationType: constants_js_1.OperationType.Delete,
                resourceType,
            });
            request.headers = await this.buildHeaders(request);
            this.applySessionToken(request);
            // deleteResource will use WriteEndpoint since it uses DELETE operation
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await (0, Plugin_js_1.executePlugins)(diagnosticNode, request, RequestHandler_js_1.RequestHandler.request, Plugin_js_1.PluginOn.operation);
            if ((0, helper_js_1.parseLink)(path).type !== "colls") {
                this.captureSessionToken(undefined, path, constants_js_1.OperationType.Delete, response.headers);
            }
            else {
                this.clearSessionToken(path);
            }
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, constants_js_1.OperationType.Upsert, err.headers);
            throw err;
        }
    }
    async patch({ body, path, resourceType, resourceId, options = {}, partitionKey, diagnosticNode, }) {
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: constants_js_1.HTTPMethod.patch, operationType: constants_js_1.OperationType.Patch, path,
                resourceType,
                body,
                resourceId,
                options,
                partitionKey });
            diagnosticNode.addData({
                operationType: constants_js_1.OperationType.Patch,
                resourceType,
            });
            request.headers = await this.buildHeaders(request);
            this.applySessionToken(request);
            // patch will use WriteEndpoint
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await (0, Plugin_js_1.executePlugins)(diagnosticNode, request, RequestHandler_js_1.RequestHandler.request, Plugin_js_1.PluginOn.operation);
            this.captureSessionToken(undefined, path, constants_js_1.OperationType.Patch, response.headers);
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, constants_js_1.OperationType.Upsert, err.headers);
            throw err;
        }
    }
    async create({ body, path, resourceType, resourceId, diagnosticNode, options = {}, partitionKey, }) {
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: constants_js_1.HTTPMethod.post, operationType: constants_js_1.OperationType.Create, path,
                resourceType,
                resourceId,
                body,
                options,
                partitionKey });
            diagnosticNode.addData({
                operationType: constants_js_1.OperationType.Create,
                resourceType,
            });
            request.headers = await this.buildHeaders(request);
            // create will use WriteEndpoint since it uses POST operation
            this.applySessionToken(request);
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await (0, Plugin_js_1.executePlugins)(diagnosticNode, request, RequestHandler_js_1.RequestHandler.request, Plugin_js_1.PluginOn.operation);
            this.captureSessionToken(undefined, path, constants_js_1.OperationType.Create, response.headers);
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, constants_js_1.OperationType.Upsert, err.headers);
            throw err;
        }
    }
    processQueryFeedResponse(res, isQuery, resultFn) {
        if (isQuery) {
            return {
                result: resultFn(res.result),
                headers: res.headers,
                code: res.code,
            };
        }
        else {
            const newResult = resultFn(res.result).map((body) => body);
            return {
                result: newResult,
                headers: res.headers,
                code: res.code,
            };
        }
    }
    applySessionToken(requestContext) {
        const request = this.getSessionParams(requestContext.path);
        if (requestContext.headers && requestContext.headers[HttpHeaders.SessionToken]) {
            return;
        }
        const sessionConsistency = requestContext.headers[HttpHeaders.ConsistencyLevel];
        if (!sessionConsistency) {
            return;
        }
        if (sessionConsistency !== index_js_1.ConsistencyLevel.Session) {
            return;
        }
        if (request.resourceAddress) {
            const sessionToken = this.sessionContainer.get(request);
            if (sessionToken) {
                requestContext.headers[HttpHeaders.SessionToken] = sessionToken;
            }
        }
    }
    async replace({ body, path, resourceType, resourceId, options = {}, partitionKey, diagnosticNode, }) {
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: constants_js_1.HTTPMethod.put, operationType: constants_js_1.OperationType.Replace, path,
                resourceType,
                body,
                resourceId,
                options,
                partitionKey });
            diagnosticNode.addData({
                operationType: constants_js_1.OperationType.Replace,
                resourceType,
            });
            request.headers = await this.buildHeaders(request);
            this.applySessionToken(request);
            // replace will use WriteEndpoint since it uses PUT operation
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await (0, Plugin_js_1.executePlugins)(diagnosticNode, request, RequestHandler_js_1.RequestHandler.request, Plugin_js_1.PluginOn.operation);
            this.captureSessionToken(undefined, path, constants_js_1.OperationType.Replace, response.headers);
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, constants_js_1.OperationType.Upsert, err.headers);
            throw err;
        }
    }
    async upsert({ body, path, resourceType, resourceId, options = {}, partitionKey, diagnosticNode, }) {
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: constants_js_1.HTTPMethod.post, operationType: constants_js_1.OperationType.Upsert, path,
                resourceType,
                body,
                resourceId,
                options,
                partitionKey });
            diagnosticNode.addData({
                operationType: constants_js_1.OperationType.Upsert,
                resourceType,
            });
            request.headers = await this.buildHeaders(request);
            request.headers[HttpHeaders.IsUpsert] = true;
            this.applySessionToken(request);
            // upsert will use WriteEndpoint since it uses POST operation
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await (0, Plugin_js_1.executePlugins)(diagnosticNode, request, RequestHandler_js_1.RequestHandler.request, Plugin_js_1.PluginOn.operation);
            this.captureSessionToken(undefined, path, constants_js_1.OperationType.Upsert, response.headers);
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, constants_js_1.OperationType.Upsert, err.headers);
            throw err;
        }
    }
    async execute({ sprocLink, params, options = {}, partitionKey, diagnosticNode, }) {
        // Accept a single parameter or an array of parameters.
        // Didn't add type annotation for this because we should legacy this behavior
        if (params !== null && params !== undefined && !Array.isArray(params)) {
            params = [params];
        }
        const path = (0, helper_js_1.getPathFromLink)(sprocLink);
        const id = (0, helper_js_1.getIdFromLink)(sprocLink);
        const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: constants_js_1.HTTPMethod.post, operationType: constants_js_1.OperationType.Execute, path, resourceType: constants_js_1.ResourceType.sproc, options, resourceId: id, body: params, partitionKey });
        diagnosticNode.addData({
            operationType: constants_js_1.OperationType.Execute,
            resourceType: constants_js_1.ResourceType.sproc,
        });
        request.headers = await this.buildHeaders(request);
        // executeStoredProcedure will use WriteEndpoint since it uses POST operation
        request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
        const response = await (0, Plugin_js_1.executePlugins)(diagnosticNode, request, RequestHandler_js_1.RequestHandler.request, Plugin_js_1.PluginOn.operation);
        return response;
    }
    /**
     * Gets the Database account information.
     * @param options - `urlConnection` in the options is the endpoint url whose database account needs to be retrieved.
     * If not present, current client's url will be used.
     */
    async getDatabaseAccount(diagnosticNode, options = {}) {
        const endpoint = options.urlConnection || this.cosmosClientOptions.endpoint;
        const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { endpoint, method: constants_js_1.HTTPMethod.get, operationType: constants_js_1.OperationType.Read, path: "", resourceType: constants_js_1.ResourceType.none, options });
        diagnosticNode.addData({
            operationType: constants_js_1.OperationType.Read,
            resourceType: constants_js_1.ResourceType.none,
        });
        request.headers = await this.buildHeaders(request);
        // await options.beforeOperation({ endpoint, request, headers: requestHeaders });
        const { result, headers, code, substatus, diagnostics } = await (0, Plugin_js_1.executePlugins)(diagnosticNode, request, RequestHandler_js_1.RequestHandler.request, Plugin_js_1.PluginOn.operation);
        const databaseAccount = new index_js_1.DatabaseAccount(result, headers);
        return {
            result: databaseAccount,
            headers,
            diagnostics,
            code: code,
            substatus: substatus,
        };
    }
    getWriteEndpoint(diagnosticNode) {
        return this.globalEndpointManager.getWriteEndpoint(diagnosticNode);
    }
    getReadEndpoint(diagnosticNode) {
        return this.globalEndpointManager.getReadEndpoint(diagnosticNode);
    }
    getWriteEndpoints() {
        return this.globalEndpointManager.getWriteEndpoints();
    }
    getReadEndpoints() {
        return this.globalEndpointManager.getReadEndpoints();
    }
    async batch({ body, path, partitionKey, resourceId, options = {}, diagnosticNode, }) {
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: constants_js_1.HTTPMethod.post, operationType: constants_js_1.OperationType.Batch, path,
                body, resourceType: constants_js_1.ResourceType.item, resourceId,
                options,
                partitionKey });
            diagnosticNode.addData({
                operationType: constants_js_1.OperationType.Batch,
                resourceType: constants_js_1.ResourceType.item,
            });
            request.headers = await this.buildHeaders(request);
            request.headers[HttpHeaders.IsBatchRequest] = true;
            request.headers[HttpHeaders.IsBatchAtomic] = true;
            this.applySessionToken(request);
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await (0, Plugin_js_1.executePlugins)(diagnosticNode, request, RequestHandler_js_1.RequestHandler.request, Plugin_js_1.PluginOn.operation);
            this.captureSessionToken(undefined, path, constants_js_1.OperationType.Batch, response.headers);
            response.diagnostics = diagnosticNode.toDiagnostic(this.getClientConfig());
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, constants_js_1.OperationType.Upsert, err.headers);
            throw err;
        }
    }
    async bulk({ body, path, partitionKeyRangeId, resourceId, bulkOptions = {}, options = {}, diagnosticNode, }) {
        var _a;
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: constants_js_1.HTTPMethod.post, operationType: constants_js_1.OperationType.Batch, path,
                body, resourceType: constants_js_1.ResourceType.item, resourceId,
                options });
            diagnosticNode.addData({
                operationType: constants_js_1.OperationType.Batch,
                resourceType: constants_js_1.ResourceType.item,
            });
            request.headers = await this.buildHeaders(request);
            request.headers[HttpHeaders.IsBatchRequest] = true;
            request.headers[HttpHeaders.PartitionKeyRangeID] = partitionKeyRangeId;
            request.headers[HttpHeaders.IsBatchAtomic] = false;
            request.headers[HttpHeaders.BatchContinueOnError] = (_a = bulkOptions.continueOnError) !== null && _a !== void 0 ? _a : true;
            this.applySessionToken(request);
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await (0, Plugin_js_1.executePlugins)(diagnosticNode, request, RequestHandler_js_1.RequestHandler.request, Plugin_js_1.PluginOn.operation);
            this.captureSessionToken(undefined, path, constants_js_1.OperationType.Batch, response.headers);
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, constants_js_1.OperationType.Upsert, err.headers);
            throw err;
        }
    }
    captureSessionToken(err, path, operationType, resHeaders) {
        const request = this.getSessionParams(path);
        request.operationType = operationType;
        if (!err ||
            (!this.isMasterResource(request.resourceType) &&
                (err.code === statusCodes_js_1.StatusCodes.PreconditionFailed ||
                    err.code === statusCodes_js_1.StatusCodes.Conflict ||
                    (err.code === statusCodes_js_1.StatusCodes.NotFound &&
                        err.substatus !== statusCodes_js_1.SubStatusCodes.ReadSessionNotAvailable)))) {
            this.sessionContainer.set(request, resHeaders);
        }
    }
    clearSessionToken(path) {
        const request = this.getSessionParams(path);
        this.sessionContainer.remove(request);
    }
    recordDiagnostics(diagnostic) {
        const formatted = this.diagnosticFormatter.format(diagnostic);
        this.diagnosticWriter.write(formatted);
    }
    initializeDiagnosticSettings(diagnosticLevel) {
        this.diagnosticFormatter = new DiagnosticFormatter_js_1.DefaultDiagnosticFormatter();
        switch (diagnosticLevel) {
            case CosmosDbDiagnosticLevel_js_1.CosmosDbDiagnosticLevel.info:
                this.diagnosticWriter = new DiagnosticWriter_js_1.NoOpDiagnosticWriter();
                break;
            default:
                this.diagnosticWriter = new DiagnosticWriter_js_1.LogDiagnosticWriter();
        }
    }
    // TODO: move
    getSessionParams(resourceLink) {
        const resourceId = null;
        let resourceAddress = null;
        const parserOutput = (0, helper_js_1.parseLink)(resourceLink);
        resourceAddress = parserOutput.objectBody.self;
        const resourceType = parserOutput.type;
        return {
            resourceId,
            resourceAddress,
            resourceType,
            isNameBased: true,
        };
    }
    isMasterResource(resourceType) {
        if (resourceType === constants_js_1.Constants.Path.OffersPathSegment ||
            resourceType === constants_js_1.Constants.Path.DatabasesPathSegment ||
            resourceType === constants_js_1.Constants.Path.UsersPathSegment ||
            resourceType === constants_js_1.Constants.Path.PermissionsPathSegment ||
            resourceType === constants_js_1.Constants.Path.TopologyPathSegment ||
            resourceType === constants_js_1.Constants.Path.DatabaseAccountPathSegment ||
            resourceType === constants_js_1.Constants.Path.PartitionKeyRangesPathSegment ||
            resourceType === constants_js_1.Constants.Path.CollectionsPathSegment) {
            return true;
        }
        return false;
    }
    buildHeaders(requestContext) {
        return (0, request_js_1.getHeaders)({
            clientOptions: this.cosmosClientOptions,
            defaultHeaders: Object.assign(Object.assign({}, this.cosmosClientOptions.defaultHeaders), requestContext.options.initialHeaders),
            verb: requestContext.method,
            path: requestContext.path,
            resourceId: requestContext.resourceId,
            resourceType: requestContext.resourceType,
            options: requestContext.options,
            partitionKeyRangeId: requestContext.partitionKeyRangeId,
            useMultipleWriteLocations: this.connectionPolicy.useMultipleWriteLocations,
            partitionKey: requestContext.partitionKey !== undefined
                ? (0, index_js_1.convertToInternalPartitionKey)(requestContext.partitionKey)
                : undefined, // TODO: Move this check from here to PartitionKey
            operationType: requestContext.operationType,
        });
    }
    /**
     * Returns collection of properties which are derived from the context for Request Creation.
     * These properties have client wide scope, as opposed to request specific scope.
     * @returns
     */
    getContextDerivedPropsForRequestCreation() {
        return {
            globalEndpointManager: this.globalEndpointManager,
            requestAgent: this.cosmosClientOptions.agent,
            connectionPolicy: this.connectionPolicy,
            client: this,
            plugins: this.cosmosClientOptions.plugins,
            pipeline: this.pipeline,
            httpClient: this.cosmosClientOptions.httpClient,
        };
    }
    getClientConfig() {
        return this.clientConfig;
    }
    /**
     * @internal
     */
    refreshUserAgent(hostFramework) {
        const updatedUserAgent = (0, platform_js_1.getUserAgent)(this.cosmosClientOptions.userAgentSuffix, hostFramework);
        this.cosmosClientOptions.defaultHeaders[constants_js_1.Constants.HttpHeaders.UserAgent] = updatedUserAgent;
        this.cosmosClientOptions.defaultHeaders[constants_js_1.Constants.HttpHeaders.CustomUserAgent] =
            updatedUserAgent;
    }
    /**
     * @internal
     */
    getRetryOptions() {
        return this.connectionPolicy.retryOptions;
    }
}
exports.ClientContext = ClientContext;
//# sourceMappingURL=ClientContext.js.map
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { bearerTokenAuthenticationPolicy, createEmptyPipeline } from "@azure/core-rest-pipeline";
import { Constants, HTTPMethod, OperationType, ResourceType } from "./common/constants.js";
import { getIdFromLink, getPathFromLink, parseLink } from "./common/helper.js";
import { StatusCodes, SubStatusCodes } from "./common/statusCodes.js";
import { ConsistencyLevel, DatabaseAccount, convertToInternalPartitionKey, } from "./documents/index.js";
import { PluginOn, executePlugins } from "./plugins/Plugin.js";
import { QueryIterator } from "./queryIterator.js";
import { getHeaders } from "./request/request.js";
import { RequestHandler } from "./request/RequestHandler.js";
import { SessionContainer } from "./session/sessionContainer.js";
import { sanitizeEndpoint } from "./utils/checkURL.js";
import { supportedQueryFeaturesBuilder } from "./utils/supportedQueryFeaturesBuilder.js";
import { createClientLogger } from "@azure/logger";
import { LogDiagnosticWriter, NoOpDiagnosticWriter } from "./diagnostics/DiagnosticWriter.js";
import { DefaultDiagnosticFormatter } from "./diagnostics/DiagnosticFormatter.js";
import { CosmosDbDiagnosticLevel } from "./diagnostics/CosmosDbDiagnosticLevel.js";
import { randomUUID } from "@azure/core-util";
import { getUserAgent } from "./common/platform.js";
const logger = createClientLogger("ClientContext");
const QueryJsonContentType = "application/query+json";
const HttpHeaders = Constants.HttpHeaders;
/**
 * @hidden
 * @hidden
 */
export class ClientContext {
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
        this.sessionContainer = new SessionContainer();
        this.partitionKeyDefinitionCache = {};
        this.pipeline = null;
        if (cosmosClientOptions.aadCredentials) {
            this.pipeline = createEmptyPipeline();
            const hrefEndpoint = sanitizeEndpoint(cosmosClientOptions.endpoint);
            const scope = `${hrefEndpoint}/.default`;
            this.pipeline.addPolicy(bearerTokenAuthenticationPolicy({
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
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: HTTPMethod.get, path, operationType: OperationType.Read, resourceId,
                options,
                resourceType,
                partitionKey });
            diagnosticNode.addData({
                operationType: OperationType.Read,
                resourceType,
            });
            request.headers = await this.buildHeaders(request);
            if (resourceType === ResourceType.clientencryptionkey) {
                request.headers[HttpHeaders.AllowCachedReadsHeader] = true;
                if (options.databaseRid) {
                    request.headers[HttpHeaders.DatabaseRidHeader] = options.databaseRid;
                }
            }
            this.applySessionToken(request);
            // read will use ReadEndpoint since it uses GET operation
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await executePlugins(diagnosticNode, request, RequestHandler.request, PluginOn.operation);
            this.captureSessionToken(undefined, path, OperationType.Read, response.headers);
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, OperationType.Upsert, err.headers);
            throw err;
        }
    }
    async queryFeed({ path, resourceType, resourceId, resultFn, query, options, diagnosticNode, partitionKeyRangeId, partitionKey, startEpk, endEpk, correlatedActivityId, }) {
        // Query operations will use ReadEndpoint even though it uses
        // GET(for queryFeed) and POST(for regular query operations)
        const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: HTTPMethod.get, path, operationType: OperationType.Query, partitionKeyRangeId,
            resourceId,
            resourceType,
            options, body: query, partitionKey });
        diagnosticNode.addData({
            operationType: OperationType.Query,
            resourceType,
        });
        const requestId = randomUUID();
        if (query !== undefined) {
            request.method = HTTPMethod.post;
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
        const response = await RequestHandler.request(request, diagnosticNode);
        logger.info("query " + requestId + " finished - " + (Date.now() - start) + "ms");
        this.captureSessionToken(undefined, path, OperationType.Query, response.headers);
        return this.processQueryFeedResponse(response, !!query, resultFn);
    }
    async getQueryPlan(path, resourceType, resourceId, query, options = {}, diagnosticNode, correlatedActivityId) {
        const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: HTTPMethod.post, path, operationType: OperationType.Read, resourceId,
            resourceType,
            options, body: query });
        diagnosticNode.addData({
            operationType: OperationType.Read,
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
        request.headers[HttpHeaders.SupportedQueryFeatures] = supportedQueryFeaturesBuilder(options);
        if (typeof query === "string") {
            request.body = { query }; // Converts query text to query object.
        }
        this.applySessionToken(request);
        const response = await RequestHandler.request(request, diagnosticNode);
        this.captureSessionToken(undefined, path, OperationType.Query, response.headers);
        return response;
    }
    queryPartitionKeyRanges(collectionLink, query, options) {
        const path = getPathFromLink(collectionLink, ResourceType.pkranges);
        const id = getIdFromLink(collectionLink);
        const cb = async (diagNode, innerOptions) => {
            const response = await this.queryFeed({
                path,
                resourceType: ResourceType.pkranges,
                resourceId: id,
                resultFn: (result) => result.PartitionKeyRanges,
                query,
                options: innerOptions,
                diagnosticNode: diagNode,
            });
            return response;
        };
        return new QueryIterator(this, query, options, cb);
    }
    async delete({ path, resourceType, resourceId, options = {}, partitionKey, method = HTTPMethod.delete, diagnosticNode, }) {
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: method, operationType: OperationType.Delete, path,
                resourceType,
                options,
                resourceId,
                partitionKey });
            diagnosticNode.addData({
                operationType: OperationType.Delete,
                resourceType,
            });
            request.headers = await this.buildHeaders(request);
            this.applySessionToken(request);
            // deleteResource will use WriteEndpoint since it uses DELETE operation
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await executePlugins(diagnosticNode, request, RequestHandler.request, PluginOn.operation);
            if (parseLink(path).type !== "colls") {
                this.captureSessionToken(undefined, path, OperationType.Delete, response.headers);
            }
            else {
                this.clearSessionToken(path);
            }
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, OperationType.Upsert, err.headers);
            throw err;
        }
    }
    async patch({ body, path, resourceType, resourceId, options = {}, partitionKey, diagnosticNode, }) {
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: HTTPMethod.patch, operationType: OperationType.Patch, path,
                resourceType,
                body,
                resourceId,
                options,
                partitionKey });
            diagnosticNode.addData({
                operationType: OperationType.Patch,
                resourceType,
            });
            request.headers = await this.buildHeaders(request);
            this.applySessionToken(request);
            // patch will use WriteEndpoint
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await executePlugins(diagnosticNode, request, RequestHandler.request, PluginOn.operation);
            this.captureSessionToken(undefined, path, OperationType.Patch, response.headers);
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, OperationType.Upsert, err.headers);
            throw err;
        }
    }
    async create({ body, path, resourceType, resourceId, diagnosticNode, options = {}, partitionKey, }) {
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: HTTPMethod.post, operationType: OperationType.Create, path,
                resourceType,
                resourceId,
                body,
                options,
                partitionKey });
            diagnosticNode.addData({
                operationType: OperationType.Create,
                resourceType,
            });
            request.headers = await this.buildHeaders(request);
            // create will use WriteEndpoint since it uses POST operation
            this.applySessionToken(request);
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await executePlugins(diagnosticNode, request, RequestHandler.request, PluginOn.operation);
            this.captureSessionToken(undefined, path, OperationType.Create, response.headers);
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, OperationType.Upsert, err.headers);
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
        if (sessionConsistency !== ConsistencyLevel.Session) {
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
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: HTTPMethod.put, operationType: OperationType.Replace, path,
                resourceType,
                body,
                resourceId,
                options,
                partitionKey });
            diagnosticNode.addData({
                operationType: OperationType.Replace,
                resourceType,
            });
            request.headers = await this.buildHeaders(request);
            this.applySessionToken(request);
            // replace will use WriteEndpoint since it uses PUT operation
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await executePlugins(diagnosticNode, request, RequestHandler.request, PluginOn.operation);
            this.captureSessionToken(undefined, path, OperationType.Replace, response.headers);
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, OperationType.Upsert, err.headers);
            throw err;
        }
    }
    async upsert({ body, path, resourceType, resourceId, options = {}, partitionKey, diagnosticNode, }) {
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: HTTPMethod.post, operationType: OperationType.Upsert, path,
                resourceType,
                body,
                resourceId,
                options,
                partitionKey });
            diagnosticNode.addData({
                operationType: OperationType.Upsert,
                resourceType,
            });
            request.headers = await this.buildHeaders(request);
            request.headers[HttpHeaders.IsUpsert] = true;
            this.applySessionToken(request);
            // upsert will use WriteEndpoint since it uses POST operation
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await executePlugins(diagnosticNode, request, RequestHandler.request, PluginOn.operation);
            this.captureSessionToken(undefined, path, OperationType.Upsert, response.headers);
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, OperationType.Upsert, err.headers);
            throw err;
        }
    }
    async execute({ sprocLink, params, options = {}, partitionKey, diagnosticNode, }) {
        // Accept a single parameter or an array of parameters.
        // Didn't add type annotation for this because we should legacy this behavior
        if (params !== null && params !== undefined && !Array.isArray(params)) {
            params = [params];
        }
        const path = getPathFromLink(sprocLink);
        const id = getIdFromLink(sprocLink);
        const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: HTTPMethod.post, operationType: OperationType.Execute, path, resourceType: ResourceType.sproc, options, resourceId: id, body: params, partitionKey });
        diagnosticNode.addData({
            operationType: OperationType.Execute,
            resourceType: ResourceType.sproc,
        });
        request.headers = await this.buildHeaders(request);
        // executeStoredProcedure will use WriteEndpoint since it uses POST operation
        request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
        const response = await executePlugins(diagnosticNode, request, RequestHandler.request, PluginOn.operation);
        return response;
    }
    /**
     * Gets the Database account information.
     * @param options - `urlConnection` in the options is the endpoint url whose database account needs to be retrieved.
     * If not present, current client's url will be used.
     */
    async getDatabaseAccount(diagnosticNode, options = {}) {
        const endpoint = options.urlConnection || this.cosmosClientOptions.endpoint;
        const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { endpoint, method: HTTPMethod.get, operationType: OperationType.Read, path: "", resourceType: ResourceType.none, options });
        diagnosticNode.addData({
            operationType: OperationType.Read,
            resourceType: ResourceType.none,
        });
        request.headers = await this.buildHeaders(request);
        // await options.beforeOperation({ endpoint, request, headers: requestHeaders });
        const { result, headers, code, substatus, diagnostics } = await executePlugins(diagnosticNode, request, RequestHandler.request, PluginOn.operation);
        const databaseAccount = new DatabaseAccount(result, headers);
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
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: HTTPMethod.post, operationType: OperationType.Batch, path,
                body, resourceType: ResourceType.item, resourceId,
                options,
                partitionKey });
            diagnosticNode.addData({
                operationType: OperationType.Batch,
                resourceType: ResourceType.item,
            });
            request.headers = await this.buildHeaders(request);
            request.headers[HttpHeaders.IsBatchRequest] = true;
            request.headers[HttpHeaders.IsBatchAtomic] = true;
            this.applySessionToken(request);
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await executePlugins(diagnosticNode, request, RequestHandler.request, PluginOn.operation);
            this.captureSessionToken(undefined, path, OperationType.Batch, response.headers);
            response.diagnostics = diagnosticNode.toDiagnostic(this.getClientConfig());
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, OperationType.Upsert, err.headers);
            throw err;
        }
    }
    async bulk({ body, path, partitionKeyRangeId, resourceId, bulkOptions = {}, options = {}, diagnosticNode, }) {
        var _a;
        try {
            const request = Object.assign(Object.assign({}, this.getContextDerivedPropsForRequestCreation()), { method: HTTPMethod.post, operationType: OperationType.Batch, path,
                body, resourceType: ResourceType.item, resourceId,
                options });
            diagnosticNode.addData({
                operationType: OperationType.Batch,
                resourceType: ResourceType.item,
            });
            request.headers = await this.buildHeaders(request);
            request.headers[HttpHeaders.IsBatchRequest] = true;
            request.headers[HttpHeaders.PartitionKeyRangeID] = partitionKeyRangeId;
            request.headers[HttpHeaders.IsBatchAtomic] = false;
            request.headers[HttpHeaders.BatchContinueOnError] = (_a = bulkOptions.continueOnError) !== null && _a !== void 0 ? _a : true;
            this.applySessionToken(request);
            request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(diagnosticNode, request.resourceType, request.operationType);
            const response = await executePlugins(diagnosticNode, request, RequestHandler.request, PluginOn.operation);
            this.captureSessionToken(undefined, path, OperationType.Batch, response.headers);
            return response;
        }
        catch (err) {
            this.captureSessionToken(err, path, OperationType.Upsert, err.headers);
            throw err;
        }
    }
    captureSessionToken(err, path, operationType, resHeaders) {
        const request = this.getSessionParams(path);
        request.operationType = operationType;
        if (!err ||
            (!this.isMasterResource(request.resourceType) &&
                (err.code === StatusCodes.PreconditionFailed ||
                    err.code === StatusCodes.Conflict ||
                    (err.code === StatusCodes.NotFound &&
                        err.substatus !== SubStatusCodes.ReadSessionNotAvailable)))) {
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
        this.diagnosticFormatter = new DefaultDiagnosticFormatter();
        switch (diagnosticLevel) {
            case CosmosDbDiagnosticLevel.info:
                this.diagnosticWriter = new NoOpDiagnosticWriter();
                break;
            default:
                this.diagnosticWriter = new LogDiagnosticWriter();
        }
    }
    // TODO: move
    getSessionParams(resourceLink) {
        const resourceId = null;
        let resourceAddress = null;
        const parserOutput = parseLink(resourceLink);
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
        if (resourceType === Constants.Path.OffersPathSegment ||
            resourceType === Constants.Path.DatabasesPathSegment ||
            resourceType === Constants.Path.UsersPathSegment ||
            resourceType === Constants.Path.PermissionsPathSegment ||
            resourceType === Constants.Path.TopologyPathSegment ||
            resourceType === Constants.Path.DatabaseAccountPathSegment ||
            resourceType === Constants.Path.PartitionKeyRangesPathSegment ||
            resourceType === Constants.Path.CollectionsPathSegment) {
            return true;
        }
        return false;
    }
    buildHeaders(requestContext) {
        return getHeaders({
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
                ? convertToInternalPartitionKey(requestContext.partitionKey)
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
        const updatedUserAgent = getUserAgent(this.cosmosClientOptions.userAgentSuffix, hostFramework);
        this.cosmosClientOptions.defaultHeaders[Constants.HttpHeaders.UserAgent] = updatedUserAgent;
        this.cosmosClientOptions.defaultHeaders[Constants.HttpHeaders.CustomUserAgent] =
            updatedUserAgent;
    }
    /**
     * @internal
     */
    getRetryOptions() {
        return this.connectionPolicy.retryOptions;
    }
}
//# sourceMappingURL=ClientContext.js.map
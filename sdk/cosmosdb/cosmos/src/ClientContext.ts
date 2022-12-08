// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { v4 } from "uuid";
const uuid = v4;
import {
  Pipeline,
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
} from "@azure/core-rest-pipeline";
import { PartitionKeyRange } from "./client/Container/PartitionKeyRange";
import { isResource, Resource } from "./client/Resource";
import { Constants, HTTPMethod, OperationType, ResourceType } from "./common/constants";
import { getIdFromLink, getPathFromLink, parseLink } from "./common/helper";
import { StatusCodes, SubStatusCodes } from "./common/statusCodes";
import { Agent, CosmosClientOptions } from "./CosmosClientOptions";
import { ConnectionPolicy, ConsistencyLevel, DatabaseAccount, PartitionKey } from "./documents";
import { GlobalEndpointManager } from "./globalEndpointManager";
import { PluginConfig, PluginOn, executePlugins } from "./plugins/Plugin";
import { FetchFunctionCallback, SqlQuerySpec } from "./queryExecutionContext";
import { CosmosHeaders } from "./queryExecutionContext/CosmosHeaders";
import { QueryIterator } from "./queryIterator";
import { ErrorResponse } from "./request";
import { FeedOptions, RequestOptions, Response } from "./request";
import { PartitionedQueryExecutionInfo } from "./request/ErrorResponse";
import { getHeaders } from "./request/request";
import { RequestContext } from "./request/RequestContext";
import { RequestHandler } from "./request/RequestHandler";
import { SessionContainer } from "./session/sessionContainer";
import { SessionContext } from "./session/SessionContext";
import { BulkOptions } from "./utils/batch";
import { sanitizeEndpoint } from "./utils/checkURL";
import { AzureLogger, createClientLogger } from "@azure/logger";
import { assertNotUndefinedOrFail, stripNullables, WithRequired } from "./utils/typeUtils";
import { MaterializedResponse } from "./request/Response";

const logger: AzureLogger = createClientLogger("ClientContext");

const QueryJsonContentType = "application/query+json";

/**
 * @hidden
 * @hidden
 */
export class ClientContext {
  private readonly sessionContainer: SessionContainer;
  private connectionPolicy: ConnectionPolicy;
  private pipeline?: Pipeline;
  public partitionKeyDefinitionCache: { [containerUrl: string]: any }; // TODO: PartitionKeyDefinitionCache
  public constructor(
    private cosmosClientOptions: WithRequired<CosmosClientOptions, 'connectionPolicy'>,
    private globalEndpointManager: GlobalEndpointManager
  ) {
    this.connectionPolicy = cosmosClientOptions.connectionPolicy;
    this.sessionContainer = new SessionContainer();
    this.partitionKeyDefinitionCache = {};
    if (cosmosClientOptions.aadCredentials) {
      this.pipeline = createEmptyPipeline();
      const hrefEndpoint = sanitizeEndpoint(cosmosClientOptions.endpoint);
      const scope = `${hrefEndpoint}/.default`;
      this.pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({
          credential: cosmosClientOptions.aadCredentials,
          scopes: scope,
          challengeCallbacks: {
            async authorizeRequest({ request, getAccessToken }) {
              const tokenResponse = await getAccessToken([scope], {});
              const AUTH_PREFIX = `type=aad&ver=1.0&sig=`;
              const authorizationToken = `${AUTH_PREFIX}${stripNullables(tokenResponse).token}`;
              request.headers.set("Authorization", authorizationToken);
            },
          },
        })
      );
    }
  }
  /** @hidden */
  public async read({
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
  }: {
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
  }): Promise<MaterializedResponse<Resource>> {
    try {
      const request: WithRequired<RequestContext, "path" | "resourceId" | "resourceType" | "operationType" | "headers"> = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.get,
        path,
        operationType: OperationType.Read,
        resourceId,
        options,
        resourceType,
        partitionKey,
        headers: {}
      };

      request.headers = await this.buildHeaders(request);
      this.applySessionToken(request);

      // read will use ReadEndpoint since it uses GET operation
      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        request.resourceType,
        request.operationType
      );
      const response = await executePlugins(request, RequestHandler.request, PluginOn.operation);
      this.captureSessionToken(undefined, path, OperationType.Read, response.headers);
      return this.validateObjectIsMaterializedResource(response);
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  private validateObjectIsMaterializedResource<T>(response: Response<T>): MaterializedResponse<Resource> {
    const resource = this.validateObjectIsResource(response);
    return this.validateObjectIsMaterialized(resource);
  }

  private validateObjectIsMaterialized(resource: Response<any>): MaterializedResponse<any> {
    if (resource.code === undefined || resource.headers === undefined || resource.result === undefined) throw new Error("Expected a Materialized Response");
    return {
      result: resource.result,
      code: resource.code,
      ...resource
    }
  }
  private validateObjectIsResource(response: Response<any>): Response<Resource> {
    let result: any = assertNotUndefinedOrFail(response.result);
    if (isResource(result)) {
      result = result as Resource
      return {
        result,
        ...response
      }
    }
    throw new Error("Expected a resource.")
  }

  public async queryFeed({
    path,
    resourceType,
    resourceId,
    resultFn,
    query,
    options,
    partitionKeyRangeId,
    partitionKey,
  }: {
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    resultFn: (result: { [key: string]: any }) => any[];
    query: SqlQuerySpec | string | undefined;
    options: FeedOptions;
    partitionKeyRangeId?: string;
    partitionKey?: PartitionKey;
  }): Promise<MaterializedResponse<Resource>> {
    // Query operations will use ReadEndpoint even though it uses
    // GET(for queryFeed) and POST(for regular query operations)

    const request: WithRequired<RequestContext, "path" | "resourceId" | "resourceType" | "operationType" | "headers"> = {
      ...this.getContextDerivedPropsForRequestCreation(),
      method: HTTPMethod.get,
      path,
      operationType: OperationType.Query,
      partitionKeyRangeId,
      resourceId,
      resourceType,
      options,
      body: query,
      partitionKey,
      headers: {}
    };
    const requestId = uuid();
    if (query !== undefined) {
      request.method = HTTPMethod.post;
    }
    request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
      request.resourceType,
      request.operationType
    );
    request.headers = await this.buildHeaders(request);
    if (query !== undefined) {
      request.headers[Constants.HttpHeaders.IsQuery] = "true";
      request.headers[Constants.HttpHeaders.ContentType] = QueryJsonContentType;
      if (typeof query === "string") {
        request.body = { query }; // Converts query text to query object.
      }
    }
    this.applySessionToken(request);
    logger.info(
      "query " +
        requestId +
        " started" +
        (request.partitionKeyRangeId ? " pkrid: " + request.partitionKeyRangeId : "")
    );
    logger.verbose(request);
    const start = Date.now();
    const response = await RequestHandler.request(request);
    logger.info("query " + requestId + " finished - " + (Date.now() - start) + "ms");
    this.captureSessionToken(undefined, path, OperationType.Query, response.headers);
    const materializedResponse: MaterializedResponse<any> = this.validateObjectIsMaterializedResource(response);
    return this.processQueryFeedResponse(materializedResponse, !!query, resultFn);
  }

  public async getQueryPlan(
    path: string,
    resourceType: ResourceType,
    resourceId: string,
    query: SqlQuerySpec | string,
    options: FeedOptions = {}
  ): Promise<Response<PartitionedQueryExecutionInfo>> {
    const request: WithRequired<RequestContext, "path" | "resourceId" | "resourceType" | "operationType" | "headers"> = {
      ...this.getContextDerivedPropsForRequestCreation(),
      method: HTTPMethod.post,
      path,
      operationType: OperationType.Read,
      resourceId,
      resourceType,
      options,
      body: query,
      headers: {}
    };

    request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
      request.resourceType,
      request.operationType
    );
    request.headers = await this.buildHeaders(request);
    request.headers[Constants.HttpHeaders.IsQueryPlan] = "True";
    request.headers[Constants.HttpHeaders.QueryVersion] = "1.4";
    request.headers[Constants.HttpHeaders.SupportedQueryFeatures] =
      "NonValueAggregate, Aggregate, Distinct, MultipleOrderBy, OffsetAndLimit, OrderBy, Top, CompositeAggregate, GroupBy, MultipleAggregates";
    request.headers[Constants.HttpHeaders.ContentType] = QueryJsonContentType;
    if (typeof query === "string") {
      request.body = { query }; // Converts query text to query object.
    }

    this.applySessionToken(request);
    const response = await RequestHandler.request(request);
    this.captureSessionToken(undefined, path, OperationType.Query, response.headers);
    return response as any;
  }

  public queryPartitionKeyRanges(
    collectionLink: string,
    query?: string | SqlQuerySpec,
    options?: FeedOptions
  ): QueryIterator<PartitionKeyRange> {
    const path = getPathFromLink(collectionLink, ResourceType.pkranges);
    const id = getIdFromLink(collectionLink);
    const cb: FetchFunctionCallback = (innerOptions) => {
      return this.queryFeed({
        path,
        resourceType: ResourceType.pkranges,
        resourceId: id,
        resultFn: (result) => result.PartitionKeyRanges,
        query,
        options: innerOptions,
      });
    };
    return new QueryIterator<PartitionKeyRange>(this, query, options, cb);
  }

  public async delete({
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
  }: {
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
  }): Promise<MaterializedResponse<Resource>> {
    try {
      const request: WithRequired<RequestContext, "path" | "resourceId" | "resourceType" | "operationType" | "headers"> = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.delete,
        operationType: OperationType.Delete,
        path,
        resourceType,
        options,
        resourceId,
        partitionKey,
        headers: {}
      };

      request.headers = await this.buildHeaders(request);
      this.applySessionToken(request);
      // deleteResource will use WriteEndpoint since it uses DELETE operation
      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        request.resourceType,
        request.operationType
      );
      const response = await executePlugins(request, RequestHandler.request, PluginOn.operation);
      if (parseLink(path).type !== "colls") {
        this.captureSessionToken(undefined, path, OperationType.Delete, response.headers);
      } else {
        this.clearSessionToken(path);
      }
      return this.validateObjectIsMaterializedResource(response);
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  public async patch({
    body,
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
  }: {
    body: any;
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
  }): Promise<MaterializedResponse<Resource>> {
    try {
      const request: WithRequired<RequestContext, "path" | "resourceId" | "resourceType" | "operationType" | "headers"> = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.patch,
        operationType: OperationType.Patch,
        path,
        resourceType,
        body,
        resourceId,
        options,
        partitionKey,
        headers: {}
      };

      request.headers = await this.buildHeaders(request);
      this.applySessionToken(request);

      // patch will use WriteEndpoint
      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        request.resourceType,
        request.operationType
      );
      const response = await executePlugins(request, RequestHandler.request, PluginOn.operation);
      this.captureSessionToken(undefined, path, OperationType.Patch, response.headers);
      return this.validateObjectIsMaterializedResource(response);
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  public async create({
    body,
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
  }: {
    body: any;
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
  }): Promise<MaterializedResponse<Resource>> {
    try {
      const request: WithRequired<RequestContext, "path" | "resourceId" | "resourceType" | "operationType" | "headers"> = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.post,
        operationType: OperationType.Create,
        path,
        resourceType,
        resourceId,
        body,
        options,
        partitionKey,
        headers: {}
      };

      request.headers = await this.buildHeaders(request);
      // create will use WriteEndpoint since it uses POST operation
      this.applySessionToken(request);

      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        request.resourceType,
        request.operationType
      );
      const response = await executePlugins(request, RequestHandler.request, PluginOn.operation);
      this.captureSessionToken(undefined, path, OperationType.Create, response.headers);
      return this.validateObjectIsMaterializedResource(response);
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  private processQueryFeedResponse(
    res: MaterializedResponse<any>,
    isQuery: boolean,
    resultFn: (result: { [key: string]: any }) => any[]
  ): MaterializedResponse<any>  {
    if (isQuery) {
      return { result: resultFn(res.result), headers: res.headers, code: res.code };
    } else {
      const newResult = resultFn(res.result).map((body: any) => body);
      return { result: newResult, headers: res.headers, code: res.code };
    }
  }

  private applySessionToken(requestContext: WithRequired<RequestContext, "headers" | "path">): void {
    const request = this.getSessionParams(requestContext.path);

    if (requestContext.headers && requestContext.headers[Constants.HttpHeaders.SessionToken]) {
      return;
    }

    const sessionConsistency: ConsistencyLevel = requestContext.headers[
      Constants.HttpHeaders.ConsistencyLevel
    ] as ConsistencyLevel;
    if (!sessionConsistency) {
      return;
    }

    if (sessionConsistency !== ConsistencyLevel.Session) {
      return;
    }

    if (request.resourceAddress) {
      const sessionToken = this.sessionContainer.get(request);
      if (sessionToken) {
        requestContext.headers[Constants.HttpHeaders.SessionToken] = sessionToken;
      }
    }
  }

  public async replace({
    body,
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
  }: {
    body: any;
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
  }): Promise<MaterializedResponse<Resource>> {
    try {
      const request: WithRequired<RequestContext, "path" | "resourceId" | "resourceType" | "operationType" | "headers"> = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.put,
        operationType: OperationType.Replace,
        path,
        resourceType,
        body,
        resourceId,
        options,
        partitionKey,
        headers: {}
      };

      request.headers = await this.buildHeaders(request);
      this.applySessionToken(request);

      // replace will use WriteEndpoint since it uses PUT operation
      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        request.resourceType,
        request.operationType
      );
      const response = await executePlugins(request, RequestHandler.request, PluginOn.operation);
      this.captureSessionToken(undefined, path, OperationType.Replace, response.headers);
      return this.validateObjectIsMaterializedResource(response);
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  public async upsert({
    body,
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
  }: {
    body: any;
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
  }): Promise<MaterializedResponse<Resource>> {
    try {
      const request: WithRequired<RequestContext, "path" | "resourceId" | "resourceType" | "operationType" | "headers"> = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.post,
        operationType: OperationType.Upsert,
        path,
        resourceType,
        body,
        resourceId,
        options,
        partitionKey,
        headers: {}
      };

      request.headers = await this.buildHeaders(request);
      request.headers[Constants.HttpHeaders.IsUpsert] = true;
      this.applySessionToken(request);

      // upsert will use WriteEndpoint since it uses POST operation
      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        request.resourceType,
        request.operationType
      );
      const response = await executePlugins(request, RequestHandler.request, PluginOn.operation);
      this.captureSessionToken(undefined, path, OperationType.Upsert, response.headers);
      return this.validateObjectIsMaterializedResource(response);
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  public async execute<T>({
    sprocLink,
    params,
    options = {},
    partitionKey,
  }: {
    sprocLink: string;
    params?: any[];
    options?: RequestOptions;
    partitionKey?: PartitionKey;
  }): Promise<MaterializedResponse<T>> {
    // Accept a single parameter or an array of parameters.
    // Didn't add type annotation for this because we should legacy this behavior
    if (params !== null && params !== undefined && !Array.isArray(params)) {
      params = [params];
    }
    const path = getPathFromLink(sprocLink);
    const id = getIdFromLink(sprocLink);

    const request: WithRequired<RequestContext, "path" | "resourceId" | "resourceType" | "operationType" | "headers"> = {
      ...this.getContextDerivedPropsForRequestCreation(),
      method: HTTPMethod.post,
      operationType: OperationType.Execute,
      path,
      resourceType: ResourceType.sproc,
      options,
      resourceId: id,
      body: params,
      partitionKey,
      headers: {}
    };

    request.headers = await this.buildHeaders(request);
    // executeStoredProcedure will use WriteEndpoint since it uses POST operation
    request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
      request.resourceType,
      request.operationType
    );
    const response = await executePlugins(request, RequestHandler.request, PluginOn.operation);
    return this.validateObjectIsMaterialized(response);
  }

  /**
   * Gets the Database account information.
   * @param options - `urlConnection` in the options is the endpoint url whose database account needs to be retrieved.
   * If not present, current client's url will be used.
   */
  public async getDatabaseAccount(
    options: RequestOptions = {}
  ): Promise<Response<DatabaseAccount>> {
    const endpoint = options.urlConnection || this.cosmosClientOptions.endpoint;
    const request: WithRequired<RequestContext, "path" | "resourceType" | "operationType" | "headers"| "resourceId"> = {
      ...this.getContextDerivedPropsForRequestCreation(),
      endpoint,
      method: HTTPMethod.get,
      resourceId: undefined as any,
      operationType: OperationType.Read,
      path: "",
      resourceType: ResourceType.none,
      options,
      headers: {}
    };

    request.headers = await this.buildHeaders(request);
    // await options.beforeOperation({ endpoint, request, headers: requestHeaders });
    const { result, headers } = await executePlugins(
      request,
      RequestHandler.request,
      PluginOn.operation
    );

    const databaseAccount = new DatabaseAccount(result, headers);

    return { result: databaseAccount, headers };
  }

  public getWriteEndpoint(): Promise<string> {
    return this.globalEndpointManager.getWriteEndpoint();
  }

  public getReadEndpoint(): Promise<string> {
    return this.globalEndpointManager.getReadEndpoint();
  }

  public getWriteEndpoints(): Promise<readonly string[]> {
    return this.globalEndpointManager.getWriteEndpoints();
  }

  public getReadEndpoints(): Promise<readonly string[]> {
    return this.globalEndpointManager.getReadEndpoints();
  }

  public async batch<T>({
    body,
    path,
    partitionKey,
    resourceId,
    options = {},
  }: {
    body: T;
    path: string;
    partitionKey: string;
    resourceId: string;
    options?: RequestOptions;
  }): Promise<Response<any>> {
    try {
      const request: WithRequired<RequestContext, "path" | "resourceId" | "resourceType" | "operationType" | "headers"> = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.post,
        operationType: OperationType.Batch,
        path,
        body,
        resourceType: ResourceType.item,
        resourceId,
        options,
        partitionKey,
        headers: {}
      };

      request.headers = await this.buildHeaders(request);
      request.headers[Constants.HttpHeaders.IsBatchRequest] = true;
      request.headers[Constants.HttpHeaders.IsBatchAtomic] = true;

      this.applySessionToken(request);

      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        request.resourceType,
        request.operationType
      );
      const response = await executePlugins(request, RequestHandler.request, PluginOn.operation);
      this.captureSessionToken(undefined, path, OperationType.Batch, response.headers);
      return response;
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  public async bulk<T>({
    body,
    path,
    partitionKeyRangeId,
    resourceId,
    bulkOptions = {},
    options = {},
  }: {
    body: T;
    path: string;
    partitionKeyRangeId: string;
    resourceId: string;
    bulkOptions?: BulkOptions;
    options?: RequestOptions;
  }): Promise<Response<any>> {
    try {
      const request: WithRequired<RequestContext, "path" | "resourceId" | "resourceType" | "operationType" | "headers"> = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.post,
        operationType: OperationType.Batch,
        path,
        body,
        resourceType: ResourceType.item,
        resourceId,
        options,
        headers: {}
      };

      request.headers = await this.buildHeaders(request);
      request.headers[Constants.HttpHeaders.IsBatchRequest] = true;
      request.headers[Constants.HttpHeaders.PartitionKeyRangeID] = partitionKeyRangeId;
      request.headers[Constants.HttpHeaders.IsBatchAtomic] = false;
      request.headers[Constants.HttpHeaders.BatchContinueOnError] =
        bulkOptions.continueOnError || false;

      this.applySessionToken(request);

      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        request.resourceType,
        request.operationType
      );
      const response = await executePlugins(request, RequestHandler.request, PluginOn.operation);
      this.captureSessionToken(undefined, path, OperationType.Batch, response.headers);
      return response;
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  private captureSessionToken(
    err: ErrorResponse | undefined,
    path: string,
    operationType: OperationType,
    resHeaders?: CosmosHeaders
  ): void {
    const request = this.getSessionParams(path);
    request.operationType = operationType;
    if (
      !err ||
      (!this.isMasterResource(request.resourceType) &&
        (err.code === StatusCodes.PreconditionFailed ||
          err.code === StatusCodes.Conflict ||
          (err.code === StatusCodes.NotFound &&
            err.substatus !== SubStatusCodes.ReadSessionNotAvailable)))
    ) {
      this.sessionContainer.set(request, resHeaders);
    }
  }

  public clearSessionToken(path: string): void {
    const request = this.getSessionParams(path);
    this.sessionContainer.remove(request);
  }

  private getSessionParams(resourceLink: string): SessionContext {
    const resourceId: string = null;
    let resourceAddress: string | undefined = null;
    const parserOutput = parseLink(resourceLink);

    resourceAddress = parserOutput.objectBody?.self;

    const resourceType = parserOutput.type;
    return {
      resourceId,
      resourceAddress,
      resourceType,
      isNameBased: true,
    };
  }

  private isMasterResource(resourceType?: string): boolean {
    if (
      resourceType === Constants.Path.OffersPathSegment ||
      resourceType === Constants.Path.DatabasesPathSegment ||
      resourceType === Constants.Path.UsersPathSegment ||
      resourceType === Constants.Path.PermissionsPathSegment ||
      resourceType === Constants.Path.TopologyPathSegment ||
      resourceType === Constants.Path.DatabaseAccountPathSegment ||
      resourceType === Constants.Path.PartitionKeyRangesPathSegment ||
      resourceType === Constants.Path.CollectionsPathSegment
    ) {
      return true;
    }

    return false;
  }

  private buildHeaders(requestContext: WithRequired<RequestContext, "path" | "resourceId" | "resourceType" | "headers">): Promise<CosmosHeaders> {
    return getHeaders({
      clientOptions: this.cosmosClientOptions,
      defaultHeaders: {
        ...this.cosmosClientOptions.defaultHeaders,
        ...requestContext.options.initialHeaders,
      },
      verb: requestContext.method,
      path: requestContext.path,
      resourceId: requestContext.resourceId,
      resourceType: requestContext.resourceType,
      options: requestContext.options,
      partitionKeyRangeId: requestContext.partitionKeyRangeId,
      useMultipleWriteLocations: this.connectionPolicy.useMultipleWriteLocations,
      partitionKey: requestContext.partitionKey,
    });
  }

  /**
   * Returns collection of properties which are derived from the context for Request Creation
   * @returns
   */
  private getContextDerivedPropsForRequestCreation(): {
    globalEndpointManager: GlobalEndpointManager;
    connectionPolicy: ConnectionPolicy;
    requestAgent?: Agent;
    client?: ClientContext;
    pipeline?: Pipeline;
    plugins?: PluginConfig[];
  } {
    return {
      globalEndpointManager: this.globalEndpointManager,
      requestAgent: this.cosmosClientOptions.agent,
      connectionPolicy: this.connectionPolicy,
      client: this,
      plugins: this.cosmosClientOptions.plugins,
      pipeline: this.pipeline,
    };
  }
}

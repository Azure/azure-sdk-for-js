// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Pipeline,
  bearerTokenAuthenticationPolicy,
  createEmptyPipeline,
} from "@azure/core-rest-pipeline";
import { PartitionKeyRange } from "./client/Container/PartitionKeyRange";
import { Resource } from "./client/Resource";
import { Constants, HTTPMethod, OperationType, ResourceType } from "./common/constants";
import { getIdFromLink, getPathFromLink, parseLink } from "./common/helper";
import { StatusCodes, SubStatusCodes } from "./common/statusCodes";
import { Agent, CosmosClientOptions } from "./CosmosClientOptions";
import {
  ConnectionPolicy,
  ConsistencyLevel,
  DatabaseAccount,
  PartitionKey,
  convertToInternalPartitionKey,
} from "./documents";
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
import { ClientConfigDiagnostic, CosmosDiagnostics } from "./CosmosDiagnostics";
import { DiagnosticNodeInternal } from "./diagnostics/DiagnosticNodeInternal";
import {
  DiagnosticWriter,
  LogDiagnosticWriter,
  NoOpDiagnosticWriter,
} from "./diagnostics/DiagnosticWriter";
import { DefaultDiagnosticFormatter, DiagnosticFormatter } from "./diagnostics/DiagnosticFormatter";
import { CosmosDbDiagnosticLevel } from "./diagnostics/CosmosDbDiagnosticLevel";
import { randomUUID } from "@azure/core-util";

const logger: AzureLogger = createClientLogger("ClientContext");

const QueryJsonContentType = "application/query+json";
const HttpHeaders = Constants.HttpHeaders;
/**
 * @hidden
 * @hidden
 */
export class ClientContext {
  private readonly sessionContainer: SessionContainer;
  private connectionPolicy: ConnectionPolicy;
  private pipeline: Pipeline;
  private diagnosticWriter: DiagnosticWriter;
  private diagnosticFormatter: DiagnosticFormatter;
  public partitionKeyDefinitionCache: { [containerUrl: string]: any }; // TODO: PartitionKeyDefinitionCache
  public constructor(
    private cosmosClientOptions: CosmosClientOptions,
    private globalEndpointManager: GlobalEndpointManager,
    private clientConfig: ClientConfigDiagnostic,
    public diagnosticLevel: CosmosDbDiagnosticLevel,
  ) {
    this.connectionPolicy = cosmosClientOptions.connectionPolicy;
    this.sessionContainer = new SessionContainer();
    this.partitionKeyDefinitionCache = {};
    this.pipeline = null;
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
              const authorizationToken = `${AUTH_PREFIX}${tokenResponse.token}`;
              request.headers.set("Authorization", authorizationToken);
            },
          },
        }),
      );
    }
    this.initializeDiagnosticSettings(diagnosticLevel);
  }
  /** @hidden */
  public async read<T>({
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
    diagnosticNode,
  }: {
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<T & Resource>> {
    try {
      const request: RequestContext = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.get,
        path,
        operationType: OperationType.Read,
        resourceId,
        options,
        resourceType,
        partitionKey,
      };
      diagnosticNode.addData({
        operationType: OperationType.Read,
        resourceType,
      });

      request.headers = await this.buildHeaders(request);
      this.applySessionToken(request);

      // read will use ReadEndpoint since it uses GET operation
      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        diagnosticNode,
        request.resourceType,
        request.operationType,
      );
      const response = await executePlugins(
        diagnosticNode,
        request,
        RequestHandler.request,
        PluginOn.operation,
      );
      this.captureSessionToken(undefined, path, OperationType.Read, response.headers);
      return response;
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  public async queryFeed<T>({
    path,
    resourceType,
    resourceId,
    resultFn,
    query,
    options,
    diagnosticNode,
    partitionKeyRangeId,
    partitionKey,
    startEpk,
    endEpk,
    correlatedActivityId,
  }: {
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    resultFn: (result: { [key: string]: any }) => any[];
    query: SqlQuerySpec | string;
    options: FeedOptions;
    diagnosticNode: DiagnosticNodeInternal;
    partitionKeyRangeId?: string;
    partitionKey?: PartitionKey;
    startEpk?: string | undefined;
    endEpk?: string | undefined;
    correlatedActivityId?: string;
  }): Promise<Response<T & Resource>> {
    // Query operations will use ReadEndpoint even though it uses
    // GET(for queryFeed) and POST(for regular query operations)

    const request: RequestContext = {
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
    };
    diagnosticNode.addData({
      operationType: OperationType.Query,
      resourceType,
    });
    const requestId = randomUUID();
    if (query !== undefined) {
      request.method = HTTPMethod.post;
    }
    request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
      diagnosticNode,
      request.resourceType,
      request.operationType,
    );
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
    logger.info(
      "query " +
        requestId +
        " started" +
        (request.partitionKeyRangeId ? " pkrid: " + request.partitionKeyRangeId : ""),
    );
    logger.verbose(request);
    const start = Date.now();
    const response = await RequestHandler.request(request, diagnosticNode);
    logger.info("query " + requestId + " finished - " + (Date.now() - start) + "ms");
    this.captureSessionToken(undefined, path, OperationType.Query, response.headers);
    return this.processQueryFeedResponse(response, !!query, resultFn);
  }

  public async getQueryPlan(
    path: string,
    resourceType: ResourceType,
    resourceId: string,
    query: SqlQuerySpec | string,
    options: FeedOptions = {},
    diagnosticNode: DiagnosticNodeInternal,
    correlatedActivityId?: string,
  ): Promise<Response<PartitionedQueryExecutionInfo>> {
    const request: RequestContext = {
      ...this.getContextDerivedPropsForRequestCreation(),
      method: HTTPMethod.post,
      path,
      operationType: OperationType.Read,
      resourceId,
      resourceType,
      options,
      body: query,
    };
    diagnosticNode.addData({
      operationType: OperationType.Read,
      resourceType,
    });
    request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
      diagnosticNode,
      request.resourceType,
      request.operationType,
    );
    request.headers = await this.buildHeaders(request);
    if (correlatedActivityId !== undefined) {
      request.headers[HttpHeaders.CorrelatedActivityId] = correlatedActivityId;
    }
    request.headers[HttpHeaders.IsQueryPlan] = "True";
    request.headers[HttpHeaders.QueryVersion] = "1.4";
    request.headers[HttpHeaders.SupportedQueryFeatures] =
      "NonValueAggregate, Aggregate, Distinct, MultipleOrderBy, OffsetAndLimit, OrderBy, Top, CompositeAggregate, GroupBy, MultipleAggregates, ListAndSetAggregate";
    request.headers[HttpHeaders.ContentType] = QueryJsonContentType;
    if (typeof query === "string") {
      request.body = { query }; // Converts query text to query object.
    }

    this.applySessionToken(request);
    const response = await RequestHandler.request(request, diagnosticNode);
    this.captureSessionToken(undefined, path, OperationType.Query, response.headers);
    return response as any;
  }

  public queryPartitionKeyRanges(
    collectionLink: string,
    query?: string | SqlQuerySpec,
    options?: FeedOptions,
  ): QueryIterator<PartitionKeyRange> {
    const path = getPathFromLink(collectionLink, ResourceType.pkranges);
    const id = getIdFromLink(collectionLink);
    const cb: FetchFunctionCallback = async (diagNode, innerOptions) => {
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
    return new QueryIterator<PartitionKeyRange>(this, query, options, cb);
  }

  public async delete<T>({
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
    method = HTTPMethod.delete,
    diagnosticNode,
  }: {
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
    method?: HTTPMethod;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<T & Resource>> {
    try {
      const request: RequestContext = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: method,
        operationType: OperationType.Delete,
        path,
        resourceType,
        options,
        resourceId,
        partitionKey,
      };
      diagnosticNode.addData({
        operationType: OperationType.Delete,
        resourceType,
      });
      request.headers = await this.buildHeaders(request);
      this.applySessionToken(request);
      // deleteResource will use WriteEndpoint since it uses DELETE operation
      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        diagnosticNode,
        request.resourceType,
        request.operationType,
      );
      const response = await executePlugins(
        diagnosticNode,
        request,
        RequestHandler.request,
        PluginOn.operation,
      );
      if (parseLink(path).type !== "colls") {
        this.captureSessionToken(undefined, path, OperationType.Delete, response.headers);
      } else {
        this.clearSessionToken(path);
      }
      return response;
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  public async patch<T>({
    body,
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
    diagnosticNode,
  }: {
    body: any;
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<T & Resource>> {
    try {
      const request: RequestContext = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.patch,
        operationType: OperationType.Patch,
        path,
        resourceType,
        body,
        resourceId,
        options,
        partitionKey,
      };
      diagnosticNode.addData({
        operationType: OperationType.Patch,
        resourceType,
      });
      request.headers = await this.buildHeaders(request);
      this.applySessionToken(request);

      // patch will use WriteEndpoint
      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        diagnosticNode,
        request.resourceType,
        request.operationType,
      );
      const response = await executePlugins(
        diagnosticNode,
        request,
        RequestHandler.request,
        PluginOn.operation,
      );
      this.captureSessionToken(undefined, path, OperationType.Patch, response.headers);
      return response;
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  public async create<T, U = T>({
    body,
    path,
    resourceType,
    resourceId,
    diagnosticNode,
    options = {},
    partitionKey,
  }: {
    body: T;
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    diagnosticNode: DiagnosticNodeInternal;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
  }): Promise<Response<T & U & Resource>> {
    try {
      const request: RequestContext = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.post,
        operationType: OperationType.Create,
        path,
        resourceType,
        resourceId,
        body,
        options,
        partitionKey,
      };
      diagnosticNode.addData({
        operationType: OperationType.Create,
        resourceType,
      });
      request.headers = await this.buildHeaders(request);
      // create will use WriteEndpoint since it uses POST operation
      this.applySessionToken(request);

      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        diagnosticNode,
        request.resourceType,
        request.operationType,
      );
      const response = await executePlugins(
        diagnosticNode,
        request,
        RequestHandler.request,
        PluginOn.operation,
      );
      this.captureSessionToken(undefined, path, OperationType.Create, response.headers);
      return response;
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  private processQueryFeedResponse(
    res: Response<any>,
    isQuery: boolean,
    resultFn: (result: { [key: string]: any }) => any[],
  ): Response<any> {
    if (isQuery) {
      return {
        result: resultFn(res.result),
        headers: res.headers,
        code: res.code,
      };
    } else {
      const newResult = resultFn(res.result).map((body: any) => body);
      return {
        result: newResult,
        headers: res.headers,
        code: res.code,
      };
    }
  }

  private applySessionToken(requestContext: RequestContext): void {
    const request = this.getSessionParams(requestContext.path);

    if (requestContext.headers && requestContext.headers[HttpHeaders.SessionToken]) {
      return;
    }

    const sessionConsistency: ConsistencyLevel = requestContext.headers[
      HttpHeaders.ConsistencyLevel
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
        requestContext.headers[HttpHeaders.SessionToken] = sessionToken;
      }
    }
  }

  public async replace<T>({
    body,
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
    diagnosticNode,
  }: {
    body: any;
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<T & Resource>> {
    try {
      const request: RequestContext = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.put,
        operationType: OperationType.Replace,
        path,
        resourceType,
        body,
        resourceId,
        options,
        partitionKey,
      };
      diagnosticNode.addData({
        operationType: OperationType.Replace,
        resourceType,
      });
      request.headers = await this.buildHeaders(request);
      this.applySessionToken(request);

      // replace will use WriteEndpoint since it uses PUT operation
      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        diagnosticNode,
        request.resourceType,
        request.operationType,
      );
      const response = await executePlugins(
        diagnosticNode,
        request,
        RequestHandler.request,
        PluginOn.operation,
      );
      this.captureSessionToken(undefined, path, OperationType.Replace, response.headers);
      return response;
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  public async upsert<T, U = T>({
    body,
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
    diagnosticNode,
  }: {
    body: T;
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<T & U & Resource>> {
    try {
      const request: RequestContext = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.post,
        operationType: OperationType.Upsert,
        path,
        resourceType,
        body,
        resourceId,
        options,
        partitionKey,
      };
      diagnosticNode.addData({
        operationType: OperationType.Upsert,
        resourceType,
      });
      request.headers = await this.buildHeaders(request);
      request.headers[HttpHeaders.IsUpsert] = true;
      this.applySessionToken(request);

      // upsert will use WriteEndpoint since it uses POST operation
      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        diagnosticNode,
        request.resourceType,
        request.operationType,
      );
      const response = await executePlugins(
        diagnosticNode,
        request,
        RequestHandler.request,
        PluginOn.operation,
      );
      this.captureSessionToken(undefined, path, OperationType.Upsert, response.headers);
      return response;
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
    diagnosticNode,
  }: {
    sprocLink: string;
    params?: any[];
    options?: RequestOptions;
    partitionKey?: PartitionKey;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<T>> {
    // Accept a single parameter or an array of parameters.
    // Didn't add type annotation for this because we should legacy this behavior
    if (params !== null && params !== undefined && !Array.isArray(params)) {
      params = [params];
    }
    const path = getPathFromLink(sprocLink);
    const id = getIdFromLink(sprocLink);

    const request: RequestContext = {
      ...this.getContextDerivedPropsForRequestCreation(),
      method: HTTPMethod.post,
      operationType: OperationType.Execute,
      path,
      resourceType: ResourceType.sproc,
      options,
      resourceId: id,
      body: params,
      partitionKey,
    };
    diagnosticNode.addData({
      operationType: OperationType.Execute,
      resourceType: ResourceType.sproc,
    });
    request.headers = await this.buildHeaders(request);
    // executeStoredProcedure will use WriteEndpoint since it uses POST operation
    request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
      diagnosticNode,
      request.resourceType,
      request.operationType,
    );
    const response = await executePlugins(
      diagnosticNode,
      request,
      RequestHandler.request,
      PluginOn.operation,
    );
    return response;
  }

  /**
   * Gets the Database account information.
   * @param options - `urlConnection` in the options is the endpoint url whose database account needs to be retrieved.
   * If not present, current client's url will be used.
   */
  public async getDatabaseAccount(
    diagnosticNode: DiagnosticNodeInternal,
    options: RequestOptions = {},
  ): Promise<Response<DatabaseAccount>> {
    const endpoint = options.urlConnection || this.cosmosClientOptions.endpoint;
    const request: RequestContext = {
      ...this.getContextDerivedPropsForRequestCreation(),
      endpoint,
      method: HTTPMethod.get,
      operationType: OperationType.Read,
      path: "",
      resourceType: ResourceType.none,
      options,
    };
    diagnosticNode.addData({
      operationType: OperationType.Read,
      resourceType: ResourceType.none,
    });
    request.headers = await this.buildHeaders(request);
    // await options.beforeOperation({ endpoint, request, headers: requestHeaders });
    const { result, headers, code, substatus, diagnostics } = await executePlugins(
      diagnosticNode,
      request,
      RequestHandler.request,
      PluginOn.operation,
    );

    const databaseAccount = new DatabaseAccount(result, headers);
    return {
      result: databaseAccount,
      headers,
      diagnostics,
      code: code,
      substatus: substatus,
    };
  }

  public getWriteEndpoint(diagnosticNode: DiagnosticNodeInternal): Promise<string> {
    return this.globalEndpointManager.getWriteEndpoint(diagnosticNode);
  }

  public getReadEndpoint(diagnosticNode: DiagnosticNodeInternal): Promise<string> {
    return this.globalEndpointManager.getReadEndpoint(diagnosticNode);
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
    diagnosticNode,
  }: {
    body: T;
    path: string;
    partitionKey: PartitionKey;
    resourceId: string;
    options?: RequestOptions;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<any>> {
    try {
      const request: RequestContext = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.post,
        operationType: OperationType.Batch,
        path,
        body,
        resourceType: ResourceType.item,
        resourceId,
        options,
        partitionKey,
      };
      diagnosticNode.addData({
        operationType: OperationType.Batch,
        resourceType: ResourceType.item,
      });
      request.headers = await this.buildHeaders(request);
      request.headers[HttpHeaders.IsBatchRequest] = true;
      request.headers[HttpHeaders.IsBatchAtomic] = true;

      this.applySessionToken(request);

      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        diagnosticNode,
        request.resourceType,
        request.operationType,
      );
      const response = await executePlugins(
        diagnosticNode,
        request,
        RequestHandler.request,
        PluginOn.operation,
      );
      this.captureSessionToken(undefined, path, OperationType.Batch, response.headers);
      response.diagnostics = diagnosticNode.toDiagnostic(this.getClientConfig());
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
    diagnosticNode,
  }: {
    body: T;
    path: string;
    partitionKeyRangeId: string;
    resourceId: string;
    bulkOptions?: BulkOptions;
    options?: RequestOptions;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<any>> {
    try {
      const request: RequestContext = {
        ...this.getContextDerivedPropsForRequestCreation(),
        method: HTTPMethod.post,
        operationType: OperationType.Batch,
        path,
        body,
        resourceType: ResourceType.item,
        resourceId,
        options,
      };
      diagnosticNode.addData({
        operationType: OperationType.Batch,
        resourceType: ResourceType.item,
      });
      request.headers = await this.buildHeaders(request);
      request.headers[HttpHeaders.IsBatchRequest] = true;
      request.headers[HttpHeaders.PartitionKeyRangeID] = partitionKeyRangeId;
      request.headers[HttpHeaders.IsBatchAtomic] = false;
      request.headers[HttpHeaders.BatchContinueOnError] = bulkOptions.continueOnError || false;

      this.applySessionToken(request);

      request.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
        diagnosticNode,
        request.resourceType,
        request.operationType,
      );
      const response = await executePlugins(
        diagnosticNode,
        request,
        RequestHandler.request,
        PluginOn.operation,
      );
      this.captureSessionToken(undefined, path, OperationType.Batch, response.headers);
      return response;
    } catch (err: any) {
      this.captureSessionToken(err, path, OperationType.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  private captureSessionToken(
    err: ErrorResponse,
    path: string,
    operationType: OperationType,
    resHeaders: CosmosHeaders,
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

  public recordDiagnostics(diagnostic: CosmosDiagnostics): void {
    const formatted = this.diagnosticFormatter.format(diagnostic);
    this.diagnosticWriter.write(formatted);
  }

  public initializeDiagnosticSettings(diagnosticLevel: CosmosDbDiagnosticLevel): void {
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
  private getSessionParams(resourceLink: string): SessionContext {
    const resourceId: string = null;
    let resourceAddress: string = null;
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

  private isMasterResource(resourceType: string): boolean {
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

  private buildHeaders(requestContext: RequestContext): Promise<CosmosHeaders> {
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
      partitionKey:
        requestContext.partitionKey !== undefined
          ? convertToInternalPartitionKey(requestContext.partitionKey)
          : undefined, // TODO: Move this check from here to PartitionKey
    });
  }

  /**
   * Returns collection of properties which are derived from the context for Request Creation.
   * These properties have client wide scope, as opposed to request specific scope.
   * @returns
   */
  private getContextDerivedPropsForRequestCreation(): {
    globalEndpointManager: GlobalEndpointManager;
    connectionPolicy: ConnectionPolicy;
    requestAgent: Agent;
    client?: ClientContext;
    pipeline?: Pipeline;
    plugins: PluginConfig[];
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

  public getClientConfig(): ClientConfigDiagnostic {
    return this.clientConfig;
  }
}

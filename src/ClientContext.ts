import { Constants, CosmosClientOptions, IHeaders, QueryIterator, RequestOptions, Response, SqlQuerySpec } from ".";
import { PartitionKeyRange } from "./client/Container/PartitionKeyRange";
import { Resource } from "./client/Resource";
import { Helper, StatusCodes, SubStatusCodes } from "./common";
import { ConnectionPolicy, ConsistencyLevel, DatabaseAccount, QueryCompatibilityMode } from "./documents";
import { GlobalEndpointManager } from "./globalEndpointManager";
import { FetchFunctionCallback } from "./queryExecutionContext";
import { FeedOptions, RequestHandler } from "./request";
import { ErrorResponse, getHeaders } from "./request/request";
import { RequestContext } from "./request/RequestContext";
import { SessionContainer } from "./session/sessionContainer";
import { SessionContext } from "./session/SessionContext";

/**
 * @hidden
 * @ignore
 */
export class ClientContext {
  private readonly sessionContainer: SessionContainer;
  private connectionPolicy: ConnectionPolicy;
  private requestHandler: RequestHandler;

  public partitionKeyDefinitionCache: { [containerUrl: string]: any }; // TODO: ParitionKeyDefinitionCache
  public constructor(
    private cosmosClientOptions: CosmosClientOptions,
    private globalEndpointManager: GlobalEndpointManager
  ) {
    this.connectionPolicy = Helper.parseConnectionPolicy(cosmosClientOptions.connectionPolicy);
    this.sessionContainer = new SessionContainer();
    this.requestHandler = new RequestHandler(
      globalEndpointManager,
      this.connectionPolicy,
      this.cosmosClientOptions.agent
    );
    this.partitionKeyDefinitionCache = {};
  }
  /** @ignore */
  public async read<T>(
    path: string,
    type: string,
    id: string,
    initialHeaders: IHeaders,
    options?: RequestOptions
  ): Promise<Response<T & Resource>> {
    try {
      const requestHeaders = await getHeaders(
        this.cosmosClientOptions.auth,
        { ...initialHeaders, ...this.cosmosClientOptions.defaultHeaders, ...(options && options.initialHeaders) },
        "get",
        path,
        id,
        type,
        options,
        undefined,
        this.cosmosClientOptions.connectionPolicy.UseMultipleWriteLocations
      );
      this.applySessionToken(path, requestHeaders);

      const request: any = {
        // TODO: any
        path,
        operationType: Constants.OperationTypes.Read,
        client: this,
        endpointOverride: null
      };
      // read will use ReadEndpoint since it uses GET operation
      const endpoint = await this.globalEndpointManager.resolveServiceEndpoint(request);
      const response = await this.requestHandler.get(endpoint, request, requestHeaders);
      this.captureSessionToken(undefined, path, Constants.OperationTypes.Read, response.headers);
      return response;
    } catch (err) {
      this.captureSessionToken(err, path, Constants.OperationTypes.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  public async queryFeed<T>(
    path: string,
    type: string, // TODO: code smell: enum?
    id: string,
    resultFn: (result: { [key: string]: any }) => any[], // TODO: any
    query: SqlQuerySpec | string,
    options: FeedOptions,
    partitionKeyRangeId?: string
  ): Promise<Response<T & Resource>> {
    // Query operations will use ReadEndpoint even though it uses
    // GET(for queryFeed) and POST(for regular query operations)

    const request: any = {
      // TODO: any request
      path,
      operationType: Constants.OperationTypes.Query,
      client: this,
      endpointOverride: null
    };

    const endpoint = await this.globalEndpointManager.resolveServiceEndpoint(request);

    const initialHeaders = { ...this.cosmosClientOptions.defaultHeaders, ...(options && options.initialHeaders) };
    if (query === undefined) {
      const reqHeaders = await getHeaders(
        this.cosmosClientOptions.auth,
        initialHeaders,
        "get",
        path,
        id,
        type,
        options,
        partitionKeyRangeId,
        this.cosmosClientOptions.connectionPolicy.UseMultipleWriteLocations
      );
      this.applySessionToken(path, reqHeaders);

      const { result, headers: resHeaders } = await this.requestHandler.get(endpoint, request, reqHeaders);
      this.captureSessionToken(undefined, path, Constants.OperationTypes.Query, resHeaders);
      return this.processQueryFeedResponse({ result, headers: resHeaders }, !!query, resultFn);
    } else {
      initialHeaders[Constants.HttpHeaders.IsQuery] = "true";
      switch (this.cosmosClientOptions.queryCompatibilityMode) {
        case QueryCompatibilityMode.SqlQuery:
          initialHeaders[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.SQL;
          break;
        case QueryCompatibilityMode.Query:
        case QueryCompatibilityMode.Default:
        default:
          if (typeof query === "string") {
            query = { query }; // Converts query text to query object.
          }
          initialHeaders[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.QueryJson;
          break;
      }

      const reqHeaders = await getHeaders(
        this.cosmosClientOptions.auth,
        initialHeaders,
        "post",
        path,
        id,
        type,
        options,
        partitionKeyRangeId,
        this.cosmosClientOptions.connectionPolicy.UseMultipleWriteLocations
      );
      this.applySessionToken(path, reqHeaders);

      const response = await this.requestHandler.post(endpoint, request, query, reqHeaders);
      const { result, headers: resHeaders } = response;
      this.captureSessionToken(undefined, path, Constants.OperationTypes.Query, resHeaders);
      return this.processQueryFeedResponse({ result, headers: resHeaders }, !!query, resultFn);
    }
  }

  public queryPartitionKeyRanges(collectionLink: string, query?: string | SqlQuerySpec, options?: FeedOptions) {
    const path = Helper.getPathFromLink(collectionLink, "pkranges");
    const id = Helper.getIdFromLink(collectionLink);
    const cb: FetchFunctionCallback = innerOptions => {
      return this.queryFeed(path, "pkranges", id, result => result.PartitionKeyRanges, query, innerOptions);
    };
    return new QueryIterator<PartitionKeyRange>(this, query, options, cb);
  }

  public async delete<T>(
    path: string,
    type: string,
    id: string,
    initialHeaders: IHeaders,
    options?: RequestOptions
  ): Promise<Response<T & Resource>> {
    try {
      const reqHeaders = await getHeaders(
        this.cosmosClientOptions.auth,
        { ...initialHeaders, ...this.cosmosClientOptions.defaultHeaders, ...(options && options.initialHeaders) },
        "delete",
        path,
        id,
        type,
        options,
        undefined,
        this.cosmosClientOptions.connectionPolicy.UseMultipleWriteLocations
      );

      const request: RequestContext = {
        client: this,
        operationType: Constants.OperationTypes.Delete,
        path,
        resourceType: type
      };

      this.applySessionToken(path, reqHeaders);
      // deleteResource will use WriteEndpoint since it uses DELETE operation
      const endpoint = await this.globalEndpointManager.resolveServiceEndpoint(request);
      const response = await this.requestHandler.delete(endpoint, request, reqHeaders);
      if (Helper.parseLink(path).type !== "colls") {
        this.captureSessionToken(undefined, path, Constants.OperationTypes.Delete, response.headers);
      } else {
        this.clearSessionToken(path);
      }
      return response;
    } catch (err) {
      this.captureSessionToken(err, path, Constants.OperationTypes.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  // Most cases, things return the definition + the system resource props
  public async create<T>(
    body: T,
    path: string,
    type: string,
    id: string,
    initialHeaders: IHeaders,
    options?: RequestOptions
  ): Promise<Response<T & Resource>>;

  // But a few cases, like permissions, there is additional junk added to the response that isn't in system resource props
  public async create<T, U>(
    body: T,
    path: string,
    type: string,
    id: string,
    initialHeaders: IHeaders,
    options?: RequestOptions
  ): Promise<Response<T & U & Resource>>;
  public async create<T, U>(
    body: T,
    path: string,
    type: string,
    id: string,
    initialHeaders: IHeaders,
    options?: RequestOptions
  ): Promise<Response<T & U & Resource>> {
    try {
      const requestHeaders = await getHeaders(
        this.cosmosClientOptions.auth,
        { ...initialHeaders, ...this.cosmosClientOptions.defaultHeaders, ...(options && options.initialHeaders) },
        "post",
        path,
        id,
        type,
        options,
        undefined,
        this.cosmosClientOptions.connectionPolicy.UseMultipleWriteLocations
      );

      const request: RequestContext = {
        client: this,
        operationType: Constants.OperationTypes.Create,
        path,
        resourceType: type
      };

      // create will use WriteEndpoint since it uses POST operation
      this.applySessionToken(path, requestHeaders);

      const endpoint = await this.globalEndpointManager.resolveServiceEndpoint(request);
      const response = await this.requestHandler.post(endpoint, request, body, requestHeaders);
      this.captureSessionToken(undefined, path, Constants.OperationTypes.Create, response.headers);
      return response;
    } catch (err) {
      this.captureSessionToken(err, path, Constants.OperationTypes.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  private processQueryFeedResponse(
    res: Response<any>,
    isQuery: boolean,
    resultFn: (result: { [key: string]: any }) => any[]
  ): Response<any> {
    if (isQuery) {
      return { result: resultFn(res.result), headers: res.headers };
    } else {
      const newResult = resultFn(res.result).map((body: any) => body);
      return { result: newResult, headers: res.headers };
    }
  }

  private applySessionToken(path: string, reqHeaders: IHeaders) {
    const request = this.getSessionParams(path);

    if (reqHeaders && reqHeaders[Constants.HttpHeaders.SessionToken]) {
      return;
    }

    const sessionConsistency: ConsistencyLevel = reqHeaders[Constants.HttpHeaders.ConsistencyLevel];
    if (!sessionConsistency) {
      return;
    }

    if (sessionConsistency !== ConsistencyLevel.Session) {
      return;
    }

    if (request.resourceAddress) {
      const sessionToken = this.sessionContainer.get(request);
      if (sessionToken) {
        reqHeaders[Constants.HttpHeaders.SessionToken] = sessionToken;
      }
    }
  }

  public async replace<T>(
    resource: any,
    path: string,
    type: string,
    id: string,
    initialHeaders: IHeaders,
    options?: RequestOptions
  ): Promise<Response<T & Resource>> {
    try {
      const reqHeaders = await getHeaders(
        this.cosmosClientOptions.auth,
        { ...initialHeaders, ...this.cosmosClientOptions.defaultHeaders, ...(options && options.initialHeaders) },
        "put",
        path,
        id,
        type,
        options,
        undefined,
        this.cosmosClientOptions.connectionPolicy.UseMultipleWriteLocations
      );

      const request: RequestContext = {
        client: this,
        operationType: Constants.OperationTypes.Replace,
        path,
        resourceType: type
      };

      this.applySessionToken(path, reqHeaders);

      // replace will use WriteEndpoint since it uses PUT operation
      const endpoint = await this.globalEndpointManager.resolveServiceEndpoint(reqHeaders);
      const response = await this.requestHandler.put(endpoint, request, resource, reqHeaders);
      this.captureSessionToken(undefined, path, Constants.OperationTypes.Replace, response.headers);
      return response;
    } catch (err) {
      this.captureSessionToken(err, path, Constants.OperationTypes.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  public async upsert<T>(
    body: T,
    path: string,
    type: string,
    id: string,
    initialHeaders: IHeaders,
    options?: RequestOptions
  ): Promise<Response<T & Resource>>;
  public async upsert<T, U>(
    body: T,
    path: string,
    type: string,
    id: string,
    initialHeaders: IHeaders,
    options?: RequestOptions
  ): Promise<Response<T & U & Resource>>;
  public async upsert<T>(
    body: T,
    path: string,
    type: string,
    id: string,
    initialHeaders: IHeaders,
    options?: RequestOptions
  ): Promise<Response<T & Resource>> {
    try {
      const requestHeaders = await getHeaders(
        this.cosmosClientOptions.auth,
        { ...initialHeaders, ...this.cosmosClientOptions.defaultHeaders, ...(options && options.initialHeaders) },
        "post",
        path,
        id,
        type,
        options,
        undefined,
        this.cosmosClientOptions.connectionPolicy.UseMultipleWriteLocations
      );

      const request: RequestContext = {
        client: this,
        operationType: Constants.OperationTypes.Upsert,
        path,
        resourceType: type
      };

      Helper.setIsUpsertHeader(requestHeaders);
      this.applySessionToken(path, requestHeaders);

      // upsert will use WriteEndpoint since it uses POST operation
      const endpoint = await this.globalEndpointManager.resolveServiceEndpoint(request);
      const response = await this.requestHandler.post(endpoint, request, body, requestHeaders);
      this.captureSessionToken(undefined, path, Constants.OperationTypes.Upsert, response.headers);
      return response;
    } catch (err) {
      this.captureSessionToken(err, path, Constants.OperationTypes.Upsert, (err as ErrorResponse).headers);
      throw err;
    }
  }

  public async execute<T>(
    sprocLink: string,
    params?: any[], // TODO: any
    options?: RequestOptions
  ): Promise<Response<T>> {
    const initialHeaders = { ...this.cosmosClientOptions.defaultHeaders, ...(options && options.initialHeaders) };

    // Accept a single parameter or an array of parameters.
    // Didn't add type annotation for this because we should legacy this behavior
    if (params !== null && params !== undefined && !Array.isArray(params)) {
      params = [params];
    }
    const path = Helper.getPathFromLink(sprocLink);
    const id = Helper.getIdFromLink(sprocLink);

    const headers = await getHeaders(
      this.cosmosClientOptions.auth,
      initialHeaders,
      "post",
      path,
      id,
      "sprocs",
      options,
      undefined,
      this.cosmosClientOptions.connectionPolicy.UseMultipleWriteLocations
    );

    const request: RequestContext = {
      client: this,
      operationType: Constants.OperationTypes.Execute,
      path,
      resourceType: "sprocs"
    };

    // executeStoredProcedure will use WriteEndpoint since it uses POST operation
    const endpoint = await this.globalEndpointManager.resolveServiceEndpoint(request);
    return this.requestHandler.post(endpoint, request, params, headers);
  }

  /**
   * Gets the Database account information.
   * @param {string} [options.urlConnection]   - The endpoint url whose database account needs to be retrieved. \
   * If not present, current client's url will be used.
   */
  public async getDatabaseAccount(options: RequestOptions = {}): Promise<Response<DatabaseAccount>> {
    const urlConnection = options.urlConnection || this.cosmosClientOptions.endpoint;

    const requestHeaders = await getHeaders(
      this.cosmosClientOptions.auth,
      this.cosmosClientOptions.defaultHeaders,
      "get",
      "",
      "",
      "",
      {},
      undefined,
      this.cosmosClientOptions.connectionPolicy.UseMultipleWriteLocations
    );

    const request: RequestContext = {
      client: this,
      operationType: Constants.OperationTypes.Read,
      path: "",
      resourceType: "DatabaseAccount"
    };

    const { result, headers } = await this.requestHandler.get(urlConnection, request, requestHeaders);

    const databaseAccount = new DatabaseAccount(result, headers);

    return { result: databaseAccount, headers };
  }

  public getWriteEndpoint(): Promise<string> {
    return this.globalEndpointManager.getWriteEndpoint();
  }

  public getReadEndpoint(): Promise<string> {
    return this.globalEndpointManager.getReadEndpoint();
  }

  private captureSessionToken(err: ErrorResponse, path: string, opType: string, resHeaders: IHeaders) {
    const request = this.getSessionParams(path); // TODO: any request
    request.operationType = opType;
    if (
      !err ||
      (!this.isMasterResource(request.resourceType) &&
        (err.code === StatusCodes.PreconditionFailed ||
          err.code === StatusCodes.Conflict ||
          (err.code === StatusCodes.NotFound && err.substatus !== SubStatusCodes.ReadSessionNotAvailable)))
    ) {
      this.sessionContainer.set(request, resHeaders);
    }
  }

  // TODO: some session tests are using this, but I made them use type coercsion to call this method because I don't think it should be public.
  private getSessionToken(collectionLink: string) {
    if (!collectionLink) {
      throw new Error("collectionLink cannot be null");
    }

    const paths = Helper.parseLink(collectionLink);

    if (paths === undefined) {
      return "";
    }

    const request = this.getSessionParams(collectionLink);
    return this.sessionContainer.get(request);
  }

  public clearSessionToken(path: string) {
    const request = this.getSessionParams(path);
    this.sessionContainer.remove(request);
  }

  private getSessionParams(resourceLink: string): SessionContext {
    const resourceId: string = null;
    let resourceAddress: string = null;
    const parserOutput = Helper.parseLink(resourceLink);

    resourceAddress = parserOutput.objectBody.self;

    const resourceType = parserOutput.type;
    return {
      resourceId,
      resourceAddress,
      resourceType,
      isNameBased: true
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
}

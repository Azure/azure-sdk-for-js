import { Agent, AgentOptions } from "https";
import * as tunnel from "tunnel";
import * as url from "url";
import { Constants, RequestOptions } from ".";
import { Database, Databases } from "./client/Database";
import { Offer, Offers } from "./client/Offer";
import { ClientContext } from "./ClientContext";
import { Helper, Platform } from "./common";
import { CosmosClientOptions } from "./CosmosClientOptions";
import { DatabaseAccount } from "./documents";
import { GlobalEndpointManager } from "./globalEndpointManager";
import { CosmosResponse } from "./request";

/**
 * Provides a client-side logical representation of the Azure Cosmos DB database account.
 * This client is used to configure and execute requests in the Azure Cosmos DB database service.
 * @example Instantiate a client and create a new database
 * ```typescript
 * const client = new CosmosClient({endpoint: "<URL HERE>", auth: {masterKey: "<KEY HERE>"}});
 * await client.databases.create({id: "<datbase name here>"});
 * ```
 * @example Instantiate a client with custom Connection Policy
 * ```typescript
 * const connectionPolicy = new ConnectionPolicy();
 * connectionPolicy.RequestTimeout = 10000;
 * const client = new CosmosClient({
 *    endpoint: "<URL HERE>",
 *    auth: {masterKey: "<KEY HERE>"},
 *    connectionPolicy
 * });
 * ```
 */
export class CosmosClient {
  /**
   * Used for creating new databases, or querying/reading all databases.
   *
   * Use `.database(id)` to read, replace, or delete a specific, existing database by id.
   *
   * @example Create a new database
   * ```typescript
   * const {body: databaseDefinition, database} = await client.databases.create({id: "<name here>"});
   * ```
   */
  public readonly databases: Databases;
  /**
   * Used for querying & reading all offers.
   *
   * Use `.offer(id)` to read, or replace existing offers.
   */
  public readonly offers: Offers;
  /**
   * Creates a new {@link CosmosClient} object. See {@link CosmosClientOptions} for more details on what options you can use.
   * @param options bag of options - require at least endpoint and auth to be configured
   */

  private clientContext: ClientContext;
  constructor(private options: CosmosClientOptions) {
    options.auth = options.auth || {};
    if (options.key) {
      options.auth.key = options.key;
    }

    options.connectionPolicy = Helper.parseConnectionPolicy(options.connectionPolicy);

    options.defaultHeaders = options.defaultHeaders || {};
    options.defaultHeaders[Constants.HttpHeaders.CacheControl] = "no-cache";
    options.defaultHeaders[Constants.HttpHeaders.Version] = Constants.CurrentVersion;
    if (options.consistencyLevel !== undefined) {
      options.defaultHeaders[Constants.HttpHeaders.ConsistencyLevel] = options.consistencyLevel;
    }

    const platformDefaultHeaders = Platform.getPlatformDefaultHeaders() || {};
    for (const platformDefaultHeader of Object.keys(platformDefaultHeaders)) {
      options.defaultHeaders[platformDefaultHeader] = platformDefaultHeaders[platformDefaultHeader];
    }

    options.defaultHeaders[Constants.HttpHeaders.UserAgent] = Platform.getUserAgent();

    if (!this.options.agent) {
      // Initialize request agent
      const requestAgentOptions: AgentOptions & tunnel.HttpsOverHttpsOptions & tunnel.HttpsOverHttpOptions = {
        keepAlive: true,
        maxSockets: 256,
        maxFreeSockets: 256
      };
      if (!!this.options.connectionPolicy.ProxyUrl) {
        const proxyUrl = url.parse(this.options.connectionPolicy.ProxyUrl);
        const port = parseInt(proxyUrl.port, 10);
        requestAgentOptions.proxy = {
          host: proxyUrl.hostname,
          port,
          headers: {}
        };

        if (!!proxyUrl.auth) {
          requestAgentOptions.proxy.proxyAuth = proxyUrl.auth;
        }

        this.options.agent =
          proxyUrl.protocol.toLowerCase() === "https:"
            ? tunnel.httpsOverHttps(requestAgentOptions)
            : tunnel.httpsOverHttp(requestAgentOptions); // TODO: type coersion
      } else {
        this.options.agent = new Agent(requestAgentOptions); // TODO: Move to request?
      }
    }

    const globalEndpointManager = new GlobalEndpointManager(this.options, async (opts: RequestOptions) =>
      this.getDatabaseAccount(opts)
    );
    this.clientContext = new ClientContext(options, globalEndpointManager);

    this.databases = new Databases(this, this.clientContext);
    this.offers = new Offers(this, this.clientContext);
  }

  /**
   * Get information about the current {@link DatabaseAccount} (including which regions are supported, etc.)
   */
  public async getDatabaseAccount(options?: RequestOptions): Promise<CosmosResponse<DatabaseAccount, CosmosClient>> {
    const response = await this.clientContext.getDatabaseAccount(options);
    return { body: response.result, headers: response.headers, ref: this };
  }

  /**
   * Gets the currently used write endpoint url. Useful for troubleshooting purposes.
   *
   * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
   */
  public getWriteEndpoint(): Promise<string> {
    return this.clientContext.getWriteEndpoint();
  }

  /**
   * Gets the currently used read endpoint. Useful for troubleshooting purposes.
   *
   * The url may contain a region suffix (e.g. "-eastus") if we're using location specific endpoints.
   */
  public getReadEndpoint(): Promise<string> {
    return this.clientContext.getReadEndpoint();
  }

  /**
   * Used for reading, updating, or deleting a existing database by id or accessing containers belonging to that database.
   *
   * This does not make a network call. Use `.read` to get info about the database after getting the {@link Database} object.
   *
   * @param id The id of the database.
   * @example Create a new container off of an existing database
   * ```typescript
   * const container = client.database("<database id>").containers.create("<container id>");
   * ```
   *
   * @example Delete an existing database
   * ```typescript
   * await client.database("<id here>").delete();
   * ```
   */
  public database(id: string): Database {
    return new Database(this, id, this.clientContext);
  }

  /**
   * Used for reading, or updating a existing offer by id.
   * @param id The id of the offer.
   */
  public offer(id: string) {
    return new Offer(this, id, this.clientContext);
  }
}

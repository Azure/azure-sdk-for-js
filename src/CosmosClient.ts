import { Database, Databases } from "./client/Database/";
import { Offer, Offers } from "./client/Offer/";
import { CosmosClientOptions } from "./CosmosClientOptions";
import { DocumentClient } from "./documentclient";
import { DatabaseAccount } from "./documents";
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
 * const connectionPolicy = new DocumentBase.ConnectionPolicy();
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
   * @ignore
   * @hidden
   */
  public documentClient: DocumentClient; // TODO: This will go away.
  /**
   * Creates a new {@link CosmosClient} object. See {@link CosmosClientOptions} for more details on what options you can use.
   * @param options bag of options - require at least endpoint and auth to be configured
   */
  constructor(private options: CosmosClientOptions) {
    this.databases = new Databases(this);
    this.offers = new Offers(this);

    this.documentClient = new DocumentClient(
      options.endpoint,
      options.auth,
      options.connectionPolicy,
      options.consistencyLevel
    );
  }

  /**
   * Get information about the current {@link DatabaseAccount} (including which regions are supported, etc.)
   */
  public async getDatabaseAccount(): Promise<CosmosResponse<DatabaseAccount, CosmosClient>> {
    const response = await this.documentClient.getDatabaseAccount();
    return { body: response.result, headers: response.headers, ref: this };
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
    return new Database(this, id);
  }

  /**
   * Used for reading, or updating a existing offer by id.
   * @param id The id of the offer.
   */
  public offer(id: string) {
    return new Offer(this, id);
  }
}

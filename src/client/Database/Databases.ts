import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions, Response } from "../../request";
import { Database } from "./Database";
import { DatabaseDefinition } from "./DatabaseDefinition";
import { DatabaseResponse } from "./DatabaseResponse";

/**
 * Operations for creating new databases, and reading/querying all databases
 *
 * @see {@link Database} for reading or deleting an existing database; use `client.database(id)`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `databases.readAll()` before every single `item.read()` call, to ensure the database exists;
 * do this once on application start up.
 */
export class Databases {
  constructor(private readonly client: CosmosClient) {}

  // TODO: DatabaseResponse for QueryIterator?
  /**
   * Queries all databases.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return all databases in an array or iterate over them one at a time.
   * @example Read all databases to array.
   * ```typescript
   * const querySpec: SqlQuerySpec = {
   *   query: "SELECT * FROM root r WHERE r.id = @db",
   *   parameters: [
   *     {name: "@db", value: "Todo"}
   *   ]
   * };
   * const {body: databaseList} = await client.databases.query(querySpec).toArray();
   * ```
   */
  public query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<DatabaseDefinition> {
    return this.client.documentClient.queryDatabases(query, options);
  }

  /**
   * Send a request for creating a database.
   * <p>
   *  A database manages users, permissions and a set of containers.  <br>
   *  Each Azure Cosmos DB Database Account is able to support multiple independent named databases,
   *  with the database being the logical container for data. <br>
   *  Each Database consists of one or more containers, each of which in turn contain one or more
   *  documents. Since databases are an an administrative resource, the Service Master Key will be
   *  required in order to access and successfully complete any action using the User APIs. <br>
   * </p>
   *
   * @param body A json object that represents The database to be created.
   * @param options Use to set options like response page size, continuation tokens, etc.
   */
  public async create(body: DatabaseDefinition, options?: RequestOptions): Promise<DatabaseResponse> {
    const response = await this.client.documentClient.createDatabase(body, options);
    const ref = new Database(this.client, body.id);
    return {
      body: response.result,
      headers: response.headers,
      ref,
      database: ref
    };
  }

  // TODO: DatabaseResponse for QueryIterator?
  /**
   * Reads all databases.
   * @param options Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return all databases in an array or iterate over them one at a time.
   * @example Read all databases to array.
   * ```typescript
   * const {body: databaseList} = await client.databases.readAll().toArray();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<DatabaseDefinition> {
    return this.client.documentClient.readDatabases(options);
  }
}

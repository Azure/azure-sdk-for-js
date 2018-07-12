import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions, Response } from "../../request";
import { Database } from "./Database";
import { DatabaseDefinition } from "./DatabaseDefinition";
import { DatabaseResponse } from "./DatabaseResponse";

export class Databases {
  constructor(private readonly client: CosmosClient) {}

  // TODO: DatabaseResponse for QueryIterator?
  public query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<DatabaseDefinition> {
    return this.client.documentClient.queryDatabases(query, options);
  }

  /**
   * Send a request for creating a database.
   * <p>
   *  A database manages users, permissions and a set of containers.  <br>
   *  Each Azure Cosmos DB Database Account is able to support multiple independent named databases,\
   *  with the database being the logical container for data. <br>
   *  Each Database consists of one or more containers, each of which in turn contain one or more \
   *  documents. Since databases are an an administrative resource, the Service Master Key will be \
   * required in order to access and successfully complete any action using the User APIs. <br>
   * </p>
   *
   * @param body              - A json object that represents The database to be created.
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
  public readAll(options?: FeedOptions): QueryIterator<DatabaseDefinition> {
    return this.client.documentClient.readDatabases(options);
  }
}

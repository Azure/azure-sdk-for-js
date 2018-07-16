import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Container } from "../Container";
import { StoredProcedure } from "./StoredProcedure";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";
import { StoredProcedureResponse } from "./StoredProcedureResponse";

export class StoredProcedures {
  private client: CosmosClient;
  constructor(public readonly container: Container) {
    this.client = this.container.database.client;
  }

  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<StoredProcedureDefinition> {
    return this.client.documentClient.queryStoredProcedures(this.container.url, query, options);
  }

  public readAll(options?: FeedOptions): QueryIterator<StoredProcedureDefinition> {
    return this.client.documentClient.readStoredProcedures(this.container.url, options);
  }

  /**
   * Create a StoredProcedure.
   * <p>
   * Azure Cosmos DB allows stored procedures to be executed in the storage tier, \
   * directly against an item container. The script <br>
   * gets executed under ACID transactions on the primary storage partition of the \
   * specified container. For additional details, <br>
   * refer to the server-side JavaScript API documentation.
   * </p>
   */
  public async create(body: StoredProcedureDefinition, options?: RequestOptions): Promise<StoredProcedureResponse> {
    const response = await this.client.documentClient.createStoredProcedure(this.container.url, body, options);
    const ref = new StoredProcedure(this.container, response.result.id);
    return { body: response.result, headers: response.headers, ref, storedProcedure: ref };
  }

  /**
   * Upsert a StoredProcedure.
   * <p>
   * Azure Cosmos DB allows stored procedures to be executed in the storage tier,
   * directly against a document container. The script <br>
   * gets executed under ACID transactions on the primary storage partition of the
   *  specified container. For additional details, <br>
   * refer to the server-side JavaScript API documentation.
   * </p>
   */
  public async upsert(body: StoredProcedureDefinition, options?: RequestOptions): Promise<StoredProcedureResponse> {
    const response = await this.client.documentClient.upsertStoredProcedure(this.container.url, body, options);
    const ref = new StoredProcedure(this.container, response.result.id);
    return { body: response.result, headers: response.headers, ref, storedProcedure: ref };
  }
}

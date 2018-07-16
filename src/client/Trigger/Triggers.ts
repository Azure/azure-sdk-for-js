import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions, Response } from "../../request";
import { Container } from "../Container";
import { Trigger } from "./Trigger";
import { TriggerDefinition } from "./TriggerDefinition";
import { TriggerResponse } from "./TriggerResponse";

export class Triggers {
  private client: CosmosClient;
  constructor(public readonly container: Container) {
    this.client = this.container.database.client;
  }

  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<TriggerDefinition> {
    return this.client.documentClient.queryTriggers(this.container.url, query, options) as QueryIterator<
      TriggerDefinition
    >;
  }

  public readAll(options?: FeedOptions): QueryIterator<TriggerDefinition> {
    return this.client.documentClient.readTriggers(this.container.url, options) as QueryIterator<TriggerDefinition>;
  }
  /**
   * Create a trigger.
   * <p>
   * Azure Cosmos DB supports pre and post triggers defined in JavaScript to be executed \
   * on creates, updates and deletes. <br>
   * For additional details, refer to the server-side JavaScript API documentation.
   * </p>
   */
  public async create(body: TriggerDefinition, options?: RequestOptions): Promise<TriggerResponse> {
    const response = await this.client.documentClient.createTrigger(this.container.url, body, options);
    const ref = new Trigger(this.container, response.result.id);
    return { body: response.result, headers: response.headers, ref, trigger: ref };
  }

  /**
   * Upsert a trigger.
   * <p>
   * Azure Cosmos DB supports pre and post triggers defined in JavaScript to be
   * executed on creates, updates and deletes. <br>
   * For additional details, refer to the server-side JavaScript API documentation.
   * </p>
   */
  public async upsert(body: TriggerDefinition, options?: RequestOptions): Promise<TriggerResponse> {
    const response = await this.client.documentClient.upsertTrigger(this.container.url, body, options);
    const ref = new Trigger(this.container, response.result.id);
    return { body: response.result, headers: response.headers, ref, trigger: ref };
  }
}

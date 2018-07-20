import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Container } from "../Container";
import { Trigger } from "./Trigger";
import { TriggerDefinition } from "./TriggerDefinition";
import { TriggerResponse } from "./TriggerResponse";

/**
 * Operations to create, upsert, query, and read all triggers.
 *
 * Use `container.triggers` to read, replace, or delete a {@link Trigger}.
 */
export class Triggers {
  private client: CosmosClient;
  /**
   * @hidden
   * @param container The parent {@link Container}.
   */
  constructor(public readonly container: Container) {
    this.client = this.container.database.client;
  }

  /**
   * Query all Triggers.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<TriggerDefinition> {
    return this.client.documentClient.queryTriggers(this.container.url, query, options) as QueryIterator<
      TriggerDefinition
    >;
  }

  /**
   * Read all Triggers.
   * @param options
   * @example Read all trigger to array.
   * ```typescript
   * const {body: triggerList} = await container.triggers.readAll().toArray();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<TriggerDefinition> {
    return this.client.documentClient.readTriggers(this.container.url, options) as QueryIterator<TriggerDefinition>;
  }
  /**
   * Create a trigger.
   *
   * Azure Cosmos DB supports pre and post triggers defined in JavaScript to be executed
   * on creates, updates and deletes.
   *
   * For additional details, refer to the server-side JavaScript API documentation.
   * @param body
   * @param options
   */
  public async create(body: TriggerDefinition, options?: RequestOptions): Promise<TriggerResponse> {
    const response = await this.client.documentClient.createTrigger(this.container.url, body, options);
    const ref = new Trigger(this.container, response.result.id);
    return { body: response.result, headers: response.headers, ref, trigger: ref };
  }

  /**
   * Upsert a trigger.
   *
   * Azure Cosmos DB supports pre and post triggers defined in JavaScript to be
   * executed on creates, updates and deletes.
   *
   * For additional details, refer to the server-side JavaScript API documentation.
   * @param body
   * @param options
   */
  public async upsert(body: TriggerDefinition, options?: RequestOptions): Promise<TriggerResponse> {
    const response = await this.client.documentClient.upsertTrigger(this.container.url, body, options);
    const ref = new Trigger(this.container, response.result.id);
    return { body: response.result, headers: response.headers, ref, trigger: ref };
  }
}

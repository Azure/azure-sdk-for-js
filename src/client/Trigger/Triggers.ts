import { ClientContext } from "../../ClientContext";
import { Helper } from "../../common";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Container } from "../Container";
import { Resource } from "../Resource";
import { Trigger } from "./Trigger";
import { TriggerDefinition } from "./TriggerDefinition";
import { TriggerResponse } from "./TriggerResponse";

/**
 * Operations to create, upsert, query, and read all triggers.
 *
 * Use `container.triggers` to read, replace, or delete a {@link Trigger}.
 */
export class Triggers {
  /**
   * @hidden
   * @param container The parent {@link Container}.
   */
  constructor(public readonly container: Container, private readonly clientContext: ClientContext) {}

  /**
   * Query all Triggers.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Query all Triggers.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options
   */
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = Helper.getPathFromLink(this.container.url, "triggers");
    const id = Helper.getIdFromLink(this.container.url);

    return new QueryIterator(this.clientContext, query, options, innerOptions => {
      return this.clientContext.queryFeed(path, "triggers", id, result => result.Triggers, query, innerOptions);
    });
  }

  /**
   * Read all Triggers.
   * @param options
   * @example Read all trigger to array.
   * ```typescript
   * const {body: triggerList} = await container.triggers.readAll().toArray();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<TriggerDefinition & Resource> {
    return this.query<TriggerDefinition & Resource>(undefined, options);
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
    if (body.body) {
      body.body = body.body.toString();
    }

    const err = {};
    if (!Helper.isResourceValid(body, err)) {
      throw err;
    }

    const path = Helper.getPathFromLink(this.container.url, "triggers");
    const id = Helper.getIdFromLink(this.container.url);

    const response = await this.clientContext.create<TriggerDefinition>(body, path, "triggers", id, undefined, options);
    const ref = new Trigger(this.container, response.result.id, this.clientContext);
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
    if (body.body) {
      body.body = body.body.toString();
    }

    const err = {};
    if (!Helper.isResourceValid(body, err)) {
      throw err;
    }

    const path = Helper.getPathFromLink(this.container.url, "triggers");
    const id = Helper.getIdFromLink(this.container.url);

    const response = await this.clientContext.upsert<TriggerDefinition>(body, path, "triggers", id, undefined, options);
    const ref = new Trigger(this.container, response.result.id, this.clientContext);
    return { body: response.result, headers: response.headers, ref, trigger: ref };
  }
}

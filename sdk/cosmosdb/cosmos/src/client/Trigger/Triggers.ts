// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import { getIdFromLink, getPathFromLink, isResourceValid, ResourceType } from "../../common";
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
  constructor(
    public readonly container: Container,
    private readonly clientContext: ClientContext
  ) {}

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
    const path = getPathFromLink(this.container.url, ResourceType.trigger);
    const id = getIdFromLink(this.container.url);

    return new QueryIterator(this.clientContext, query, options, (innerOptions) => {
      return this.clientContext.queryFeed({
        path,
        resourceType: ResourceType.trigger,
        resourceId: id,
        resultFn: (result) => result.Triggers,
        query,
        options: innerOptions
      });
    });
  }

  /**
   * Read all Triggers.
   * @param options
   * @example Read all trigger to array.
   * ```typescript
   * const {body: triggerList} = await container.triggers.readAll().fetchAll();
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
    if (!isResourceValid(body, err)) {
      throw err;
    }

    const path = getPathFromLink(this.container.url, ResourceType.trigger);
    const id = getIdFromLink(this.container.url);

    const response = await this.clientContext.create<TriggerDefinition>({
      body,
      path,
      resourceType: ResourceType.trigger,
      resourceId: id,
      options
    });
    const ref = new Trigger(this.container, response.result.id, this.clientContext);
    return new TriggerResponse(response.result, response.headers, response.code, ref);
  }
}

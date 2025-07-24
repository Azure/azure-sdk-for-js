// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import {
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType,
} from "../../common/index.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions, RequestOptions } from "../../request/index.js";
import type { Container } from "../Container/index.js";
import type { Resource } from "../Resource.js";
import { Trigger } from "./Trigger.js";
import type { TriggerDefinition } from "./TriggerDefinition.js";
import { TriggerResponse } from "./TriggerResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";

/**
 * Operations to create, upsert, query, and read all triggers.
 *
 * Use `container.triggers` to read, replace, or delete a {@link Trigger}.
 */
export class Triggers {
  /**
   * @hidden
   * @param container - The parent {@link Container}.
   */
  constructor(
    public readonly container: Container,
    private readonly clientContext: ClientContext,
  ) {}

  /**
   * Query all Triggers.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Query all Triggers.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * * @example
   * ```ts snippet:TriggersQuery
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const querySpec = {
   *   query: "SELECT * FROM root r WHERE r.id=@id",
   *   parameters: [
   *     {
   *       name: "@id",
   *       value: "<trigger-id>",
   *     },
   *   ],
   * };
   * const { resources: results } = await container.scripts.triggers.query(querySpec).fetchAll();
   * ```
   */
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = getPathFromLink(this.container.url, ResourceType.trigger);
    const id = getIdFromLink(this.container.url);

    return new QueryIterator(this.clientContext, query, options, (diagnosticNode, innerOptions) => {
      return this.clientContext.queryFeed({
        path,
        resourceType: ResourceType.trigger,
        resourceId: id,
        resultFn: (result) => result.Triggers,
        query,
        options: innerOptions,
        diagnosticNode,
      });
    });
  }

  /**
   * Read all Triggers.
   * @example Read all trigger to array.
   * ```ts snippet:TriggersReadAllTriggers
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const { resources: triggerList } = await container.scripts.triggers.readAll().fetchAll();
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
   * @example
   * ```ts snippet:TriggersCreate
   * import { CosmosClient, TriggerDefinition, TriggerType, TriggerOperation } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const triggerDefinition: TriggerDefinition = {
   *   id: "sample trigger",
   *   body: "serverScript() { var x = 10; }",
   *   triggerType: TriggerType.Pre,
   *   triggerOperation: TriggerOperation.All,
   * };
   *
   * const { resource: trigger } = await container.scripts.triggers.create(triggerDefinition);
   * ```
   */
  public async create(body: TriggerDefinition, options?: RequestOptions): Promise<TriggerResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
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
        options,
        diagnosticNode,
      });
      const ref = new Trigger(this.container, response.result.id, this.clientContext);
      return new TriggerResponse(
        response.result,
        response.headers,
        response.code,
        ref,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { getIdFromLink, getPathFromLink, ResourceType } from "../../common";
import type { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import type { FeedOptions } from "../../request";
import type { Container } from "../Container";
import type { Resource } from "../Resource";
import type { ConflictDefinition } from "./ConflictDefinition";

/**
 * Use to query or read all conflicts.
 *
 * @see {@link Conflict} to read or delete a given {@link Conflict} by id.
 */
export class Conflicts {
  constructor(
    public readonly container: Container,
    private readonly clientContext: ClientContext,
  ) {}

  /**
   * Queries all conflicts.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options - Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return results in an array or iterate over them one at a time.
   */
  public query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Queries all conflicts.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options - Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return results in an array or iterate over them one at a time.
   * @example Query conflict with id
   * ```ts snippet:ConflictsQuery
   * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const container = database.container("Test Container");
   *
   * const querySpec: SqlQuerySpec = {
   *   query: `SELECT * FROM root r WHERE r.id = @conflict`,
   *   parameters: [{ name: "@conflict", value: "<conflict-id>" }],
   * };
   * const { resources: conflict } = await container.conflicts.query(querySpec).fetchAll();
   * ```
   */
  public query<T>(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = getPathFromLink(this.container.url, ResourceType.conflicts);
    const id = getIdFromLink(this.container.url);

    return new QueryIterator(
      this.clientContext,
      query,
      options,
      (diagNode: DiagnosticNodeInternal, innerOptions) => {
        return this.clientContext.queryFeed({
          path,
          resourceType: ResourceType.conflicts,
          resourceId: id,
          resultFn: (result) => result.Conflicts,
          query,
          options: innerOptions,
          diagnosticNode: diagNode,
        });
      },
    );
  }

  /**
   * Reads all conflicts
   * @param options - Use to set options like response page size, continuation tokens, etc.
   * @example
   * ```ts snippet:ConflictsReadAll
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const container = database.container("Test Container");
   *
   * const { resources: conflicts } = await container.conflicts.readAll().fetchAll();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<ConflictDefinition & Resource> {
    return this.query<ConflictDefinition & Resource>(undefined, options);
  }
}

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
import { StoredProcedure } from "./StoredProcedure.js";
import type { StoredProcedureDefinition } from "./StoredProcedureDefinition.js";
import { StoredProcedureResponse } from "./StoredProcedureResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";

/**
 * Operations for creating, upserting, or reading/querying all Stored Procedures.
 *
 * For operations to read, replace, delete, or execute a specific, existing stored procedure by id, see `container.storedProcedure()`.
 */
export class StoredProcedures {
  /**
   * @param container - The parent {@link Container}.
   * @hidden
   */
  constructor(
    public readonly container: Container,
    private readonly clientContext: ClientContext,
  ) {}

  /**
   * Query all Stored Procedures.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @example Read all stored procedures to array.
   * ```typescript
   * const querySpec: SqlQuerySpec = {
   *   query: "SELECT * FROM root r WHERE r.id = @sproc",
   *   parameters: [
   *     {name: "@sproc", value: "Todo"}
   *   ]
   * };
   * const {body: sprocList} = await containers.storedProcedures.query(querySpec).fetchAll();
   * ```
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Query all Stored Procedures.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @example Read all stored procedures to array.
   * ```typescript
   * const querySpec: SqlQuerySpec = {
   *   query: "SELECT * FROM root r WHERE r.id = @sproc",
   *   parameters: [
   *     {name: "@sproc", value: "Todo"}
   *   ]
   * };
   * const {body: sprocList} = await containers.storedProcedures.query(querySpec).fetchAll();
   * ```
   */
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = getPathFromLink(this.container.url, ResourceType.sproc);
    const id = getIdFromLink(this.container.url);

    return new QueryIterator(this.clientContext, query, options, (diagNode, innerOptions) => {
      return this.clientContext.queryFeed({
        path,
        resourceType: ResourceType.sproc,
        resourceId: id,
        resultFn: (result) => result.StoredProcedures,
        query,
        options: innerOptions,
        diagnosticNode: diagNode,
      });
    });
  }

  /**
   * Read all stored procedures.
   * @example Read all stored procedures to array.
   * ```typescript
   * const {body: sprocList} = await containers.storedProcedures.readAll().fetchAll();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<StoredProcedureDefinition & Resource> {
    return this.query<StoredProcedureDefinition & Resource>(undefined, options);
  }

  /**
   * Create a StoredProcedure.
   *
   * Azure Cosmos DB allows stored procedures to be executed in the storage tier,
   * directly against an item container. The script
   * gets executed under ACID transactions on the primary storage partition of the
   * specified container. For additional details,
   * refer to the server-side JavaScript API documentation.
   */
  public async create(
    body: StoredProcedureDefinition,
    options?: RequestOptions,
  ): Promise<StoredProcedureResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      if (body.body) {
        body.body = body.body.toString();
      }

      const err = {};
      if (!isResourceValid(body, err)) {
        throw err;
      }

      const path = getPathFromLink(this.container.url, ResourceType.sproc);
      const id = getIdFromLink(this.container.url);

      const response = await this.clientContext.create<StoredProcedureDefinition>({
        body,
        path,
        resourceType: ResourceType.sproc,
        resourceId: id,
        options,
        diagnosticNode,
      });
      const ref = new StoredProcedure(this.container, response.result.id, this.clientContext);
      return new StoredProcedureResponse(
        response.result,
        response.headers,
        response.code,
        ref,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}

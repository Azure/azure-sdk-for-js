// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import { getIdFromLink, getPathFromLink, isResourceValid, ResourceType } from "../../common";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Container } from "../Container";
import { Resource } from "../Resource";
import { StoredProcedure } from "./StoredProcedure";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";
import { StoredProcedureResponse } from "./StoredProcedureResponse";

/**
 * Operations for creating, upserting, or reading/querying all Stored Procedures.
 *
 * For operations to read, replace, delete, or execute a specific, existing stored procedure by id, see `container.storedProcedure()`.
 */
export class StoredProcedures {
  /**
   * @param container The parent {@link Container}.
   * @hidden
   */
  constructor(
    public readonly container: Container,
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Query all Stored Procedures.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options
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
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options
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

    return new QueryIterator(this.clientContext, query, options, (innerOptions) => {
      return this.clientContext.queryFeed({
        path,
        resourceType: ResourceType.sproc,
        resourceId: id,
        resultFn: (result) => result.StoredProcedures,
        query,
        options: innerOptions
      });
    });
  }

  /**
   * Read all stored procedures.
   * @param options
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
    options?: RequestOptions
  ): Promise<StoredProcedureResponse> {
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
      options
    });
    const ref = new StoredProcedure(this.container, response.result.id, this.clientContext);
    return new StoredProcedureResponse(response.result, response.headers, response.code, ref);
  }
}

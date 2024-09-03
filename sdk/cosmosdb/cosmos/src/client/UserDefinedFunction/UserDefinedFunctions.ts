// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ClientContext } from "../../ClientContext";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { getIdFromLink, getPathFromLink, isResourceValid, ResourceType } from "../../common";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Container } from "../Container";
import { Resource } from "../Resource";
import { UserDefinedFunction } from "./UserDefinedFunction";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";
import { UserDefinedFunctionResponse } from "./UserDefinedFunctionResponse";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics";

/**
 * Used to create, upsert, query, or read all User Defined Functions.
 *
 * @see {@link UserDefinedFunction} to read, replace, or delete a given User Defined Function by id.
 */
export class UserDefinedFunctions {
  /**
   * @hidden
   * @param container - The parent {@link Container}.
   */
  constructor(
    public readonly container: Container,
    private readonly clientContext: ClientContext,
  ) {}

  /**
   * Query all User Defined Functions.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Query all User Defined Functions.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   */
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = getPathFromLink(this.container.url, ResourceType.udf);
    const id = getIdFromLink(this.container.url);

    return new QueryIterator(this.clientContext, query, options, (diagnosticNode, innerOptions) => {
      return this.clientContext.queryFeed({
        path,
        resourceType: ResourceType.udf,
        resourceId: id,
        resultFn: (result) => result.UserDefinedFunctions,
        query,
        options: innerOptions,
        diagnosticNode,
      });
    });
  }

  /**
   * Read all User Defined Functions.
   * @example Read all User Defined Functions to array.
   * ```typescript
   * const {body: udfList} = await container.userDefinedFunctions.readAll().fetchAll();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<UserDefinedFunctionDefinition & Resource> {
    return this.query<UserDefinedFunctionDefinition & Resource>(undefined, options);
  }

  /**
   * Create a UserDefinedFunction.
   *
   * Azure Cosmos DB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers.
   *
   * For additional details, refer to the server-side JavaScript API documentation.
   *
   */
  public async create(
    body: UserDefinedFunctionDefinition,
    options?: RequestOptions,
  ): Promise<UserDefinedFunctionResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      if (body.body) {
        body.body = body.body.toString();
      }

      const err = {};
      if (!isResourceValid(body, err)) {
        throw err;
      }

      const path = getPathFromLink(this.container.url, ResourceType.udf);
      const id = getIdFromLink(this.container.url);

      const response = await this.clientContext.create<UserDefinedFunctionDefinition>({
        body,
        path,
        resourceType: ResourceType.udf,
        resourceId: id,
        options,
        diagnosticNode,
      });
      const ref = new UserDefinedFunction(this.container, response.result.id, this.clientContext);
      return new UserDefinedFunctionResponse(
        response.result,
        response.headers,
        response.code,
        ref,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}

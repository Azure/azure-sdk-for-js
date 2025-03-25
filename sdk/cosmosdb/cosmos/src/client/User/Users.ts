// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import { getIdFromLink, getPathFromLink, isResourceValid, ResourceType } from "../../common/index.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions, RequestOptions } from "../../request/index.js";
import type { Database } from "../Database/index.js";
import type { Resource } from "../Resource.js";
import { User } from "./User.js";
import type { UserDefinition } from "./UserDefinition.js";
import { UserResponse } from "./UserResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";

/**
 * Used to create, upsert, query, and read all users.
 *
 * @see {@link User} to read, replace, or delete a specific User by id.
 */
export class Users {
  /**
   * @hidden
   * @param database - The parent {@link Database}.
   */
  constructor(
    public readonly database: Database,
    private readonly clientContext: ClientContext,
  ) {}

  /**
   * Query all users.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Query all users.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   */
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = getPathFromLink(this.database.url, ResourceType.user);
    const id = getIdFromLink(this.database.url);
    return new QueryIterator(this.clientContext, query, options, (diagnosticNode, innerOptions) => {
      return this.clientContext.queryFeed({
        path,
        resourceType: ResourceType.user,
        resourceId: id,
        resultFn: (result) => result.Users,
        query,
        options: innerOptions,
        diagnosticNode,
      });
    });
  }

  /**
   * Read all users.-
   * @example Read all users to array.
   * ```typescript
   * const {body: usersList} = await database.users.readAll().fetchAll();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<UserDefinition & Resource> {
    return this.query<UserDefinition & Resource>(undefined, options);
  }

  /**
   * Create a database user with the specified {@link UserDefinition}.
   * @param body - The specified {@link UserDefinition}.
   */
  public async create(body: UserDefinition, options?: RequestOptions): Promise<UserResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const err = {};
      if (!isResourceValid(body, err)) {
        throw err;
      }

      const path = getPathFromLink(this.database.url, ResourceType.user);
      const id = getIdFromLink(this.database.url);
      const response = await this.clientContext.create<UserDefinition>({
        body,
        path,
        resourceType: ResourceType.user,
        resourceId: id,
        options,
        diagnosticNode,
      });
      const ref = new User(this.database, response.result.id, this.clientContext);
      return new UserResponse(
        response.result,
        response.headers,
        response.code,
        ref,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Upsert a database user with a specified {@link UserDefinition}.
   * @param body - The specified {@link UserDefinition}.
   */
  public async upsert(body: UserDefinition, options?: RequestOptions): Promise<UserResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const err = {};
      if (!isResourceValid(body, err)) {
        throw err;
      }

      const path = getPathFromLink(this.database.url, ResourceType.user);
      const id = getIdFromLink(this.database.url);

      const response = await this.clientContext.upsert<UserDefinition>({
        body,
        path,
        resourceType: ResourceType.user,
        resourceId: id,
        options,
        diagnosticNode,
      });
      const ref = new User(this.database, response.result.id, this.clientContext);
      return new UserResponse(
        response.result,
        response.headers,
        response.code,
        ref,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}

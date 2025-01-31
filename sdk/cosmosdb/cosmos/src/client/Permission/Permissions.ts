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
import type { Resource } from "../Resource.js";
import type { User } from "../User/index.js";
import { Permission } from "./Permission.js";
import type { PermissionBody } from "./PermissionBody.js";
import type { PermissionDefinition } from "./PermissionDefinition.js";
import { PermissionResponse } from "./PermissionResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";

/**
 * Use to create, replace, query, and read all Permissions.
 *
 * @see {@link Permission} to read, replace, or delete a specific permission by id.
 */
export class Permissions {
  /**
   * @hidden
   * @param user - The parent {@link User}.
   */
  constructor(
    public readonly user: User,
    private readonly clientContext: ClientContext,
  ) {}

  /**
   * Query all permissions.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Query all permissions.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   */
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = getPathFromLink(this.user.url, ResourceType.permission);
    const id = getIdFromLink(this.user.url);

    return new QueryIterator(this.clientContext, query, options, (diagnosticNode, innerOptions) => {
      return this.clientContext.queryFeed({
        path,
        resourceType: ResourceType.permission,
        resourceId: id,
        resultFn: (result) => result.Permissions,
        query,
        options: innerOptions,
        diagnosticNode,
      });
    });
  }

  /**
   * Read all permissions.
   * @example Read all permissions to array.
   * ```typescript
   * const {body: permissionList} = await user.permissions.readAll().fetchAll();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<PermissionDefinition & Resource> {
    return this.query(undefined, options);
  }

  /**
   * Create a permission.
   *
   * A permission represents a per-User Permission to access a specific resource
   * e.g. Item or Container.
   * @param body - Represents the body of the permission.
   */
  public async create(
    body: PermissionDefinition,
    options?: RequestOptions,
  ): Promise<PermissionResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const err = {};
      if (!isResourceValid(body, err)) {
        throw err;
      }

      const path = getPathFromLink(this.user.url, ResourceType.permission);
      const id = getIdFromLink(this.user.url);

      const response = await this.clientContext.create<PermissionDefinition, PermissionBody>({
        body,
        path,
        resourceType: ResourceType.permission,
        resourceId: id,
        diagnosticNode,
        options,
      });
      const ref = new Permission(this.user, response.result.id, this.clientContext);
      return new PermissionResponse(
        response.result,
        response.headers,
        response.code,
        ref,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Upsert a permission.
   *
   * A permission represents a per-User Permission to access a
   * specific resource e.g. Item or Container.
   */
  public async upsert(
    body: PermissionDefinition,
    options?: RequestOptions,
  ): Promise<PermissionResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const err = {};
      if (!isResourceValid(body, err)) {
        throw err;
      }

      const path = getPathFromLink(this.user.url, ResourceType.permission);
      const id = getIdFromLink(this.user.url);

      const response = await this.clientContext.upsert<PermissionDefinition, PermissionBody>({
        body,
        path,
        resourceType: ResourceType.permission,
        resourceId: id,
        options,
        diagnosticNode,
      });
      const ref = new Permission(this.user, response.result.id, this.clientContext);
      return new PermissionResponse(
        response.result,
        response.headers,
        response.code,
        ref,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}

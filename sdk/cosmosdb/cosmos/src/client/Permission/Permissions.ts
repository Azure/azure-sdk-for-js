// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import { getIdFromLink, getPathFromLink, isResourceValid, ResourceType } from "../../common";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Resource } from "../Resource";
import { User } from "../User";
import { Permission } from "./Permission";
import { PermissionBody } from "./PermissionBody";
import { PermissionDefinition } from "./PermissionDefinition";
import { PermissionResponse } from "./PermissionResponse";

/**
 * Use to create, replace, query, and read all Permissions.
 *
 * @see {@link Permission} to read, replace, or delete a specific permission by id.
 */
export class Permissions {
  /**
   * @hidden
   * @param user The parent {@link User}.
   */
  constructor(public readonly user: User, private readonly clientContext: ClientContext) {}

  /**
   * Query all permissions.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Query all permissions.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options
   */
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = getPathFromLink(this.user.url, ResourceType.permission);
    const id = getIdFromLink(this.user.url);

    return new QueryIterator(this.clientContext, query, options, (innerOptions) => {
      return this.clientContext.queryFeed({
        path,
        resourceType: ResourceType.permission,
        resourceId: id,
        resultFn: (result) => result.Permissions,
        query,
        options: innerOptions
      });
    });
  }

  /**
   * Read all permissions.
   * @param options
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
   * @param body Represents the body of the permission.
   */
  public async create(
    body: PermissionDefinition,
    options?: RequestOptions
  ): Promise<PermissionResponse> {
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
      options
    });
    const ref = new Permission(this.user, response.result.id, this.clientContext);
    return new PermissionResponse(response.result, response.headers, response.code, ref);
  }

  /**
   * Upsert a permission.
   *
   * A permission represents a per-User Permission to access a
   * specific resource e.g. Item or Container.
   */
  public async upsert(
    body: PermissionDefinition,
    options?: RequestOptions
  ): Promise<PermissionResponse> {
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
      options
    });
    const ref = new Permission(this.user, response.result.id, this.clientContext);
    return new PermissionResponse(response.result, response.headers, response.code, ref);
  }
}

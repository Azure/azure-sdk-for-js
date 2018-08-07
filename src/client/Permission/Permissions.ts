import { ClientContext } from "../../ClientContext";
import { Helper } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
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
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<PermissionDefinition> {
    const path = Helper.getPathFromLink(this.user.url, "permissions");
    const id = Helper.getIdFromLink(this.user.url);

    return new QueryIterator(this.clientContext, query, options, innerOptions => {
      return this.clientContext.queryFeed(path, "permissions", id, result => result.Permissions, query, innerOptions);
    });
  }

  /**
   * Read all permissions.
   * @param options
   * @example Read all permissions to array.
   * ```typescript
   * const {body: permissionList} = await user.permissions.readAll().toArray();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<PermissionDefinition> {
    return this.query(undefined, options);
  }

  /**
   * Create a permission.
   *
   * A permission represents a per-User Permission to access a specific resource
   * e.g. Item or Container.
   * @param body Represents the body of the permission.
   */
  public async create(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse> {
    const err = {};
    if (!Helper.isResourceValid(body, err)) {
      throw err;
    }

    const path = Helper.getPathFromLink(this.user.url, "permissions");
    const id = Helper.getIdFromLink(this.user.url);

    const response = await this.clientContext.create(body, path, "permissions", id, undefined, options);
    const ref = new Permission(this.user, response.result.id, this.clientContext);
    return {
      body: response.result as PermissionDefinition & PermissionBody,
      headers: response.headers,
      ref,
      permission: ref
    };
  }

  /**
   * Upsert a permission.
   *
   * A permission represents a per-User Permission to access a
   * specific resource e.g. Item or Cotnainer.
   */
  public async upsert(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse> {
    const err = {};
    if (!Helper.isResourceValid(body, err)) {
      throw err;
    }

    const path = Helper.getPathFromLink(this.user.url, "permissions");
    const id = Helper.getIdFromLink(this.user.url);

    const response = await this.clientContext.upsert(body, path, "permissions", id, undefined, options);
    const ref = new Permission(this.user, response.result.id, this.clientContext);
    return {
      body: response.result as PermissionDefinition & PermissionBody,
      headers: response.headers,
      ref,
      permission: ref
    };
  }
}

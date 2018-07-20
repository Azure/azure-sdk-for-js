import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions, Response } from "../../request";
import { User } from "../User";
import { Permission } from "./Permission";
import { PermissionDefinition } from "./PermissionDefinition";
import { PermissionResponse } from "./PermissionResponse";

/**
 * Use to create, replace, query, and read all Permissions.
 *
 * @see {@link Permission} to read, replace, or delete a specific permission by id.
 */
export class Permissions {
  private client: CosmosClient;
  /**
   * @hidden
   * @param user The parent {@link User}.
   */
  constructor(public readonly user: User) {
    this.client = this.user.database.client;
  }

  /**
   * Query all permissions.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<PermissionDefinition> {
    return this.client.documentClient.queryPermissions(this.user.url, query, options) as QueryIterator<
      PermissionDefinition
    >;
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
    return this.client.documentClient.readPermissions(this.user.url, options) as QueryIterator<PermissionDefinition>;
  }

  /**
   * Create a permission.
   *
   * A permission represents a per-User Permission to access a specific resource
   * e.g. Item or Container.
   * @param body Represents the body of the permission.
   */
  public async create(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse> {
    const response = await this.client.documentClient.createPermission(this.user.url, body, options);
    const ref = new Permission(this.user, response.result.id);
    return { body: response.result, headers: response.headers, ref, permission: ref };
  }

  /**
   * Upsert a permission.
   *
   * A permission represents a per-User Permission to access a
   * specific resource e.g. Item or Cotnainer.
   */
  public async upsert(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse> {
    const response = await this.client.documentClient.upsertPermission(this.user.url, body, options);
    const ref = new Permission(this.user, response.result.id);
    return { body: response.result, headers: response.headers, ref, permission: ref };
  }
}

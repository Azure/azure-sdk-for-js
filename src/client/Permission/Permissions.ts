import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions, Response } from "../../request";
import { User } from "../User";
import { Permission } from "./Permission";
import { PermissionDefinition } from "./PermissionDefinition";
import { PermissionResponse } from "./PermissionResponse";

export class Permissions {
  private client: CosmosClient;
  constructor(public readonly user: User) {
    this.client = this.user.database.client;
  }

  public get(id: string): Permission {
    return new Permission(this.user, id);
  }

  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<PermissionDefinition> {
    return this.client.documentClient.queryPermissions(this.user.url, query, options) as QueryIterator<
      PermissionDefinition
    >;
  }

  public readAll(options?: FeedOptions): QueryIterator<PermissionDefinition> {
    return this.client.documentClient.readPermissions(this.user.url, options) as QueryIterator<PermissionDefinition>;
  }

  /**
   * Create a permission.
   * <p> A permission represents a per-User Permission to access a specific resource \
   * e.g. Item or Container.  </p>
   * @param body                 - Represents the body of the permission.
   * @param {string} body.id              - The id of the permission
   * @param {string} body.permissionMode  - The mode of the permission, must be a value of {@link PermissionMode}
   * @param {string} body.resource        - The link of the resource that the permission will be applied to.
   */
  public async create(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse> {
    const response = await this.client.documentClient.createPermission(this.user.url, body, options);
    const ref = new Permission(this.user, response.result.id);
    return { body: response.result, headers: response.headers, ref, permission: ref };
  }

  /**
   * Upsert a permission.
   * <p> A permission represents a per-User Permission to access a \
   * specific resource e.g. Item or Cotnainer.  </p>
   */
  public async upsert(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse> {
    const response = await this.client.documentClient.upsertPermission(this.user.url, body, options);
    const ref = new Permission(this.user, response.result.id);
    return { body: response.result, headers: response.headers, ref, permission: ref };
  }
}

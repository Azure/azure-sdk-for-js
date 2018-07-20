import { UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions } from "../../request/RequestOptions";
import { User } from "../User";
import { PermissionDefinition } from "./PermissionDefinition";
import { PermissionResponse } from "./PermissionResponse";

/**
 * Use to read, replace, or delete a given {@link Permission} by id.
 *
 * @see {@link Permissions} to create, upsert, query, or read all Permissions.
 */
export class Permission {
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url() {
    return UriFactory.createPermissionUri(this.user.database.id, this.user.id, this.id);
  }
  private client: CosmosClient;
  /**
   * @hidden
   * @param user The parent {@link User}.
   * @param id The id of the given {@link Permission}.
   */
  constructor(public readonly user: User, public readonly id: string) {
    this.client = this.user.database.client;
  }

  /**
   * Read the {@link PermissionDefinition} of the given {@link Permission}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<PermissionResponse> {
    const response = await this.client.documentClient.readPermission(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, permission: this };
  }

  /**
   * Replace the given {@link Permission} with the specified {@link PermissionDefinition}.
   * @param body The specified {@link PermissionDefinition}.
   * @param options
   */
  public async replace(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse> {
    const response = await this.client.documentClient.replacePermission(this.url, body, options);
    return { body: response.result, headers: response.headers, ref: this, permission: this };
  }

  /**
   * Delete the given {@link Permission}.
   * @param options
   */
  public async delete(options?: RequestOptions): Promise<PermissionResponse> {
    const response = await this.client.documentClient.deletePermission(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, permission: this };
  }
}

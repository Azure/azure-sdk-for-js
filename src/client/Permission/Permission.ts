import { ClientContext } from "../../ClientContext";
import { Helper, UriFactory } from "../../common";
import { RequestOptions } from "../../request/RequestOptions";
import { User } from "../User";
import { PermissionBody } from "./PermissionBody";
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
  /**
   * @hidden
   * @param user The parent {@link User}.
   * @param id The id of the given {@link Permission}.
   */
  constructor(public readonly user: User, public readonly id: string, private readonly clientContext: ClientContext) {}

  /**
   * Read the {@link PermissionDefinition} of the given {@link Permission}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<PermissionResponse> {
    const path = Helper.getPathFromLink(this.url);
    const id = Helper.getIdFromLink(this.url);

    const response = await this.clientContext.read<PermissionDefinition & PermissionBody>(
      path,
      "permissions",
      id,
      undefined,
      options
    );
    return {
      body: response.result,
      headers: response.headers,
      ref: this,
      permission: this
    };
  }

  /**
   * Replace the given {@link Permission} with the specified {@link PermissionDefinition}.
   * @param body The specified {@link PermissionDefinition}.
   * @param options
   */
  public async replace(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse> {
    const err = {};
    if (!Helper.isResourceValid(body, err)) {
      throw err;
    }

    const path = Helper.getPathFromLink(this.url);
    const id = Helper.getIdFromLink(this.url);

    const response = await this.clientContext.replace<PermissionDefinition & PermissionBody>(
      body,
      path,
      "permissions",
      id,
      undefined,
      options
    );
    return {
      body: response.result,
      headers: response.headers,
      ref: this,
      permission: this
    };
  }

  /**
   * Delete the given {@link Permission}.
   * @param options
   */
  public async delete(options?: RequestOptions): Promise<PermissionResponse> {
    const path = Helper.getPathFromLink(this.url);
    const id = Helper.getIdFromLink(this.url);

    const response = await this.clientContext.delete<PermissionDefinition & PermissionBody>(
      path,
      "permissions",
      id,
      undefined,
      options
    );
    return {
      body: response.result,
      headers: response.headers,
      ref: this,
      permission: this
    };
  }
}

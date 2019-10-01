// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import {
  createUserUri,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType
} from "../../common";
import { RequestOptions } from "../../request";
import { Database } from "../Database";
import { Permission, Permissions } from "../Permission";
import { UserDefinition } from "./UserDefinition";
import { UserResponse } from "./UserResponse";

/**
 * Used to read, replace, and delete Users.
 *
 * Additionally, you can access the permissions for a given user via `user.permission` and `user.permissions`.
 *
 * @see {@link Users} to create, upsert, query, or read all.
 */
export class User {
  /**
   * Operations for creating, upserting, querying, or reading all operations.
   *
   * See `client.permission(id)` to read, replace, or delete a specific Permission by id.
   */
  public readonly permissions: Permissions;
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url() {
    return createUserUri(this.database.id, this.id);
  }
  /**
   * @hidden
   * @param database The parent {@link Database}.
   * @param id
   */
  constructor(
    public readonly database: Database,
    public readonly id: string,
    private readonly clientContext: ClientContext
  ) {
    this.permissions = new Permissions(this, this.clientContext);
  }

  /**
   * Operations to read, replace, or delete a specific Permission by id.
   *
   * See `client.permissions` for creating, upserting, querying, or reading all operations.
   * @param id
   */
  public permission(id: string): Permission {
    return new Permission(this, id, this.clientContext);
  }

  /**
   * Read the {@link UserDefinition} for the given {@link User}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<UserResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);
    const response = await this.clientContext.read<UserDefinition>({
      path,
      resourceType: ResourceType.user,
      resourceId: id,
      options
    });
    return new UserResponse(response.result, response.headers, response.code, this);
  }

  /**
   * Replace the given {@link User}'s definition with the specified {@link UserDefinition}.
   * @param body The specified {@link UserDefinition} to replace the definition.
   * @param options
   */
  public async replace(body: UserDefinition, options?: RequestOptions): Promise<UserResponse> {
    const err = {};
    if (!isResourceValid(body, err)) {
      throw err;
    }

    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.replace<UserDefinition>({
      body,
      path,
      resourceType: ResourceType.user,
      resourceId: id,
      options
    });
    return new UserResponse(response.result, response.headers, response.code, this);
  }

  /**
   * Delete the given {@link User}.
   * @param options
   */
  public async delete(options?: RequestOptions): Promise<UserResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.delete<UserDefinition>({
      path,
      resourceType: ResourceType.user,
      resourceId: id,
      options
    });
    return new UserResponse(response.result, response.headers, response.code, this);
  }
}

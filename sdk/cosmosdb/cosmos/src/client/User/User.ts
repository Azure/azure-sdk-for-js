// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import {
  createUserUri,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType,
} from "../../common";
import { RequestOptions, Response } from "../../request";
import { Database } from "../Database";
import { Permission, Permissions } from "../Permission";
import { Resource } from "../Resource";
import { UserDefinition } from "./UserDefinition";
import { createUserResponse, UserResponse } from "./UserResponse";

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
  public get url(): string {
    return createUserUri(this.database.id, this.id);
  }
  /**
   * @hidden
   * @param database - The parent {@link Database}.
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
   */
  public permission(id: string): Permission {
    return new Permission(this, id, this.clientContext);
  }

  /**
   * Read the {@link UserDefinition} for the given {@link User}.
   */
  public async read(options?: RequestOptions): Promise<UserResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);
    const response: Response<Resource> = await this.clientContext.read({
      path,
      resourceType: ResourceType.user,
      resourceId: id,
      options,
    });
    return createUserResponse(response, this);
  }

  /**
   * Replace the given {@link User}'s definition with the specified {@link UserDefinition}.
   * @param body - The specified {@link UserDefinition} to replace the definition.
   */
  public async replace(body: UserDefinition, options?: RequestOptions): Promise<UserResponse> {
    const err = {};
    if (!isResourceValid(body, err)) {
      throw err;
    }

    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.replace({
      body,
      path,
      resourceType: ResourceType.user,
      resourceId: id,
      options,
    });
    return createUserResponse(response, this);
  }

  /**
   * Delete the given {@link User}.
   */
  public async delete(options?: RequestOptions): Promise<UserResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.delete({
      path,
      resourceType: ResourceType.user,
      resourceId: id,
      options,
    });
    return createUserResponse(response, this);
  }
}

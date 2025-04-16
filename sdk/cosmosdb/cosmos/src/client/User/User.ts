// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import {
  createUserUri,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType,
} from "../../common/index.js";
import type { RequestOptions } from "../../request/index.js";
import type { Database } from "../Database/index.js";
import { Permission, Permissions } from "../Permission/index.js";
import type { UserDefinition } from "./UserDefinition.js";
import { UserResponse } from "./UserResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";

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
    private readonly clientContext: ClientContext,
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
   * @example
   * ```ts snippet:UserRead
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { resource: user } = await database.user("<user-id>").read();
   * ```
   */
  public async read(options?: RequestOptions): Promise<UserResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);
      const response = await this.clientContext.read<UserDefinition>({
        path,
        resourceType: ResourceType.user,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new UserResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Replace the given {@link User}'s definition with the specified {@link UserDefinition}.
   * @param body - The specified {@link UserDefinition} to replace the definition.
   * @example
   * ```ts snippet:UserReplace
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { resource: user } = await database.user("<user-id>").read();
   * user.id = "<new user id>";
   *
   * await database.user("<user-id>").replace(user);
   * ```
   */
  public async replace(body: UserDefinition, options?: RequestOptions): Promise<UserResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
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
        options,
        diagnosticNode,
      });
      return new UserResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Delete the given {@link User}.
   * @example
   * ```ts snippet:UserDelete
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * await database.user("<user-id>").delete();
   * ```
   */
  public async delete(options?: RequestOptions): Promise<UserResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);

      const response = await this.clientContext.delete<UserDefinition>({
        path,
        resourceType: ResourceType.user,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new UserResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}

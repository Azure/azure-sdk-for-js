// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import {
  createPermissionUri,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType,
} from "../../common/index.js";
import type { RequestOptions } from "../../request/RequestOptions.js";
import type { User } from "../User/index.js";
import type { PermissionBody } from "./PermissionBody.js";
import type { PermissionDefinition } from "./PermissionDefinition.js";
import { PermissionResponse } from "./PermissionResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";

/**
 * Use to read, replace, or delete a given {@link Permission} by id.
 *
 * @see {@link Permissions} to create, upsert, query, or read all Permissions.
 */
export class Permission {
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url(): string {
    return createPermissionUri(this.user.database.id, this.user.id, this.id);
  }
  /**
   * @hidden
   * @param user - The parent {@link User}.
   * @param id - The id of the given {@link Permission}.
   */
  constructor(
    public readonly user: User,
    public readonly id: string,
    private readonly clientContext: ClientContext,
  ) {}

  /**
   * Read the {@link PermissionDefinition} of the given {@link Permission}.
   * @example
   * ```ts snippet:PermissionRead
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const user = database.user("<user-id>");
   *
   * const { resource: permission } = await user.permission("<permission-id>").read();
   * ```
   */
  public async read(options?: RequestOptions): Promise<PermissionResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);

      const response = await this.clientContext.read<PermissionDefinition & PermissionBody>({
        path,
        resourceType: ResourceType.permission,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new PermissionResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Replace the given {@link Permission} with the specified {@link PermissionDefinition}.
   * @param body - The specified {@link PermissionDefinition}.
   * @example
   * ```ts snippet:PermissionReplace
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const user = database.user("<user-id>");
   * const { resource: permission } = await user.permission("<permission-id>").read();
   * permission.resource = "<new-resource-url>";
   *
   * await user.permission("<permission-id>").replace(permission);
   * ```
   */
  public async replace(
    body: PermissionDefinition,
    options?: RequestOptions,
  ): Promise<PermissionResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const err = {};
      if (!isResourceValid(body, err)) {
        throw err;
      }

      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);
      const response = await this.clientContext.replace<PermissionDefinition & PermissionBody>({
        body,
        path,
        resourceType: ResourceType.permission,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new PermissionResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Delete the given {@link Permission}.
   * @example
   * ```ts snippet:PermissionDelete
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const user = database.user("<user-id>");
   *
   * await user.permission("<permission-id>").delete();
   * ```
   */
  public async delete(options?: RequestOptions): Promise<PermissionResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);
      const response = await this.clientContext.delete<PermissionDefinition & PermissionBody>({
        path,
        resourceType: ResourceType.permission,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new PermissionResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}

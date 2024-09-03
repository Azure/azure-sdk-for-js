// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ClientContext } from "../../ClientContext";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import {
  createPermissionUri,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType,
} from "../../common";
import { RequestOptions } from "../../request/RequestOptions";
import { User } from "../User";
import { PermissionBody } from "./PermissionBody";
import { PermissionDefinition } from "./PermissionDefinition";
import { PermissionResponse } from "./PermissionResponse";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics";

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

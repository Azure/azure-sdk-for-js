// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics";
import type { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import type { Resource } from "../Resource";
import type { Permission } from "./Permission";
import type { PermissionBody } from "./PermissionBody";
import type { PermissionDefinition } from "./PermissionDefinition";

export class PermissionResponse extends ResourceResponse<
  PermissionDefinition & PermissionBody & Resource
> {
  constructor(
    resource: PermissionDefinition & PermissionBody & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    permission: Permission,
    diagnostics: CosmosDiagnostics,
  ) {
    super(resource, headers, statusCode, diagnostics);
    this.permission = permission;
  }
  /** A reference to the {@link Permission} corresponding to the returned {@link PermissionDefinition}. */
  public readonly permission: Permission;
}

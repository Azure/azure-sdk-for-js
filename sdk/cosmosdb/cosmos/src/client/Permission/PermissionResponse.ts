// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosDiagnostics } from "../../CosmosDiagnostics";
import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { Permission } from "./Permission";
import { PermissionBody } from "./PermissionBody";
import { PermissionDefinition } from "./PermissionDefinition";

export class PermissionResponse extends ResourceResponse<
  PermissionDefinition & PermissionBody & Resource
> {
  constructor(
    resource: PermissionDefinition & PermissionBody & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    permission: Permission,
    diagnostics: CosmosDiagnostics
  ) {
    super(resource, headers, statusCode, diagnostics);
    this.permission = permission;
  }
  /** A reference to the {@link Permission} corresponding to the returned {@link PermissionDefinition}. */
  public readonly permission: Permission;
}

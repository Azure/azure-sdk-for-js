// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CosmosHeaders } from "../../queryExecutionContext";
import { Permission } from "./Permission";
import { PermissionBody } from "./PermissionBody";
import { PermissionDefinition } from "./PermissionDefinition";
import { Resource } from "../Resource";
import { ResourceResponse } from "../../request";

export class PermissionResponse extends ResourceResponse<
  PermissionDefinition & PermissionBody & Resource
> {
  constructor(
    resource: PermissionDefinition & PermissionBody & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    permission: Permission
  ) {
    super(resource, headers, statusCode);
    this.permission = permission;
  }
  /** A reference to the {@link Permission} corresponding to the returned {@link PermissionDefinition}. */
  public readonly permission: Permission;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../../queryExecutionContext";
import { GuaranteedResourceResponse } from "../../request";
import { MaterializedResponse } from "../../request/Response";
import { Resource } from "../Resource";
import { Permission } from "./Permission";
import { PermissionBody } from "./PermissionBody";
import { PermissionDefinition } from "./PermissionDefinition";

export class PermissionResponse extends GuaranteedResourceResponse<
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


export function createPermissionResponse<T extends PermissionDefinition & PermissionBody = any>(response: MaterializedResponse<T & Resource>, permission: Permission): PermissionResponse {
  const resource = response.result;
  if (resource.id !== undefined && resource.permissionMode !== undefined && resource.resource !== undefined && resource._token !== undefined) {
    const checkedResource: PermissionDefinition & PermissionBody & Resource = {
      ...resource,
      id: resource.id,
      permissionMode: resource.permissionMode,
      resource: resource.resource,
      _token: resource._token,
    }
    return new PermissionResponse(
      checkedResource,
      response.headers,
      response.code,
      permission
    );
  }
  throw new Error("Necessary properties of PermissionDefinition missing.");
}
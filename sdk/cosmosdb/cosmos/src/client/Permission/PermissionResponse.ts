import { CosmosResponse } from "../../request";
import { Resource } from "../Resource";
import { Permission } from "./Permission";
import { PermissionBody } from "./PermissionBody";
import { PermissionDefinition } from "./PermissionDefinition";

export interface PermissionResponse
  extends CosmosResponse<PermissionDefinition & PermissionBody & Resource, Permission> {
  /** A reference to the {@link Permission} corresponding to the returned {@link PermissionDefinition}. */
  permission: Permission;
}

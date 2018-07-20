import { CosmosResponse } from "../../request";
import { Permission } from "./Permission";
import { PermissionDefinition } from "./PermissionDefinition";

export interface PermissionResponse extends CosmosResponse<PermissionDefinition, Permission> {
  /** A reference to the {@link Permission} corresponding to the returned {@link PermissionDefinition}. */
  permission: Permission;
}

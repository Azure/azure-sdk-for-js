import { CosmosResponse } from "../../request";
import { Permission } from "./Permission";
import { PermissionBody } from "./PermissionBody";

export interface PermissionResponse extends CosmosResponse<PermissionBody, Permission> {
  /** A reference to the {@link Permission} corresponding to the returned {@link PermissionDefinition}. */
  permission: Permission;
}

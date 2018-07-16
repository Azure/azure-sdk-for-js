import { CosmosResponse } from "../../request";
import { Permission } from "./Permission";
import { PermissionDefinition } from "./PermissionDefinition";

export interface PermissionResponse extends CosmosResponse<PermissionDefinition, Permission> {
  permission: Permission;
}

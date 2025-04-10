// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PermissionMode } from "../../documents/index.js";

export interface PermissionDefinition {
  /** The id of the permission */
  id: string;
  /** The mode of the permission, must be a value of {@link PermissionMode} */
  permissionMode: PermissionMode;
  /** The link of the resource that the permission will be applied to. */
  resource: string;
  resourcePartitionKey?: string | any[]; // TODO: what's allowed here?
}

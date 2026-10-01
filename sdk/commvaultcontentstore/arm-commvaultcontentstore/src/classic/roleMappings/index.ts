// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext } from "../../api/contentStoreContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/roleMappings/operations.js";
import type {
  RoleMappingsListOptionalParams,
  RoleMappingsDeleteOptionalParams,
  RoleMappingsCreateOrUpdateOptionalParams,
  RoleMappingsGetOptionalParams,
} from "../../api/roleMappings/options.js";
import type { RoleMapping } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RoleMappings operations. */
export interface RoleMappingsOperations {
  /** List RoleMapping resources by CloudAccount */
  list: (
    resourceGroupName: string,
    cloudAccountName: string,
    options?: RoleMappingsListOptionalParams,
  ) => PagedAsyncIterableIterator<RoleMapping>;
  /** Delete a RoleMapping */
  delete: (
    resourceGroupName: string,
    cloudAccountName: string,
    options?: RoleMappingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a RoleMapping */
  createOrUpdate: (
    resourceGroupName: string,
    cloudAccountName: string,
    resource: RoleMapping,
    options?: RoleMappingsCreateOrUpdateOptionalParams,
  ) => Promise<RoleMapping>;
  /** Get a RoleMapping */
  get: (
    resourceGroupName: string,
    cloudAccountName: string,
    options?: RoleMappingsGetOptionalParams,
  ) => Promise<RoleMapping>;
}

function _getRoleMappings(context: ContentStoreContext) {
  return {
    list: (
      resourceGroupName: string,
      cloudAccountName: string,
      options?: RoleMappingsListOptionalParams,
    ) => list(context, resourceGroupName, cloudAccountName, options),
    delete: (
      resourceGroupName: string,
      cloudAccountName: string,
      options?: RoleMappingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudAccountName, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudAccountName: string,
      resource: RoleMapping,
      options?: RoleMappingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, cloudAccountName, resource, options),
    get: (
      resourceGroupName: string,
      cloudAccountName: string,
      options?: RoleMappingsGetOptionalParams,
    ) => get(context, resourceGroupName, cloudAccountName, options),
  };
}

export function _getRoleMappingsOperations(context: ContentStoreContext): RoleMappingsOperations {
  return {
    ..._getRoleMappings(context),
  };
}

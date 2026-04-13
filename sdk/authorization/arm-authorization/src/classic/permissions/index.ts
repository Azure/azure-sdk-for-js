// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import { listForResource, listForResourceGroup } from "../../api/permissions/operations.js";
import type {
  PermissionsListForResourceOptionalParams,
  PermissionsListForResourceGroupOptionalParams,
} from "../../api/permissions/options.js";
import type { Permission } from "../../models/microsoft/roleDefinitions/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Permissions operations. */
export interface PermissionsOperations {
  /** Gets all permissions the caller has for a resource. */
  listForResource: (
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    options?: PermissionsListForResourceOptionalParams,
  ) => PagedAsyncIterableIterator<Permission>;
  /** Gets all permissions the caller has for a resource group. */
  listForResourceGroup: (
    resourceGroupName: string,
    options?: PermissionsListForResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Permission>;
}

function _getPermissions(context: AuthorizationManagementContext) {
  return {
    listForResource: (
      resourceGroupName: string,
      resourceProviderNamespace: string,
      parentResourcePath: string,
      resourceType: string,
      resourceName: string,
      options?: PermissionsListForResourceOptionalParams,
    ) =>
      listForResource(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        options,
      ),
    listForResourceGroup: (
      resourceGroupName: string,
      options?: PermissionsListForResourceGroupOptionalParams,
    ) => listForResourceGroup(context, resourceGroupName, options),
  };
}

export function _getPermissionsOperations(
  context: AuthorizationManagementContext,
): PermissionsOperations {
  return {
    ..._getPermissions(context),
  };
}

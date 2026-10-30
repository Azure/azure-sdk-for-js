// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import { list, listParent } from "../../api/updates/operations.js";
import type {
  UpdatesListOptionalParams,
  UpdatesListParentOptionalParams,
} from "../../api/updates/options.js";
import type { Update } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Updates operations. */
export interface UpdatesOperations {
  /** Get updates to resources. */
  list: (
    resourceGroupName: string,
    providerName: string,
    resourceType: string,
    resourceName: string,
    options?: UpdatesListOptionalParams,
  ) => PagedAsyncIterableIterator<Update>;
  /** Get updates to resources. */
  listParent: (
    resourceGroupName: string,
    providerName: string,
    resourceParentType: string,
    resourceParentName: string,
    resourceType: string,
    resourceName: string,
    options?: UpdatesListParentOptionalParams,
  ) => PagedAsyncIterableIterator<Update>;
}

function _getUpdates(context: MaintenanceManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      providerName: string,
      resourceType: string,
      resourceName: string,
      options?: UpdatesListOptionalParams,
    ) => list(context, resourceGroupName, providerName, resourceType, resourceName, options),
    listParent: (
      resourceGroupName: string,
      providerName: string,
      resourceParentType: string,
      resourceParentName: string,
      resourceType: string,
      resourceName: string,
      options?: UpdatesListParentOptionalParams,
    ) =>
      listParent(
        context,
        resourceGroupName,
        providerName,
        resourceParentType,
        resourceParentName,
        resourceType,
        resourceName,
        options,
      ),
  };
}

export function _getUpdatesOperations(context: MaintenanceManagementContext): UpdatesOperations {
  return {
    ..._getUpdates(context),
  };
}

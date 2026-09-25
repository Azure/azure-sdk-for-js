// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import {
  createOrUpdate,
  createOrUpdateParent,
  list,
  createOrUpdateOrCancel,
  get,
  getParent,
} from "../../api/applyUpdates/operations.js";
import type {
  ApplyUpdatesCreateOrUpdateOptionalParams,
  ApplyUpdatesCreateOrUpdateParentOptionalParams,
  ApplyUpdatesListOptionalParams,
  ApplyUpdatesCreateOrUpdateOrCancelOptionalParams,
  ApplyUpdatesGetOptionalParams,
  ApplyUpdatesGetParentOptionalParams,
} from "../../api/applyUpdates/options.js";
import type { ApplyUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApplyUpdates operations. */
export interface ApplyUpdatesOperations {
  /** Apply maintenance updates to resource */
  createOrUpdate: (
    resourceGroupName: string,
    providerName: string,
    resourceType: string,
    resourceName: string,
    options?: ApplyUpdatesCreateOrUpdateOptionalParams,
  ) => Promise<ApplyUpdate>;
  /** Apply maintenance updates to resource with parent */
  createOrUpdateParent: (
    resourceGroupName: string,
    providerName: string,
    resourceParentType: string,
    resourceParentName: string,
    resourceType: string,
    resourceName: string,
    options?: ApplyUpdatesCreateOrUpdateParentOptionalParams,
  ) => Promise<ApplyUpdate>;
  /** Get Configuration records within a subscription */
  list: (options?: ApplyUpdatesListOptionalParams) => PagedAsyncIterableIterator<ApplyUpdate>;
  /** Apply maintenance updates to resource */
  createOrUpdateOrCancel: (
    resourceGroupName: string,
    providerName: string,
    resourceType: string,
    resourceName: string,
    applyUpdateName: string,
    applyUpdate: ApplyUpdate,
    options?: ApplyUpdatesCreateOrUpdateOrCancelOptionalParams,
  ) => Promise<ApplyUpdate>;
  /** Track maintenance updates to resource */
  get: (
    resourceGroupName: string,
    providerName: string,
    resourceType: string,
    resourceName: string,
    applyUpdateName: string,
    options?: ApplyUpdatesGetOptionalParams,
  ) => Promise<ApplyUpdate>;
  /** Track maintenance updates to resource with parent */
  getParent: (
    resourceGroupName: string,
    providerName: string,
    resourceParentType: string,
    resourceParentName: string,
    resourceType: string,
    resourceName: string,
    applyUpdateName: string,
    options?: ApplyUpdatesGetParentOptionalParams,
  ) => Promise<ApplyUpdate>;
}

function _getApplyUpdates(context: MaintenanceManagementContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      providerName: string,
      resourceType: string,
      resourceName: string,
      options?: ApplyUpdatesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, providerName, resourceType, resourceName, options),
    createOrUpdateParent: (
      resourceGroupName: string,
      providerName: string,
      resourceParentType: string,
      resourceParentName: string,
      resourceType: string,
      resourceName: string,
      options?: ApplyUpdatesCreateOrUpdateParentOptionalParams,
    ) =>
      createOrUpdateParent(
        context,
        resourceGroupName,
        providerName,
        resourceParentType,
        resourceParentName,
        resourceType,
        resourceName,
        options,
      ),
    list: (options?: ApplyUpdatesListOptionalParams) => list(context, options),
    createOrUpdateOrCancel: (
      resourceGroupName: string,
      providerName: string,
      resourceType: string,
      resourceName: string,
      applyUpdateName: string,
      applyUpdate: ApplyUpdate,
      options?: ApplyUpdatesCreateOrUpdateOrCancelOptionalParams,
    ) =>
      createOrUpdateOrCancel(
        context,
        resourceGroupName,
        providerName,
        resourceType,
        resourceName,
        applyUpdateName,
        applyUpdate,
        options,
      ),
    get: (
      resourceGroupName: string,
      providerName: string,
      resourceType: string,
      resourceName: string,
      applyUpdateName: string,
      options?: ApplyUpdatesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        providerName,
        resourceType,
        resourceName,
        applyUpdateName,
        options,
      ),
    getParent: (
      resourceGroupName: string,
      providerName: string,
      resourceParentType: string,
      resourceParentName: string,
      resourceType: string,
      resourceName: string,
      applyUpdateName: string,
      options?: ApplyUpdatesGetParentOptionalParams,
    ) =>
      getParent(
        context,
        resourceGroupName,
        providerName,
        resourceParentType,
        resourceParentName,
        resourceType,
        resourceName,
        applyUpdateName,
        options,
      ),
  };
}

export function _getApplyUpdatesOperations(
  context: MaintenanceManagementContext,
): ApplyUpdatesOperations {
  return {
    ..._getApplyUpdates(context),
  };
}

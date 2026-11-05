// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadManagerContext } from "../../api/workloadManagerContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/workloadSpaces/operations.js";
import type {
  WorkloadSpacesListBySubscriptionOptionalParams,
  WorkloadSpacesListByResourceGroupOptionalParams,
  WorkloadSpacesDeleteOptionalParams,
  WorkloadSpacesUpdateOptionalParams,
  WorkloadSpacesCreateOrUpdateOptionalParams,
  WorkloadSpacesGetOptionalParams,
} from "../../api/workloadSpaces/options.js";
import type { WorkloadSpace, WorkloadSpaceUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkloadSpaces operations. */
export interface WorkloadSpacesOperations {
  /** Lists workload spaces in a subscription. */
  listBySubscription: (
    options?: WorkloadSpacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadSpace>;
  /** Lists workload spaces in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: WorkloadSpacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadSpace>;
  /** Deletes a workload space and its owned resources. */
  delete: (
    resourceGroupName: string,
    spaceName: string,
    options?: WorkloadSpacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates mutable workload space properties. */
  update: (
    resourceGroupName: string,
    spaceName: string,
    properties: WorkloadSpaceUpdate,
    options?: WorkloadSpacesUpdateOptionalParams,
  ) => PollerLike<OperationState<WorkloadSpace>, WorkloadSpace>;
  /** Creates or replaces a workload space. */
  createOrUpdate: (
    resourceGroupName: string,
    spaceName: string,
    resource: WorkloadSpace,
    options?: WorkloadSpacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<WorkloadSpace>, WorkloadSpace>;
  /** Gets a workload space. */
  get: (
    resourceGroupName: string,
    spaceName: string,
    options?: WorkloadSpacesGetOptionalParams,
  ) => Promise<WorkloadSpace>;
}

function _getWorkloadSpaces(context: WorkloadManagerContext) {
  return {
    listBySubscription: (options?: WorkloadSpacesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: WorkloadSpacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      spaceName: string,
      options?: WorkloadSpacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, spaceName, options),
    update: (
      resourceGroupName: string,
      spaceName: string,
      properties: WorkloadSpaceUpdate,
      options?: WorkloadSpacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, spaceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      spaceName: string,
      resource: WorkloadSpace,
      options?: WorkloadSpacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, spaceName, resource, options),
    get: (
      resourceGroupName: string,
      spaceName: string,
      options?: WorkloadSpacesGetOptionalParams,
    ) => get(context, resourceGroupName, spaceName, options),
  };
}

export function _getWorkloadSpacesOperations(
  context: WorkloadManagerContext,
): WorkloadSpacesOperations {
  return {
    ..._getWorkloadSpaces(context),
  };
}

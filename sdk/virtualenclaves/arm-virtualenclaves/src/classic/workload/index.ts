// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext } from "../../api/missionContext.js";
import {
  listBySubscription,
  listByEnclaveResource,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/workload/operations.js";
import type {
  WorkloadListBySubscriptionOptionalParams,
  WorkloadListByEnclaveResourceOptionalParams,
  WorkloadDeleteOptionalParams,
  WorkloadUpdateOptionalParams,
  WorkloadCreateOrUpdateOptionalParams,
  WorkloadGetOptionalParams,
} from "../../api/workload/options.js";
import type { WorkloadResource, WorkloadPatchModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Workload operations. */
export interface WorkloadOperations {
  /** List WorkloadResource resources by subscription ID */
  listBySubscription: (
    virtualEnclaveName: string,
    options?: WorkloadListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadResource>;
  /** List WorkloadResource resources by EnclaveResource */
  listByEnclaveResource: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    options?: WorkloadListByEnclaveResourceOptionalParams,
  ) => PagedAsyncIterableIterator<WorkloadResource>;
  /** Delete a WorkloadResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    workloadName: string,
    options?: WorkloadDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a WorkloadResource */
  update: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    workloadName: string,
    properties: WorkloadPatchModel,
    options?: WorkloadUpdateOptionalParams,
  ) => PollerLike<OperationState<WorkloadResource>, WorkloadResource>;
  /** Create a WorkloadResource */
  createOrUpdate: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    workloadName: string,
    resource: WorkloadResource,
    options?: WorkloadCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<WorkloadResource>, WorkloadResource>;
  /** Get a WorkloadResource */
  get: (
    resourceGroupName: string,
    virtualEnclaveName: string,
    workloadName: string,
    options?: WorkloadGetOptionalParams,
  ) => Promise<WorkloadResource>;
}

function _getWorkload(context: MissionContext) {
  return {
    listBySubscription: (
      virtualEnclaveName: string,
      options?: WorkloadListBySubscriptionOptionalParams,
    ) => listBySubscription(context, virtualEnclaveName, options),
    listByEnclaveResource: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      options?: WorkloadListByEnclaveResourceOptionalParams,
    ) => listByEnclaveResource(context, resourceGroupName, virtualEnclaveName, options),
    delete: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      workloadName: string,
      options?: WorkloadDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualEnclaveName, workloadName, options),
    update: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      workloadName: string,
      properties: WorkloadPatchModel,
      options?: WorkloadUpdateOptionalParams,
    ) => update(context, resourceGroupName, virtualEnclaveName, workloadName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      workloadName: string,
      resource: WorkloadResource,
      options?: WorkloadCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualEnclaveName,
        workloadName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      virtualEnclaveName: string,
      workloadName: string,
      options?: WorkloadGetOptionalParams,
    ) => get(context, resourceGroupName, virtualEnclaveName, workloadName, options),
  };
}

export function _getWorkloadOperations(context: MissionContext): WorkloadOperations {
  return {
    ..._getWorkload(context),
  };
}

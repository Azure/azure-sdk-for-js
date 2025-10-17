// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  restart,
  redeploy,
  listAvailableSizes,
  listByHostGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dedicatedHosts/operations.js";
import type {
  DedicatedHostsRestartOptionalParams,
  DedicatedHostsRedeployOptionalParams,
  DedicatedHostsListAvailableSizesOptionalParams,
  DedicatedHostsListByHostGroupOptionalParams,
  DedicatedHostsDeleteOptionalParams,
  DedicatedHostsUpdateOptionalParams,
  DedicatedHostsCreateOrUpdateOptionalParams,
  DedicatedHostsGetOptionalParams,
} from "../../api/dedicatedHosts/options.js";
import type { DedicatedHost, DedicatedHostUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DedicatedHosts operations. */
export interface DedicatedHostsOperations {
  /** Restart the dedicated host. The operation will complete successfully once the dedicated host has restarted and is running. To determine the health of VMs deployed on the dedicated host after the restart check the Resource Health Center in the Azure Portal. Please refer to https://docs.microsoft.com/azure/service-health/resource-health-overview for more details. */
  restart: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Redeploy the dedicated host. The operation will complete successfully once the dedicated host has migrated to a new node and is running. To determine the health of VMs deployed on the dedicated host after the redeploy check the Resource Health Center in the Azure Portal. Please refer to https://docs.microsoft.com/azure/service-health/resource-health-overview for more details. */
  redeploy: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsRedeployOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists all available dedicated host sizes to which the specified dedicated host can be resized. NOTE: The dedicated host sizes provided can be used to only scale up the existing dedicated host. */
  listAvailableSizes: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsListAvailableSizesOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /** Lists all of the dedicated hosts in the specified dedicated host group. Use the nextLink property in the response to get the next page of dedicated hosts. */
  listByHostGroup: (
    resourceGroupName: string,
    hostGroupName: string,
    options?: DedicatedHostsListByHostGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DedicatedHost>;
  /** Delete a dedicated host. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a dedicated host . */
  update: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    parameters: DedicatedHostUpdate,
    options?: DedicatedHostsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a dedicated host . */
  createOrUpdate: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    parameters: DedicatedHost,
    options?: DedicatedHostsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Retrieves information about a dedicated host. */
  get: (
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: DedicatedHostsGetOptionalParams,
  ) => Promise<DedicatedHost>;
}

function _getDedicatedHosts(context: ComputeManagementContext) {
  return {
    restart: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsRestartOptionalParams,
    ) => restart(context, resourceGroupName, hostGroupName, hostName, options),
    redeploy: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsRedeployOptionalParams,
    ) => redeploy(context, resourceGroupName, hostGroupName, hostName, options),
    listAvailableSizes: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsListAvailableSizesOptionalParams,
    ) => listAvailableSizes(context, resourceGroupName, hostGroupName, hostName, options),
    listByHostGroup: (
      resourceGroupName: string,
      hostGroupName: string,
      options?: DedicatedHostsListByHostGroupOptionalParams,
    ) => listByHostGroup(context, resourceGroupName, hostGroupName, options),
    delete: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, hostGroupName, hostName, options),
    update: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      parameters: DedicatedHostUpdate,
      options?: DedicatedHostsUpdateOptionalParams,
    ) => update(context, resourceGroupName, hostGroupName, hostName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      parameters: DedicatedHost,
      options?: DedicatedHostsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, hostGroupName, hostName, parameters, options),
    get: (
      resourceGroupName: string,
      hostGroupName: string,
      hostName: string,
      options?: DedicatedHostsGetOptionalParams,
    ) => get(context, resourceGroupName, hostGroupName, hostName, options),
  };
}

export function _getDedicatedHostsOperations(
  context: ComputeManagementContext,
): DedicatedHostsOperations {
  return {
    ..._getDedicatedHosts(context),
  };
}

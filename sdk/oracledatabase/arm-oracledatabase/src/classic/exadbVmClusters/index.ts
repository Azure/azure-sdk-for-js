// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  removeVms,
  listByResourceGroup,
  $delete,
  update,
  get,
  createOrUpdate,
  listBySubscription,
} from "../../api/exadbVmClusters/operations.js";
import type {
  ExadbVmClustersRemoveVmsOptionalParams,
  ExadbVmClustersListByResourceGroupOptionalParams,
  ExadbVmClustersDeleteOptionalParams,
  ExadbVmClustersUpdateOptionalParams,
  ExadbVmClustersGetOptionalParams,
  ExadbVmClustersCreateOrUpdateOptionalParams,
  ExadbVmClustersListBySubscriptionOptionalParams,
} from "../../api/exadbVmClusters/options.js";
import type {
  ExadbVmCluster,
  ExadbVmClusterUpdate,
  RemoveVirtualMachineFromExadbVmClusterDetails,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExadbVmClusters operations. */
export interface ExadbVmClustersOperations {
  /** Remove VMs from the VM Cluster */
  removeVms: (
    resourceGroupName: string,
    exadbVmClusterName: string,
    body: RemoveVirtualMachineFromExadbVmClusterDetails,
    options?: ExadbVmClustersRemoveVmsOptionalParams,
  ) => PollerLike<OperationState<ExadbVmCluster>, ExadbVmCluster>;
  /** List ExadbVmCluster resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ExadbVmClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ExadbVmCluster>;
  /** Delete a ExadbVmCluster */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    exadbVmClusterName: string,
    options?: ExadbVmClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a ExadbVmCluster */
  update: (
    resourceGroupName: string,
    exadbVmClusterName: string,
    properties: ExadbVmClusterUpdate,
    options?: ExadbVmClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<ExadbVmCluster>, ExadbVmCluster>;
  /** Get a ExadbVmCluster */
  get: (
    resourceGroupName: string,
    exadbVmClusterName: string,
    options?: ExadbVmClustersGetOptionalParams,
  ) => Promise<ExadbVmCluster>;
  /** Create a ExadbVmCluster */
  createOrUpdate: (
    resourceGroupName: string,
    exadbVmClusterName: string,
    resource: ExadbVmCluster,
    options?: ExadbVmClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExadbVmCluster>, ExadbVmCluster>;
  /** List ExadbVmCluster resources by subscription ID */
  listBySubscription: (
    options?: ExadbVmClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ExadbVmCluster>;
}

function _getExadbVmClusters(context: OracleDatabaseManagementContext) {
  return {
    removeVms: (
      resourceGroupName: string,
      exadbVmClusterName: string,
      body: RemoveVirtualMachineFromExadbVmClusterDetails,
      options?: ExadbVmClustersRemoveVmsOptionalParams,
    ) => removeVms(context, resourceGroupName, exadbVmClusterName, body, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ExadbVmClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      exadbVmClusterName: string,
      options?: ExadbVmClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, exadbVmClusterName, options),
    update: (
      resourceGroupName: string,
      exadbVmClusterName: string,
      properties: ExadbVmClusterUpdate,
      options?: ExadbVmClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, exadbVmClusterName, properties, options),
    get: (
      resourceGroupName: string,
      exadbVmClusterName: string,
      options?: ExadbVmClustersGetOptionalParams,
    ) => get(context, resourceGroupName, exadbVmClusterName, options),
    createOrUpdate: (
      resourceGroupName: string,
      exadbVmClusterName: string,
      resource: ExadbVmCluster,
      options?: ExadbVmClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, exadbVmClusterName, resource, options),
    listBySubscription: (options?: ExadbVmClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getExadbVmClustersOperations(
  context: OracleDatabaseManagementContext,
): ExadbVmClustersOperations {
  return {
    ..._getExadbVmClusters(context),
  };
}

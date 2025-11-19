// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  listPrivateIpAddresses,
  removeVms,
  addVms,
  listByResourceGroup,
  $delete,
  update,
  get,
  createOrUpdate,
  listBySubscription,
} from "../../api/cloudVmClusters/operations.js";
import type {
  CloudVmClustersListPrivateIpAddressesOptionalParams,
  CloudVmClustersRemoveVmsOptionalParams,
  CloudVmClustersAddVmsOptionalParams,
  CloudVmClustersListByResourceGroupOptionalParams,
  CloudVmClustersDeleteOptionalParams,
  CloudVmClustersUpdateOptionalParams,
  CloudVmClustersGetOptionalParams,
  CloudVmClustersCreateOrUpdateOptionalParams,
  CloudVmClustersListBySubscriptionOptionalParams,
} from "../../api/cloudVmClusters/options.js";
import type {
  CloudVmCluster,
  CloudVmClusterUpdate,
  AddRemoveDbNode,
  PrivateIpAddressesFilter,
  PrivateIpAddressProperties,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CloudVmClusters operations. */
export interface CloudVmClustersOperations {
  /** List Private IP Addresses by the provided filter */
  listPrivateIpAddresses: (
    resourceGroupName: string,
    cloudvmclustername: string,
    body: PrivateIpAddressesFilter,
    options?: CloudVmClustersListPrivateIpAddressesOptionalParams,
  ) => Promise<PrivateIpAddressProperties[]>;
  /** Remove VMs from the VM Cluster */
  removeVms: (
    resourceGroupName: string,
    cloudvmclustername: string,
    body: AddRemoveDbNode,
    options?: CloudVmClustersRemoveVmsOptionalParams,
  ) => PollerLike<OperationState<CloudVmCluster>, CloudVmCluster>;
  /** Add VMs to the VM Cluster */
  addVms: (
    resourceGroupName: string,
    cloudvmclustername: string,
    body: AddRemoveDbNode,
    options?: CloudVmClustersAddVmsOptionalParams,
  ) => PollerLike<OperationState<CloudVmCluster>, CloudVmCluster>;
  /** List CloudVmCluster resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CloudVmClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CloudVmCluster>;
  /** Delete a CloudVmCluster */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    cloudvmclustername: string,
    options?: CloudVmClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a CloudVmCluster */
  update: (
    resourceGroupName: string,
    cloudvmclustername: string,
    properties: CloudVmClusterUpdate,
    options?: CloudVmClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<CloudVmCluster>, CloudVmCluster>;
  /** Get a CloudVmCluster */
  get: (
    resourceGroupName: string,
    cloudvmclustername: string,
    options?: CloudVmClustersGetOptionalParams,
  ) => Promise<CloudVmCluster>;
  /** Create a CloudVmCluster */
  createOrUpdate: (
    resourceGroupName: string,
    cloudvmclustername: string,
    resource: CloudVmCluster,
    options?: CloudVmClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CloudVmCluster>, CloudVmCluster>;
  /** List CloudVmCluster resources by subscription ID */
  listBySubscription: (
    options?: CloudVmClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CloudVmCluster>;
}

function _getCloudVmClusters(context: OracleDatabaseManagementContext) {
  return {
    listPrivateIpAddresses: (
      resourceGroupName: string,
      cloudvmclustername: string,
      body: PrivateIpAddressesFilter,
      options?: CloudVmClustersListPrivateIpAddressesOptionalParams,
    ) => listPrivateIpAddresses(context, resourceGroupName, cloudvmclustername, body, options),
    removeVms: (
      resourceGroupName: string,
      cloudvmclustername: string,
      body: AddRemoveDbNode,
      options?: CloudVmClustersRemoveVmsOptionalParams,
    ) => removeVms(context, resourceGroupName, cloudvmclustername, body, options),
    addVms: (
      resourceGroupName: string,
      cloudvmclustername: string,
      body: AddRemoveDbNode,
      options?: CloudVmClustersAddVmsOptionalParams,
    ) => addVms(context, resourceGroupName, cloudvmclustername, body, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CloudVmClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      cloudvmclustername: string,
      options?: CloudVmClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudvmclustername, options),
    update: (
      resourceGroupName: string,
      cloudvmclustername: string,
      properties: CloudVmClusterUpdate,
      options?: CloudVmClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, cloudvmclustername, properties, options),
    get: (
      resourceGroupName: string,
      cloudvmclustername: string,
      options?: CloudVmClustersGetOptionalParams,
    ) => get(context, resourceGroupName, cloudvmclustername, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudvmclustername: string,
      resource: CloudVmCluster,
      options?: CloudVmClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, cloudvmclustername, resource, options),
    listBySubscription: (options?: CloudVmClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getCloudVmClustersOperations(
  context: OracleDatabaseManagementContext,
): CloudVmClustersOperations {
  return {
    ..._getCloudVmClusters(context),
  };
}

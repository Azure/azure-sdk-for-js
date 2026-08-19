// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedHatOpenShiftContext } from "../../api/redHatOpenShiftContext.js";
import {
  revokeCredentials,
  requestAdminCredential,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/hcpOpenShiftClusters/operations.js";
import type {
  HcpOpenShiftClustersRevokeCredentialsOptionalParams,
  HcpOpenShiftClustersRequestAdminCredentialOptionalParams,
  HcpOpenShiftClustersListBySubscriptionOptionalParams,
  HcpOpenShiftClustersListByResourceGroupOptionalParams,
  HcpOpenShiftClustersDeleteOptionalParams,
  HcpOpenShiftClustersUpdateOptionalParams,
  HcpOpenShiftClustersCreateOrUpdateOptionalParams,
  HcpOpenShiftClustersGetOptionalParams,
} from "../../api/hcpOpenShiftClusters/options.js";
import type {
  HcpOpenShiftCluster,
  HcpOpenShiftClusterResourceCreate,
  HcpOpenShiftClusterUpdate,
  HcpOpenShiftClusterAdminCredential,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HcpOpenShiftClusters operations. */
export interface HcpOpenShiftClustersOperations {
  /** Revoke all credentials issued by requestAdminCredential */
  revokeCredentials: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    options?: HcpOpenShiftClustersRevokeCredentialsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Request a temporary admin kubeconfig for the cluster */
  requestAdminCredential: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    options?: HcpOpenShiftClustersRequestAdminCredentialOptionalParams,
  ) => PollerLike<
    OperationState<HcpOpenShiftClusterAdminCredential>,
    HcpOpenShiftClusterAdminCredential
  >;
  /** List HcpOpenShiftCluster resources by subscription ID */
  listBySubscription: (
    options?: HcpOpenShiftClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<HcpOpenShiftCluster>;
  /** List HcpOpenShiftCluster resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: HcpOpenShiftClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<HcpOpenShiftCluster>;
  /** Delete a HcpOpenShiftCluster */
  delete: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    options?: HcpOpenShiftClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a HcpOpenShiftCluster */
  update: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    properties: HcpOpenShiftClusterUpdate,
    options?: HcpOpenShiftClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<HcpOpenShiftCluster>, HcpOpenShiftCluster>;
  /** Create a HcpOpenShiftCluster */
  createOrUpdate: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    resource: HcpOpenShiftClusterResourceCreate,
    options?: HcpOpenShiftClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<HcpOpenShiftCluster>, HcpOpenShiftCluster>;
  /** Get a HcpOpenShiftCluster */
  get: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    options?: HcpOpenShiftClustersGetOptionalParams,
  ) => Promise<HcpOpenShiftCluster>;
}

function _getHcpOpenShiftClusters(context: RedHatOpenShiftContext) {
  return {
    revokeCredentials: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      options?: HcpOpenShiftClustersRevokeCredentialsOptionalParams,
    ) => revokeCredentials(context, resourceGroupName, hcpOpenShiftClusterName, options),
    requestAdminCredential: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      options?: HcpOpenShiftClustersRequestAdminCredentialOptionalParams,
    ) => requestAdminCredential(context, resourceGroupName, hcpOpenShiftClusterName, options),
    listBySubscription: (options?: HcpOpenShiftClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: HcpOpenShiftClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      options?: HcpOpenShiftClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, hcpOpenShiftClusterName, options),
    update: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      properties: HcpOpenShiftClusterUpdate,
      options?: HcpOpenShiftClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, hcpOpenShiftClusterName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      resource: HcpOpenShiftClusterResourceCreate,
      options?: HcpOpenShiftClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, hcpOpenShiftClusterName, resource, options),
    get: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      options?: HcpOpenShiftClustersGetOptionalParams,
    ) => get(context, resourceGroupName, hcpOpenShiftClusterName, options),
  };
}

export function _getHcpOpenShiftClustersOperations(
  context: RedHatOpenShiftContext,
): HcpOpenShiftClustersOperations {
  return {
    ..._getHcpOpenShiftClusters(context),
  };
}

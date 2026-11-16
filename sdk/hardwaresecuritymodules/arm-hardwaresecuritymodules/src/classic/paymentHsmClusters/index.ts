// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDedicatedHSMResourceProviderContext } from "../../api/azureDedicatedHSMResourceProviderContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/paymentHsmClusters/operations.js";
import type {
  PaymentHsmClustersListBySubscriptionOptionalParams,
  PaymentHsmClustersListByResourceGroupOptionalParams,
  PaymentHsmClustersDeleteOptionalParams,
  PaymentHsmClustersUpdateOptionalParams,
  PaymentHsmClustersCreateOrUpdateOptionalParams,
  PaymentHsmClustersGetOptionalParams,
} from "../../api/paymentHsmClusters/options.js";
import type { PaymentHsmCluster, PaymentHsmClusterPatchParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PaymentHsmClusters operations. */
export interface PaymentHsmClustersOperations {
  /** The List operation gets information about the Payment HSM Clusters associated with the subscription. */
  listBySubscription: (
    options?: PaymentHsmClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PaymentHsmCluster>;
  /** The List operation gets information about the Payment HSM Clusters associated with the subscription and within the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PaymentHsmClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PaymentHsmCluster>;
  /** Deletes the specified Payment HSM Cluster */
  delete: (
    resourceGroupName: string,
    paymentHsmClusterName: string,
    options?: PaymentHsmClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Payment HSM Cluster in the specified subscription. */
  update: (
    resourceGroupName: string,
    paymentHsmClusterName: string,
    body: PaymentHsmClusterPatchParameters,
    options?: PaymentHsmClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<PaymentHsmCluster>, PaymentHsmCluster>;
  /** Create or Update a Payment HSM Cluster in the specified subscription. */
  createOrUpdate: (
    resourceGroupName: string,
    paymentHsmClusterName: string,
    body: PaymentHsmCluster,
    options?: PaymentHsmClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PaymentHsmCluster>, PaymentHsmCluster>;
  /** Gets the specified Payment HSM Cluster */
  get: (
    resourceGroupName: string,
    paymentHsmClusterName: string,
    options?: PaymentHsmClustersGetOptionalParams,
  ) => Promise<PaymentHsmCluster>;
}
function _getPaymentHsmClusters(context: AzureDedicatedHSMResourceProviderContext) {
  return {
    listBySubscription: (options?: PaymentHsmClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PaymentHsmClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      paymentHsmClusterName: string,
      options?: PaymentHsmClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, paymentHsmClusterName, options),
    update: (
      resourceGroupName: string,
      paymentHsmClusterName: string,
      body: PaymentHsmClusterPatchParameters,
      options?: PaymentHsmClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, paymentHsmClusterName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      paymentHsmClusterName: string,
      body: PaymentHsmCluster,
      options?: PaymentHsmClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, paymentHsmClusterName, body, options),
    get: (
      resourceGroupName: string,
      paymentHsmClusterName: string,
      options?: PaymentHsmClustersGetOptionalParams,
    ) => get(context, resourceGroupName, paymentHsmClusterName, options),
  };
}
export function _getPaymentHsmClustersOperations(
  context: AzureDedicatedHSMResourceProviderContext,
): PaymentHsmClustersOperations {
  return {
    ..._getPaymentHsmClusters(context),
  };
}

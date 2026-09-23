// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDedicatedHSMResourceProviderContext } from "../../api/azureDedicatedHSMResourceProviderContext.js";
import {
  listByPaymentHsmCluster,
  $delete,
  create,
  get,
} from "../../api/paymentHsmClusterPrivateEndpointConnections/operations.js";
import type {
  PaymentHsmClusterPrivateEndpointConnectionsListByPaymentHsmClusterOptionalParams,
  PaymentHsmClusterPrivateEndpointConnectionsDeleteOptionalParams,
  PaymentHsmClusterPrivateEndpointConnectionsCreateOptionalParams,
  PaymentHsmClusterPrivateEndpointConnectionsGetOptionalParams,
} from "../../api/paymentHsmClusterPrivateEndpointConnections/options.js";
import type { PaymentHsmClusterPrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PaymentHsmClusterPrivateEndpointConnections operations. */
export interface PaymentHsmClusterPrivateEndpointConnectionsOperations {
  /** The List operation gets information about the private endpoint connections associated with the Payment HSM Cluster */
  listByPaymentHsmCluster: (
    resourceGroupName: string,
    paymentHsmClusterName: string,
    options?: PaymentHsmClusterPrivateEndpointConnectionsListByPaymentHsmClusterOptionalParams,
  ) => PagedAsyncIterableIterator<PaymentHsmClusterPrivateEndpointConnection>;
  /** Deletes the private endpoint connection for the Payment Hsm Cluster. */
  delete: (
    resourceGroupName: string,
    paymentHsmClusterName: string,
    peConnectionName: string,
    options?: PaymentHsmClusterPrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates the private endpoint connection for the Payment Hsm Cluster. */
  create: (
    resourceGroupName: string,
    paymentHsmClusterName: string,
    peConnectionName: string,
    properties: PaymentHsmClusterPrivateEndpointConnection,
    options?: PaymentHsmClusterPrivateEndpointConnectionsCreateOptionalParams,
  ) => Promise<PaymentHsmClusterPrivateEndpointConnection>;
  /** Gets the private endpoint connection for the Payment Hsm Cluster. */
  get: (
    resourceGroupName: string,
    paymentHsmClusterName: string,
    peConnectionName: string,
    options?: PaymentHsmClusterPrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PaymentHsmClusterPrivateEndpointConnection>;
}
function _getPaymentHsmClusterPrivateEndpointConnections(
  context: AzureDedicatedHSMResourceProviderContext,
) {
  return {
    listByPaymentHsmCluster: (
      resourceGroupName: string,
      paymentHsmClusterName: string,
      options?: PaymentHsmClusterPrivateEndpointConnectionsListByPaymentHsmClusterOptionalParams,
    ) => listByPaymentHsmCluster(context, resourceGroupName, paymentHsmClusterName, options),
    delete: (
      resourceGroupName: string,
      paymentHsmClusterName: string,
      peConnectionName: string,
      options?: PaymentHsmClusterPrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, paymentHsmClusterName, peConnectionName, options),
    create: (
      resourceGroupName: string,
      paymentHsmClusterName: string,
      peConnectionName: string,
      properties: PaymentHsmClusterPrivateEndpointConnection,
      options?: PaymentHsmClusterPrivateEndpointConnectionsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        paymentHsmClusterName,
        peConnectionName,
        properties,
        options,
      ),
    get: (
      resourceGroupName: string,
      paymentHsmClusterName: string,
      peConnectionName: string,
      options?: PaymentHsmClusterPrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, paymentHsmClusterName, peConnectionName, options),
  };
}
export function _getPaymentHsmClusterPrivateEndpointConnectionsOperations(
  context: AzureDedicatedHSMResourceProviderContext,
): PaymentHsmClusterPrivateEndpointConnectionsOperations {
  return {
    ..._getPaymentHsmClusterPrivateEndpointConnections(context),
  };
}

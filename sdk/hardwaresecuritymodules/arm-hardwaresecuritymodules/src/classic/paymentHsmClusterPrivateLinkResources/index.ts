// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDedicatedHSMResourceProviderContext } from "../../api/azureDedicatedHSMResourceProviderContext.js";
import { listByPaymentHsmCluster } from "../../api/paymentHsmClusterPrivateLinkResources/operations.js";
import type { PaymentHsmClusterPrivateLinkResourcesListByPaymentHsmClusterOptionalParams } from "../../api/paymentHsmClusterPrivateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PaymentHsmClusterPrivateLinkResources operations. */
export interface PaymentHsmClusterPrivateLinkResourcesOperations {
  /** Gets the private link resources supported for the Payment Hsm Cluster. */
  listByPaymentHsmCluster: (
    resourceGroupName: string,
    paymentHsmClusterName: string,
    options?: PaymentHsmClusterPrivateLinkResourcesListByPaymentHsmClusterOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}
function _getPaymentHsmClusterPrivateLinkResources(
  context: AzureDedicatedHSMResourceProviderContext,
) {
  return {
    listByPaymentHsmCluster: (
      resourceGroupName: string,
      paymentHsmClusterName: string,
      options?: PaymentHsmClusterPrivateLinkResourcesListByPaymentHsmClusterOptionalParams,
    ) => listByPaymentHsmCluster(context, resourceGroupName, paymentHsmClusterName, options),
  };
}
export function _getPaymentHsmClusterPrivateLinkResourcesOperations(
  context: AzureDedicatedHSMResourceProviderContext,
): PaymentHsmClusterPrivateLinkResourcesOperations {
  return {
    ..._getPaymentHsmClusterPrivateLinkResources(context),
  };
}

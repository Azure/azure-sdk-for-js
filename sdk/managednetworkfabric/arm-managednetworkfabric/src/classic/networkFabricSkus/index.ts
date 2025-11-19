// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import { listBySubscription, get } from "../../api/networkFabricSkus/operations.js";
import type {
  NetworkFabricSkusListBySubscriptionOptionalParams,
  NetworkFabricSkusGetOptionalParams,
} from "../../api/networkFabricSkus/options.js";
import type { NetworkFabricSku } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkFabricSkus operations. */
export interface NetworkFabricSkusOperations {
  /** Implements Network Fabric SKUs list by subscription GET method. */
  listBySubscription: (
    options?: NetworkFabricSkusListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkFabricSku>;
  /** Implements Network Fabric SKU GET method. */
  get: (
    networkFabricSkuName: string,
    options?: NetworkFabricSkusGetOptionalParams,
  ) => Promise<NetworkFabricSku>;
}

function _getNetworkFabricSkus(context: ManagedNetworkFabricContext) {
  return {
    listBySubscription: (options?: NetworkFabricSkusListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    get: (networkFabricSkuName: string, options?: NetworkFabricSkusGetOptionalParams) =>
      get(context, networkFabricSkuName, options),
  };
}

export function _getNetworkFabricSkusOperations(
  context: ManagedNetworkFabricContext,
): NetworkFabricSkusOperations {
  return {
    ..._getNetworkFabricSkus(context),
  };
}

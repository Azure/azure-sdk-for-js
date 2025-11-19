// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import { listBySubscription, get } from "../../api/networkDeviceSkus/operations.js";
import type {
  NetworkDeviceSkusListBySubscriptionOptionalParams,
  NetworkDeviceSkusGetOptionalParams,
} from "../../api/networkDeviceSkus/options.js";
import type { NetworkDeviceSku } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkDeviceSkus operations. */
export interface NetworkDeviceSkusOperations {
  /** List Network Device SKUs for the given subscription. */
  listBySubscription: (
    options?: NetworkDeviceSkusListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkDeviceSku>;
  /** Get a Network Device SKU details. */
  get: (
    networkDeviceSkuName: string,
    options?: NetworkDeviceSkusGetOptionalParams,
  ) => Promise<NetworkDeviceSku>;
}

function _getNetworkDeviceSkus(context: ManagedNetworkFabricContext) {
  return {
    listBySubscription: (options?: NetworkDeviceSkusListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    get: (networkDeviceSkuName: string, options?: NetworkDeviceSkusGetOptionalParams) =>
      get(context, networkDeviceSkuName, options),
  };
}

export function _getNetworkDeviceSkusOperations(
  context: ManagedNetworkFabricContext,
): NetworkDeviceSkusOperations {
  return {
    ..._getNetworkDeviceSkus(context),
  };
}

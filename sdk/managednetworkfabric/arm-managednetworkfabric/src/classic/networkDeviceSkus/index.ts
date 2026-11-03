// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
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

function _getNetworkDeviceSkus(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    listBySubscription: (options?: NetworkDeviceSkusListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    get: (networkDeviceSkuName: string, options?: NetworkDeviceSkusGetOptionalParams) =>
      get(context, networkDeviceSkuName, options),
  };
}

export function _getNetworkDeviceSkusOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkDeviceSkusOperations {
  return {
    ..._getNetworkDeviceSkus(context),
  };
}

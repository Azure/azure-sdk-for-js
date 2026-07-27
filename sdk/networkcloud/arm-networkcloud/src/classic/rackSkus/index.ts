// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import { listBySubscription, get } from "../../api/rackSkus/operations.js";
import {
  RackSkusListBySubscriptionOptionalParams,
  RackSkusGetOptionalParams,
} from "../../api/rackSkus/options.js";
import { RackSku } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RackSkus operations. */
export interface RackSkusOperations {
  /** Get a list of rack SKUs in the provided subscription. */
  listBySubscription: (
    options?: RackSkusListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<RackSku>;
  /** Get the properties of the provided rack SKU. */
  get: (rackSkuName: string, options?: RackSkusGetOptionalParams) => Promise<RackSku>;
}

function _getRackSkus(context: NetworkCloudContext) {
  return {
    listBySubscription: (options?: RackSkusListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    get: (rackSkuName: string, options?: RackSkusGetOptionalParams) =>
      get(context, rackSkuName, options),
  };
}

export function _getRackSkusOperations(context: NetworkCloudContext): RackSkusOperations {
  return {
    ..._getRackSkus(context),
  };
}

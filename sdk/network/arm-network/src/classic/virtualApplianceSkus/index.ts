// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, get } from "../../api/virtualApplianceSkus/operations.js";
import {
  VirtualApplianceSkusListOptionalParams,
  VirtualApplianceSkusGetOptionalParams,
} from "../../api/virtualApplianceSkus/options.js";
import { NetworkVirtualApplianceSku } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VirtualApplianceSkus operations. */
export interface VirtualApplianceSkusOperations {
  /** List all SKUs available for a virtual appliance. */
  list: (
    options?: VirtualApplianceSkusListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkVirtualApplianceSku>;
  /** Retrieves a single available sku for network virtual appliance. */
  get: (
    skuName: string,
    options?: VirtualApplianceSkusGetOptionalParams,
  ) => Promise<NetworkVirtualApplianceSku>;
}

function _getVirtualApplianceSkus(context: NetworkManagementContext) {
  return {
    list: (options?: VirtualApplianceSkusListOptionalParams) => list(context, options),
    get: (skuName: string, options?: VirtualApplianceSkusGetOptionalParams) =>
      get(context, skuName, options),
  };
}

export function _getVirtualApplianceSkusOperations(
  context: NetworkManagementContext,
): VirtualApplianceSkusOperations {
  return {
    ..._getVirtualApplianceSkus(context),
  };
}

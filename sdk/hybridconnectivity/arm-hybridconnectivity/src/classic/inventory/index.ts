// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext } from "../../api/hybridConnectivityManagementAPIContext.js";
import { inventoryListBySolutionConfiguration, inventoryGet } from "../../api/inventory/index.js";
import {
  InventoryListBySolutionConfigurationOptionalParams,
  InventoryGetOptionalParams,
} from "../../api/options.js";
import { InventoryResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Inventory operations. */
export interface InventoryOperations {
  /** List InventoryResource resources by SolutionConfiguration */
  listBySolutionConfiguration: (
    resourceUri: string,
    solutionConfiguration: string,
    options?: InventoryListBySolutionConfigurationOptionalParams,
  ) => PagedAsyncIterableIterator<InventoryResource>;
  /** Get a InventoryResource */
  get: (
    resourceUri: string,
    solutionConfiguration: string,
    inventoryId: string,
    options?: InventoryGetOptionalParams,
  ) => Promise<InventoryResource>;
}

function _getInventory(context: HybridConnectivityManagementAPIContext) {
  return {
    listBySolutionConfiguration: (
      resourceUri: string,
      solutionConfiguration: string,
      options?: InventoryListBySolutionConfigurationOptionalParams,
    ) => inventoryListBySolutionConfiguration(context, resourceUri, solutionConfiguration, options),
    get: (
      resourceUri: string,
      solutionConfiguration: string,
      inventoryId: string,
      options?: InventoryGetOptionalParams,
    ) => inventoryGet(context, resourceUri, solutionConfiguration, inventoryId, options),
  };
}

export function _getInventoryOperations(
  context: HybridConnectivityManagementAPIContext,
): InventoryOperations {
  return {
    ..._getInventory(context),
  };
}

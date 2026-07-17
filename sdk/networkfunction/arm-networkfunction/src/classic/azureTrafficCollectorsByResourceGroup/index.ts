// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureTrafficCollectorContext } from "../../api/azureTrafficCollectorContext.js";
import { list } from "../../api/azureTrafficCollectorsByResourceGroup/operations.js";
import type { AzureTrafficCollectorsByResourceGroupListOptionalParams } from "../../api/azureTrafficCollectorsByResourceGroup/options.js";
import type { AzureTrafficCollector } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AzureTrafficCollectorsByResourceGroup operations. */
export interface AzureTrafficCollectorsByResourceGroupOperations {
  /** Return list of Azure Traffic Collectors in a Resource Group */
  list: (
    resourceGroupName: string,
    options?: AzureTrafficCollectorsByResourceGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<AzureTrafficCollector>;
}

function _getAzureTrafficCollectorsByResourceGroup(context: AzureTrafficCollectorContext) {
  return {
    list: (
      resourceGroupName: string,
      options?: AzureTrafficCollectorsByResourceGroupListOptionalParams,
    ) => list(context, resourceGroupName, options),
  };
}

export function _getAzureTrafficCollectorsByResourceGroupOperations(
  context: AzureTrafficCollectorContext,
): AzureTrafficCollectorsByResourceGroupOperations {
  return {
    ..._getAzureTrafficCollectorsByResourceGroup(context),
  };
}

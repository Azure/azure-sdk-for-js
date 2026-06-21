// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import { list, get } from "../../api/unifiedResilienceItems/operations.js";
import {
  UnifiedResilienceItemsListOptionalParams,
  UnifiedResilienceItemsGetOptionalParams,
} from "../../api/unifiedResilienceItems/options.js";
import { UnifiedResilienceItem } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UnifiedResilienceItems operations. */
export interface UnifiedResilienceItemsOperations {
  /** List UnifiedResilienceItem resources by tenant */
  list: (
    serviceGroupName: string,
    options?: UnifiedResilienceItemsListOptionalParams,
  ) => PagedAsyncIterableIterator<UnifiedResilienceItem>;
  /** Get a UnifiedResilienceItem */
  get: (
    serviceGroupName: string,
    unifiedResilienceItemName: string,
    options?: UnifiedResilienceItemsGetOptionalParams,
  ) => Promise<UnifiedResilienceItem>;
}

function _getUnifiedResilienceItems(context: AzureResilienceManagementContext) {
  return {
    list: (serviceGroupName: string, options?: UnifiedResilienceItemsListOptionalParams) =>
      list(context, serviceGroupName, options),
    get: (
      serviceGroupName: string,
      unifiedResilienceItemName: string,
      options?: UnifiedResilienceItemsGetOptionalParams,
    ) => get(context, serviceGroupName, unifiedResilienceItemName, options),
  };
}

export function _getUnifiedResilienceItemsOperations(
  context: AzureResilienceManagementContext,
): UnifiedResilienceItemsOperations {
  return {
    ..._getUnifiedResilienceItems(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { listBySubscription, get } from "../../api/webCategories/operations.js";
import type {
  WebCategoriesListBySubscriptionOptionalParams,
  WebCategoriesGetOptionalParams,
} from "../../api/webCategories/options.js";
import type { AzureWebCategory } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WebCategories operations. */
export interface WebCategoriesOperations {
  /** Gets all the Azure Web Categories in a subscription. */
  listBySubscription: (
    options?: WebCategoriesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AzureWebCategory>;
  /** Gets the specified Azure Web Category. */
  get: (name: string, options?: WebCategoriesGetOptionalParams) => Promise<AzureWebCategory>;
}

function _getWebCategories(context: NetworkManagementContext) {
  return {
    listBySubscription: (options?: WebCategoriesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    get: (name: string, options?: WebCategoriesGetOptionalParams) => get(context, name, options),
  };
}

export function _getWebCategoriesOperations(
  context: NetworkManagementContext,
): WebCategoriesOperations {
  return {
    ..._getWebCategories(context),
  };
}

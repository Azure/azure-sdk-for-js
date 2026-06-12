// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { list } from "../../api/apiManagementSkus/operations.js";
import type { ApiManagementSkusListOptionalParams } from "../../api/apiManagementSkus/options.js";
import type { ApiManagementSku } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiManagementSkus operations. */
export interface ApiManagementSkusOperations {
  /** Gets the list of Microsoft.ApiManagement SKUs available for your Subscription. */
  list: (
    options?: ApiManagementSkusListOptionalParams,
  ) => PagedAsyncIterableIterator<ApiManagementSku>;
}

function _getApiManagementSkus(context: ApiManagementContext) {
  return {
    list: (options?: ApiManagementSkusListOptionalParams) => list(context, options),
  };
}

export function _getApiManagementSkusOperations(
  context: ApiManagementContext,
): ApiManagementSkusOperations {
  return {
    ..._getApiManagementSkus(context),
  };
}

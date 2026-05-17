// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listAvailableServiceSkus } from "../../api/apiManagementServiceSkus/operations.js";
import { ApiManagementServiceSkusListAvailableServiceSkusOptionalParams } from "../../api/apiManagementServiceSkus/options.js";
import { ResourceSkuResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiManagementServiceSkus operations. */
export interface ApiManagementServiceSkusOperations {
  /** Gets all available SKU for a given API Management service */
  listAvailableServiceSkus: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceSkusListAvailableServiceSkusOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceSkuResult>;
}

function _getApiManagementServiceSkus(context: ApiManagementContext) {
  return {
    listAvailableServiceSkus: (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceSkusListAvailableServiceSkusOptionalParams,
    ) => listAvailableServiceSkus(context, resourceGroupName, serviceName, options),
  };
}

export function _getApiManagementServiceSkusOperations(
  context: ApiManagementContext,
): ApiManagementServiceSkusOperations {
  return {
    ..._getApiManagementServiceSkus(context),
  };
}

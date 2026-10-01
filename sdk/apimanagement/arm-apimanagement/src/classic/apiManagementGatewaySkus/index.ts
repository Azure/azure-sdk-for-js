// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listAvailableSkus } from "../../api/apiManagementGatewaySkus/operations.js";
import type { ApiManagementGatewaySkusListAvailableSkusOptionalParams } from "../../api/apiManagementGatewaySkus/options.js";
import type { GatewayResourceSkuResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiManagementGatewaySkus operations. */
export interface ApiManagementGatewaySkusOperations {
  /** Gets all available SKU for a given API Management gateway */
  listAvailableSkus: (
    resourceGroupName: string,
    gatewayName: string,
    options?: ApiManagementGatewaySkusListAvailableSkusOptionalParams,
  ) => PagedAsyncIterableIterator<GatewayResourceSkuResult>;
}

function _getApiManagementGatewaySkus(context: ApiManagementContext) {
  return {
    listAvailableSkus: (
      resourceGroupName: string,
      gatewayName: string,
      options?: ApiManagementGatewaySkusListAvailableSkusOptionalParams,
    ) => listAvailableSkus(context, resourceGroupName, gatewayName, options),
  };
}

export function _getApiManagementGatewaySkusOperations(
  context: ApiManagementContext,
): ApiManagementGatewaySkusOperations {
  return {
    ..._getApiManagementGatewaySkus(context),
  };
}

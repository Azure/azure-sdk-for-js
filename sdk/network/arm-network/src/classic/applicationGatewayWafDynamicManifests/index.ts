// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/applicationGatewayWafDynamicManifests/operations.js";
import type { ApplicationGatewayWafDynamicManifestsListOptionalParams } from "../../api/applicationGatewayWafDynamicManifests/options.js";
import type { ApplicationGatewayWafDynamicManifestResult } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApplicationGatewayWafDynamicManifests operations. */
export interface ApplicationGatewayWafDynamicManifestsOperations {
  /** Gets the regional application gateway waf manifest. */
  list: (
    location: string,
    options?: ApplicationGatewayWafDynamicManifestsListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationGatewayWafDynamicManifestResult>;
}

function _getApplicationGatewayWafDynamicManifests(context: NetworkManagementContext) {
  return {
    list: (location: string, options?: ApplicationGatewayWafDynamicManifestsListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getApplicationGatewayWafDynamicManifestsOperations(
  context: NetworkManagementContext,
): ApplicationGatewayWafDynamicManifestsOperations {
  return {
    ..._getApplicationGatewayWafDynamicManifests(context),
  };
}

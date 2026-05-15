// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/applicationGatewayWafDynamicManifests/operations.js";
import { ApplicationGatewayWafDynamicManifestsListOptionalParams } from "../../api/applicationGatewayWafDynamicManifests/options.js";
import { ApplicationGatewayWafDynamicManifestResult } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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

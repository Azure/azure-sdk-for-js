// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { get } from "../../api/applicationGatewayWafDynamicManifestsDefault/operations.js";
import type { ApplicationGatewayWafDynamicManifestsDefaultGetOptionalParams } from "../../api/applicationGatewayWafDynamicManifestsDefault/options.js";
import type { ApplicationGatewayWafDynamicManifestResult } from "../../models/microsoft/network/models.js";

/** Interface representing a ApplicationGatewayWafDynamicManifestsDefault operations. */
export interface ApplicationGatewayWafDynamicManifestsDefaultOperations {
  /** Gets the regional application gateway waf manifest. */
  get: (
    location: string,
    options?: ApplicationGatewayWafDynamicManifestsDefaultGetOptionalParams,
  ) => Promise<ApplicationGatewayWafDynamicManifestResult>;
}

function _getApplicationGatewayWafDynamicManifestsDefault(context: NetworkManagementContext) {
  return {
    get: (
      location: string,
      options?: ApplicationGatewayWafDynamicManifestsDefaultGetOptionalParams,
    ) => get(context, location, options),
  };
}

export function _getApplicationGatewayWafDynamicManifestsDefaultOperations(
  context: NetworkManagementContext,
): ApplicationGatewayWafDynamicManifestsDefaultOperations {
  return {
    ..._getApplicationGatewayWafDynamicManifestsDefault(context),
  };
}

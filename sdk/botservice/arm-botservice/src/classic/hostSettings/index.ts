// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureBotServiceContext } from "../../api/azureBotServiceContext.js";
import { get } from "../../api/hostSettings/operations.js";
import { HostSettingsGetOptionalParams } from "../../api/hostSettings/options.js";
import { HostSettingsResponse } from "../../models/models.js";

/** Interface representing a HostSettings operations. */
export interface HostSettingsOperations {
  /** Get per subscription settings needed to host bot in compute resource such as Azure App Service */
  get: (options?: HostSettingsGetOptionalParams) => Promise<HostSettingsResponse>;
}

function _getHostSettings(context: AzureBotServiceContext) {
  return {
    get: (options?: HostSettingsGetOptionalParams) => get(context, options),
  };
}

export function _getHostSettingsOperations(
  context: AzureBotServiceContext,
): HostSettingsOperations {
  return {
    ..._getHostSettings(context),
  };
}

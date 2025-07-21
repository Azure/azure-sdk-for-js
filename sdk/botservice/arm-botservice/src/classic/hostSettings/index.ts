// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext } from "../../api/botServiceContext.js";
import { HostSettingsResponse } from "../../models/models.js";
import { HostSettingsGetOptionalParams } from "../../api/hostSettings/options.js";
import { get } from "../../api/hostSettings/operations.js";

/** Interface representing a HostSettings operations. */
export interface HostSettingsOperations {
  /** Get per subscription settings needed to host bot in compute resource such as Azure App Service */
  get: (options?: HostSettingsGetOptionalParams) => Promise<HostSettingsResponse>;
}

function _getHostSettings(context: BotServiceContext) {
  return {
    get: (options?: HostSettingsGetOptionalParams) => get(context, options),
  };
}

export function _getHostSettingsOperations(context: BotServiceContext): HostSettingsOperations {
  return {
    ..._getHostSettings(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext } from "../../api/botServiceContext.js";
import { BotChannel, SiteInfo, RegenerateKeysChannelName } from "../../models/models.js";
import { DirectLineRegenerateKeysOptionalParams } from "../../api/directLine/options.js";
import { regenerateKeys } from "../../api/directLine/operations.js";

/** Interface representing a DirectLine operations. */
export interface DirectLineOperations {
  /** Regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource */
  regenerateKeys: (
    resourceGroupName: string,
    resourceName: string,
    channelName: RegenerateKeysChannelName,
    parameters: SiteInfo,
    options?: DirectLineRegenerateKeysOptionalParams,
  ) => Promise<BotChannel>;
}

function _getDirectLine(context: BotServiceContext) {
  return {
    regenerateKeys: (
      resourceGroupName: string,
      resourceName: string,
      channelName: RegenerateKeysChannelName,
      parameters: SiteInfo,
      options?: DirectLineRegenerateKeysOptionalParams,
    ) => regenerateKeys(context, resourceGroupName, resourceName, channelName, parameters, options),
  };
}

export function _getDirectLineOperations(context: BotServiceContext): DirectLineOperations {
  return {
    ..._getDirectLine(context),
  };
}

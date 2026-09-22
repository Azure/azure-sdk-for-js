// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { get } from "../../api/liveToken/operations.js";
import { LiveTokenGetOptionalParams } from "../../api/liveToken/options.js";
import { LiveTokenResponse } from "../../models/liveTokenApi/models.js";

/** Interface representing a LiveToken operations. */
export interface LiveTokenOperations {
  /** **Gets an access token for live metrics stream data.** */
  get: (resourceUri: string, options?: LiveTokenGetOptionalParams) => Promise<LiveTokenResponse>;
}

function _getLiveToken(context: ApplicationInsightsManagementContext) {
  return {
    get: (resourceUri: string, options?: LiveTokenGetOptionalParams) =>
      get(context, resourceUri, options),
  };
}

export function _getLiveTokenOperations(
  context: ApplicationInsightsManagementContext,
): LiveTokenOperations {
  return {
    ..._getLiveToken(context),
  };
}

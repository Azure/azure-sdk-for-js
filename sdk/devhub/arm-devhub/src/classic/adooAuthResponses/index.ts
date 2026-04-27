// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceContext } from "../../api/developerHubServiceContext.js";
import { getAdooAuthInfo } from "../../api/adooAuthResponses/operations.js";
import { AdooAuthResponsesGetAdooAuthInfoOptionalParams } from "../../api/adooAuthResponses/options.js";
import { AdooAuthInfoResponse } from "../../models/models.js";

/** Interface representing a AdooAuthResponses operations. */
export interface AdooAuthResponsesOperations {
  /** Gets ADOOAuth info used to authenticate users with ADO. */
  getAdooAuthInfo: (
    location: string,
    options?: AdooAuthResponsesGetAdooAuthInfoOptionalParams,
  ) => Promise<AdooAuthInfoResponse>;
}

function _getAdooAuthResponses(context: DeveloperHubServiceContext) {
  return {
    getAdooAuthInfo: (location: string, options?: AdooAuthResponsesGetAdooAuthInfoOptionalParams) =>
      getAdooAuthInfo(context, location, options),
  };
}

export function _getAdooAuthResponsesOperations(
  context: DeveloperHubServiceContext,
): AdooAuthResponsesOperations {
  return {
    ..._getAdooAuthResponses(context),
  };
}

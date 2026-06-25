// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceContext } from "../../api/developerHubServiceContext.js";
import { list, get } from "../../api/adooAuth/operations.js";
import {
  AdooAuthListOptionalParams,
  AdooAuthGetOptionalParams,
} from "../../api/adooAuth/options.js";
import { AdooAuthResponse } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AdooAuth operations. */
export interface AdooAuthOperations {
  /** Callback URL to hit once authenticated with ADO to have the service store the OAuth token. */
  list: (
    location: string,
    options?: AdooAuthListOptionalParams,
  ) => PagedAsyncIterableIterator<AdooAuthResponse>;
  /** Callback URL to hit once authenticated with Entra ID to have the service store the OAuth token. */
  get: (location: string, options?: AdooAuthGetOptionalParams) => Promise<AdooAuthResponse>;
}

function _getAdooAuth(context: DeveloperHubServiceContext) {
  return {
    list: (location: string, options?: AdooAuthListOptionalParams) =>
      list(context, location, options),
    get: (location: string, options?: AdooAuthGetOptionalParams) => get(context, location, options),
  };
}

export function _getAdooAuthOperations(context: DeveloperHubServiceContext): AdooAuthOperations {
  return {
    ..._getAdooAuth(context),
  };
}

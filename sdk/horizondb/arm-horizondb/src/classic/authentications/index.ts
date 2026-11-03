// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { list } from "../../api/authentications/operations.js";
import type { AuthenticationsListOptionalParams } from "../../api/authentications/options.js";
import type { Authentication } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Authentications operations. */
export interface AuthenticationsOperations {
  /** Lists the two service-created authentication configurations for the cluster: passwordMethod and microsoftEntra. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: AuthenticationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Authentication>;
}

function _getAuthentications(context: HorizonDbContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: AuthenticationsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
  };
}

export function _getAuthenticationsOperations(
  context: HorizonDbContext,
): AuthenticationsOperations {
  return {
    ..._getAuthentications(context),
  };
}

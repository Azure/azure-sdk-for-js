// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesContext } from "../../api/recoveryServicesContext.js";
import { list, get } from "../../api/privateLinkResources/operations.js";
import {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import { PrivateLinkResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Returns the list of private link resources that need to be created for Backup and SiteRecovery */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: PrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Returns a specified private link resource that need to be created for Backup and SiteRecovery */
  get: (
    resourceGroupName: string,
    vaultName: string,
    privateLinkResourceName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: RecoveryServicesContext) {
  return {
    list: (
      resourceGroupName: string,
      vaultName: string,
      options?: PrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      privateLinkResourceName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, privateLinkResourceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: RecoveryServicesContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}

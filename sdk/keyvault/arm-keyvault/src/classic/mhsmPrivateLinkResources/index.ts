// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementContext } from "../../api/keyVaultManagementContext.js";
import { listByMhsmResource } from "../../api/mhsmPrivateLinkResources/operations.js";
import { MhsmPrivateLinkResourcesListByMhsmResourceOptionalParams } from "../../api/mhsmPrivateLinkResources/options.js";
import { MhsmPrivateLinkResourceListResult } from "../../models/models.js";

/** Interface representing a MhsmPrivateLinkResources operations. */
export interface MhsmPrivateLinkResourcesOperations {
  /** Gets the private link resources supported for the managed hsm pool. */
  listByMhsmResource: (
    resourceGroupName: string,
    name: string,
    options?: MhsmPrivateLinkResourcesListByMhsmResourceOptionalParams,
  ) => Promise<MhsmPrivateLinkResourceListResult>;
}

function _getMhsmPrivateLinkResources(context: KeyVaultManagementContext) {
  return {
    listByMhsmResource: (
      resourceGroupName: string,
      name: string,
      options?: MhsmPrivateLinkResourcesListByMhsmResourceOptionalParams,
    ) => listByMhsmResource(context, resourceGroupName, name, options),
  };
}

export function _getMhsmPrivateLinkResourcesOperations(
  context: KeyVaultManagementContext,
): MhsmPrivateLinkResourcesOperations {
  return {
    ..._getMhsmPrivateLinkResources(context),
  };
}

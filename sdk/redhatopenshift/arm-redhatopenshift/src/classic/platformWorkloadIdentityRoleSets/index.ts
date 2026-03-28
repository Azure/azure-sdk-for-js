// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureRedHatOpenShiftContext } from "../../api/azureRedHatOpenShiftContext.js";
import { list } from "../../api/platformWorkloadIdentityRoleSets/operations.js";
import type { PlatformWorkloadIdentityRoleSetsListOptionalParams } from "../../api/platformWorkloadIdentityRoleSets/options.js";
import type { PlatformWorkloadIdentityRoleSet } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PlatformWorkloadIdentityRoleSets operations. */
export interface PlatformWorkloadIdentityRoleSetsOperations {
  /** This operation returns a list of Platform Workload Identity Role Sets as a string */
  list: (
    location: string,
    options?: PlatformWorkloadIdentityRoleSetsListOptionalParams,
  ) => PagedAsyncIterableIterator<PlatformWorkloadIdentityRoleSet>;
}

function _getPlatformWorkloadIdentityRoleSets(context: AzureRedHatOpenShiftContext) {
  return {
    list: (location: string, options?: PlatformWorkloadIdentityRoleSetsListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getPlatformWorkloadIdentityRoleSetsOperations(
  context: AzureRedHatOpenShiftContext,
): PlatformWorkloadIdentityRoleSetsOperations {
  return {
    ..._getPlatformWorkloadIdentityRoleSets(context),
  };
}

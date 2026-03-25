// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureRedHatOpenShiftContext } from "../../api/azureRedHatOpenShiftContext.js";
import { get } from "../../api/platformWorkloadIdentityRoleSet/operations.js";
import type { PlatformWorkloadIdentityRoleSetGetOptionalParams } from "../../api/platformWorkloadIdentityRoleSet/options.js";
import type { PlatformWorkloadIdentityRoleSet } from "../../models/models.js";

/** Interface representing a PlatformWorkloadIdentityRoleSet operations. */
export interface PlatformWorkloadIdentityRoleSetOperations {
  /** This operation returns Platform Workload Identity Role Set as a string */
  get: (
    location: string,
    openShiftMinorVersion: string,
    options?: PlatformWorkloadIdentityRoleSetGetOptionalParams,
  ) => Promise<PlatformWorkloadIdentityRoleSet>;
}

function _getPlatformWorkloadIdentityRoleSet(context: AzureRedHatOpenShiftContext) {
  return {
    get: (
      location: string,
      openShiftMinorVersion: string,
      options?: PlatformWorkloadIdentityRoleSetGetOptionalParams,
    ) => get(context, location, openShiftMinorVersion, options),
  };
}

export function _getPlatformWorkloadIdentityRoleSetOperations(
  context: AzureRedHatOpenShiftContext,
): PlatformWorkloadIdentityRoleSetOperations {
  return {
    ..._getPlatformWorkloadIdentityRoleSet(context),
  };
}

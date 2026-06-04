// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { get } from "../../api/supportedOperatingSystems/operations.js";
import { SupportedOperatingSystemsGetOptionalParams } from "../../api/supportedOperatingSystems/options.js";
import { SupportedOperatingSystems } from "../../models/models.js";

/** Interface representing a SupportedOperatingSystems operations. */
export interface SupportedOperatingSystemsOperations {
  /** Gets the data of supported operating systems by SRS. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: SupportedOperatingSystemsGetOptionalParams,
  ) => Promise<SupportedOperatingSystems>;
}

function _getSupportedOperatingSystems(context: SiteRecoveryManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: SupportedOperatingSystemsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getSupportedOperatingSystemsOperations(
  context: SiteRecoveryManagementContext,
): SupportedOperatingSystemsOperations {
  return {
    ..._getSupportedOperatingSystems(context),
  };
}

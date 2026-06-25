// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService } from "../../api/portalSettings/operations.js";
import { PortalSettingsListByServiceOptionalParams } from "../../api/portalSettings/options.js";
import { PortalSettingsCollection } from "../../models/models.js";

/** Interface representing a PortalSettings operations. */
export interface PortalSettingsOperations {
  /** Lists a collection of portalsettings defined within a service instance.. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: PortalSettingsListByServiceOptionalParams,
  ) => Promise<PortalSettingsCollection>;
}

function _getPortalSettings(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: PortalSettingsListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
  };
}

export function _getPortalSettingsOperations(
  context: ApiManagementContext,
): PortalSettingsOperations {
  return {
    ..._getPortalSettings(context),
  };
}

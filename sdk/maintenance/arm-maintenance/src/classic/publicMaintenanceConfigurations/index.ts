// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import { MaintenanceConfiguration } from "../../models/models.js";
import {
  PublicMaintenanceConfigurationsListOptionalParams,
  PublicMaintenanceConfigurationsGetOptionalParams,
} from "../../api/publicMaintenanceConfigurations/options.js";
import { list, get } from "../../api/publicMaintenanceConfigurations/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PublicMaintenanceConfigurations operations. */
export interface PublicMaintenanceConfigurationsOperations {
  /** Get Public Maintenance Configuration records */
  list: (
    options?: PublicMaintenanceConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<MaintenanceConfiguration>;
  /** Get Public Maintenance Configuration record */
  get: (
    resourceName: string,
    options?: PublicMaintenanceConfigurationsGetOptionalParams,
  ) => Promise<MaintenanceConfiguration>;
}

function _getPublicMaintenanceConfigurations(context: MaintenanceManagementContext) {
  return {
    list: (options?: PublicMaintenanceConfigurationsListOptionalParams) => list(context, options),
    get: (resourceName: string, options?: PublicMaintenanceConfigurationsGetOptionalParams) =>
      get(context, resourceName, options),
  };
}

export function _getPublicMaintenanceConfigurationsOperations(
  context: MaintenanceManagementContext,
): PublicMaintenanceConfigurationsOperations {
  return {
    ..._getPublicMaintenanceConfigurations(context),
  };
}

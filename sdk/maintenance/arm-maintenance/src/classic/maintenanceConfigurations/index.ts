// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/maintenanceConfigurations/operations.js";
import type {
  MaintenanceConfigurationsListOptionalParams,
  MaintenanceConfigurationsDeleteOptionalParams,
  MaintenanceConfigurationsUpdateOptionalParams,
  MaintenanceConfigurationsCreateOrUpdateOptionalParams,
  MaintenanceConfigurationsGetOptionalParams,
} from "../../api/maintenanceConfigurations/options.js";
import type { MaintenanceConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MaintenanceConfigurations operations. */
export interface MaintenanceConfigurationsOperations {
  /** Get Configuration records within a subscription */
  list: (
    options?: MaintenanceConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<MaintenanceConfiguration>;
  /** Delete Configuration record */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: MaintenanceConfigurationsDeleteOptionalParams,
  ) => Promise<MaintenanceConfiguration | null>;
  /** Patch configuration record */
  update: (
    resourceGroupName: string,
    resourceName: string,
    configuration: MaintenanceConfiguration,
    options?: MaintenanceConfigurationsUpdateOptionalParams,
  ) => Promise<MaintenanceConfiguration>;
  /** Create or Update configuration record */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    configuration: MaintenanceConfiguration,
    options?: MaintenanceConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<MaintenanceConfiguration>;
  /** Get Configuration record */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: MaintenanceConfigurationsGetOptionalParams,
  ) => Promise<MaintenanceConfiguration>;
}

function _getMaintenanceConfigurations(context: MaintenanceManagementContext) {
  return {
    list: (options?: MaintenanceConfigurationsListOptionalParams) => list(context, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: MaintenanceConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      configuration: MaintenanceConfiguration,
      options?: MaintenanceConfigurationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, configuration, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      configuration: MaintenanceConfiguration,
      options?: MaintenanceConfigurationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, configuration, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: MaintenanceConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getMaintenanceConfigurationsOperations(
  context: MaintenanceManagementContext,
): MaintenanceConfigurationsOperations {
  return {
    ..._getMaintenanceConfigurations(context),
  };
}

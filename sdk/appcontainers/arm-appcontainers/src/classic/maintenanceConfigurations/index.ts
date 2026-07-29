// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/maintenanceConfigurations/operations.js";
import {
  MaintenanceConfigurationsListOptionalParams,
  MaintenanceConfigurationsDeleteOptionalParams,
  MaintenanceConfigurationsCreateOrUpdateOptionalParams,
  MaintenanceConfigurationsGetOptionalParams,
} from "../../api/maintenanceConfigurations/options.js";
import { MaintenanceConfigurationResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MaintenanceConfigurations operations. */
export interface MaintenanceConfigurationsOperations {
  /** Gets all maintenance configurations in the specified Managed Environment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: MaintenanceConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<MaintenanceConfigurationResource>;
  /** Deletes the maintenance configuration of a ManagedEnvironment . */
  delete: (
    resourceGroupName: string,
    environmentName: string,
    configName: string,
    options?: MaintenanceConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update the maintenance configuration for Managed Environment. */
  createOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    configName: string,
    maintenanceConfigurationEnvelope: MaintenanceConfigurationResource,
    options?: MaintenanceConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<MaintenanceConfigurationResource>;
  /** Gets the maintenance configuration of a ManagedEnvironment . */
  get: (
    resourceGroupName: string,
    environmentName: string,
    configName: string,
    options?: MaintenanceConfigurationsGetOptionalParams,
  ) => Promise<MaintenanceConfigurationResource>;
}

function _getMaintenanceConfigurations(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      environmentName: string,
      options?: MaintenanceConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, options),
    delete: (
      resourceGroupName: string,
      environmentName: string,
      configName: string,
      options?: MaintenanceConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, environmentName, configName, options),
    createOrUpdate: (
      resourceGroupName: string,
      environmentName: string,
      configName: string,
      maintenanceConfigurationEnvelope: MaintenanceConfigurationResource,
      options?: MaintenanceConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        configName,
        maintenanceConfigurationEnvelope,
        options,
      ),
    get: (
      resourceGroupName: string,
      environmentName: string,
      configName: string,
      options?: MaintenanceConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, configName, options),
  };
}

export function _getMaintenanceConfigurationsOperations(
  context: ContainerAppsAPIContext,
): MaintenanceConfigurationsOperations {
  return {
    ..._getMaintenanceConfigurations(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listByManagedCluster,
  $delete,
  createOrUpdate,
  get,
} from "../../api/maintenanceConfigurations/operations.js";
import type {
  MaintenanceConfigurationsListByManagedClusterOptionalParams,
  MaintenanceConfigurationsDeleteOptionalParams,
  MaintenanceConfigurationsCreateOrUpdateOptionalParams,
  MaintenanceConfigurationsGetOptionalParams,
} from "../../api/maintenanceConfigurations/options.js";
import type { MaintenanceConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MaintenanceConfigurations operations. */
export interface MaintenanceConfigurationsOperations {
  /** Gets a list of maintenance configurations in the specified managed cluster. */
  listByManagedCluster: (
    resourceGroupName: string,
    resourceName: string,
    options?: MaintenanceConfigurationsListByManagedClusterOptionalParams,
  ) => PagedAsyncIterableIterator<MaintenanceConfiguration>;
  /** Deletes a maintenance configuration. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    configName: string,
    options?: MaintenanceConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a maintenance configuration in the specified managed cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    configName: string,
    parameters: MaintenanceConfiguration,
    options?: MaintenanceConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<MaintenanceConfiguration>;
  /** Gets the specified maintenance configuration of a managed cluster. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    configName: string,
    options?: MaintenanceConfigurationsGetOptionalParams,
  ) => Promise<MaintenanceConfiguration>;
}

function _getMaintenanceConfigurations(context: ContainerServiceContext) {
  return {
    listByManagedCluster: (
      resourceGroupName: string,
      resourceName: string,
      options?: MaintenanceConfigurationsListByManagedClusterOptionalParams,
    ) => listByManagedCluster(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      configName: string,
      options?: MaintenanceConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, configName, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      configName: string,
      parameters: MaintenanceConfiguration,
      options?: MaintenanceConfigurationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, configName, parameters, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      configName: string,
      options?: MaintenanceConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, configName, options),
  };
}

export function _getMaintenanceConfigurationsOperations(
  context: ContainerServiceContext,
): MaintenanceConfigurationsOperations {
  return {
    ..._getMaintenanceConfigurations(context),
  };
}

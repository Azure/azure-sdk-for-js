// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import {
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/configurationAssignmentsForResourceGroup/operations.js";
import type {
  ConfigurationAssignmentsForResourceGroupDeleteOptionalParams,
  ConfigurationAssignmentsForResourceGroupUpdateOptionalParams,
  ConfigurationAssignmentsForResourceGroupCreateOrUpdateOptionalParams,
  ConfigurationAssignmentsForResourceGroupGetOptionalParams,
} from "../../api/configurationAssignmentsForResourceGroup/options.js";
import type { ConfigurationAssignment } from "../../models/models.js";

/** Interface representing a ConfigurationAssignmentsForResourceGroup operations. */
export interface ConfigurationAssignmentsForResourceGroupOperations {
  /** Unregister configuration for resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    configurationAssignmentName: string,
    options?: ConfigurationAssignmentsForResourceGroupDeleteOptionalParams,
  ) => Promise<ConfigurationAssignment | null>;
  /** Register configuration for resource. */
  update: (
    resourceGroupName: string,
    configurationAssignmentName: string,
    configurationAssignment: ConfigurationAssignment,
    options?: ConfigurationAssignmentsForResourceGroupUpdateOptionalParams,
  ) => Promise<ConfigurationAssignment>;
  /** Register configuration for resource. */
  createOrUpdate: (
    resourceGroupName: string,
    configurationAssignmentName: string,
    configurationAssignment: ConfigurationAssignment,
    options?: ConfigurationAssignmentsForResourceGroupCreateOrUpdateOptionalParams,
  ) => Promise<ConfigurationAssignment>;
  /** Get configuration assignment for resource.. */
  get: (
    resourceGroupName: string,
    configurationAssignmentName: string,
    options?: ConfigurationAssignmentsForResourceGroupGetOptionalParams,
  ) => Promise<ConfigurationAssignment>;
}

function _getConfigurationAssignmentsForResourceGroup(context: MaintenanceManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      configurationAssignmentName: string,
      options?: ConfigurationAssignmentsForResourceGroupDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, configurationAssignmentName, options),
    update: (
      resourceGroupName: string,
      configurationAssignmentName: string,
      configurationAssignment: ConfigurationAssignment,
      options?: ConfigurationAssignmentsForResourceGroupUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        configurationAssignmentName,
        configurationAssignment,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      configurationAssignmentName: string,
      configurationAssignment: ConfigurationAssignment,
      options?: ConfigurationAssignmentsForResourceGroupCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        configurationAssignmentName,
        configurationAssignment,
        options,
      ),
    get: (
      resourceGroupName: string,
      configurationAssignmentName: string,
      options?: ConfigurationAssignmentsForResourceGroupGetOptionalParams,
    ) => get(context, resourceGroupName, configurationAssignmentName, options),
  };
}

export function _getConfigurationAssignmentsForResourceGroupOperations(
  context: MaintenanceManagementContext,
): ConfigurationAssignmentsForResourceGroupOperations {
  return {
    ..._getConfigurationAssignmentsForResourceGroup(context),
  };
}

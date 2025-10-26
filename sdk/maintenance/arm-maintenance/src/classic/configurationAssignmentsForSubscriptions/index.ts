// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import {
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/configurationAssignmentsForSubscriptions/operations.js";
import type {
  ConfigurationAssignmentsForSubscriptionsDeleteOptionalParams,
  ConfigurationAssignmentsForSubscriptionsUpdateOptionalParams,
  ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOptionalParams,
  ConfigurationAssignmentsForSubscriptionsGetOptionalParams,
} from "../../api/configurationAssignmentsForSubscriptions/options.js";
import type { ConfigurationAssignment } from "../../models/models.js";

/** Interface representing a ConfigurationAssignmentsForSubscriptions operations. */
export interface ConfigurationAssignmentsForSubscriptionsOperations {
  /** Unregister configuration for resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    configurationAssignmentName: string,
    options?: ConfigurationAssignmentsForSubscriptionsDeleteOptionalParams,
  ) => Promise<ConfigurationAssignment | null>;
  /** Register configuration for resource. */
  update: (
    configurationAssignmentName: string,
    configurationAssignment: ConfigurationAssignment,
    options?: ConfigurationAssignmentsForSubscriptionsUpdateOptionalParams,
  ) => Promise<ConfigurationAssignment>;
  /** Register configuration for resource. */
  createOrUpdate: (
    configurationAssignmentName: string,
    configurationAssignment: ConfigurationAssignment,
    options?: ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<ConfigurationAssignment>;
  /** Get configuration assignment for resource. */
  get: (
    configurationAssignmentName: string,
    options?: ConfigurationAssignmentsForSubscriptionsGetOptionalParams,
  ) => Promise<ConfigurationAssignment>;
}

function _getConfigurationAssignmentsForSubscriptions(context: MaintenanceManagementContext) {
  return {
    delete: (
      configurationAssignmentName: string,
      options?: ConfigurationAssignmentsForSubscriptionsDeleteOptionalParams,
    ) => $delete(context, configurationAssignmentName, options),
    update: (
      configurationAssignmentName: string,
      configurationAssignment: ConfigurationAssignment,
      options?: ConfigurationAssignmentsForSubscriptionsUpdateOptionalParams,
    ) => update(context, configurationAssignmentName, configurationAssignment, options),
    createOrUpdate: (
      configurationAssignmentName: string,
      configurationAssignment: ConfigurationAssignment,
      options?: ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, configurationAssignmentName, configurationAssignment, options),
    get: (
      configurationAssignmentName: string,
      options?: ConfigurationAssignmentsForSubscriptionsGetOptionalParams,
    ) => get(context, configurationAssignmentName, options),
  };
}

export function _getConfigurationAssignmentsForSubscriptionsOperations(
  context: MaintenanceManagementContext,
): ConfigurationAssignmentsForSubscriptionsOperations {
  return {
    ..._getConfigurationAssignmentsForSubscriptions(context),
  };
}

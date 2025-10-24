// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceManagementContext } from "../../api/maintenanceManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
  listParent,
  deleteParent,
  createOrUpdateParent,
  getParent,
} from "../../api/configurationAssignments/operations.js";
import type {
  ConfigurationAssignmentsListOptionalParams,
  ConfigurationAssignmentsDeleteOptionalParams,
  ConfigurationAssignmentsCreateOrUpdateOptionalParams,
  ConfigurationAssignmentsGetOptionalParams,
  ConfigurationAssignmentsListParentOptionalParams,
  ConfigurationAssignmentsDeleteParentOptionalParams,
  ConfigurationAssignmentsCreateOrUpdateParentOptionalParams,
  ConfigurationAssignmentsGetParentOptionalParams,
} from "../../api/configurationAssignments/options.js";
import type { ConfigurationAssignment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConfigurationAssignments operations. */
export interface ConfigurationAssignmentsOperations {
  /** Get Configuration records within a subscription and resource group */
  list: (
    resourceGroupName: string,
    providerName: string,
    resourceType: string,
    resourceName: string,
    options?: ConfigurationAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigurationAssignment>;
  /** Unregister configuration for resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    providerName: string,
    resourceType: string,
    resourceName: string,
    configurationAssignmentName: string,
    options?: ConfigurationAssignmentsDeleteOptionalParams,
  ) => Promise<ConfigurationAssignment | null>;
  /** Register configuration for resource. */
  createOrUpdate: (
    resourceGroupName: string,
    providerName: string,
    resourceType: string,
    resourceName: string,
    configurationAssignmentName: string,
    configurationAssignment: ConfigurationAssignment,
    options?: ConfigurationAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<ConfigurationAssignment>;
  /** Get configuration assignment for resource.. */
  get: (
    resourceGroupName: string,
    providerName: string,
    resourceType: string,
    resourceName: string,
    configurationAssignmentName: string,
    options?: ConfigurationAssignmentsGetOptionalParams,
  ) => Promise<ConfigurationAssignment>;
  /** List configurationAssignments for resource. */
  listParent: (
    resourceGroupName: string,
    providerName: string,
    resourceParentType: string,
    resourceParentName: string,
    resourceType: string,
    resourceName: string,
    options?: ConfigurationAssignmentsListParentOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigurationAssignment>;
  /** Unregister configuration for resource. */
  deleteParent: (
    resourceGroupName: string,
    providerName: string,
    resourceParentType: string,
    resourceParentName: string,
    resourceType: string,
    resourceName: string,
    configurationAssignmentName: string,
    options?: ConfigurationAssignmentsDeleteParentOptionalParams,
  ) => Promise<ConfigurationAssignment | null>;
  /** Register configuration for resource. */
  createOrUpdateParent: (
    resourceGroupName: string,
    providerName: string,
    resourceParentType: string,
    resourceParentName: string,
    resourceType: string,
    resourceName: string,
    configurationAssignmentName: string,
    configurationAssignment: ConfigurationAssignment,
    options?: ConfigurationAssignmentsCreateOrUpdateParentOptionalParams,
  ) => Promise<ConfigurationAssignment>;
  /** Get configuration assignment for resource.. */
  getParent: (
    resourceGroupName: string,
    providerName: string,
    resourceParentType: string,
    resourceParentName: string,
    resourceType: string,
    resourceName: string,
    configurationAssignmentName: string,
    options?: ConfigurationAssignmentsGetParentOptionalParams,
  ) => Promise<ConfigurationAssignment>;
}

function _getConfigurationAssignments(context: MaintenanceManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      providerName: string,
      resourceType: string,
      resourceName: string,
      options?: ConfigurationAssignmentsListOptionalParams,
    ) => list(context, resourceGroupName, providerName, resourceType, resourceName, options),
    delete: (
      resourceGroupName: string,
      providerName: string,
      resourceType: string,
      resourceName: string,
      configurationAssignmentName: string,
      options?: ConfigurationAssignmentsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        providerName,
        resourceType,
        resourceName,
        configurationAssignmentName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      providerName: string,
      resourceType: string,
      resourceName: string,
      configurationAssignmentName: string,
      configurationAssignment: ConfigurationAssignment,
      options?: ConfigurationAssignmentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        providerName,
        resourceType,
        resourceName,
        configurationAssignmentName,
        configurationAssignment,
        options,
      ),
    get: (
      resourceGroupName: string,
      providerName: string,
      resourceType: string,
      resourceName: string,
      configurationAssignmentName: string,
      options?: ConfigurationAssignmentsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        providerName,
        resourceType,
        resourceName,
        configurationAssignmentName,
        options,
      ),
    listParent: (
      resourceGroupName: string,
      providerName: string,
      resourceParentType: string,
      resourceParentName: string,
      resourceType: string,
      resourceName: string,
      options?: ConfigurationAssignmentsListParentOptionalParams,
    ) =>
      listParent(
        context,
        resourceGroupName,
        providerName,
        resourceParentType,
        resourceParentName,
        resourceType,
        resourceName,
        options,
      ),
    deleteParent: (
      resourceGroupName: string,
      providerName: string,
      resourceParentType: string,
      resourceParentName: string,
      resourceType: string,
      resourceName: string,
      configurationAssignmentName: string,
      options?: ConfigurationAssignmentsDeleteParentOptionalParams,
    ) =>
      deleteParent(
        context,
        resourceGroupName,
        providerName,
        resourceParentType,
        resourceParentName,
        resourceType,
        resourceName,
        configurationAssignmentName,
        options,
      ),
    createOrUpdateParent: (
      resourceGroupName: string,
      providerName: string,
      resourceParentType: string,
      resourceParentName: string,
      resourceType: string,
      resourceName: string,
      configurationAssignmentName: string,
      configurationAssignment: ConfigurationAssignment,
      options?: ConfigurationAssignmentsCreateOrUpdateParentOptionalParams,
    ) =>
      createOrUpdateParent(
        context,
        resourceGroupName,
        providerName,
        resourceParentType,
        resourceParentName,
        resourceType,
        resourceName,
        configurationAssignmentName,
        configurationAssignment,
        options,
      ),
    getParent: (
      resourceGroupName: string,
      providerName: string,
      resourceParentType: string,
      resourceParentName: string,
      resourceType: string,
      resourceName: string,
      configurationAssignmentName: string,
      options?: ConfigurationAssignmentsGetParentOptionalParams,
    ) =>
      getParent(
        context,
        resourceGroupName,
        providerName,
        resourceParentType,
        resourceParentName,
        resourceType,
        resourceName,
        configurationAssignmentName,
        options,
      ),
  };
}

export function _getConfigurationAssignmentsOperations(
  context: MaintenanceManagementContext,
): ConfigurationAssignmentsOperations {
  return {
    ..._getConfigurationAssignments(context),
  };
}

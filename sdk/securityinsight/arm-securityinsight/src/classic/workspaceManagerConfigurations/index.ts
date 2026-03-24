// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workspaceManagerConfigurations/operations.js";
import type {
  WorkspaceManagerConfigurationsListOptionalParams,
  WorkspaceManagerConfigurationsDeleteOptionalParams,
  WorkspaceManagerConfigurationsCreateOrUpdateOptionalParams,
  WorkspaceManagerConfigurationsGetOptionalParams,
} from "../../api/workspaceManagerConfigurations/options.js";
import type { WorkspaceManagerConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceManagerConfigurations operations. */
export interface WorkspaceManagerConfigurationsOperations {
  /** Gets all workspace manager configurations for a Sentinel workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspaceManagerConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkspaceManagerConfiguration>;
  /** Deletes a workspace manager configuration */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerConfigurationName: string,
    options?: WorkspaceManagerConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a workspace manager configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerConfigurationName: string,
    workspaceManagerConfiguration: WorkspaceManagerConfiguration,
    options?: WorkspaceManagerConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<WorkspaceManagerConfiguration>;
  /** Gets a workspace manager configuration */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerConfigurationName: string,
    options?: WorkspaceManagerConfigurationsGetOptionalParams,
  ) => Promise<WorkspaceManagerConfiguration>;
}

function _getWorkspaceManagerConfigurations(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspaceManagerConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerConfigurationName: string,
      options?: WorkspaceManagerConfigurationsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        workspaceName,
        workspaceManagerConfigurationName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerConfigurationName: string,
      workspaceManagerConfiguration: WorkspaceManagerConfiguration,
      options?: WorkspaceManagerConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        workspaceManagerConfigurationName,
        workspaceManagerConfiguration,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerConfigurationName: string,
      options?: WorkspaceManagerConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, workspaceManagerConfigurationName, options),
  };
}

export function _getWorkspaceManagerConfigurationsOperations(
  context: SecurityInsightsContext,
): WorkspaceManagerConfigurationsOperations {
  return {
    ..._getWorkspaceManagerConfigurations(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import {
  updateItem,
  getItem,
  $delete,
  getDefault,
  create,
  list,
} from "../../api/workItemConfigurations/operations.js";
import {
  WorkItemConfigurationsUpdateItemOptionalParams,
  WorkItemConfigurationsGetItemOptionalParams,
  WorkItemConfigurationsDeleteOptionalParams,
  WorkItemConfigurationsGetDefaultOptionalParams,
  WorkItemConfigurationsCreateOptionalParams,
  WorkItemConfigurationsListOptionalParams,
} from "../../api/workItemConfigurations/options.js";
import {
  WorkItemConfiguration,
  WorkItemCreateConfiguration,
} from "../../models/componentAPIs/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkItemConfigurations operations. */
export interface WorkItemConfigurationsOperations {
  /** Update a work item configuration for an Application Insights component. */
  updateItem: (
    resourceGroupName: string,
    resourceName: string,
    workItemConfigId: string,
    workItemConfigurationProperties: WorkItemCreateConfiguration,
    options?: WorkItemConfigurationsUpdateItemOptionalParams,
  ) => Promise<WorkItemConfiguration>;
  /** Gets specified work item configuration for an Application Insights component. */
  getItem: (
    resourceGroupName: string,
    resourceName: string,
    workItemConfigId: string,
    options?: WorkItemConfigurationsGetItemOptionalParams,
  ) => Promise<WorkItemConfiguration>;
  /** Delete a work item configuration of an Application Insights component. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    workItemConfigId: string,
    options?: WorkItemConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets default work item configurations that exist for the application */
  getDefault: (
    resourceGroupName: string,
    resourceName: string,
    options?: WorkItemConfigurationsGetDefaultOptionalParams,
  ) => Promise<WorkItemConfiguration>;
  /** Create a work item configuration for an Application Insights component. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    workItemConfigurationProperties: WorkItemCreateConfiguration,
    options?: WorkItemConfigurationsCreateOptionalParams,
  ) => Promise<WorkItemConfiguration>;
  /** Gets the list work item configurations that exist for the application */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: WorkItemConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkItemConfiguration>;
}

function _getWorkItemConfigurations(context: ApplicationInsightsManagementContext) {
  return {
    updateItem: (
      resourceGroupName: string,
      resourceName: string,
      workItemConfigId: string,
      workItemConfigurationProperties: WorkItemCreateConfiguration,
      options?: WorkItemConfigurationsUpdateItemOptionalParams,
    ) =>
      updateItem(
        context,
        resourceGroupName,
        resourceName,
        workItemConfigId,
        workItemConfigurationProperties,
        options,
      ),
    getItem: (
      resourceGroupName: string,
      resourceName: string,
      workItemConfigId: string,
      options?: WorkItemConfigurationsGetItemOptionalParams,
    ) => getItem(context, resourceGroupName, resourceName, workItemConfigId, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      workItemConfigId: string,
      options?: WorkItemConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, workItemConfigId, options),
    getDefault: (
      resourceGroupName: string,
      resourceName: string,
      options?: WorkItemConfigurationsGetDefaultOptionalParams,
    ) => getDefault(context, resourceGroupName, resourceName, options),
    create: (
      resourceGroupName: string,
      resourceName: string,
      workItemConfigurationProperties: WorkItemCreateConfiguration,
      options?: WorkItemConfigurationsCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, workItemConfigurationProperties, options),
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: WorkItemConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
  };
}

export function _getWorkItemConfigurationsOperations(
  context: ApplicationInsightsManagementContext,
): WorkItemConfigurationsOperations {
  return {
    ..._getWorkItemConfigurations(context),
  };
}

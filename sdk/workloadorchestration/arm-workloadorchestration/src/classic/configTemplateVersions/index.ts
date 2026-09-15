// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listByConfigTemplate,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/configTemplateVersions/operations.js";
import type {
  ConfigTemplateVersionsListByConfigTemplateOptionalParams,
  ConfigTemplateVersionsDeleteOptionalParams,
  ConfigTemplateVersionsUpdateOptionalParams,
  ConfigTemplateVersionsCreateOrUpdateOptionalParams,
  ConfigTemplateVersionsGetOptionalParams,
} from "../../api/configTemplateVersions/options.js";
import type { ConfigTemplateVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConfigTemplateVersions operations. */
export interface ConfigTemplateVersionsOperations {
  /** List Config Template Version Resources */
  listByConfigTemplate: (
    resourceGroupName: string,
    configTemplateName: string,
    options?: ConfigTemplateVersionsListByConfigTemplateOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigTemplateVersion>;
  /** Delete a Config Template Version Resource */
  delete: (
    resourceGroupName: string,
    configTemplateName: string,
    configTemplateVersionName: string,
    options?: ConfigTemplateVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Config Template Version Resource */
  update: (
    resourceGroupName: string,
    configTemplateName: string,
    configTemplateVersionName: string,
    properties: ConfigTemplateVersion,
    options?: ConfigTemplateVersionsUpdateOptionalParams,
  ) => Promise<ConfigTemplateVersion>;
  /** Create or update a Config Template Version Resource */
  createOrUpdate: (
    resourceGroupName: string,
    configTemplateName: string,
    configTemplateVersionName: string,
    resource: ConfigTemplateVersion,
    options?: ConfigTemplateVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ConfigTemplateVersion>, ConfigTemplateVersion>;
  /** Get a Config Template Version Resource */
  get: (
    resourceGroupName: string,
    configTemplateName: string,
    configTemplateVersionName: string,
    options?: ConfigTemplateVersionsGetOptionalParams,
  ) => Promise<ConfigTemplateVersion>;
}

function _getConfigTemplateVersions(context: WorkloadOrchestrationManagementContext) {
  return {
    listByConfigTemplate: (
      resourceGroupName: string,
      configTemplateName: string,
      options?: ConfigTemplateVersionsListByConfigTemplateOptionalParams,
    ) => listByConfigTemplate(context, resourceGroupName, configTemplateName, options),
    delete: (
      resourceGroupName: string,
      configTemplateName: string,
      configTemplateVersionName: string,
      options?: ConfigTemplateVersionsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, configTemplateName, configTemplateVersionName, options),
    update: (
      resourceGroupName: string,
      configTemplateName: string,
      configTemplateVersionName: string,
      properties: ConfigTemplateVersion,
      options?: ConfigTemplateVersionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        configTemplateName,
        configTemplateVersionName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      configTemplateName: string,
      configTemplateVersionName: string,
      resource: ConfigTemplateVersion,
      options?: ConfigTemplateVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        configTemplateName,
        configTemplateVersionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      configTemplateName: string,
      configTemplateVersionName: string,
      options?: ConfigTemplateVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, configTemplateName, configTemplateVersionName, options),
  };
}

export function _getConfigTemplateVersionsOperations(
  context: WorkloadOrchestrationManagementContext,
): ConfigTemplateVersionsOperations {
  return {
    ..._getConfigTemplateVersions(context),
  };
}

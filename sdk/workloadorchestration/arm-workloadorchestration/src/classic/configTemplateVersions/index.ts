// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import { listByConfigTemplate, get } from "../../api/configTemplateVersions/operations.js";
import {
  ConfigTemplateVersionsListByConfigTemplateOptionalParams,
  ConfigTemplateVersionsGetOptionalParams,
} from "../../api/configTemplateVersions/options.js";
import { ConfigTemplateVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConfigTemplateVersions operations. */
export interface ConfigTemplateVersionsOperations {
  /** List Config Template Version Resources */
  listByConfigTemplate: (
    resourceGroupName: string,
    configTemplateName: string,
    options?: ConfigTemplateVersionsListByConfigTemplateOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigTemplateVersion>;
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

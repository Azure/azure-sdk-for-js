// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import { listByConfigTemplateVersion, get } from "../../api/configTemplateSchemas/operations.js";
import type {
  ConfigTemplateSchemasListByConfigTemplateVersionOptionalParams,
  ConfigTemplateSchemasGetOptionalParams,
} from "../../api/configTemplateSchemas/options.js";
import type { ConfigTemplateSchema } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConfigTemplateSchemas operations. */
export interface ConfigTemplateSchemasOperations {
  /** List by ConfigTemplateVersion */
  listByConfigTemplateVersion: (
    resourceGroupName: string,
    configTemplateName: string,
    configTemplateVersionName: string,
    options?: ConfigTemplateSchemasListByConfigTemplateVersionOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigTemplateSchema>;
  /** Get a ConfigTemplateSchema Resource */
  get: (
    resourceGroupName: string,
    configTemplateName: string,
    configTemplateVersionName: string,
    configTemplateSchemaName: string,
    options?: ConfigTemplateSchemasGetOptionalParams,
  ) => Promise<ConfigTemplateSchema>;
}

function _getConfigTemplateSchemas(context: WorkloadOrchestrationManagementContext) {
  return {
    listByConfigTemplateVersion: (
      resourceGroupName: string,
      configTemplateName: string,
      configTemplateVersionName: string,
      options?: ConfigTemplateSchemasListByConfigTemplateVersionOptionalParams,
    ) =>
      listByConfigTemplateVersion(
        context,
        resourceGroupName,
        configTemplateName,
        configTemplateVersionName,
        options,
      ),
    get: (
      resourceGroupName: string,
      configTemplateName: string,
      configTemplateVersionName: string,
      configTemplateSchemaName: string,
      options?: ConfigTemplateSchemasGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        configTemplateName,
        configTemplateVersionName,
        configTemplateSchemaName,
        options,
      ),
  };
}

export function _getConfigTemplateSchemasOperations(
  context: WorkloadOrchestrationManagementContext,
): ConfigTemplateSchemasOperations {
  return {
    ..._getConfigTemplateSchemas(context),
  };
}

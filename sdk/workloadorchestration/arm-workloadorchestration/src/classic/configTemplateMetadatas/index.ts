// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listByConfigTemplate,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/configTemplateMetadatas/operations.js";
import type {
  ConfigTemplateMetadatasListByConfigTemplateOptionalParams,
  ConfigTemplateMetadatasDeleteOptionalParams,
  ConfigTemplateMetadatasUpdateOptionalParams,
  ConfigTemplateMetadatasCreateOrUpdateOptionalParams,
  ConfigTemplateMetadatasGetOptionalParams,
} from "../../api/configTemplateMetadatas/options.js";
import type { ConfigTemplateMetadata, ConfigTemplateMetadataUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConfigTemplateMetadatas operations. */
export interface ConfigTemplateMetadatasOperations {
  /** List by ConfigTemplate */
  listByConfigTemplate: (
    resourceGroupName: string,
    configTemplateName: string,
    options?: ConfigTemplateMetadatasListByConfigTemplateOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigTemplateMetadata>;
  /** Delete a ConfigTemplateMetadata Resource */
  delete: (
    resourceGroupName: string,
    configTemplateName: string,
    configTemplateMetadataName: string,
    options?: ConfigTemplateMetadatasDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a ConfigTemplateMetadata Resource */
  update: (
    resourceGroupName: string,
    configTemplateName: string,
    configTemplateMetadataName: string,
    properties: ConfigTemplateMetadataUpdate,
    options?: ConfigTemplateMetadatasUpdateOptionalParams,
  ) => PollerLike<OperationState<ConfigTemplateMetadata>, ConfigTemplateMetadata>;
  /** Create or update a ConfigTemplateMetadata Resource */
  createOrUpdate: (
    resourceGroupName: string,
    configTemplateName: string,
    configTemplateMetadataName: string,
    resource: ConfigTemplateMetadata,
    options?: ConfigTemplateMetadatasCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ConfigTemplateMetadata>, ConfigTemplateMetadata>;
  /** Get a ConfigTemplateMetadata Resource */
  get: (
    resourceGroupName: string,
    configTemplateName: string,
    configTemplateMetadataName: string,
    options?: ConfigTemplateMetadatasGetOptionalParams,
  ) => Promise<ConfigTemplateMetadata>;
}

function _getConfigTemplateMetadatas(context: WorkloadOrchestrationManagementContext) {
  return {
    listByConfigTemplate: (
      resourceGroupName: string,
      configTemplateName: string,
      options?: ConfigTemplateMetadatasListByConfigTemplateOptionalParams,
    ) => listByConfigTemplate(context, resourceGroupName, configTemplateName, options),
    delete: (
      resourceGroupName: string,
      configTemplateName: string,
      configTemplateMetadataName: string,
      options?: ConfigTemplateMetadatasDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, configTemplateName, configTemplateMetadataName, options),
    update: (
      resourceGroupName: string,
      configTemplateName: string,
      configTemplateMetadataName: string,
      properties: ConfigTemplateMetadataUpdate,
      options?: ConfigTemplateMetadatasUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        configTemplateName,
        configTemplateMetadataName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      configTemplateName: string,
      configTemplateMetadataName: string,
      resource: ConfigTemplateMetadata,
      options?: ConfigTemplateMetadatasCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        configTemplateName,
        configTemplateMetadataName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      configTemplateName: string,
      configTemplateMetadataName: string,
      options?: ConfigTemplateMetadatasGetOptionalParams,
    ) => get(context, resourceGroupName, configTemplateName, configTemplateMetadataName, options),
  };
}

export function _getConfigTemplateMetadatasOperations(
  context: WorkloadOrchestrationManagementContext,
): ConfigTemplateMetadatasOperations {
  return {
    ..._getConfigTemplateMetadatas(context),
  };
}

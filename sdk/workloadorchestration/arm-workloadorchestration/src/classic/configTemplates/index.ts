// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  removeVersion,
  createVersion,
  update,
  createOrUpdate,
  get,
} from "../../api/configTemplates/operations.js";
import {
  ConfigTemplatesListBySubscriptionOptionalParams,
  ConfigTemplatesListByResourceGroupOptionalParams,
  ConfigTemplatesDeleteOptionalParams,
  ConfigTemplatesRemoveVersionOptionalParams,
  ConfigTemplatesCreateVersionOptionalParams,
  ConfigTemplatesUpdateOptionalParams,
  ConfigTemplatesCreateOrUpdateOptionalParams,
  ConfigTemplatesGetOptionalParams,
} from "../../api/configTemplates/options.js";
import {
  VersionParameter,
  RemoveVersionResponse,
  ConfigTemplate,
  ConfigTemplateUpdate,
  ConfigTemplateVersionWithUpdateType,
  ConfigTemplateVersion,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConfigTemplates operations. */
export interface ConfigTemplatesOperations {
  /** List by subscription */
  listBySubscription: (
    options?: ConfigTemplatesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigTemplate>;
  /** List by specified resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ConfigTemplatesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigTemplate>;
  /** Delete a Config Template Resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    configTemplateName: string,
    options?: ConfigTemplatesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Remove Config Template Version Resource */
  removeVersion: (
    resourceGroupName: string,
    configTemplateName: string,
    body: VersionParameter,
    options?: ConfigTemplatesRemoveVersionOptionalParams,
  ) => Promise<RemoveVersionResponse>;
  /** Create or update a Config Template Version Resource with the specified UpdateType */
  createVersion: (
    resourceGroupName: string,
    configTemplateName: string,
    body: ConfigTemplateVersionWithUpdateType,
    options?: ConfigTemplatesCreateVersionOptionalParams,
  ) => PollerLike<OperationState<ConfigTemplateVersion>, ConfigTemplateVersion>;
  /** update a Config Template Resource */
  update: (
    resourceGroupName: string,
    configTemplateName: string,
    properties: ConfigTemplateUpdate,
    options?: ConfigTemplatesUpdateOptionalParams,
  ) => Promise<ConfigTemplate>;
  /** Create or update a Config Template Resource */
  createOrUpdate: (
    resourceGroupName: string,
    configTemplateName: string,
    resource: ConfigTemplate,
    options?: ConfigTemplatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ConfigTemplate>, ConfigTemplate>;
  /** Get a Config Template Resource */
  get: (
    resourceGroupName: string,
    configTemplateName: string,
    options?: ConfigTemplatesGetOptionalParams,
  ) => Promise<ConfigTemplate>;
}

function _getConfigTemplates(context: WorkloadOrchestrationManagementContext) {
  return {
    listBySubscription: (options?: ConfigTemplatesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ConfigTemplatesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      configTemplateName: string,
      options?: ConfigTemplatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, configTemplateName, options),
    removeVersion: (
      resourceGroupName: string,
      configTemplateName: string,
      body: VersionParameter,
      options?: ConfigTemplatesRemoveVersionOptionalParams,
    ) => removeVersion(context, resourceGroupName, configTemplateName, body, options),
    createVersion: (
      resourceGroupName: string,
      configTemplateName: string,
      body: ConfigTemplateVersionWithUpdateType,
      options?: ConfigTemplatesCreateVersionOptionalParams,
    ) => createVersion(context, resourceGroupName, configTemplateName, body, options),
    update: (
      resourceGroupName: string,
      configTemplateName: string,
      properties: ConfigTemplateUpdate,
      options?: ConfigTemplatesUpdateOptionalParams,
    ) => update(context, resourceGroupName, configTemplateName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      configTemplateName: string,
      resource: ConfigTemplate,
      options?: ConfigTemplatesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, configTemplateName, resource, options),
    get: (
      resourceGroupName: string,
      configTemplateName: string,
      options?: ConfigTemplatesGetOptionalParams,
    ) => get(context, resourceGroupName, configTemplateName, options),
  };
}

export function _getConfigTemplatesOperations(
  context: WorkloadOrchestrationManagementContext,
): ConfigTemplatesOperations {
  return {
    ..._getConfigTemplates(context),
  };
}

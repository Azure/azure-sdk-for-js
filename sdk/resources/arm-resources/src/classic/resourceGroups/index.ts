// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementContext } from "../../api/resourceManagementContext.js";
import {
  exportTemplate,
  list,
  $delete,
  update,
  createOrUpdate,
  checkExistence,
  get,
} from "../../api/resourceGroups/operations.js";
import {
  ResourceGroupsExportTemplateOptionalParams,
  ResourceGroupsListOptionalParams,
  ResourceGroupsDeleteOptionalParams,
  ResourceGroupsUpdateOptionalParams,
  ResourceGroupsCreateOrUpdateOptionalParams,
  ResourceGroupsCheckExistenceOptionalParams,
  ResourceGroupsGetOptionalParams,
} from "../../api/resourceGroups/options.js";
import {
  ResourceGroup,
  ResourceGroupPatchable,
  ExportTemplateRequest,
  ResourceGroupExportResult,
  ResourceGroupsCheckExistenceResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ResourceGroups operations. */
export interface ResourceGroupsOperations {
  /** Captures the specified resource group as a template. */
  exportTemplate: (
    resourceGroupName: string,
    parameters: ExportTemplateRequest,
    options?: ResourceGroupsExportTemplateOptionalParams,
  ) => PollerLike<OperationState<ResourceGroupExportResult>, ResourceGroupExportResult>;
  /** @deprecated use exportTemplate instead */
  beginExportTemplate: (
    resourceGroupName: string,
    parameters: ExportTemplateRequest,
    options?: ResourceGroupsExportTemplateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ResourceGroupExportResult>, ResourceGroupExportResult>
  >;
  /** @deprecated use exportTemplate instead */
  beginExportTemplateAndWait: (
    resourceGroupName: string,
    parameters: ExportTemplateRequest,
    options?: ResourceGroupsExportTemplateOptionalParams,
  ) => Promise<ResourceGroupExportResult>;
  /** Gets all the resource groups for a subscription. */
  list: (options?: ResourceGroupsListOptionalParams) => PagedAsyncIterableIterator<ResourceGroup>;
  /** When you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations. */
  delete: (
    resourceGroupName: string,
    options?: ResourceGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    options?: ResourceGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    options?: ResourceGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Resource groups can be updated through a simple PATCH operation to a group address. The format of the request is the same as that for creating a resource group. If a field is unspecified, the current value is retained. */
  update: (
    resourceGroupName: string,
    parameters: ResourceGroupPatchable,
    options?: ResourceGroupsUpdateOptionalParams,
  ) => Promise<ResourceGroup>;
  /** Creates or updates a resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    parameters: ResourceGroup,
    options?: ResourceGroupsCreateOrUpdateOptionalParams,
  ) => Promise<ResourceGroup>;
  /** Checks whether a resource group exists. */
  checkExistence: (
    resourceGroupName: string,
    options?: ResourceGroupsCheckExistenceOptionalParams,
  ) => Promise<ResourceGroupsCheckExistenceResponse>;
  /** Gets a resource group. */
  get: (
    resourceGroupName: string,
    options?: ResourceGroupsGetOptionalParams,
  ) => Promise<ResourceGroup>;
}

function _getResourceGroups(context: ResourceManagementContext) {
  return {
    exportTemplate: (
      resourceGroupName: string,
      parameters: ExportTemplateRequest,
      options?: ResourceGroupsExportTemplateOptionalParams,
    ) => exportTemplate(context, resourceGroupName, parameters, options),
    beginExportTemplate: async (
      resourceGroupName: string,
      parameters: ExportTemplateRequest,
      options?: ResourceGroupsExportTemplateOptionalParams,
    ) => {
      const poller = exportTemplate(context, resourceGroupName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExportTemplateAndWait: async (
      resourceGroupName: string,
      parameters: ExportTemplateRequest,
      options?: ResourceGroupsExportTemplateOptionalParams,
    ) => {
      return await exportTemplate(context, resourceGroupName, parameters, options);
    },
    list: (options?: ResourceGroupsListOptionalParams) => list(context, options),
    delete: (resourceGroupName: string, options?: ResourceGroupsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      options?: ResourceGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      options?: ResourceGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, options);
    },
    update: (
      resourceGroupName: string,
      parameters: ResourceGroupPatchable,
      options?: ResourceGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      parameters: ResourceGroup,
      options?: ResourceGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, parameters, options),
    checkExistence: (
      resourceGroupName: string,
      options?: ResourceGroupsCheckExistenceOptionalParams,
    ) => checkExistence(context, resourceGroupName, options),
    get: (resourceGroupName: string, options?: ResourceGroupsGetOptionalParams) =>
      get(context, resourceGroupName, options),
  };
}

export function _getResourceGroupsOperations(
  context: ResourceManagementContext,
): ResourceGroupsOperations {
  return {
    ..._getResourceGroups(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/workbookTemplates/operations.js";
import {
  WorkbookTemplatesListByResourceGroupOptionalParams,
  WorkbookTemplatesDeleteOptionalParams,
  WorkbookTemplatesUpdateOptionalParams,
  WorkbookTemplatesCreateOrUpdateOptionalParams,
  WorkbookTemplatesGetOptionalParams,
} from "../../api/workbookTemplates/options.js";
import { WorkbookTemplate } from "../../models/workbookTemplatesApi/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkbookTemplates operations. */
export interface WorkbookTemplatesOperations {
  /** Get all Workbook templates defined within a specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: WorkbookTemplatesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<WorkbookTemplate>;
  /** Delete a workbook template. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: WorkbookTemplatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a workbook template that has already been added. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    options?: WorkbookTemplatesUpdateOptionalParams,
  ) => Promise<WorkbookTemplate>;
  /** Create a new workbook template. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    workbookTemplateProperties: WorkbookTemplate,
    options?: WorkbookTemplatesCreateOrUpdateOptionalParams,
  ) => Promise<WorkbookTemplate>;
  /** Get a single workbook template by its resourceName. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: WorkbookTemplatesGetOptionalParams,
  ) => Promise<WorkbookTemplate>;
}

function _getWorkbookTemplates(context: ApplicationInsightsManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: WorkbookTemplatesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: WorkbookTemplatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      options?: WorkbookTemplatesUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      workbookTemplateProperties: WorkbookTemplate,
      options?: WorkbookTemplatesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, resourceName, workbookTemplateProperties, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: WorkbookTemplatesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getWorkbookTemplatesOperations(
  context: ApplicationInsightsManagementContext,
): WorkbookTemplatesOperations {
  return {
    ..._getWorkbookTemplates(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import {
  listByResourceGroup,
  revisionGet,
  listRevisionsList,
  listBySubscription,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/workbooks/operations.js";
import {
  WorkbooksListByResourceGroupOptionalParams,
  WorkbooksRevisionGetOptionalParams,
  WorkbooksListRevisionsListOptionalParams,
  WorkbooksListBySubscriptionOptionalParams,
  WorkbooksDeleteOptionalParams,
  WorkbooksUpdateOptionalParams,
  WorkbooksCreateOrUpdateOptionalParams,
  WorkbooksGetOptionalParams,
} from "../../api/workbooks/options.js";
import { CategoryType } from "../../models/applicationInsightsCommonTypes/models.js";
import { Workbook } from "../../models/workbooksApi/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Workbooks operations. */
export interface WorkbooksOperations {
  /** Get all Workbooks defined within a specified resource group and category. */
  listByResourceGroup: (
    resourceGroupName: string,
    category: CategoryType,
    options?: WorkbooksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Workbook>;
  /** Get a single workbook revision defined by its revisionId. */
  revisionGet: (
    resourceGroupName: string,
    resourceName: string,
    revisionId: string,
    options?: WorkbooksRevisionGetOptionalParams,
  ) => Promise<Workbook>;
  /** Get the revisions for the workbook defined by its resourceName. */
  listRevisionsList: (
    resourceGroupName: string,
    resourceName: string,
    options?: WorkbooksListRevisionsListOptionalParams,
  ) => PagedAsyncIterableIterator<Workbook>;
  /** Get all Workbooks defined within a specified subscription and category. */
  listBySubscription: (
    category: CategoryType,
    options?: WorkbooksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Workbook>;
  /** Delete a workbook. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: WorkbooksDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a workbook that has already been added. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    options?: WorkbooksUpdateOptionalParams,
  ) => Promise<Workbook>;
  /** Create a new workbook. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    workbookProperties: Workbook,
    options?: WorkbooksCreateOrUpdateOptionalParams,
  ) => Promise<Workbook>;
  /** Get a single workbook by its resourceName. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: WorkbooksGetOptionalParams,
  ) => Promise<Workbook>;
}

function _getWorkbooks(context: ApplicationInsightsManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      category: CategoryType,
      options?: WorkbooksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, category, options),
    revisionGet: (
      resourceGroupName: string,
      resourceName: string,
      revisionId: string,
      options?: WorkbooksRevisionGetOptionalParams,
    ) => revisionGet(context, resourceGroupName, resourceName, revisionId, options),
    listRevisionsList: (
      resourceGroupName: string,
      resourceName: string,
      options?: WorkbooksListRevisionsListOptionalParams,
    ) => listRevisionsList(context, resourceGroupName, resourceName, options),
    listBySubscription: (
      category: CategoryType,
      options?: WorkbooksListBySubscriptionOptionalParams,
    ) => listBySubscription(context, category, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: WorkbooksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      options?: WorkbooksUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      workbookProperties: Workbook,
      options?: WorkbooksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, workbookProperties, options),
    get: (resourceGroupName: string, resourceName: string, options?: WorkbooksGetOptionalParams) =>
      get(context, resourceGroupName, resourceName, options),
  };
}

export function _getWorkbooksOperations(
  context: ApplicationInsightsManagementContext,
): WorkbooksOperations {
  return {
    ..._getWorkbooks(context),
  };
}

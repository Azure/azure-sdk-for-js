// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { listBySubscription } from "../../api/deletedWorkbooks/operations.js";
import { DeletedWorkbooksListBySubscriptionOptionalParams } from "../../api/deletedWorkbooks/options.js";
import { DeletedWorkbook } from "../../models/deletedWorkbookApi/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DeletedWorkbooks operations. */
export interface DeletedWorkbooksOperations {
  /** Get all recently deleted Workbooks in a specified subscription. */
  listBySubscription: (
    options?: DeletedWorkbooksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedWorkbook>;
}

function _getDeletedWorkbooks(context: ApplicationInsightsManagementContext) {
  return {
    listBySubscription: (options?: DeletedWorkbooksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getDeletedWorkbooksOperations(
  context: ApplicationInsightsManagementContext,
): DeletedWorkbooksOperations {
  return {
    ..._getDeletedWorkbooks(context),
  };
}

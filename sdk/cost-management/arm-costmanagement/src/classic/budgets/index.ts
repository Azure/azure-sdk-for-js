// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext } from "../../api/costManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/budgets/operations.js";
import type {
  BudgetsListOptionalParams,
  BudgetsDeleteOptionalParams,
  BudgetsCreateOrUpdateOptionalParams,
  BudgetsGetOptionalParams,
} from "../../api/budgets/options.js";
import type { Budget } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Budgets operations. */
export interface BudgetsOperations {
  /** Lists all budgets for the defined scope. */
  list: (scope: string, options?: BudgetsListOptionalParams) => PagedAsyncIterableIterator<Budget>;
  /** The operation to delete a budget. */
  delete: (
    scope: string,
    budgetName: string,
    options?: BudgetsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation. */
  createOrUpdate: (
    scope: string,
    budgetName: string,
    parameters: Budget,
    options?: BudgetsCreateOrUpdateOptionalParams,
  ) => Promise<Budget>;
  /** Gets the budget for the scope by budget name. */
  get: (scope: string, budgetName: string, options?: BudgetsGetOptionalParams) => Promise<Budget>;
}

function _getBudgets(context: CostManagementContext) {
  return {
    list: (scope: string, options?: BudgetsListOptionalParams) => list(context, scope, options),
    delete: (scope: string, budgetName: string, options?: BudgetsDeleteOptionalParams) =>
      $delete(context, scope, budgetName, options),
    createOrUpdate: (
      scope: string,
      budgetName: string,
      parameters: Budget,
      options?: BudgetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, scope, budgetName, parameters, options),
    get: (scope: string, budgetName: string, options?: BudgetsGetOptionalParams) =>
      get(context, scope, budgetName, options),
  };
}

export function _getBudgetsOperations(context: CostManagementContext): BudgetsOperations {
  return {
    ..._getBudgets(context),
  };
}

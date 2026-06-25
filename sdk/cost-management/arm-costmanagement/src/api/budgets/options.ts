// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BudgetsListOptionalParams extends OperationOptions {
  /** OData filter option. May be used to filter budgets by properties/category. The filter supports 'eq' only. */
  filter?: string;
}

/** Optional parameters. */
export interface BudgetsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BudgetsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BudgetsGetOptionalParams extends OperationOptions {}

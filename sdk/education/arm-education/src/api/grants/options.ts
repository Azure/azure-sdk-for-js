// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GrantsListAllOptionalParams extends OperationOptions {
  /** May be used to include information about budget that has been allocated. */
  includeAllocatedBudget?: boolean;
}

/** Optional parameters. */
export interface GrantsListOptionalParams extends OperationOptions {
  /** May be used to include information about budget that has been allocated. */
  includeAllocatedBudget?: boolean;
}

/** Optional parameters. */
export interface GrantsGetOptionalParams extends OperationOptions {
  /** May be used to include information about budget that has been allocated. */
  includeAllocatedBudget?: boolean;
}

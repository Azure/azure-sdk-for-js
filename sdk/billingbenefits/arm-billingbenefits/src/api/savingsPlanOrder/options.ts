// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SavingsPlanOrderElevateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SavingsPlanOrderListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SavingsPlanOrderGetOptionalParams extends OperationOptions {
  /** May be used to expand the detail information of some properties. */
  expand?: string;
}

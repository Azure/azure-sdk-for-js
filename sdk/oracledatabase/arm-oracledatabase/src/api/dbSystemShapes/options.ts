// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DbSystemShapesListByLocationOptionalParams extends OperationOptions {
  /** Filters the result for the given Azure Availability Zone */
  zone?: string;
}

/** Optional parameters. */
export interface DbSystemShapesGetOptionalParams extends OperationOptions {}

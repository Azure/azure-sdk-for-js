// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DataMaskingRulesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataMaskingRulesListByDatabaseOptionalParams extends OperationOptions {
  /** The number of elements in the collection to skip. */
  skip?: number;
}

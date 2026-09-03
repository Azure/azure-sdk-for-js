// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DbSystemShapesListByLocationOptionalParams extends OperationOptions {
  /** Filters the result for the given Azure Availability Zone */
  zone?: string;
  /** Filters the result for the given Shape Attribute, such as BLOCK_STORAGE or SMART_STORAGE. */
  shapeAttribute?: string;
}

/** Optional parameters. */
export interface DbSystemShapesGetOptionalParams extends OperationOptions {}

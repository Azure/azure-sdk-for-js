// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatabaseSystemShapeResourcesListByLocationOptionalParams extends OperationOptions {
  /** Filters the result for the given Shape Attribute, such as BLOCK_STORAGE or SMART_STORAGE. */
  shapeAttribute?: string;
  /** Filters the result for the given Azure Availability Zone */
  zone?: string;
  /** If provided, filters the result by availability domain. Example: GWjz:US-ASHBURN-AD-1 */
  availabilityDomain?: string;
  /** If provided, filters the result by database shape family. Example: VIRTUALMACHINE */
  databaseShapeFamily?: string;
  /** If provided, filters the result by database edition. */
  databaseEdition?: string;
}

/** Optional parameters. */
export interface DatabaseSystemShapeResourcesGetOptionalParams extends OperationOptions {}

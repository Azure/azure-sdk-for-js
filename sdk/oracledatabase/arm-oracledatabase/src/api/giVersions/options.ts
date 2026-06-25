// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SystemShapes } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GiVersionsListByLocationOptionalParams extends OperationOptions {
  /** If provided, filters the results for the given shape */
  shape?: SystemShapes;
  /** Filters the result for the given Azure Availability Zone */
  zone?: string;
  /** Filters the result for the given Shape Attribute, such as BLOCK_STORAGE or SMART_STORAGE. */
  shapeAttribute?: string;
}

/** Optional parameters. */
export interface GiVersionsGetOptionalParams extends OperationOptions {}

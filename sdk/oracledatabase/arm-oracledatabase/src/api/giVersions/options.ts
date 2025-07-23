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
}

/** Optional parameters. */
export interface GiVersionsGetOptionalParams extends OperationOptions {}

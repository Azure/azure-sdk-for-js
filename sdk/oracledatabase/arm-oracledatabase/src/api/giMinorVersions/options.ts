// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ShapeFamily } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GiMinorVersionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GiMinorVersionsListByParentOptionalParams extends OperationOptions {
  /** If provided, filters the results to the set of database versions which are supported for the given shape family. */
  shapeFamily?: ShapeFamily;
  /** Filters the result for the given Azure Availability Zone */
  zone?: string;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ShapeFamily, GiMinorVersionSortOrder } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GiMinorVersionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GiMinorVersionsListByParentOptionalParams extends OperationOptions {
  /** If provided, filters the results to the set of database versions which are supported for the given shape family. */
  shapeFamily?: ShapeFamily;
  /** Filters the result for the given Azure Availability Zone */
  zone?: string;
  /** If provided, filters the results to the set of GI minor versions supported for the given shape. */
  shape?: string;
  /** If true, filters the results to GI minor versions supported during VM cluster provisioning. */
  isGiVersionForProvisioning?: boolean;
  /** Sort order for the returned GI minor versions. */
  sortOrder?: GiMinorVersionSortOrder;
}

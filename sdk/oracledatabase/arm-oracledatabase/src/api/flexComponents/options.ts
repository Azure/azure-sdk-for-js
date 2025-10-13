// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SystemShapes } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FlexComponentsListByParentOptionalParams extends OperationOptions {
  /** If provided, filters the results for the given shape */
  shape?: SystemShapes;
}

/** Optional parameters. */
export interface FlexComponentsGetOptionalParams extends OperationOptions {}

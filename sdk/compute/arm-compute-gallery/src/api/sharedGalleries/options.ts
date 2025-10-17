// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SharedToValues } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SharedGalleriesListOptionalParams extends OperationOptions {
  /** The query parameter to decide what shared galleries to fetch when doing listing operations. */
  sharedTo?: SharedToValues;
}

/** Optional parameters. */
export interface SharedGalleriesGetOptionalParams extends OperationOptions {}

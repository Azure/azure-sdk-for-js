// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SharedToValues } from "../../models/computeGallery/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SharedGalleryImageVersionsListOptionalParams extends OperationOptions {
  /** The query parameter to decide what shared galleries to fetch when doing listing operations. */
  sharedTo?: SharedToValues;
}

/** Optional parameters. */
export interface SharedGalleryImageVersionsGetOptionalParams extends OperationOptions {}

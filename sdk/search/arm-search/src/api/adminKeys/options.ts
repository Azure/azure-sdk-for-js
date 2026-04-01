// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type { SearchManagementRequestOptions } from "../../models/models.js";

/** Optional parameters. */
export interface AdminKeysRegenerateOptionalParams extends OperationOptions {
  /** Parameter group */
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface AdminKeysGetOptionalParams extends OperationOptions {
  /** Parameter group */
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

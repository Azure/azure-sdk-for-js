// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementRequestOptions } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AdminKeysRegenerateOptionalParams extends OperationOptions {
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface AdminKeysGetOptionalParams extends OperationOptions {
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

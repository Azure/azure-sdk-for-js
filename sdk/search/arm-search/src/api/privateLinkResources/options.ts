// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementRequestOptions } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateLinkResourcesListSupportedOptionalParams extends OperationOptions {
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

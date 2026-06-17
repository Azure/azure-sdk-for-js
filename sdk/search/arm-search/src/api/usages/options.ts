// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementRequestOptions } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UsagesListBySubscriptionOptionalParams extends OperationOptions {
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

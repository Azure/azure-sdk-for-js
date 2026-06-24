// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementRequestOptions } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SharedPrivateLinkResourcesListByServiceOptionalParams extends OperationOptions {
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface SharedPrivateLinkResourcesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface SharedPrivateLinkResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface SharedPrivateLinkResourcesGetOptionalParams extends OperationOptions {
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

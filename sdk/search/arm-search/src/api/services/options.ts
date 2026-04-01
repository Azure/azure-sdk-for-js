// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type { SearchManagementRequestOptions } from "../../models/models.js";

/** Optional parameters. */
export interface ServicesUpgradeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServicesListBySubscriptionOptionalParams extends OperationOptions {
  /** Parameter group */
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface ServicesListByResourceGroupOptionalParams extends OperationOptions {
  /** Parameter group */
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface ServicesDeleteOptionalParams extends OperationOptions {
  /** Parameter group */
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface ServicesUpdateOptionalParams extends OperationOptions {
  /** Parameter group */
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface ServicesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Parameter group */
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface ServicesGetOptionalParams extends OperationOptions {
  /** Parameter group */
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

/** Optional parameters. */
export interface ServicesCheckNameAvailabilityOptionalParams extends OperationOptions {
  /** Parameter group */
  searchManagementRequestOptions?: SearchManagementRequestOptions;
}

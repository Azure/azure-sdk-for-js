// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NetworkProfilesListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkProfilesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkProfilesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkProfilesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkProfilesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkProfilesGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

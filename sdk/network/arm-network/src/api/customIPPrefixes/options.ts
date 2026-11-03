// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CustomIPPrefixesListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomIPPrefixesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomIPPrefixesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CustomIPPrefixesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomIPPrefixesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CustomIPPrefixesGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

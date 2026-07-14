// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PublicIPPrefixesListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicIPPrefixesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicIPPrefixesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicIPPrefixesUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PublicIPPrefixesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PublicIPPrefixesGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

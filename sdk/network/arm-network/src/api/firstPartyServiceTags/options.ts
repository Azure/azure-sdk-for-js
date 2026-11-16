// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FirstPartyServiceTagsListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FirstPartyServiceTagsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FirstPartyServiceTagsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FirstPartyServiceTagsUpdateTagsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FirstPartyServiceTagsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FirstPartyServiceTagsGetOptionalParams extends OperationOptions {}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface InterconnectGroupsGetNodeAvailabilityOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InterconnectGroupsListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InterconnectGroupsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InterconnectGroupsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InterconnectGroupsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InterconnectGroupsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InterconnectGroupsGetOptionalParams extends OperationOptions {}

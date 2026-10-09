// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServerTrustGroupsListByInstanceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerTrustGroupsListByLocationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerTrustGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerTrustGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerTrustGroupsGetOptionalParams extends OperationOptions {}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServerConnectionPoliciesListByServerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerConnectionPoliciesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerConnectionPoliciesGetOptionalParams extends OperationOptions {}

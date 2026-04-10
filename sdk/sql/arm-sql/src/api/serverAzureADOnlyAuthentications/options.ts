// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServerAzureADOnlyAuthenticationsListByServerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerAzureADOnlyAuthenticationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServerAzureADOnlyAuthenticationsGetOptionalParams extends OperationOptions {}

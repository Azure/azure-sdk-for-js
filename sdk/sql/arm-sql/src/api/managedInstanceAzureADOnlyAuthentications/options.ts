// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedInstanceAzureADOnlyAuthenticationsListByInstanceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ManagedInstanceAzureADOnlyAuthenticationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ManagedInstanceAzureADOnlyAuthenticationsGetOptionalParams extends OperationOptions {}

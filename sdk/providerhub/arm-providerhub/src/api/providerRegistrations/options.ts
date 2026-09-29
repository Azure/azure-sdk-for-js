// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProviderRegistrationsGenerateOperationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProviderRegistrationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProviderRegistrationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProviderRegistrationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProviderRegistrationsGetOptionalParams extends OperationOptions {}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ResourceTypeRegistrationsListByProviderRegistrationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ResourceTypeRegistrationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ResourceTypeRegistrationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ResourceTypeRegistrationsGetOptionalParams extends OperationOptions {}

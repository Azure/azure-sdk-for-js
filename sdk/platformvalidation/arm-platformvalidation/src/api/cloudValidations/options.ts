// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CloudValidationsListBySubscriptionOptionalParams extends OperationOptions {
  /** The OData filter expression to apply to the list operation. */
  filter?: string;
}

/** Optional parameters. */
export interface CloudValidationsListByResourceGroupOptionalParams extends OperationOptions {
  /** The OData filter expression to apply to the list operation. */
  filter?: string;
}

/** Optional parameters. */
export interface CloudValidationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudValidationsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudValidationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloudValidationsGetOptionalParams extends OperationOptions {}

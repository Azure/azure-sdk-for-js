// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AvailabilityGroupListenersListByGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AvailabilityGroupListenersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AvailabilityGroupListenersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AvailabilityGroupListenersGetOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
}

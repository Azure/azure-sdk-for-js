// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PlaywrightWorkspacesCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PlaywrightWorkspacesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PlaywrightWorkspacesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PlaywrightWorkspacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PlaywrightWorkspacesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PlaywrightWorkspacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PlaywrightWorkspacesGetOptionalParams extends OperationOptions {}

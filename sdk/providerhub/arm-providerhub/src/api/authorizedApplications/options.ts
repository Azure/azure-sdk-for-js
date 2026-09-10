// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AuthorizedApplicationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AuthorizedApplicationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AuthorizedApplicationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AuthorizedApplicationsGetOptionalParams extends OperationOptions {}

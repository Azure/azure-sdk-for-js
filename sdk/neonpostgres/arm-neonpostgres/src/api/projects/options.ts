// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProjectsGetConnectionUriOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProjectsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProjectsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProjectsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProjectsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ProjectsGetOptionalParams extends OperationOptions {}

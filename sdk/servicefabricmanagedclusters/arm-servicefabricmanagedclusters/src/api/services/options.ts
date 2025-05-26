// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServicesListByApplicationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServicesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServicesGetOptionalParams extends OperationOptions {}

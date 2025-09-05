// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EndpointsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EndpointsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EndpointsGetOptionalParams extends OperationOptions {}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FrontDoorsValidateCustomDomainOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FrontDoorsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FrontDoorsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FrontDoorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FrontDoorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FrontDoorsGetOptionalParams extends OperationOptions {}

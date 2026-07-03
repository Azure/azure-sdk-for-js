// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NatGatewaysListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NatGatewaysListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NatGatewaysDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NatGatewaysUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NatGatewaysCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NatGatewaysGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AttachedNetworksListByProjectOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
}

/** Optional parameters. */
export interface AttachedNetworksGetByProjectOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AttachedNetworksListByDevCenterOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
}

/** Optional parameters. */
export interface AttachedNetworksDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AttachedNetworksCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AttachedNetworksGetByDevCenterOptionalParams extends OperationOptions {}

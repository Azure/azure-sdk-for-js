// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DiskAccessesListPrivateEndpointConnectionsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DiskAccessesDeleteAPrivateEndpointConnectionOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiskAccessesUpdateAPrivateEndpointConnectionOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiskAccessesGetAPrivateEndpointConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiskAccessesGetPrivateLinkResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiskAccessesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiskAccessesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiskAccessesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiskAccessesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiskAccessesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiskAccessesGetOptionalParams extends OperationOptions {}

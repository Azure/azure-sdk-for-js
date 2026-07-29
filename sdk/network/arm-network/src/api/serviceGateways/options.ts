// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServiceGatewaysListServicesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceGatewaysListAddressLocationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceGatewaysUpdateServicesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServiceGatewaysUpdateAddressLocationsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServiceGatewaysListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceGatewaysListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceGatewaysDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServiceGatewaysUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServiceGatewaysCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServiceGatewaysGetOptionalParams extends OperationOptions {}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IotSecuritySolutionListBySubscriptionOptionalParams extends OperationOptions {
  /** Filter the IoT Security solution with OData syntax. Supports filtering by iotHubs. */
  filter?: string;
}

/** Optional parameters. */
export interface IotSecuritySolutionListByResourceGroupOptionalParams extends OperationOptions {
  /** Filter the IoT Security solution with OData syntax. Supports filtering by iotHubs. */
  filter?: string;
}

/** Optional parameters. */
export interface IotSecuritySolutionDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotSecuritySolutionUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotSecuritySolutionCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotSecuritySolutionGetOptionalParams extends OperationOptions {}

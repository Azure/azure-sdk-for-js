// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IotHubResourceCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceListEventHubConsumerGroupsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceDeleteEventHubConsumerGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceCreateEventHubConsumerGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceGetEventHubConsumerGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceGetStatsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceImportDevicesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceExportDevicesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceGetKeysForKeyNameOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceTestRouteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceTestAllRoutesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceListEndpointHealthOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceListQuotaMetricsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceGetJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceListJobsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceListValidSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IotHubResourceDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IotHubResourceUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IotHubResourceCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** ETag of the IoT Hub. Do not specify for creating a brand new IoT Hub. Required to update an existing IoT Hub. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface IotHubResourceGetOptionalParams extends OperationOptions {}

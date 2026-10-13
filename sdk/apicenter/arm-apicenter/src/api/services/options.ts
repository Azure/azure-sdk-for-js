// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServicesExportMetadataSchemaOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServicesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesGetOptionalParams extends OperationOptions {}

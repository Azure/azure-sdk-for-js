// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectorsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectorsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectorsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectorsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InsightsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InsightsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InsightsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InsightsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ImpactCategoriesListBySubscriptionOptionalParams extends OperationOptions {
  /** Filter by category name */
  categoryName?: string;
}

/** Optional parameters. */
export interface ImpactCategoriesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkloadImpactsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkloadImpactsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkloadImpactsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkloadImpactsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OperationsListOptionalParams extends OperationOptions {}

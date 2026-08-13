// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EntitiesGetSignalRecommendationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntitiesGetDataAnnotationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntitiesAddDataAnnotationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntitiesIngestHealthReportOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntitiesGetSignalHistoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntitiesGetHistoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntitiesListByHealthModelOptionalParams extends OperationOptions {
  /** Timestamp to use for the operation. When specified, the version of the resource at this point in time is retrieved. If not specified, the latest version is used. */
  timestamp?: Date;
}

/** Optional parameters. */
export interface EntitiesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EntitiesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EntitiesGetOptionalParams extends OperationOptions {}

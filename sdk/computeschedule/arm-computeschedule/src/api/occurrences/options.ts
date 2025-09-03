// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OccurrencesDelayOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OccurrencesCancelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OccurrencesListResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OccurrencesListByScheduledActionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OccurrencesGetOptionalParams extends OperationOptions {}

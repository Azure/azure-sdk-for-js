// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface JobDefinitionsStopJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobDefinitionsStartJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobDefinitionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobDefinitionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface JobDefinitionsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobDefinitionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobDefinitionsGetOptionalParams extends OperationOptions {}

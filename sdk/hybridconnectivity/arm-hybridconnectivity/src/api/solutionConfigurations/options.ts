// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SolutionConfigurationsSyncNowOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SolutionConfigurationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionConfigurationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionConfigurationsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionConfigurationsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionConfigurationsGetOptionalParams extends OperationOptions {}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FixResourcePermissionsRequest } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ScenarioConfigurationsFixResourcePermissionsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  body?: FixResourcePermissionsRequest;
}

/** Optional parameters. */
export interface ScenarioConfigurationsValidateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ScenarioConfigurationsExecuteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScenarioConfigurationsListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScenarioConfigurationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ScenarioConfigurationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ScenarioConfigurationsGetOptionalParams extends OperationOptions {}

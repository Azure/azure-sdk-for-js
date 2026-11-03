// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxConfigurationRequest, AnalysisCreate } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConfigurationsAnalysisOptionalParams extends OperationOptions {
  /** The NGINX configuration to analyze */
  body?: AnalysisCreate;
}

/** Optional parameters. */
export interface ConfigurationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigurationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigurationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The NGINX configuration */
  body?: NginxConfigurationRequest;
}

/** Optional parameters. */
export interface ConfigurationsGetOptionalParams extends OperationOptions {}

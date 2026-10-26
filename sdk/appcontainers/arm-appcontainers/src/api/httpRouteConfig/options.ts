// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpRouteConfig } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface HttpRouteConfigListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HttpRouteConfigDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface HttpRouteConfigUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HttpRouteConfigCreateOrUpdateOptionalParams extends OperationOptions {
  /** Http Route config to be created or updated */
  httpRouteConfigEnvelope?: HttpRouteConfig;
}

/** Optional parameters. */
export interface HttpRouteConfigGetOptionalParams extends OperationOptions {}

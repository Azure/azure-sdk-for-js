// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FeatureEnableRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FeaturesDisableOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FeaturesEnableOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The content of the action request */
  body?: FeatureEnableRequest;
}

/** Optional parameters. */
export interface FeaturesListBySubscriptionLocationResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FeaturesGetOptionalParams extends OperationOptions {}

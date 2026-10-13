// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FileShareLimitsRequest } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface InformationalOperationsGetProvisioningRecommendationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InformationalOperationsGetLimitsOptionalParams extends OperationOptions {
  /** The request body */
  body?: FileShareLimitsRequest;
}

/** Optional parameters. */
export interface InformationalOperationsGetUsageDataOptionalParams extends OperationOptions {}

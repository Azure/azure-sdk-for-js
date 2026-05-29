// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TriageRecommendationsResetTriageRecommendationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TriageRecommendationsRejectTriageRecommendationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TriageRecommendationsApproveTriageRecommendationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TriageRecommendationsListOptionalParams extends OperationOptions {
  /** The number of items to be included in the result. */
  top?: number;
  /** The number of items to skip before starting to collect the result set. */
  skip?: number;
}

/** Optional parameters. */
export interface TriageRecommendationsGetOptionalParams extends OperationOptions {}

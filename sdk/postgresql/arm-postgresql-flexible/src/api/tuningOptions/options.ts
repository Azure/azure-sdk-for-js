// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecommendationTypeParameterEnum } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TuningOptionsListRecommendationsOptionalParams extends OperationOptions {
  /** Recommendations list filter. Retrieves recommendations based on type. */
  recommendationType?: RecommendationTypeParameterEnum;
}

/** Optional parameters. */
export interface TuningOptionsListByServerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TuningOptionsGetOptionalParams extends OperationOptions {}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeLimitContext } from "../../api/computeLimitContext.js";
import { enable, listBySubscriptionLocationResource, get } from "../../api/features/operations.js";
import type {
  FeaturesEnableOptionalParams,
  FeaturesListBySubscriptionLocationResourceOptionalParams,
  FeaturesGetOptionalParams,
} from "../../api/features/options.js";
import type { Feature, OperationStatusResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Features operations. */
export interface FeaturesOperations {
  /** Enables a compute limit feature for the subscription at the specified location. */
  enable: (
    location: string,
    featureName: string,
    options?: FeaturesEnableOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Lists all compute limit features for the subscription at the specified location. */
  listBySubscriptionLocationResource: (
    location: string,
    options?: FeaturesListBySubscriptionLocationResourceOptionalParams,
  ) => PagedAsyncIterableIterator<Feature>;
  /** Gets the properties of a compute limit feature. */
  get: (
    location: string,
    featureName: string,
    options?: FeaturesGetOptionalParams,
  ) => Promise<Feature>;
}

function _getFeatures(context: ComputeLimitContext) {
  return {
    enable: (location: string, featureName: string, options?: FeaturesEnableOptionalParams) =>
      enable(context, location, featureName, options),
    listBySubscriptionLocationResource: (
      location: string,
      options?: FeaturesListBySubscriptionLocationResourceOptionalParams,
    ) => listBySubscriptionLocationResource(context, location, options),
    get: (location: string, featureName: string, options?: FeaturesGetOptionalParams) =>
      get(context, location, featureName, options),
  };
}

export function _getFeaturesOperations(context: ComputeLimitContext): FeaturesOperations {
  return {
    ..._getFeatures(context),
  };
}

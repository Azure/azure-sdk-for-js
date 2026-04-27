// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewManagementContext } from "../../api/purviewManagementContext.js";
import { subscriptionGet, accountGet } from "../../api/features/operations.js";
import type {
  FeaturesSubscriptionGetOptionalParams,
  FeaturesAccountGetOptionalParams,
} from "../../api/features/options.js";
import type { BatchFeatureRequest, BatchFeatureStatus } from "../../models/models.js";

/** Interface representing a Features operations. */
export interface FeaturesOperations {
  /** Gets details from a list of feature names. */
  subscriptionGet: (
    locations: string,
    featureRequest: BatchFeatureRequest,
    options?: FeaturesSubscriptionGetOptionalParams,
  ) => Promise<BatchFeatureStatus>;
  /** Gets details from a list of feature names. */
  accountGet: (
    resourceGroupName: string,
    accountName: string,
    featureRequest: BatchFeatureRequest,
    options?: FeaturesAccountGetOptionalParams,
  ) => Promise<BatchFeatureStatus>;
}

function _getFeatures(context: PurviewManagementContext) {
  return {
    subscriptionGet: (
      locations: string,
      featureRequest: BatchFeatureRequest,
      options?: FeaturesSubscriptionGetOptionalParams,
    ) => subscriptionGet(context, locations, featureRequest, options),
    accountGet: (
      resourceGroupName: string,
      accountName: string,
      featureRequest: BatchFeatureRequest,
      options?: FeaturesAccountGetOptionalParams,
    ) => accountGet(context, resourceGroupName, accountName, featureRequest, options),
  };
}

export function _getFeaturesOperations(context: PurviewManagementContext): FeaturesOperations {
  return {
    ..._getFeatures(context),
  };
}

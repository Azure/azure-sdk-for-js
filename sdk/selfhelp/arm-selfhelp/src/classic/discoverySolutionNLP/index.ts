// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRPContext } from "../../api/helpRPContext.js";
import {
  discoverSolutionsBySubscription,
  discoverSolutions,
} from "../../api/discoverySolutionNLP/operations.js";
import {
  DiscoverySolutionNLPDiscoverSolutionsBySubscriptionOptionalParams,
  DiscoverySolutionNLPDiscoverSolutionsOptionalParams,
} from "../../api/discoverySolutionNLP/options.js";
import { DiscoveryNlpResponse } from "../../models/models.js";

/** Interface representing a DiscoverySolutionNLP operations. */
export interface DiscoverySolutionNLPOperations {
  /** Search for relevant Azure Diagnostics, Solutions and Troubleshooters using a natural language issue summary and subscription. */
  discoverSolutionsBySubscription: (
    subscriptionId: string,
    options?: DiscoverySolutionNLPDiscoverSolutionsBySubscriptionOptionalParams,
  ) => Promise<DiscoveryNlpResponse>;
  /** Search for relevant Azure Diagnostics, Solutions and Troubleshooters using a natural language issue summary. */
  discoverSolutions: (
    options?: DiscoverySolutionNLPDiscoverSolutionsOptionalParams,
  ) => Promise<DiscoveryNlpResponse>;
}

function _getDiscoverySolutionNLP(context: HelpRPContext) {
  return {
    discoverSolutionsBySubscription: (
      subscriptionId: string,
      options?: DiscoverySolutionNLPDiscoverSolutionsBySubscriptionOptionalParams,
    ) => discoverSolutionsBySubscription(context, subscriptionId, options),
    discoverSolutions: (options?: DiscoverySolutionNLPDiscoverSolutionsOptionalParams) =>
      discoverSolutions(context, options),
  };
}

export function _getDiscoverySolutionNLPOperations(
  context: HelpRPContext,
): DiscoverySolutionNLPOperations {
  return {
    ..._getDiscoverySolutionNLP(context),
  };
}

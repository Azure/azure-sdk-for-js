// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpContext } from "../../api/helpContext.js";
import { DiscoveryNlpResponse } from "../../models/models.js";
import {
  DiscoverySolutionNLPDiscoverSolutionsBySubscriptionOptionalParams,
  DiscoverySolutionNLPDiscoverSolutionsOptionalParams,
} from "../../api/discoverySolutionNLP/options.js";
import {
  discoverSolutionsBySubscription,
  discoverSolutions,
} from "../../api/discoverySolutionNLP/operations.js";

/** Interface representing a DiscoverySolutionNLP operations. */
export interface DiscoverySolutionNLPOperations {
  /** Search for relevant Azure Diagnostics, Solutions and Troubleshooters using a natural language issue summary and subscription. */
  discoverSolutionsBySubscription: (
    options?: DiscoverySolutionNLPDiscoverSolutionsBySubscriptionOptionalParams,
  ) => Promise<DiscoveryNlpResponse>;
  /** Search for relevant Azure Diagnostics, Solutions and Troubleshooters using a natural language issue summary. */
  discoverSolutions: (
    options?: DiscoverySolutionNLPDiscoverSolutionsOptionalParams,
  ) => Promise<DiscoveryNlpResponse>;
}

function _getDiscoverySolutionNLP(context: HelpContext) {
  return {
    discoverSolutionsBySubscription: (
      options?: DiscoverySolutionNLPDiscoverSolutionsBySubscriptionOptionalParams,
    ) => discoverSolutionsBySubscription(context, options),
    discoverSolutions: (options?: DiscoverySolutionNLPDiscoverSolutionsOptionalParams) =>
      discoverSolutions(context, options),
  };
}

export function _getDiscoverySolutionNLPOperations(
  context: HelpContext,
): DiscoverySolutionNLPOperations {
  return {
    ..._getDiscoverySolutionNLP(context),
  };
}

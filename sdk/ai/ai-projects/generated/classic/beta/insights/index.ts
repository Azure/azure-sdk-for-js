// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import { list, get, generate } from "../../../api/beta/insights/operations.js";
import {
  BetaInsightsListOptionalParams,
  BetaInsightsGetOptionalParams,
  BetaInsightsGenerateOptionalParams,
} from "../../../api/beta/insights/options.js";
import { Insight } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaInsights operations. */
export interface BetaInsightsOperations {
  /** List all insights in reverse chronological order (newest first). */
  list: (
    foundryFeatures: "Insights=V1Preview",
    options?: BetaInsightsListOptionalParams,
  ) => PagedAsyncIterableIterator<Insight>;
  /** Get a specific insight by Id. */
  get: (
    insightId: string,
    foundryFeatures: "Insights=V1Preview",
    options?: BetaInsightsGetOptionalParams,
  ) => Promise<Insight>;
  /** Generate Insights */
  generate: (
    foundryFeatures: "Insights=V1Preview",
    insight: Insight,
    options?: BetaInsightsGenerateOptionalParams,
  ) => Promise<Insight>;
}

function _getBetaInsights(context: AIProjectContext) {
  return {
    list: (foundryFeatures: "Insights=V1Preview", options?: BetaInsightsListOptionalParams) =>
      list(context, foundryFeatures, options),
    get: (
      insightId: string,
      foundryFeatures: "Insights=V1Preview",
      options?: BetaInsightsGetOptionalParams,
    ) => get(context, insightId, foundryFeatures, options),
    generate: (
      foundryFeatures: "Insights=V1Preview",
      insight: Insight,
      options?: BetaInsightsGenerateOptionalParams,
    ) => generate(context, foundryFeatures, insight, options),
  };
}

export function _getBetaInsightsOperations(context: AIProjectContext): BetaInsightsOperations {
  return {
    ..._getBetaInsights(context),
  };
}

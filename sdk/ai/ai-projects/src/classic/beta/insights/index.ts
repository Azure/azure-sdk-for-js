// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import { list, get, generate } from "../../../api/beta/insights/operations.js";
import type {
  BetaInsightsListOptionalParams,
  BetaInsightsGetOptionalParams,
  BetaInsightsGenerateOptionalParams,
  InsightGenerationRequest,
} from "../../../api/beta/insights/options.js";
import type { Insight } from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaInsights operations. */
export interface BetaInsightsOperations {
  /** Returns insights in reverse chronological order, with the most recent entries first. */
  list: (options?: BetaInsightsListOptionalParams) => PagedAsyncIterableIterator<Insight>;
  /** Retrieves the specified insight report and its results. */
  get: (insightId: string, options?: BetaInsightsGetOptionalParams) => Promise<Insight>;
  /** Generates an insights report from the provided evaluation configuration. */
  generate: (
    insight: InsightGenerationRequest,
    options?: BetaInsightsGenerateOptionalParams,
  ) => Promise<Insight>;
}

function _getBetaInsights(context: AIProjectContext) {
  return {
    list: (options?: BetaInsightsListOptionalParams) => list(context, options),
    get: (insightId: string, options?: BetaInsightsGetOptionalParams) =>
      get(context, insightId, options),
    generate: (insight: InsightGenerationRequest, options?: BetaInsightsGenerateOptionalParams) =>
      generate(context, insight, options),
  };
}

export function _getBetaInsightsOperations(context: AIProjectContext): BetaInsightsOperations {
  return {
    ..._getBetaInsights(context),
  };
}

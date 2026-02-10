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
  list: (options?: BetaInsightsListOptionalParams) => PagedAsyncIterableIterator<Insight>;
  /** Get a specific insight by Id. */
  get: (id: string, options?: BetaInsightsGetOptionalParams) => Promise<Insight>;
  /** Generate Insights */
  generate: (insight: Insight, options?: BetaInsightsGenerateOptionalParams) => Promise<Insight>;
}

function _getBetaInsights(context: AIProjectContext) {
  return {
    list: (options?: BetaInsightsListOptionalParams) => list(context, options),
    get: (id: string, options?: BetaInsightsGetOptionalParams) => get(context, id, options),
    generate: (insight: Insight, options?: BetaInsightsGenerateOptionalParams) =>
      generate(context, insight, options),
  };
}

export function _getBetaInsightsOperations(context: AIProjectContext): BetaInsightsOperations {
  return {
    ..._getBetaInsights(context),
  };
}

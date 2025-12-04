// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import { list, get, generate } from "../../api/insights/operations.js";
import type {
  InsightsListOptionalParams,
  InsightsGetOptionalParams,
  InsightsGenerateOptionalParams,
} from "../../api/insights/options.js";
import type { Insight } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Insights operations. */
export interface InsightsOperations {
  /** List all insights in reverse chronological order (newest first). */
  list: (options?: InsightsListOptionalParams) => PagedAsyncIterableIterator<Insight>;
  /** Get a specific insight by Id. */
  get: (id: string, options?: InsightsGetOptionalParams) => Promise<Insight>;
  /** Generate Insights */
  generate: (insight: Insight, options?: InsightsGenerateOptionalParams) => Promise<Insight>;
}

function _getInsights(context: AIProjectContext) {
  return {
    list: (options?: InsightsListOptionalParams) => list(context, options),
    get: (id: string, options?: InsightsGetOptionalParams) => get(context, id, options),
    generate: (insight: Insight, options?: InsightsGenerateOptionalParams) =>
      generate(context, insight, options),
  };
}

export function _getInsightsOperations(context: AIProjectContext): InsightsOperations {
  return {
    ..._getInsights(context),
  };
}

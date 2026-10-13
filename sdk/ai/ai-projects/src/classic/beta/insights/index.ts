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
<<<<<<< /tmp/azsdk-dev-toolCDQwXJ/result/src/classic/beta/insights/index.ts
import { Insight, InsightCreate } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
||||||| /tmp/azsdk-dev-toolCDQwXJ/base/sdk/ai/ai-projects/generated/classic/beta/insights/index.ts
import { Insight } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
=======
import type { Insight } from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
>>>>>>> /tmp/azsdk-dev-toolCDQwXJ/custom/sdk/ai/ai-projects/src/classic/beta/insights/index.ts

/** Interface representing a BetaInsights operations. */
export interface BetaInsightsOperations {
  /** Returns insights in reverse chronological order, with the most recent entries first. */
  list: (options?: BetaInsightsListOptionalParams) => PagedAsyncIterableIterator<Insight>;
  /** Retrieves the specified insight report and its results. */
  get: (insightId: string, options?: BetaInsightsGetOptionalParams) => Promise<Insight>;
  /** Generates an insights report from the provided evaluation configuration. */
<<<<<<< /tmp/azsdk-dev-toolCDQwXJ/result/src/classic/beta/insights/index.ts
  generate: (
    insight: InsightCreate,
    options?: BetaInsightsGenerateOptionalParams,
  ) => Promise<Insight>;
||||||| /tmp/azsdk-dev-toolCDQwXJ/base/sdk/ai/ai-projects/generated/classic/beta/insights/index.ts
  generate: (insight: Insight, options?: BetaInsightsGenerateOptionalParams) => Promise<Insight>;
=======
  generate: (
    insight: InsightGenerationRequest,
    options?: BetaInsightsGenerateOptionalParams,
  ) => Promise<Insight>;
>>>>>>> /tmp/azsdk-dev-toolCDQwXJ/custom/sdk/ai/ai-projects/src/classic/beta/insights/index.ts
}

function _getBetaInsights(context: AIProjectContext) {
  return {
    list: (options?: BetaInsightsListOptionalParams) => list(context, options),
    get: (insightId: string, options?: BetaInsightsGetOptionalParams) =>
      get(context, insightId, options),
<<<<<<< /tmp/azsdk-dev-toolCDQwXJ/result/src/classic/beta/insights/index.ts
    generate: (insight: InsightCreate, options?: BetaInsightsGenerateOptionalParams) =>
||||||| /tmp/azsdk-dev-toolCDQwXJ/base/sdk/ai/ai-projects/generated/classic/beta/insights/index.ts
    generate: (insight: Insight, options?: BetaInsightsGenerateOptionalParams) =>
=======
    generate: (insight: InsightGenerationRequest, options?: BetaInsightsGenerateOptionalParams) =>
>>>>>>> /tmp/azsdk-dev-toolCDQwXJ/custom/sdk/ai/ai-projects/src/classic/beta/insights/index.ts
      generate(context, insight, options),
  };
}

export function _getBetaInsightsOperations(context: AIProjectContext): BetaInsightsOperations {
  return {
    ..._getBetaInsights(context),
  };
}

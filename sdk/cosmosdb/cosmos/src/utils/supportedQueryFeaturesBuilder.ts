// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueryFeature } from "../common/index.js";
import type { FeedOptions } from "../request/FeedOptions.js";

export function supportedQueryFeaturesBuilder(options: FeedOptions): string {
  const allFeatures = Object.keys(QueryFeature) as QueryFeature[];
  const exclude: QueryFeature[] = [];

  if (options.disableNonStreamingOrderByQuery) {
    exclude.push(QueryFeature.NonStreamingOrderBy);
  }
  if (options.disableHybridSearchQueryPlanOptimization) {
    exclude.push(QueryFeature.HybridSearchSkipOrderByRewrite);
  }
  return allFeatures.filter((feature) => !exclude.includes(feature)).join(",");
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { QueryFeature } from "../common/index.js";
export function supportedQueryFeaturesBuilder(options) {
    const allFeatures = Object.keys(QueryFeature);
    const exclude = [];
    if (options.disableNonStreamingOrderByQuery) {
        exclude.push(QueryFeature.NonStreamingOrderBy);
    }
    if (options.disableHybridSearchQueryPlanOptimization) {
        exclude.push(QueryFeature.HybridSearchSkipOrderByRewrite);
    }
    return allFeatures.filter((feature) => !exclude.includes(feature)).join(",");
}
//# sourceMappingURL=supportedQueryFeaturesBuilder.js.map
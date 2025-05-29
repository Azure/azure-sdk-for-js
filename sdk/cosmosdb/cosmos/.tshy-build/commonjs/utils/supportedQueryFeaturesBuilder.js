"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportedQueryFeaturesBuilder = supportedQueryFeaturesBuilder;
const index_js_1 = require("../common/index.js");
function supportedQueryFeaturesBuilder(options) {
    const allFeatures = Object.keys(index_js_1.QueryFeature);
    const exclude = [];
    if (options.disableNonStreamingOrderByQuery) {
        exclude.push(index_js_1.QueryFeature.NonStreamingOrderBy);
    }
    if (options.disableHybridSearchQueryPlanOptimization) {
        exclude.push(index_js_1.QueryFeature.HybridSearchSkipOrderByRewrite);
    }
    return allFeatures.filter((feature) => !exclude.includes(feature)).join(",");
}
//# sourceMappingURL=supportedQueryFeaturesBuilder.js.map
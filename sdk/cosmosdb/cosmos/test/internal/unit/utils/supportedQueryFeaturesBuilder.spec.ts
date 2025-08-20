// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { supportedQueryFeaturesBuilder } from "$internal/utils/supportedQueryFeaturesBuilder.js";
import type { FeedOptions } from "$internal/request/FeedOptions.js";
import { describe, it, assert } from "vitest";

describe("validate supportedQueryFeaturesBuilder", () => {
  it("should contain nonStreamingOrderBy feature", () => {
    const feedOptions: FeedOptions = {};
    const res = supportedQueryFeaturesBuilder(feedOptions);
    assert.equal(res.includes("NonStreamingOrderBy"), true);
  });

  it("should contain nonStreamingOrderBy feature", () => {
    const feedOptions: FeedOptions = { disableNonStreamingOrderByQuery: false };
    const res = supportedQueryFeaturesBuilder(feedOptions);
    assert.equal(res.includes("NonStreamingOrderBy"), true);
  });

  it("should not contain nonStreamingOrderBy feature", () => {
    const feedOptions: FeedOptions = { disableNonStreamingOrderByQuery: true };
    const res = supportedQueryFeaturesBuilder(feedOptions);
    assert.equal(res.includes("NonStreamingOrderBy"), false);
  });
  it("should contain hybridSearchSkipOrderByRewrite feature", () => {
    const feedOptions: FeedOptions = {};
    const res = supportedQueryFeaturesBuilder(feedOptions);
    assert.equal(res.includes("HybridSearchSkipOrderByRewrite"), true);
  });
  it("should contain hybridSearchSkipOrderByRewrite feature", () => {
    const feedOptions: FeedOptions = { disableHybridSearchQueryPlanOptimization: false };
    const res = supportedQueryFeaturesBuilder(feedOptions);
    assert.equal(res.includes("HybridSearchSkipOrderByRewrite"), true);
  });
  it("should not contain hybridSearchSkipOrderByRewrite feature", () => {
    const feedOptions: FeedOptions = { disableHybridSearchQueryPlanOptimization: true };
    const res = supportedQueryFeaturesBuilder(feedOptions);
    assert.equal(res.includes("HybridSearchSkipOrderByRewrite"), false);
  });
  it("should not contain nonStreamingOrderBy and hybridSearchSkipOrderByRewrite  features", () => {
    const feedOptions: FeedOptions = {
      disableNonStreamingOrderByQuery: true,
      disableHybridSearchQueryPlanOptimization: true,
    };
    const res = supportedQueryFeaturesBuilder(feedOptions);
    assert.equal(res.includes("NonStreamingOrderBy"), false);
    assert.equal(res.includes("HybridSearchSkipOrderByRewrite"), false);
  });
});

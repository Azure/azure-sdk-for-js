// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import assert from "node:assert";
import { supportedQueryFeaturesBuilder } from "../../../../src/utils/supportedQueryFeaturesBuilder.js";
import type { FeedOptions } from "../../../../src/request/FeedOptions.js";
import { describe, it, assert } from "vitest";

describe("validate supportedQueryFeaturesBuilder", function () {
  it("should contain nonStreamingOrderBy feature", () => {
    const feedOptions: FeedOptions = {};
    const res = supportedQueryFeaturesBuilder(feedOptions.disableNonStreamingOrderByQuery);
    assert.equal(res.includes("NonStreamingOrderBy"), true);
  });

  it("should contain nonStreamingOrderBy feature", () => {
    const feedOptions: FeedOptions = { disableNonStreamingOrderByQuery: false };
    const res = supportedQueryFeaturesBuilder(feedOptions.disableNonStreamingOrderByQuery);
    assert.equal(res.includes("NonStreamingOrderBy"), true);
  });

  it("should contain nonStreamingOrderBy feature", () => {
    const feedOptions: FeedOptions = { disableNonStreamingOrderByQuery: true };
    const res = supportedQueryFeaturesBuilder(feedOptions.disableNonStreamingOrderByQuery);
    assert.equal(res.includes("NonStreamingOrderBy"), false);
  });
});

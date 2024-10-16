// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import assert from "assert";
import { supportedQueryFeaturesBuilder } from "../../../../src/utils/supportedQueryFeaturesBuilder";
import { FeedOptions } from "../../../../src/request/FeedOptions";

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

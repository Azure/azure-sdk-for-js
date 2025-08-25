// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  extractOverlappingRanges,
  isNullOrEmpty,
  fetchStartTime,
  isEpkRange,
} from "$internal/client/ChangeFeed/changeFeedUtils.js";
import type { PartitionKeyRange } from "@azure/cosmos";
import { ChangeFeedStartFrom } from "@azure/cosmos";
import { FeedRangeInternal } from "$internal/client/ChangeFeed/FeedRange.js";
import { QueryRange } from "$internal/routing/index.js";
import { describe, it, assert } from "vitest";

describe("test extractOverlappingRanges", () => {
  it("exact overlap", async () => {
    const overLappingRange: PartitionKeyRange = {
      id: "2",
      minInclusive: "05C1D5AB55AB50",
      maxExclusive: "05C1DFFFFFFFF8",
      ridPrefix: 2,
      throughputFraction: 0.16666666666666666,
      status: "online",
      parents: [],
    };

    const pkRange = new QueryRange("05C1D5AB55AB50", "05C1DFFFFFFFF8", true, false);
    const [epkMinHeader, epkMaxHeader] = await extractOverlappingRanges(pkRange, overLappingRange);

    assert.equal(epkMinHeader, undefined);
    assert.equal(epkMaxHeader, undefined);
  });

  it("complete overlap, pkRange exceeds overlappingRange", async () => {
    const overLappingRange: PartitionKeyRange = {
      id: "2",
      minInclusive: "05C1D5AB55AB50",
      maxExclusive: "05C1DFFFFFFFF8",
      ridPrefix: 2,
      throughputFraction: 0.16666666666666666,
      status: "online",
      parents: [],
    };

    const pkRange = new QueryRange("05C1C5AB55AB50", "05C1E5AB55AB50", true, false);

    const [epkMinHeader, epkMaxHeader] = await extractOverlappingRanges(pkRange, overLappingRange);

    assert.equal(epkMinHeader, undefined);
    assert.equal(epkMaxHeader, undefined);
  });

  it("overlapping range left side overlap", async () => {
    const overLappingRange: PartitionKeyRange = {
      id: "2",
      minInclusive: "05C1D5AB55AB50",
      maxExclusive: "05C1DFFFFFFFF8",
      ridPrefix: 2,
      throughputFraction: 0.16666666666666666,
      status: "online",
      parents: [],
    };

    const pkRange = new QueryRange("05C1C5AB55AB50", "05C1DFFFFFFFF7", true, false);

    const [epkMinHeader, epkMaxHeader] = await extractOverlappingRanges(pkRange, overLappingRange);

    assert.equal(epkMinHeader, "05C1D5AB55AB50");
    assert.equal(epkMaxHeader, "05C1DFFFFFFFF7");
  });

  it("overlapping range right side overlap", async () => {
    const overLappingRange: PartitionKeyRange = {
      id: "2",
      minInclusive: "05C1D5AB55AB50",
      maxExclusive: "05C1DFFFFFFFF8",
      ridPrefix: 2,
      throughputFraction: 0.16666666666666666,
      status: "online",
      parents: [],
    };

    const pkRange = new QueryRange("05C1D5AB55AB51", "05C1DFFFFFFFF9", true, false);
    const [epkMinHeader, epkMaxHeader] = await extractOverlappingRanges(pkRange, overLappingRange);

    assert.equal(epkMinHeader, "05C1D5AB55AB51");
    assert.equal(epkMaxHeader, "05C1DFFFFFFFF8");
  });

  it("pkrange is less than overlapping range on both sides", async () => {
    const overLappingRange: PartitionKeyRange = {
      id: "2",
      minInclusive: "05C1D5AB55AB50",
      maxExclusive: "05C1DFFFFFFFF8",
      ridPrefix: 2,
      throughputFraction: 0.16666666666666666,
      status: "online",
      parents: [],
    };

    const pkRange = new QueryRange("05C1D5AB55AB51", "05C1DFFFFFFFF7", true, false);
    const [epkMinHeader, epkMaxHeader] = await extractOverlappingRanges(pkRange, overLappingRange);

    assert.equal(epkMinHeader, "05C1D5AB55AB51");
    assert.equal(epkMaxHeader, "05C1DFFFFFFFF7");
  });
});

describe("test isEpkRange", () => {
  it("maxExclusive > 'FF'", async () => {
    const epkRange = new FeedRangeInternal("", "GG");
    const result = isEpkRange(epkRange);
    assert.equal(result, false);
  });
  it("minInclusive > maxExclusive", async () => {
    const epkRange = new FeedRangeInternal("05C1DFFFFFFFF8", "05C1D5AB55AB50");
    const result = isEpkRange(epkRange);
    assert.equal(result, false);
  });
  it("minInclusive = maxExclusive", async () => {
    const epkRange = new FeedRangeInternal("05C1D5AB55AB51", "05C1D5AB55AB51");
    const result = isEpkRange(epkRange);
    assert.equal(result, false);
  });

  it("minInclusive = '' and maxExclusive = 'FF'", async () => {
    const epkRange = new FeedRangeInternal("", "FF");
    const result = isEpkRange(epkRange);
    assert.equal(result, true);
  });

  it("minInclusive > '' and maxExclusive < 'FF'", async () => {
    const epkRange = new FeedRangeInternal("05C1D5AB55AB50", "05C1DFFFFFFFF8");
    const result = isEpkRange(epkRange);
    assert.equal(result, true);
  });
});

describe("test checkTokenEmptyOrWhiteSpace", () => {
  it("empty continuation token", () => {
    const result = isNullOrEmpty("");
    assert.equal(result, true);
  });
  it("white space", () => {
    const result = isNullOrEmpty("    ");
    assert.equal(result, true);
  });
  it("non empty", () => {
    const result = isNullOrEmpty("{}");
    assert.equal(result, false);
  });
});

describe("test fetchStartTime", () => {
  it("startTime is beginning", () => {
    const startTime = fetchStartTime(ChangeFeedStartFrom.Beginning());
    assert.equal(startTime, undefined);
  });
  it("startTime is time", () => {
    const time = new Date();
    const startTime = fetchStartTime(ChangeFeedStartFrom.Time(time));
    assert.equal(startTime, time);
  });
});

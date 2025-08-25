// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FeedRangeQueue } from "$internal/client/ChangeFeed/FeedRangeQueue.js";
import { ChangeFeedRange } from "$internal/client/ChangeFeed/ChangeFeedRange.js";
import { describe, it, assert } from "vitest";

const feedRanges = [
  {
    minInclusive: "",
    maxExclusive: "05C1C5AB55AB50",
    continuation: "10",
  },
  {
    minInclusive: "05C1C5AB55AB50",
    maxExclusive: "05C1D5AB55AB50",
    continuation: "20",
  },
  {
    minInclusive: "05C1D5AB55AB50",
    maxExclusive: "05C1DFFFFFFFF8",
    continuation: "30",
  },
];
describe("test feedRangeQueue", () => {
  const feedRangeQueue = new FeedRangeQueue();
  it("enqueue element", () => {
    assert.equal(feedRangeQueue.isEmpty(), true);
    const newChangeFeedRange = new ChangeFeedRange(
      feedRanges[0].minInclusive,
      feedRanges[0].maxExclusive,
      feedRanges[0].continuation,
    );
    feedRangeQueue.enqueue(newChangeFeedRange);
    assert.equal(feedRangeQueue.isEmpty(), false);
    assert.equal(feedRangeQueue.peek(), newChangeFeedRange);
  });

  it("dequeue element", () => {
    assert.equal(feedRangeQueue.isEmpty(), false);
    feedRangeQueue.dequeue();
    assert.equal(feedRangeQueue.isEmpty(), true);
  });

  it("move first element to the end", () => {
    const firstElement = new ChangeFeedRange(
      feedRanges[0].minInclusive,
      feedRanges[0].maxExclusive,
      feedRanges[0].continuation,
    );
    const secondElement = new ChangeFeedRange(
      feedRanges[0].minInclusive,
      feedRanges[0].maxExclusive,
      feedRanges[0].continuation,
    );
    const thirdElement = new ChangeFeedRange(
      feedRanges[0].minInclusive,
      feedRanges[0].maxExclusive,
      feedRanges[0].continuation,
    );

    feedRangeQueue.enqueue(firstElement);
    feedRangeQueue.enqueue(secondElement);
    feedRangeQueue.enqueue(thirdElement);

    assert.equal(feedRangeQueue.peek(), firstElement);
    feedRangeQueue.moveFirstElementToTheEnd();
    assert.equal(feedRangeQueue.peek(), secondElement);
    feedRangeQueue.moveFirstElementToTheEnd();
    assert.equal(feedRangeQueue.peek(), thirdElement);
    feedRangeQueue.moveFirstElementToTheEnd();
    assert.equal(feedRangeQueue.peek(), firstElement);
  });

  it("modify first element", () => {
    const newFirstElement = new ChangeFeedRange(
      feedRanges[0].minInclusive,
      feedRanges[0].maxExclusive,
      "'100'",
    );
    feedRangeQueue.modifyFirstElement(newFirstElement);
    assert.equal(feedRangeQueue.peek(), newFirstElement);
  });

  it("return snapshot", () => {
    const snapshot = feedRangeQueue.returnSnapshot();
    assert.equal(snapshot.length, 3);
  });
});

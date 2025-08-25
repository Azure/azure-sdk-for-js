// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChangeFeedRetentionTimeSpan } from "$internal/client/ChangeFeed/ChangeFeedRetentionTimeSpan.js";
import { describe, it, assert } from "vitest";

describe("test ChangeFeedRetentionTimeSpan", () => {
  it("timeSpan should be positive number", async () => {
    try {
      ChangeFeedRetentionTimeSpan.fromMinutes(-5);
      assert.fail("should throw exception");
    } catch (err) {
      assert.equal(err.message, "ChangeFeedRetentionTimeSpan must be a positive number.");
    }
  });

  it("timeSpan granularity should be minutes", async () => {
    try {
      ChangeFeedRetentionTimeSpan.fromMinutes(5.5);
      assert.fail("should throw exception");
    } catch (err) {
      assert.equal(err.message, "Retention's granularity is minutes.");
    }
  });

  it("timeSpan should work correctly", async () => {
    const timeSpan = ChangeFeedRetentionTimeSpan.fromMinutes(5);
    assert.equal(timeSpan.getRetentionInMinutes(), 5);
  });
});

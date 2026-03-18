// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { ContentRange } from "../../../src/index.js";

describe("ContentRange", () => {
  describe("constructor", () => {
    it("should create from a raw string", () => {
      const range = new ContentRange("1-3,5,9-");
      assert.equal(range.toString(), "1-3,5,9-");
    });

    it("should throw on empty string", () => {
      assert.throws(() => new ContentRange(""), /must not be null, undefined, or empty/);
    });

    it("should throw on undefined", () => {
      assert.throws(
        () => new ContentRange(undefined as unknown as string),
        /must not be null, undefined, or empty/,
      );
    });
  });

  describe("page", () => {
    it("should create a single page range", () => {
      assert.equal(ContentRange.page(1).toString(), "1");
      assert.equal(ContentRange.page(5).toString(), "5");
      assert.equal(ContentRange.page(100).toString(), "100");
    });

    it("should throw for page number < 1", () => {
      assert.throws(() => ContentRange.page(0), /must be >= 1/);
      assert.throws(() => ContentRange.page(-1), /must be >= 1/);
    });
  });

  describe("pages", () => {
    it("should create a page range", () => {
      assert.equal(ContentRange.pages(1, 3).toString(), "1-3");
      assert.equal(ContentRange.pages(2, 5).toString(), "2-5");
    });

    it("should allow same start and end", () => {
      assert.equal(ContentRange.pages(3, 3).toString(), "3-3");
    });

    it("should throw for start < 1", () => {
      assert.throws(() => ContentRange.pages(0, 3), /Start page must be >= 1/);
    });

    it("should throw for end < start", () => {
      assert.throws(() => ContentRange.pages(5, 2), /End page must be >= start page/);
    });
  });

  describe("pagesFrom", () => {
    it("should create an open-ended page range", () => {
      assert.equal(ContentRange.pagesFrom(1).toString(), "1-");
      assert.equal(ContentRange.pagesFrom(9).toString(), "9-");
    });

    it("should throw for startPage < 1", () => {
      assert.throws(() => ContentRange.pagesFrom(0), /must be >= 1/);
    });
  });

  describe("timeRange", () => {
    it("should create a time range in milliseconds", () => {
      assert.equal(ContentRange.timeRange(0, 5000).toString(), "0-5000");
      assert.equal(ContentRange.timeRange(1200, 3651).toString(), "1200-3651");
      assert.equal(ContentRange.timeRange(2000, 8000).toString(), "2000-8000");
    });

    it("should allow same start and end", () => {
      assert.equal(ContentRange.timeRange(5000, 5000).toString(), "5000-5000");
    });

    it("should throw for negative start", () => {
      assert.throws(() => ContentRange.timeRange(-1, 5000), /Start time must be >= 0/);
    });

    it("should throw for end < start", () => {
      assert.throws(() => ContentRange.timeRange(5000, 1000), /End time must be >= start time/);
    });

    it("should throw for non-integer startMs", () => {
      assert.throws(() => ContentRange.timeRange(1.5, 5000), /integer number of milliseconds/);
    });

    it("should throw for non-integer endMs", () => {
      assert.throws(() => ContentRange.timeRange(0, 5000.7), /integer number of milliseconds/);
    });

    it("should throw for NaN", () => {
      assert.throws(() => ContentRange.timeRange(NaN, 5000), /integer number of milliseconds/);
    });
  });

  describe("timeRangeFrom", () => {
    it("should create an open-ended time range", () => {
      assert.equal(ContentRange.timeRangeFrom(0).toString(), "0-");
      assert.equal(ContentRange.timeRangeFrom(5000).toString(), "5000-");
      assert.equal(ContentRange.timeRangeFrom(10000).toString(), "10000-");
    });

    it("should throw for negative start", () => {
      assert.throws(() => ContentRange.timeRangeFrom(-1), /Start time must be >= 0/);
    });

    it("should throw for non-integer startMs", () => {
      assert.throws(() => ContentRange.timeRangeFrom(1.5), /integer number of milliseconds/);
    });
  });

  describe("combine", () => {
    it("should combine page ranges", () => {
      const combined = ContentRange.combine(
        ContentRange.pages(1, 3),
        ContentRange.page(5),
        ContentRange.pagesFrom(9),
      );
      assert.equal(combined.toString(), "1-3,5,9-");
    });

    it("should combine time ranges", () => {
      const combined = ContentRange.combine(
        ContentRange.timeRange(0, 3000),
        ContentRange.timeRangeFrom(30000),
      );
      assert.equal(combined.toString(), "0-3000,30000-");
    });

    it("should handle single range", () => {
      const combined = ContentRange.combine(ContentRange.page(1));
      assert.equal(combined.toString(), "1");
    });

    it("should throw for no ranges", () => {
      assert.throws(() => ContentRange.combine(), /At least one range must be provided/);
    });
  });

  describe("toString", () => {
    it("should return the wire format string", () => {
      assert.equal(String(ContentRange.page(1)), "1");
      assert.equal(String(ContentRange.timeRange(0, 5000)), "0-5000");
      assert.equal(String(new ContentRange("custom-range")), "custom-range");
    });
  });

  describe("integration with AnalysisInput", () => {
    it("ContentRange should be usable as string in template literals", () => {
      const range = ContentRange.pages(1, 3);
      assert.equal(`range=${range}`, "range=1-3");
    });

    it("String() conversion should work", () => {
      const range = ContentRange.timeRangeFrom(5000);
      assert.equal(String(range), "5000-");
    });
  });
});

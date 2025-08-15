// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach } from "vitest";
import { RateLimitedSampler } from "../../src/sampling/rateLimitedSampler.js";
import { SamplingDecision } from "@opentelemetry/sdk-trace-base";
import { context, SpanKind } from "@opentelemetry/api";

describe("RateLimitedSampler", () => {
  let sampler: RateLimitedSampler;

  describe("constructor", () => {
    it("throws if requestsPerSecond is negative", () => {
      assert.throws(() => new RateLimitedSampler(-1), /nonnegative/);
    });
    it("constructs with valid requestsPerSecond", () => {
      sampler = new RateLimitedSampler(5);
      assert.instanceOf(sampler, RateLimitedSampler);
    });
  });

  describe("getSampleRate", () => {
    it("returns 100 for high requestsPerSecond after adaptation", async () => {
      sampler = new RateLimitedSampler(10000);
      // Wait a bit to allow the sampler to adapt
      await new Promise((resolve) => setTimeout(resolve, 20));
      let rate = sampler.getSampleRate();
      // Call again to ensure state is updated with elapsed time
      await new Promise((resolve) => setTimeout(resolve, 20));
      rate = sampler.getSampleRate();
      assert.equal(rate, 100, `Expected sample rate to be 100 after adaptation, got ${rate}`);
    });
    it("returns 0 for 0 requestsPerSecond", () => {
      sampler = new RateLimitedSampler(0);
      const rate = sampler.getSampleRate();
      assert.equal(rate, 0);
    });
    it("returns a value between 0 and 100", () => {
      sampler = new RateLimitedSampler(1);
      const rate = sampler.getSampleRate();
      assert.ok(rate >= 0 && rate <= 100);
    });
    it("returns ~0 for very small requestsPerSecond", () => {
      sampler = new RateLimitedSampler(0.00001);
      const rate = sampler.getSampleRate();
      assert.ok(
        rate <= 1,
        `Expected sample rate to be very low for very small requestsPerSecond, got ${rate}`,
      );
    });
    it("returns 100 for very large requestsPerSecond after adaptation", async () => {
      sampler = new RateLimitedSampler(1e9);
      await new Promise((resolve) => setTimeout(resolve, 20));
      let rate = sampler.getSampleRate();
      await new Promise((resolve) => setTimeout(resolve, 20));
      rate = sampler.getSampleRate();
      assert.equal(
        rate,
        100,
        `Expected sample rate to be 100 for very large requestsPerSecond, got ${rate}`,
      );
    });
  });

  describe("shouldSample", () => {
    beforeEach(() => {
      sampler = new RateLimitedSampler(1);
    });
    it("returns RECORD_AND_SAMPLED when sampleRate is 100", () => {
      sampler = new RateLimitedSampler(10000);
      const result = sampler.shouldSample(
        context.active(),
        "traceid",
        "span",
        SpanKind.INTERNAL,
        {},
        [],
      );
      assert.equal(result.decision, SamplingDecision.RECORD_AND_SAMPLED);
    });
    it("returns NOT_RECORD when sampleRate is 0", () => {
      sampler = new RateLimitedSampler(0);
      const result = sampler.shouldSample(
        context.active(),
        "traceid",
        "span",
        SpanKind.INTERNAL,
        {},
        [],
      );
      assert.equal(result.decision, SamplingDecision.NOT_RECORD);
    });
    it("adds AzureMonitorSampleRate attribute when sampleRate != 100", () => {
      sampler = new RateLimitedSampler(1); // Should be <100
      const attrs: Record<string, any> = {};
      const result = sampler.shouldSample(
        context.active(),
        "traceid",
        "span",
        SpanKind.INTERNAL,
        attrs,
        [],
      );
      assert.isDefined((result.attributes as any)["microsoft.sample_rate"]);
      assert.isBelow((result.attributes as any)["microsoft.sample_rate"], 100);
    });
  });

  describe("toString", () => {
    it("returns a string with the requestsPerSecond", () => {
      sampler = new RateLimitedSampler(42);
      assert.match(sampler.toString(), /42/);
    });
  });
});

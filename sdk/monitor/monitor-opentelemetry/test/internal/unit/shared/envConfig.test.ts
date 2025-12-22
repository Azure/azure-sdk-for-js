// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EnvConfig } from "../../../../src/shared/envConfig.js";
import {
  AlwaysOffSampler,
  AlwaysOnSampler,
  ParentBasedSampler,
  TraceIdRatioBasedSampler,
} from "@opentelemetry/sdk-trace-base";
import { afterAll, afterEach, assert, beforeEach, describe, it, vi } from "vitest";

describe("Env Config", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    (EnvConfig["instance"] as any) = undefined;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  afterAll(() => {
    (EnvConfig["instance"] as any) = undefined;
  });

  describe("configuration values", () => {
    it("Sampling ratio", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "microsoft.fixed_percentage";
      env["OTEL_TRACES_SAMPLER_ARG"] = "0.5";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.deepStrictEqual(config.samplingRatio, 0.5, "Wrong samplingRatio");
      assert.deepStrictEqual(config.tracesPerSecond, undefined, "Wrong tracesPerSecond");
      assert.deepStrictEqual(config.sampler, undefined, "Wrong sampler");
    });

    it("Traces per second", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "microsoft.rate_limited";
      env["OTEL_TRACES_SAMPLER_ARG"] = "5";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.deepStrictEqual(config.samplingRatio, undefined, "Wrong samplingRatio");
      assert.deepStrictEqual(config.tracesPerSecond, 5, "Wrong tracesPerSecond");
      assert.deepStrictEqual(config.sampler, undefined, "Wrong sampler");
    });

    it("Invalid sampler", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "invalid_sampler";
      env["OTEL_TRACES_SAMPLER_ARG"] = "5";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.deepStrictEqual(config.samplingRatio, undefined, "Wrong samplingRatio");
      assert.deepStrictEqual(config.tracesPerSecond, undefined, "Wrong tracesPerSecond");
      assert.deepStrictEqual(config.sampler, undefined, "Wrong sampler");
    });

    it("traceidratio sampler", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "traceidratio";
      env["OTEL_TRACES_SAMPLER_ARG"] = "0.25";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.deepStrictEqual(config.tracesPerSecond, undefined, "Wrong tracesPerSecond");
      assert.deepStrictEqual(config.samplingRatio, 0.25, "Wrong samplingRatio");
      assert.ok(config.sampler instanceof TraceIdRatioBasedSampler, "Wrong sampler instance");
    });

    it("parentbased sampler", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "parentbased_always_on";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.deepStrictEqual(config.tracesPerSecond, undefined, "Wrong tracesPerSecond");
      assert.deepStrictEqual(config.samplingRatio, 1, "Wrong samplingRatio");
      assert.ok(config.sampler instanceof ParentBasedSampler, "Wrong sampler instance");
    });

    it("always_on sampler", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "always_on";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.ok(config.sampler instanceof AlwaysOnSampler, "Wrong sampler instance");
      assert.deepStrictEqual(config.samplingRatio, 1, "Wrong samplingRatio");
    });

    it("always_off sampler", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "always_off";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.ok(config.sampler instanceof AlwaysOffSampler, "Wrong sampler instance");
      assert.deepStrictEqual(config.samplingRatio, 0, "Wrong samplingRatio");
    });

    it("parentbased traceidratio defaults to 1 when arg missing", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "parentbased_traceidratio";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.ok(config.sampler instanceof ParentBasedSampler, "Wrong sampler instance");
      assert.deepStrictEqual(config.samplingRatio, 1, "Wrong samplingRatio");
    });

    it("traceidratio invalid arg falls back to 1", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "traceidratio";
      env["OTEL_TRACES_SAMPLER_ARG"] = "1.5";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.ok(config.sampler instanceof TraceIdRatioBasedSampler, "Wrong sampler instance");
      assert.deepStrictEqual(config.samplingRatio, 1, "Wrong samplingRatio");
    });
  });
});

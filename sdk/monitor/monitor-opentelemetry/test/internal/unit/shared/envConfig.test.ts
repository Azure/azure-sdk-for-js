// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EnvConfig } from "../../../../src/shared/envConfig.js";
import {
  AlwaysOffSampler,
  AlwaysOnSampler,
  ParentBasedSampler,
  TraceIdRatioBasedSampler,
} from "@opentelemetry/sdk-trace-base";
import { Logger } from "../../../../src/shared/logging/index.js";
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

    it("microsoft.rate_limited without arg keeps defaults and does not warn", () => {
      const warnSpy = vi.spyOn(Logger.getInstance(), "warn");
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "microsoft.rate_limited";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.deepStrictEqual(config.tracesPerSecond, undefined, "Wrong tracesPerSecond");
      assert.deepStrictEqual(config.samplingRatio, undefined, "Wrong samplingRatio");
      assert.deepStrictEqual(config.sampler, undefined, "Wrong sampler");
      assert.strictEqual(warnSpy.mock.calls.length, 0);
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

    it("trace_id_ratio sampler", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "trace_id_ratio";
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

    it("parentbased trace_id_ratio defaults to 1 when arg missing", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "parentbased_trace_id_ratio";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.ok(config.sampler instanceof ParentBasedSampler, "Wrong sampler instance");
      assert.deepStrictEqual(config.samplingRatio, 1, "Wrong samplingRatio");
    });

    it("trace_id_ratio invalid arg falls back to 1", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "trace_id_ratio";
      env["OTEL_TRACES_SAMPLER_ARG"] = "1.5";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.ok(config.sampler instanceof TraceIdRatioBasedSampler, "Wrong sampler instance");
      assert.deepStrictEqual(config.samplingRatio, 1, "Wrong samplingRatio");
    });

    it("trace_id_ratio empty arg logs warning and falls back to 1", () => {
      const warnSpy = vi.spyOn(Logger.getInstance(), "warn");
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "trace_id_ratio";
      env["OTEL_TRACES_SAMPLER_ARG"] = "";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.ok(config.sampler instanceof TraceIdRatioBasedSampler, "Wrong sampler instance");
      assert.deepStrictEqual(config.samplingRatio, 1, "Wrong samplingRatio");
      assert.strictEqual(warnSpy.mock.calls.length, 1);
      assert.strictEqual(
        warnSpy.mock.calls[0][0],
        "Invalid value for OTEL_TRACES_SAMPLER_ARG. It should be a number in the range [0,1].",
      );
    });

    it("trims sampler arg before parsing", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "trace_id_ratio";
      env["OTEL_TRACES_SAMPLER_ARG"] = " 0.5 ";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.ok(config.sampler instanceof TraceIdRatioBasedSampler, "Wrong sampler instance");
      assert.deepStrictEqual(config.samplingRatio, 0.5, "Wrong samplingRatio");
    });

    it("trace_id_ratio negative arg falls back to 1", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "trace_id_ratio";
      env["OTEL_TRACES_SAMPLER_ARG"] = "-0.5";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.ok(config.sampler instanceof TraceIdRatioBasedSampler, "Wrong sampler instance");
      assert.deepStrictEqual(config.samplingRatio, 1, "Wrong samplingRatio");
    });

    it("microsoft.fixed_percentage accepts values (validation happens in sampler)", () => {
      const warnSpy = vi.spyOn(Logger.getInstance(), "warn");
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "microsoft.fixed_percentage";
      env["OTEL_TRACES_SAMPLER_ARG"] = "1.5";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.deepStrictEqual(config.samplingRatio, 1.5, "Wrong samplingRatio");
      assert.deepStrictEqual(config.tracesPerSecond, undefined, "Wrong tracesPerSecond");
      assert.deepStrictEqual(config.sampler, undefined, "Wrong sampler");
      assert.strictEqual(warnSpy.mock.calls.length, 0);
    });

    it("microsoft fixed samplers warn and ignore non-numeric args", () => {
      const warnSpy = vi.spyOn(Logger.getInstance(), "warn");
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "microsoft.fixed_percentage";
      env["OTEL_TRACES_SAMPLER_ARG"] = "abc";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.deepStrictEqual(config.samplingRatio, undefined, "Wrong samplingRatio");
      assert.deepStrictEqual(config.tracesPerSecond, undefined, "Wrong tracesPerSecond");
      assert.deepStrictEqual(config.sampler, undefined, "Wrong sampler");
      assert.strictEqual(warnSpy.mock.calls.length, 1);
      assert.strictEqual(
        warnSpy.mock.calls[0][0],
        "Invalid value for OTEL_TRACES_SAMPLER_ARG. It must be a number.",
      );
    });

    it("microsoft.fixed_percentage without arg keeps defaults and does not warn", () => {
      const warnSpy = vi.spyOn(Logger.getInstance(), "warn");
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "microsoft.fixed_percentage";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.deepStrictEqual(config.tracesPerSecond, undefined, "Wrong tracesPerSecond");
      assert.deepStrictEqual(config.samplingRatio, undefined, "Wrong samplingRatio");
      assert.deepStrictEqual(config.sampler, undefined, "Wrong sampler");
      assert.strictEqual(warnSpy.mock.calls.length, 0);
    });
  });
});

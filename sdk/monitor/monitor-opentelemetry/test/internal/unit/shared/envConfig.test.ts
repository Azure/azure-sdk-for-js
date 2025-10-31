// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EnvConfig } from "../../../../src/shared/envConfig.js";
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
    });

    it("Traces per second", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "microsoft.rate_limited";
      env["OTEL_TRACES_SAMPLER_ARG"] = "5";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.deepStrictEqual(config.samplingRatio, undefined, "Wrong samplingRatio");
      assert.deepStrictEqual(config.tracesPerSecond, 5, "Wrong tracesPerSecond");
    });

    it("Invalid sampler", () => {
      const env = <{ [id: string]: string }>{};
      env["OTEL_TRACES_SAMPLER"] = "invalid_sampler";
      env["OTEL_TRACES_SAMPLER_ARG"] = "5";
      process.env = env;
      const config = EnvConfig.getInstance();
      assert.deepStrictEqual(config.samplingRatio, undefined, "Wrong samplingRatio");
      assert.deepStrictEqual(config.tracesPerSecond, undefined, "Wrong tracesPerSecond");
    });
  });
});

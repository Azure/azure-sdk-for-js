// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import type { HttpInstrumentationConfig } from "@opentelemetry/instrumentation-http";
import type { Instrumentation } from "@opentelemetry/instrumentation";
import { afterEach, describe, expect, it, vi } from "vitest";
import { configureInstrumentation } from "../../../src/utils/instrumentation.js";
import { patchOpenTelemetryInstrumentationEnable } from "../../../src/utils/opentelemetryInstrumentationPatcher.js";
import { loadOpenTelemetryInstrumentation } from "../../../src/shared/module.js";
import { Logger } from "../../../src/shared/logging/index.js";
import { AZURE_MONITOR_STATSBEAT_FEATURES, StatsbeatInstrumentation } from "../../../src/types.js";

describe("configureInstrumentation", () => {
  const cache = new Map<string, Instrumentation>();

  afterEach(() => {
    for (const instrumentation of cache.values()) instrumentation.disable();
    cache.clear();
  });

  describe("instrumentation Statsbeat registration", () => {
    afterEach(() => {
      vi.unstubAllEnvs();
      vi.restoreAllMocks();
    });

    it("tracks SDK 3.x registrations without wrapping repeatedly or losing feature bits", () => {
      const instrumentation = {
        instrumentationName: "@opentelemetry/instrumentation-fs",
        instrumentationVersion: "1.0.0",
        enable: vi.fn(),
        disable: vi.fn(),
        getConfig: () => ({ enabled: false }),
        setConfig: vi.fn(),
        setTracerProvider: vi.fn(),
        setMeterProvider: vi.fn(),
        setLoggerProvider: vi.fn(),
      } satisfies Instrumentation;
      vi.stubEnv(
        AZURE_MONITOR_STATSBEAT_FEATURES,
        JSON.stringify({
          instrumentation: StatsbeatInstrumentation.AMQPLIB,
          feature: 8,
        }),
      );
      patchOpenTelemetryInstrumentationEnable();
      const module = loadOpenTelemetryInstrumentation();
      const register = module.registerInstrumentations;
      patchOpenTelemetryInstrumentationEnable();
      expect(module.registerInstrumentations).toBe(register);
      const disable = register({ instrumentations: [[instrumentation]] });
      expect(instrumentation.enable).toHaveBeenCalledOnce();
      expect(instrumentation.setTracerProvider).toHaveBeenCalledOnce();
      expect(JSON.parse(process.env[AZURE_MONITOR_STATSBEAT_FEATURES]!)).toEqual({
        instrumentation: StatsbeatInstrumentation.AMQPLIB + StatsbeatInstrumentation.FS,
        feature: 8,
      });
      disable();
      expect(instrumentation.disable).toHaveBeenCalledOnce();
    });

    it("warns about malformed Statsbeat state without blocking registration", () => {
      vi.stubEnv(AZURE_MONITOR_STATSBEAT_FEATURES, "invalid JSON");
      const warn = vi.spyOn(Logger.getInstance(), "warn").mockImplementation(() => {});
      patchOpenTelemetryInstrumentationEnable();
      const disable = loadOpenTelemetryInstrumentation().registerInstrumentations({
        instrumentations: [],
      });
      expect(warn).toHaveBeenCalledWith(
        "Failed to parse the statsbeat environment variable",
        expect.any(SyntaxError),
      );
      expect(() => disable()).not.toThrow();
    });
  });

  it("defers activation until providers are registered without mutating caller options", () => {
    const options = Object.freeze({ enabled: true, ignoreIncomingPaths: ["/health"] });
    const create = vi.fn((config: HttpInstrumentationConfig) => new HttpInstrumentation(config));
    const instrumentation = configureInstrumentation(cache, "http", options, create);
    expect(create).toHaveBeenCalledOnce();
    expect(instrumentation.getConfig()).toMatchObject({ ...options, enabled: false });
    expect((instrumentation as HttpInstrumentation).isEnabled()).toBe(false);
    expect(options.enabled).toBe(true);
    expect(cache.get("http")).toBe(instrumentation);
  });

  it("replaces removed hooks and settings rather than merging stale configuration", () => {
    const hook = vi.fn();
    const create = vi.fn((config: HttpInstrumentationConfig) => new HttpInstrumentation(config));
    const initial = configureInstrumentation(
      cache,
      "http",
      { enabled: true, requestHook: hook },
      create,
    );
    initial.enable();
    initial.disable();
    const next = configureInstrumentation(cache, "http", { enabled: true }, create);
    expect(next).toBe(initial);
    expect(create).toHaveBeenCalledOnce();
    expect(next.getConfig()).not.toHaveProperty("requestHook");
    expect(next.getConfig().enabled).toBe(false);
  });

  it("does not share instances between different instrumentation keys", () => {
    const create = (config: HttpInstrumentationConfig): HttpInstrumentation =>
      new HttpInstrumentation(config);
    const first = configureInstrumentation(cache, "first", {}, create);
    const second = configureInstrumentation(cache, "second", {}, create);
    expect(first).not.toBe(second);
    expect(cache.size).toBe(2);
  });

  it("preserves standalone handler behavior when no cache is provided", () => {
    const create = vi.fn((config: HttpInstrumentationConfig) => new HttpInstrumentation(config));
    const instrumentation = configureInstrumentation(undefined, "http", { enabled: true }, create);
    try {
      expect(create).toHaveBeenCalledWith({ enabled: true });
      expect((instrumentation as HttpInstrumentation).isEnabled()).toBe(true);
    } finally {
      instrumentation.disable();
    }
  });

  it("propagates construction failures without caching a partial instance", () => {
    const error = new Error("cannot initialize instrumentation");
    expect(() =>
      configureInstrumentation(cache, "http", {}, () => {
        throw error;
      }),
    ).toThrow(error);
    expect(cache.has("http")).toBe(false);
    const instrumentation = configureInstrumentation(
      cache,
      "http",
      {},
      (config) => new HttpInstrumentation(config),
    );
    expect(cache.get("http")).toBe(instrumentation);
  });
});

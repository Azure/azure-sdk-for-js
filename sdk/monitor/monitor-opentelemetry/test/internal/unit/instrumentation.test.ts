// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import type { HttpInstrumentationConfig } from "@opentelemetry/instrumentation-http";
import { InstrumentationBase, registerInstrumentations } from "@opentelemetry/instrumentation";
import type {
  Instrumentation,
  InstrumentationNodeModuleDefinition,
} from "@opentelemetry/instrumentation";
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
    const commonJsModule = loadOpenTelemetryInstrumentation();
    const moduleForms = [
      { name: "ESM", Base: InstrumentationBase, register: registerInstrumentations },
      {
        name: "CommonJS",
        Base: commonJsModule.InstrumentationBase,
        register: commonJsModule.registerInstrumentations,
      },
    ];

    function createInstrumentation(
      Base: typeof InstrumentationBase = InstrumentationBase,
      enabled = false,
    ): Instrumentation {
      class TestInstrumentation extends Base {
        protected init(): InstrumentationNodeModuleDefinition[] {
          return [];
        }
      }
      return new TestInstrumentation("@opentelemetry/instrumentation-fs", "1.0.0", { enabled });
    }

    afterEach(() => {
      vi.unstubAllEnvs();
      vi.restoreAllMocks();
    });

    it.each(moduleForms)(
      "tracks $name registration functions captured before initialization",
      ({ Base, register }) => {
        const instrumentation = createInstrumentation(Base);
        const enable = vi.spyOn(instrumentation, "enable");
        const disable = vi.spyOn(instrumentation, "disable");
        vi.stubEnv(
          AZURE_MONITOR_STATSBEAT_FEATURES,
          JSON.stringify({
            instrumentation: StatsbeatInstrumentation.AMQPLIB,
            feature: 8,
          }),
        );
        patchOpenTelemetryInstrumentationEnable();
        const setTracerProvider = vi.spyOn(instrumentation, "setTracerProvider");
        patchOpenTelemetryInstrumentationEnable();
        const unregister = register({ instrumentations: [[instrumentation]] });
        try {
          expect(enable).toHaveBeenCalledOnce();
          expect(setTracerProvider).toHaveBeenCalledOnce();
          expect(JSON.parse(process.env[AZURE_MONITOR_STATSBEAT_FEATURES]!)).toEqual({
            instrumentation: StatsbeatInstrumentation.AMQPLIB + StatsbeatInstrumentation.FS,
            feature: 8,
          });
        } finally {
          unregister();
        }
        expect(disable).toHaveBeenCalledOnce();
      },
    );

    it("tracks already enabled instrumentations when their providers are registered", () => {
      vi.stubEnv(AZURE_MONITOR_STATSBEAT_FEATURES, undefined);
      const instrumentation = createInstrumentation(InstrumentationBase, true);
      const enable = vi.spyOn(instrumentation, "enable");
      patchOpenTelemetryInstrumentationEnable();
      const unregister = registerInstrumentations({ instrumentations: [instrumentation] });
      try {
        expect(enable).not.toHaveBeenCalled();
        expect(JSON.parse(process.env[AZURE_MONITOR_STATSBEAT_FEATURES]!)).toEqual({
          instrumentation: StatsbeatInstrumentation.FS,
          feature: 0,
        });
      } finally {
        unregister();
      }
    });

    it("does not track disabled instrumentations that are never registered", () => {
      vi.stubEnv(AZURE_MONITOR_STATSBEAT_FEATURES, undefined);
      patchOpenTelemetryInstrumentationEnable();
      createInstrumentation();
      expect(process.env[AZURE_MONITOR_STATSBEAT_FEATURES]).toBeUndefined();
    });

    it("warns about malformed Statsbeat state without blocking registration", () => {
      vi.stubEnv(AZURE_MONITOR_STATSBEAT_FEATURES, "invalid JSON");
      const warn = vi.spyOn(Logger.getInstance(), "warn").mockImplementation(() => {});
      patchOpenTelemetryInstrumentationEnable();
      const disable = registerInstrumentations({
        instrumentations: [createInstrumentation()],
      });
      expect(warn).toHaveBeenCalledWith(
        "Failed to parse the statsbeat environment variable",
        expect.any(SyntaxError),
      );
      expect(warn).toHaveBeenCalledOnce();
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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import type { HttpInstrumentationConfig } from "@opentelemetry/instrumentation-http";
import type { Instrumentation } from "@opentelemetry/instrumentation";
import { afterEach, describe, expect, it, vi } from "vitest";
import { configureInstrumentation } from "../../../src/utils/instrumentation.js";

describe("configureInstrumentation", () => {
  const cache = new Map<string, Instrumentation>();

  afterEach(() => {
    for (const instrumentation of cache.values()) instrumentation.disable();
    cache.clear();
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

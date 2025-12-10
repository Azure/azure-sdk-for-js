// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as nodeModule from "node:module";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// We need to dynamically import the module to reset state between tests
async function importFreshModule() {
  // Clear the module from cache to reset the loaderRegistrationAttempted flag
  vi.resetModules();
  return import("../../../../src/utils/instrumentationLoader.js");
}

describe("instrumentationLoader", () => {
  const supportsModuleRegister =
    typeof (nodeModule as { register?: unknown }).register === "function";

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("registerInstrumentationLoader", () => {
    it("should not throw when module.register is not available", async () => {
      // Mock module.register as undefined
      vi.doMock("node:module", () => ({
        register: undefined,
      }));

      const { registerInstrumentationLoader } = await importFreshModule();

      expect(() => registerInstrumentationLoader()).not.toThrow();
    });

    it("should only attempt registration once", async () => {
      const mockRegister = vi.fn();
      vi.doMock("node:module", () => ({
        register: mockRegister,
      }));

      const { registerInstrumentationLoader } = await importFreshModule();

      registerInstrumentationLoader();
      registerInstrumentationLoader();
      registerInstrumentationLoader();

      // Should only be called once due to loaderRegistrationAttempted flag
      expect(mockRegister).toHaveBeenCalledTimes(1);
    });

    it("should call module.register with correct specifier", async () => {
      const mockRegister = vi.fn();
      vi.doMock("node:module", () => ({
        register: mockRegister,
      }));

      const { registerInstrumentationLoader } = await importFreshModule();

      registerInstrumentationLoader();

      expect(mockRegister).toHaveBeenCalledWith(
        "@opentelemetry/instrumentation/hook.mjs",
        expect.any(String),
      );
    });

    it("should handle errors gracefully when module.register throws", async () => {
      const mockRegister = vi.fn().mockImplementation(() => {
        throw new Error("Test error");
      });
      vi.doMock("node:module", () => ({
        register: mockRegister,
      }));

      const { registerInstrumentationLoader } = await importFreshModule();

      // Should not throw
      expect(() => registerInstrumentationLoader()).not.toThrow();
    });

    it("should handle promise rejection from module.register", async () => {
      const mockCatch = vi.fn();
      const mockRegister = vi.fn().mockReturnValue({
        catch: mockCatch,
      });
      vi.doMock("node:module", () => ({
        register: mockRegister,
      }));

      const { registerInstrumentationLoader } = await importFreshModule();

      registerInstrumentationLoader();

      expect(mockCatch).toHaveBeenCalled();
    });

    // Only run this test if module.register is available
    const integrationTestFn = supportsModuleRegister ? it : it.skip;

    integrationTestFn(
      "should successfully register with real module.register",
      async () => {
        const { registerInstrumentationLoader } = await importFreshModule();

        // This should not throw - it will attempt to register the OTel loader
        expect(() => registerInstrumentationLoader()).not.toThrow();
      },
    );
  });
});

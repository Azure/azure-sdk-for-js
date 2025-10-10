// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @azure/azure-sdk/ts-naming-options */

import { describe, it, assert, expect, beforeEach, afterEach, vi } from "vitest";
import { traced, traceable } from "../src/decorators.js";
import { createTracingClient } from "../src/tracingClient.js";
import {
  createDefaultInstrumenter,
  createDefaultTracingSpan,
  useInstrumenter,
} from "../src/instrumenter.js";
import { createTracingContext } from "../src/tracingContext.js";
import type {
  Instrumenter,
  TracingClient,
  TracingContext,
  TracingSpan,
  OperationTracingOptions,
} from "../src/interfaces.js";

interface TestOperationOptions {
  tracingOptions?: OperationTracingOptions;
  [key: string]: unknown;
}

describe("decorators", () => {
  let instrumenter: Instrumenter;
  let span: TracingSpan;
  let context: TracingContext;
  let tracingClient: TracingClient;

  beforeEach(() => {
    instrumenter = createDefaultInstrumenter();
    span = createDefaultTracingSpan();
    context = createTracingContext();

    useInstrumenter(instrumenter);
    tracingClient = createTracingClient({
      namespace: "Microsoft.Test",
      packageName: "test-package",
      packageVersion: "1.0.0",
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("@traced decorator", () => {
    it("wraps method with tracing", async () => {
      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced()
        async testMethod(_options: TestOperationOptions = {}): Promise<number> {
          return 42;
        }
      }

      const client = new TestClient(tracingClient);
      const result = await client.testMethod();
      assert.equal(result, 42);
    });

    it("uses default span name with class and method name", async () => {
      instrumenter.startSpan = () => ({ span, tracingContext: context });
      const setAttributeSpy = vi.spyOn(span, "setAttribute");

      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced()
        async myOperation(_options: TestOperationOptions = {}): Promise<void> {}
      }

      const client = new TestClient(tracingClient);
      await client.myOperation({ tracingOptions: {} });

      expect(setAttributeSpy).toHaveBeenCalledWith("az.namespace", "Microsoft.Test");
    });

    it("uses custom span name when provided", async () => {
      const withSpanSpy = vi.spyOn(tracingClient, "withSpan");

      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced({ spanName: "CustomSpanName" })
        async testMethod(_options: TestOperationOptions = {}): Promise<void> {}
      }

      const client = new TestClient(tracingClient);
      await client.testMethod({ tracingOptions: {} });

      expect(withSpanSpy).toHaveBeenCalledWith(
        "CustomSpanName",
        expect.anything(),
        expect.anything(),
        undefined,
      );
    });

    it("passes span options to tracing client", async () => {
      const withSpanSpy = vi.spyOn(tracingClient, "withSpan");
      const spanOptions = {
        spanKind: "client" as const,
        spanAttributes: { "test.attr": "value" },
      };

      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced({ spanOptions })
        async testMethod(_options: TestOperationOptions = {}): Promise<void> {}
      }

      const client = new TestClient(tracingClient);
      await client.testMethod({ tracingOptions: {} });

      expect(withSpanSpy).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        spanOptions,
      );
    });

    it("handles methods with multiple parameters", async () => {
      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced()
        async testMethod(
          param1: string,
          param2: number,
          _options: TestOperationOptions = {},
        ): Promise<string> {
          return `${param1}-${param2}`;
        }
      }

      const client = new TestClient(tracingClient);
      const result = await client.testMethod("test", 123, { tracingOptions: {} });
      assert.equal(result, "test-123");
    });

    it("uses custom optionsIndex when provided", async () => {
      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced({ optionsIndex: 0 })
        async testMethod(_options: TestOperationOptions = {}, param: string): Promise<string> {
          return param;
        }
      }

      const client = new TestClient(tracingClient);
      const result = await client.testMethod({ tracingOptions: {} }, "value");
      assert.equal(result, "value");
    });

    it("sets success status on successful operation", async () => {
      instrumenter.startSpan = () => ({ span, tracingContext: context });
      const setStatusSpy = vi.spyOn(span, "setStatus");

      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced()
        async testMethod(_options: TestOperationOptions = {}): Promise<number> {
          return 42;
        }
      }

      const client = new TestClient(tracingClient);
      await client.testMethod({ tracingOptions: {} });

      expect(setStatusSpy).toHaveBeenCalledWith({ status: "success" });
    });

    it("sets error status on failed operation", async () => {
      instrumenter.startSpan = () => ({ span, tracingContext: context });
      const setStatusSpy = vi.spyOn(span, "setStatus");
      const testError = new Error("test error");

      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced()
        async testMethod(_options: TestOperationOptions = {}): Promise<void> {
          throw testError;
        }
      }

      const client = new TestClient(tracingClient);
      let errorThrown = false;

      try {
        await client.testMethod({ tracingOptions: {} });
      } catch (err) {
        errorThrown = true;
        expect(setStatusSpy).toHaveBeenCalledWith({ status: "error", error: testError });
      }

      assert.isTrue(errorThrown);
    });

    it("ends the span after method completes", async () => {
      instrumenter.startSpan = () => ({ span, tracingContext: context });
      const endSpy = vi.spyOn(span, "end");

      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced()
        async testMethod(_options: TestOperationOptions = {}): Promise<void> {}
      }

      const client = new TestClient(tracingClient);
      await client.testMethod({ tracingOptions: {} });

      expect(endSpy).toHaveBeenCalledOnce();
    });

    it("throws error if tracingClient is not present", async () => {
      class TestClient {
        @traced()
        async testMethod(_options: TestOperationOptions = {}): Promise<void> {}
      }

      const client = new TestClient();
      let errorThrown = false;

      try {
        await client.testMethod();
      } catch (err: any) {
        errorThrown = true;
        assert.include(err.message, "tracingClient");
      }

      assert.isTrue(errorThrown);
    });

    it("calls original method if options parameter is not an object", async () => {
      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced()
        async testMethod(_options?: any): Promise<string> {
          return "called";
        }
      }

      const client = new TestClient(tracingClient);
      const result = await client.testMethod(undefined);
      assert.equal(result, "called");
    });

    it("works with synchronous methods", async () => {
      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced()
        testMethod(_options: TestOperationOptions = {}): number {
          return 42;
        }
      }

      const client = new TestClient(tracingClient);
      const result = await client.testMethod();
      assert.equal(result, 42);
    });

    it("preserves additional properties in options", async () => {
      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced()
        async testMethod(options: TestOperationOptions = {}): Promise<unknown> {
          return options.customProp;
        }
      }

      const client = new TestClient(tracingClient);
      const result = await client.testMethod({ tracingOptions: {}, customProp: "customValue" });
      assert.equal(result, "customValue");
    });
  });

  describe("@traceable decorator", () => {
    it("does not modify class behavior", () => {
      @traceable
      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        getValue(): string {
          return "test";
        }
      }

      const client = new TestClient(tracingClient);
      assert.equal(client.getValue(), "test");
    });

    it("works with @traced decorator", async () => {
      @traceable
      class TestClient {
        tracingClient: TracingClient;

        constructor(client: TracingClient) {
          this.tracingClient = client;
        }

        @traced()
        async testMethod(_options: TestOperationOptions = {}): Promise<number> {
          return 42;
        }
      }

      const client = new TestClient(tracingClient);
      const result = await client.testMethod({ tracingOptions: {} });
      assert.equal(result, 42);
    });
  });
});

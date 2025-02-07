// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTracingClient, TracingClient, useInstrumenter } from "@azure/core-tracing";
import { MockTracingSpan, MockInstrumenter } from "../../src/index.js";
import chai, { assert, expect } from "chai";
import { chaiAzure } from "../../src/chaiAzure.js";
import { MockContext } from "../../src/tracing/mockContext.js";
import { OperationTracingOptions } from "@azure/core-tracing";
chai.use(chaiAzure);

describe("TestInstrumenter", () => {
  let instrumenter: MockInstrumenter;

  beforeEach(() => {
    instrumenter = new MockInstrumenter();
  });

  describe("#startSpan", () => {
    it("starts a span and adds to startedSpans array", () => {
      const { span } = instrumenter.startSpan("testSpan");
      assert.equal(instrumenter.startedSpans.length, 1);
      assert.equal(instrumenter.startedSpans[0], span as MockTracingSpan);
      assert.equal(instrumenter.startedSpans[0].name, "testSpan");
    });

    it("returns a new context with existing attributes", () => {
      const existingContext = new MockContext().setValue(Symbol.for("foo"), "bar");

      const { tracingContext: newContext } = instrumenter.startSpan("testSpan", {
        packageName: "test",
        tracingContext: existingContext,
      });

      assert.equal(newContext.getValue(Symbol.for("foo")), "bar");
    });
  });

  describe("#withContext", () => {
    it("sets the active context in synchronous functions", async () => {
      const { tracingContext } = instrumenter.startSpan("contextTest");
      // TODO: figure out how to be smarter about not wrapping sync functions in promise...
      const result = await instrumenter.withContext(tracingContext, () => {
        assert.equal(instrumenter.currentContext(), tracingContext);
        return 42;
      });

      assert.equal(result, 42);
      assert.notEqual(instrumenter.currentContext(), tracingContext);
    });

    it("sets the active context during async functions", async () => {
      const { tracingContext } = instrumenter.startSpan("contextTest");
      const result = await instrumenter.withContext(tracingContext, async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        assert.equal(instrumenter.currentContext(), tracingContext);
        return 42;
      });
      assert.equal(result, 42);
      assert.notEqual(instrumenter.currentContext(), tracingContext);
    });

    it("resets the previous context after the function returns", async () => {
      const existingContext = instrumenter.currentContext();
      const { tracingContext } = instrumenter.startSpan("test");
      await instrumenter.withContext(tracingContext, async () => {
        // no-op
      });
      assert.equal(instrumenter.currentContext(), existingContext);
    });
  });
});

describe("TestInstrumenter with MockClient", () => {
  let instrumenter: MockInstrumenter;
  let client: MockClientToTest;

  beforeEach(() => {
    instrumenter = new MockInstrumenter();
    useInstrumenter(instrumenter);
    client = new MockClientToTest();
  });

  it("starts a span and adds to startedSpans array", async () => {
    await client.method();
    assert.equal(instrumenter.startedSpans.length, 1);
    assert.equal(instrumenter.startedSpans[0].name, "MockClientToTest.method");
  });
});

describe("Test supportsTracing plugin functionality", () => {
  let client: MockClientToTest;
  beforeEach(() => {
    client = new MockClientToTest();
  });

  it("supportsTracing with assert", async () => {
    await assert.supportsTracing((options) => client.method(options), ["MockClientToTest.method"]);
  });

  it("supportsTracing with expect", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect((options: any) => client.method(options)).to.supportTracing([
      "MockClientToTest.method",
    ]);
  });
});

/**
 * Represent a convenience client that has enabled tracing on a single method.
 * Used for testing assertions.
 */
export class MockClientToTest {
  public record: Record<string, string>;
  tracingClient: TracingClient;

  constructor() {
    this.record = {};
    this.tracingClient = createTracingClient({
      namespace: "Microsoft.Test",
      packageName: "@azure/test",
      packageVersion: "foobar",
    });
  }

  async method<Options extends { tracingOptions?: OperationTracingOptions }>(options?: Options) {
    return this.tracingClient.withSpan("MockClientToTest.method", options || {}, () => 42, {
      spanKind: "consumer",
    });
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient, TracingClient, useInstrumenter } from "@azure/core-tracing";
import { MockTracingSpan, MockInstrumenter } from "../../src";
import chai, { assert, expect } from "chai";
import { chaiAzure } from "../../src/chaiAzure";
import { MockContext } from "../../src/tracing/mockContext";
import { OperationTracingOptions } from "@azure/core-tracing";
chai.use(chaiAzure);

describe("TestInstrumenter", function () {
  let instrumenter: MockInstrumenter;

  beforeEach(function () {
    instrumenter = new MockInstrumenter();
  });

  describe("#startSpan", function () {
    it("starts a span and adds to startedSpans array", function () {
      const { span } = instrumenter.startSpan("testSpan");
      assert.equal(instrumenter.startedSpans.length, 1);
      assert.equal(instrumenter.startedSpans[0], span as MockTracingSpan);
      assert.equal(instrumenter.startedSpans[0].name, "testSpan");
    });

    it("returns a new context with existing attributes", function () {
      const existingContext = new MockContext().setValue(Symbol.for("foo"), "bar");

      const { tracingContext: newContext } = instrumenter.startSpan("testSpan", {
        packageName: "test",
        tracingContext: existingContext,
      });

      assert.equal(newContext.getValue(Symbol.for("foo")), "bar");
    });
  });

  describe("#withContext", function () {
    it("sets the active context in synchronous functions", async function () {
      const { tracingContext } = instrumenter.startSpan("contextTest");
      // TODO: figure out how to be smarter about not wrapping sync functions in promise...
      const result = await instrumenter.withContext(tracingContext, function () {
        assert.equal(instrumenter.currentContext(), tracingContext);
        return 42;
      });

      assert.equal(result, 42);
      assert.notEqual(instrumenter.currentContext(), tracingContext);
    });

    it("sets the active context during async functions", async function () {
      const { tracingContext } = instrumenter.startSpan("contextTest");
      const result = await instrumenter.withContext(tracingContext, async function () {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        assert.equal(instrumenter.currentContext(), tracingContext);
        return 42;
      });
      assert.equal(result, 42);
      assert.notEqual(instrumenter.currentContext(), tracingContext);
    });

    it("resets the previous context after the function returns", async function () {
      const existingContext = instrumenter.currentContext();
      const { tracingContext } = instrumenter.startSpan("test");
      await instrumenter.withContext(tracingContext, async function () {
        // no-op
      });
      assert.equal(instrumenter.currentContext(), existingContext);
    });
  });
});

describe("TestInstrumenter with MockClient", function () {
  let instrumenter: MockInstrumenter;
  let client: MockClientToTest;

  beforeEach(function () {
    instrumenter = new MockInstrumenter();
    useInstrumenter(instrumenter);
    client = new MockClientToTest();
  });

  it("starts a span and adds to startedSpans array", async function () {
    await client.method();
    assert.equal(instrumenter.startedSpans.length, 1);
    assert.equal(instrumenter.startedSpans[0].name, "MockClientToTest.method");
  });
});

describe("Test supportsTracing plugin functionality", function () {
  let client: MockClientToTest;
  beforeEach(function () {
    client = new MockClientToTest();
  });

  it("supportsTracing with assert", async function () {
    await assert.supportsTracing((options) => client.method(options), ["MockClientToTest.method"]);
  });

  it("supportsTracing with expect", async function () {
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

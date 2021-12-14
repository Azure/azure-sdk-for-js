// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Pretend this is a real client with real methods - like QueryLogsClient

import {
  createTracingClient,
  TracingClient,
  TracingSpanOptions,
  useInstrumenter
} from "@azure/core-tracing";
import { TestTracingSpan, TestInstrumenter } from "../../src";
import chai, { assert, expect } from "chai";
import { chaiAzureTrace } from "./azureTracing";
import { ContextImpl } from "../../src/tracing/contextImpl";
chai.use(chaiAzureTrace);
describe("TestTracingSpan", function() {
  let subject: TestTracingSpan;
  beforeEach(() => {
    subject = new TestTracingSpan("test");
  });

  it("records status correctly", function() {
    subject.setStatus({ status: "success" });
    assert.deepEqual(subject.spanStatus, { status: "success" });
  });
  it("records attributes correctly", async function() {
    subject.setAttribute("attribute1", "value1");
    subject.setAttribute("attribute2", "value2");
    assert.equal(subject.attributes["attribute1"], "value1");
    assert.equal(subject.attributes["attribute2"], "value2");
  });
  it("records calls to `end` correctly", function() {
    assert.equal(subject.endCalled, false);
    subject.end();
    assert.equal(subject.endCalled, true);
  });
  it("records exceptions", function() {
    const expectedException = new Error("foo");
    subject.recordException(expectedException);
    assert.strictEqual(subject.exception, expectedException);
  });
  // TODO: we don't have a way to set the span context?
  it("allows setting spanContext?", function() {});
});

// do the same for all methods in testInstrumenter...
describe("TestInstrumenter", function() {
  let instrumenter: TestInstrumenter;
  beforeEach(function() {
    instrumenter = new TestInstrumenter();
  });
  describe("#startSpan", function() {
    it("starts a span and adds to startedSpans array", function() {
      const { span } = instrumenter.startSpan("testSpan");
      assert.equal(instrumenter.startedSpans.length, 1);
      assert.equal(instrumenter.startedSpans[0], span as TestTracingSpan);
      assert.equal(instrumenter.startedSpans[0].name, "testSpan");
    });
    it("returns a new context with existing attributes", function() {
      const existingContext = new ContextImpl().setValue(Symbol.for("foo"), "bar");

      const { tracingContext: newContext } = instrumenter.startSpan("testSpan", {
        packageInformation: {
          name: "test"
        },
        tracingContext: existingContext
      });

      assert.equal(newContext.getValue(Symbol.for("foo")), "bar");
    });
  });
  describe("#withContext", function() {
    it("sets the active context in synchronous functions", async function() {
      const { tracingContext } = instrumenter.startSpan("contextTest");
      // TODO: figure out how to be smarter about not wrapping sync functions in promise...
      const result = await instrumenter.withContext(tracingContext, function() {
        assert.equal(instrumenter.currentContext(), tracingContext);
        return 42;
      });

      assert.equal(result, 42);
      assert.notEqual(instrumenter.currentContext(), tracingContext);
    });
    it("sets the active context during async functions", async function() {
      const { tracingContext } = instrumenter.startSpan("contextTest");
      const result = await instrumenter.withContext(tracingContext, async function() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        assert.equal(instrumenter.currentContext(), tracingContext);
        return 42;
      });
      assert.equal(result, 42);
      assert.notEqual(instrumenter.currentContext(), tracingContext);
    });
    it("resets the previous context after the function returns", async function() {
      const existingContext = instrumenter.currentContext();
      const { tracingContext } = instrumenter.startSpan("test");
      await instrumenter.withContext(tracingContext, async function() {
        // no-op
      });
      assert.equal(instrumenter.currentContext(), existingContext);
    });
  });
});

describe("TestInstrumenter with MockClient", function() {
  let instrumenter: TestInstrumenter;
  let client: MockClientToTest;
  beforeEach(function() {
    instrumenter = new TestInstrumenter();
    useInstrumenter(instrumenter);
    client = new MockClientToTest();
  });
  it("starts a span and adds to startedSpans array", async function() {
    await client.mockGetMethod();
    assert.equal(instrumenter.startedSpans.length, 1);
    assert.equal(instrumenter.startedSpans[0].name, "MockClientToTest.mockGetMethod");
  });
});

describe("Test supportsTracing functionality", function() {
  let client: MockClientToTest;
  beforeEach(function() {
    client = new MockClientToTest();
  });
  it("supportsTracing with the setMethod", function() {
    // const existingContext = new ContextImpl().setValue(Symbol.for("foo"), "bar");
    // const options = {
    //   tracingOptions: {
    //     tracingContext: existingContext
    //   }
    // };

    assert.supportsTracing((options) => client.mockSetMethod({ key: "value" }, options), [
      "MockClientToTest.mockSetMethod"
    ]);
    expect((options: any) => client.mockSetMethod({ key: "value" }, options)).to.supportsTracing([
      "MockClientToTest.mockSetMethod"
    ]);
  });
});
// or something that has upgraded to core-tracing preview.14
export class MockClientToTest {
  private record: Record<string, string>;
  tracingClient: TracingClient;

  constructor() {
    this.record = {};
    this.tracingClient = createTracingClient({
      namespace: "Microsoft.Test",
      packageInformation: {
        name: "@azure/test",
        version: "foobar"
      }
    });
  }
  // const myOperationResult = await withSpan("myClassName.myOperationName", (updatedOptions) => myOperation(updatedOptions), options);
  async mockSetMethod(record: any, options?: any) {
    // TODO: how to pass in span options or tracing options??
    // TODO: isn't the 2nd argument supposed to be the options for the callback??

    return this.tracingClient.withSpan(
      "MockClientToTest.mockSetMethod",
      options,
      (updatedOptions, span) => {
        console.log("---Inside Wth span----");
        console.log(JSON.stringify(updatedOptions.tracingOptions.tracingContext, null, 2));
        console.log(span);
        console.log("---Exiting With Span ---");
        this.record = record;
      },
      {
        spanKind: "consumer"
      }
    );
  }

  async mockGetMethod(options?: any, spanOptions?: TracingSpanOptions) {
    return this.tracingClient.withSpan(
      "MockClientToTest.mockGetMethod",
      options,
      () => {
        return this.record;
      },
      spanOptions
    );
  }
}

// assert.supportsTracing()...

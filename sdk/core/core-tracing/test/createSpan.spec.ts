// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Context,
  SpanKind,
  getSpanContext,
  context as otContext,
  setSpan
} from "../src/interfaces";
import { createSpanFunction, isTracingDisabled, knownSpanAttributes } from "../src/createSpan";
import { OperationTracingOptions } from "../src/interfaces";
import { TestSpan } from "./util/testSpan";
import { TestTracerProvider } from "./util/testTracerProvider";
import { assert } from "chai";

describe("createSpan", () => {
  let createSpan: ReturnType<typeof createSpanFunction>;
  let tracerProvider: TestTracerProvider;

  beforeEach(() => {
    tracerProvider = new TestTracerProvider();
    tracerProvider.register();
    createSpan = createSpanFunction({ namespace: "Microsoft.Test", packagePrefix: "Azure.Test" });
  });

  afterEach(() => {
    tracerProvider.disable();
  });

  it("is backwards compatible at runtime with versions prior to preview.13", () => {
    const testSpan = tracerProvider.getTracer("test").startSpan("test");
    const someContext = setSpan(otContext.active(), testSpan);

    // Ensure we are backwards compatible with { tracingOptions: { spanOptions } } shape which was
    // used prior to preview.13 for setting span options.
    const options = {
      tracingOptions: {
        tracingContext: someContext,
        spanOptions: {
          kind: SpanKind.CLIENT,
          attributes: {
            foo: "bar"
          }
        }
      }
    };

    const expectedSpanOptions = {
      kind: SpanKind.CLIENT,
      attributes: {
        foo: "bar",
        "az.namespace": "Microsoft.Test"
      }
    };

    const { span, updatedOptions } = <{ span: TestSpan; updatedOptions: any }>(
      createSpan("testMethod", options)
    );
    assert.deepEqual(updatedOptions.tracingOptions.spanOptions, expectedSpanOptions);
    assert.equal(span.kind, SpanKind.CLIENT);
    assert.equal(span.attributes.foo, "bar");

    assert.equal(
      updatedOptions.tracingOptions.tracingContext.getValue(
        knownSpanAttributes.AZ_NAMESPACE.contextKey
      ),
      "Microsoft.Test"
    );
  });

  it("returns a created span with the right metadata", () => {
    const testSpan = tracerProvider.getTracer("test").startSpan("testing");

    const someContext = setSpan(otContext.active(), testSpan);

    const { span, updatedOptions } = <{ span: TestSpan; updatedOptions: any }>createSpan(
      "testMethod",
      {
        // validate that we dumbly just copy any fields (this makes future upgrades easier)
        someOtherField: "someOtherFieldValue",
        tracingOptions: {
          // validate that we dumbly just copy any fields (this makes future upgrades easier)
          someOtherField: "someOtherFieldValue",
          tracingContext: someContext
        }
      },
      { kind: SpanKind.SERVER }
    );
    assert.strictEqual(span.name, "Azure.Test.testMethod");
    assert.equal(span.attributes["az.namespace"], "Microsoft.Test");

    assert.equal(updatedOptions.someOtherField, "someOtherFieldValue");
    assert.equal(updatedOptions.tracingOptions.someOtherField, "someOtherFieldValue");

    assert.equal(span.kind, SpanKind.SERVER);
    assert.equal(
      updatedOptions.tracingOptions.tracingContext.getValue(Symbol.for("az.namespace")),
      "Microsoft.Test"
    );
  });

  it("preserves existing attributes", () => {
    const testSpan = tracerProvider.getTracer("test").startSpan("testing");

    const someContext = setSpan(otContext.active(), testSpan).setValue(
      Symbol.for("someOtherKey"),
      "someOtherValue"
    );

    const { span, updatedOptions } = <{ span: TestSpan; updatedOptions: any }>(
      createSpan("testMethod", {
        someTopLevelField: "someTopLevelFieldValue",
        tracingOptions: {
          someOtherTracingField: "someOtherTracingValue",
          tracingContext: someContext
        }
      })
    );
    assert.strictEqual(span.name, "Azure.Test.testMethod");
    assert.equal(span.attributes["az.namespace"], "Microsoft.Test");

    assert.equal(
      updatedOptions.tracingOptions.tracingContext.getValue(Symbol.for("someOtherKey")),
      "someOtherValue"
    );
    assert.equal(updatedOptions.someTopLevelField, "someTopLevelFieldValue");
    assert.equal(updatedOptions.tracingOptions.someOtherTracingField, "someOtherTracingValue");
  });

  it("namespace and packagePrefix can be empty (and thus ignored)", () => {
    const cf = createSpanFunction({
      namespace: "",
      packagePrefix: ""
    });

    const { span, updatedOptions } = cf("myVerbatimOperationName", {} as any, {
      attributes: {
        testAttribute: "testValue"
      }
    });

    assert.equal(
      (span as TestSpan).name,
      "myVerbatimOperationName",
      "Expected name to not change because there is no packagePrefix."
    );
    assert.notExists(
      (span as TestSpan).attributes["az.namespace"],
      "Expected az.namespace not to be set because there is no namespace"
    );

    assert.notExists(
      updatedOptions.tracingOptions.tracingContext?.getValue(Symbol.for("az.namespace"))
    );
  });

  it("createSpans, testing parent/child relationship", () => {
    const createSpanFn = createSpanFunction({
      namespace: "Microsoft.Test",
      packagePrefix: "Azure.Test"
    });

    let parentContext: Context;

    // create the parent span and do some basic checks.
    {
      const op: { tracingOptions: OperationTracingOptions } = {
        tracingOptions: {}
      };

      const { span, updatedOptions } = createSpanFn("parent", op);
      assert.ok(span);

      parentContext = updatedOptions.tracingOptions!.tracingContext!;

      assert.ok(parentContext);
      assert.notDeepEqual(parentContext, otContext.active(), "new child context should be created");
      assert.equal(
        getSpanContext(parentContext!)?.spanId,
        span.spanContext().spanId,
        "context returned in the updated options should point to our newly created span"
      );
    }

    const { span: childSpan, updatedOptions } = createSpanFn("child", {
      tracingOptions: {
        tracingContext: parentContext
      }
    });
    assert.ok(childSpan);

    assert.ok(updatedOptions.tracingOptions.tracingContext);
    assert.equal(
      getSpanContext(updatedOptions.tracingOptions.tracingContext!)?.spanId,
      childSpan.spanContext().spanId
    );
  });

  it("is robust when no options are passed in", () => {
    const { span, updatedOptions } = <{ span: TestSpan; updatedOptions: any }>createSpan("foo");
    assert.exists(span);
    assert.exists(updatedOptions);
    assert.exists(updatedOptions.tracingOptions.spanOptions);
    assert.exists(updatedOptions.tracingOptions.tracingContext);
  });

  it("returns a no-op tracer if AZURE_TRACING_DISABLED is set", function(this: Mocha.Context) {
    if (typeof process === "undefined") {
      this.skip();
    }
    process.env.AZURE_TRACING_DISABLED = "true";

    const testSpan = tracerProvider.getTracer("test").startSpan("testing");

    const someContext = setSpan(otContext.active(), testSpan);

    const { span } = <{ span: TestSpan; updatedOptions: any }>createSpan("testMethod", {
      tracingOptions: ({
        // validate that we dumbly just copy any fields (this makes future upgrades easier)
        someOtherField: "someOtherFieldValue",
        tracingContext: someContext,
        spanOptions: {
          kind: SpanKind.SERVER
        }
      } as OperationTracingOptions) as any
    });
    assert.isFalse(span.isRecording());
    delete process.env.AZURE_TRACING_DISABLED;
  });

  describe("IsTracingDisabled", () => {
    beforeEach(function(this: Mocha.Context) {
      if (typeof process === "undefined") {
        this.skip();
      }
    });
    it("is false when env var is blank or missing", () => {
      process.env.AZURE_TRACING_DISABLED = "";
      assert.isFalse(isTracingDisabled());
      delete process.env.AZURE_TRACING_DISABLED;
      assert.isFalse(isTracingDisabled());
    });

    it("is false when env var is 'false'", () => {
      process.env.AZURE_TRACING_DISABLED = "false";
      assert.isFalse(isTracingDisabled());
      process.env.AZURE_TRACING_DISABLED = "False";
      assert.isFalse(isTracingDisabled());
      process.env.AZURE_TRACING_DISABLED = "FALSE";
      assert.isFalse(isTracingDisabled());
      delete process.env.AZURE_TRACING_DISABLED;
    });

    it("is false when env var is 0", () => {
      process.env.AZURE_TRACING_DISABLED = "0";
      assert.isFalse(isTracingDisabled());
      delete process.env.AZURE_TRACING_DISABLED;
    });

    it("is true otherwise", () => {
      process.env.AZURE_TRACING_DISABLED = "true";
      assert.isTrue(isTracingDisabled());
      process.env.AZURE_TRACING_DISABLED = "1";
      assert.isTrue(isTracingDisabled());
      delete process.env.AZURE_TRACING_DISABLED;
    });
  });
});

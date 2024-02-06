// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TracingContextImpl,
  createTracingContext,
  knownContextKeys,
} from "../../src/tracing/tracingContext";
import { assert } from "chai";
import { createDefaultTracingSpan } from "../../src/tracing/instrumenter";

describe("TracingContext", () => {
  describe("TracingContextImpl", () => {
    let context: TracingContextImpl;

    beforeEach(() => {
      context = new TracingContextImpl();
    });

    it("can be created from an existing context map", () => {
      const existingContext = createTracingContext()
        .setValue(Symbol.for("key1"), "value1")
        .setValue(Symbol.for("key2"), "value2");
      const newContext = new TracingContextImpl(existingContext);
      assert.equal(newContext.getValue(Symbol.for("key1")), "value1");
      assert.equal(newContext.getValue(Symbol.for("key2")), "value2");
    });

    describe("getValue and setValue", () => {
      it("returns new context with new value", () => {
        const newContext = context.setValue(Symbol.for("newKey"), "newVal");
        assert.equal(newContext.getValue(Symbol.for("newKey")), "newVal");
      });

      it("returns new context with all existing values", () => {
        const newContext = context
          .setValue(Symbol.for("newKey"), "newVal")
          .setValue(Symbol.for("someOtherKey"), "someOtherVal")
          .setValue(Symbol.for("lastKey"), "lastVal");

        // inherited context data should remain
        assert.equal(newContext.getValue(Symbol.for("newKey")), "newVal");
      });

      it("does not modify existing context", () => {
        context.setValue(Symbol.for("newKey"), "newVal");
        assert.notExists(context.getValue(Symbol.for("newKey")));
      });

      it("can fetch parent chain data", () => {
        const newContext = context
          .setValue(Symbol.for("ancestry"), "grandparent")
          .setValue(Symbol.for("ancestry"), "parent")
          .setValue(Symbol.for("self"), "self"); // use a different key for current context

        assert.equal(newContext.getValue(Symbol.for("ancestry")), "parent");
        assert.equal(newContext.getValue(Symbol.for("self")), "self");
      });
    });

    describe("#deleteValue", () => {
      it("returns new context without deleted value", () => {
        const newContext = context
          .setValue(Symbol.for("newKey"), "newVal")
          .deleteValue(Symbol.for("newKey"));
        assert.notExists(newContext.getValue(Symbol.for("newKey")));
      });

      it("does not modify existing context", () => {
        const newContext = context.setValue(Symbol.for("newKey"), "newVal");
        newContext.deleteValue(Symbol.for("newKey"));
        assert.equal(newContext.getValue(Symbol.for("newKey")), "newVal");
      });

      it("deletes parent chain data", () => {
        const newContext = context
          .setValue(Symbol.for("ancestry"), "grandparent")
          .setValue(Symbol.for("ancestry"), "parent")
          .setValue(Symbol.for("self"), "self");

        assert.isDefined(newContext.getValue(Symbol.for("ancestry")));
        assert.isDefined(newContext.getValue(Symbol.for("self")));

        const updatedContext = newContext
          .deleteValue(Symbol.for("ancestry"))
          .deleteValue(Symbol.for("self"));

        assert.isUndefined(updatedContext.getValue(Symbol.for("ancestry")));
        assert.isUndefined(updatedContext.getValue(Symbol.for("self")));
      });
    });
  });

  describe("#createTracingContext", () => {
    it("returns a new context", () => {
      const context = createTracingContext();
      assert.exists(context);
      assert.instanceOf(context, TracingContextImpl);
    });

    it("can add known attributes", () => {
      const span = createDefaultTracingSpan();
      const namespace = "test-namespace";
      const newContext = createTracingContext({
        span,
        namespace,
      });
      assert.strictEqual(newContext.getValue(knownContextKeys.namespace), namespace);
      assert.strictEqual(newContext.getValue(knownContextKeys.span), span);
    });

    it("can be initialized from an existing context", () => {
      const parentContext = createTracingContext().setValue(
        knownContextKeys.namespace,
        "test-namespace"
      );
      const newContext = createTracingContext({ parentContext: parentContext });
      assert.equal(newContext.getValue(knownContextKeys.namespace), "test-namespace");
    });
  });
});

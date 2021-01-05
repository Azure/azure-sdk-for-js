// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Spanner } from "../../src/internal/tracingHelpers";
import { RestError } from "@azure/core-http";
import { getTracer } from "@azure/core-tracing";
import { SpanKind, CanonicalCode } from "@opentelemetry/api";
import { SpanOptions } from "@azure/core-tracing";

import * as assert from "assert";

interface FakeOptions {
  name: string;
  spanOptions: SpanOptions;
}

describe("tracingHelpers", () => {
  it("addParentToOptions", () => {
    const fakeOptions: FakeOptions = {
      name: "fakeName",
      spanOptions: {
        attributes: {
          testAttribute: "testAttributeValue"
        }
      }
    };

    const parentSpan = getTracer().startSpan("test", {
      kind: SpanKind.PRODUCER
    });

    const newOptions = Spanner["addParentToOptions"](fakeOptions, parentSpan);

    assert.equal("fakeName", newOptions.name);
    assert.deepEqual(parentSpan.context(), newOptions.spanOptions.parent);
    assert.ok(newOptions.spanOptions.attributes, "Should have attributes set");
    if (newOptions.spanOptions.attributes) {
      assert.equal("Microsoft.AppConfiguration", newOptions.spanOptions.attributes["az.namespace"]);
      assert.equal("testAttributeValue", newOptions.spanOptions.attributes["testAttribute"]);
    }
  });

  it("getCanonicalCode", () => {
    assert.equal(
      CanonicalCode.PERMISSION_DENIED,
      Spanner.getCanonicalCode(new RestError("hello", "", 401))
    );
    assert.equal(
      CanonicalCode.NOT_FOUND,
      Spanner.getCanonicalCode(new RestError("hello", "", 404))
    );
    assert.equal(CanonicalCode.UNKNOWN, Spanner.getCanonicalCode(new RestError("hello", "", 409)));
    assert.equal(
      CanonicalCode.FAILED_PRECONDITION,
      Spanner.getCanonicalCode(new RestError("hello", "", 412))
    );
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MockTracingSpan } from "../../src/index.js";
import { assert } from "chai";

describe("TestTracingSpan", () => {
  let subject: MockTracingSpan;

  beforeEach(() => {
    subject = new MockTracingSpan("test", "traceId", "spanId");
  });

  it("records status correctly", () => {
    subject.setStatus({ status: "success" });
    assert.deepEqual(subject.spanStatus, { status: "success" });
  });

  it("records attributes correctly", async () => {
    subject.setAttribute("attribute1", "value1");
    subject.setAttribute("attribute2", "value2");
    assert.equal(subject.attributes["attribute1"], "value1");
    assert.equal(subject.attributes["attribute2"], "value2");
  });

  it("records calls to `end` correctly", () => {
    assert.equal(subject.endCalled, false);
    subject.end();
    assert.equal(subject.endCalled, true);
  });

  it("records exceptions", () => {
    const expectedException = new Error("foo");
    subject.recordException(expectedException);
    assert.strictEqual(subject.exception, expectedException);
  });
});

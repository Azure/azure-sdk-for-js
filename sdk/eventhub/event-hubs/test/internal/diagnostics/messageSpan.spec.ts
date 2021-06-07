// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { createMessageSpan } from "../../../src/diagnostics/tracing";
import { TestTracer, setTracer, getTracer } from "@azure/core-tracing";

const should = chai.should();
const assert = chai.assert;

describe("#createMessageSpan()", () => {
  const origTracer = getTracer();

  before(() => {
    setTracer(new TestTracer());
  });

  after(() => {
    setTracer(origTracer);
  });

  it("should create a span without a parent", () => {
    const { span } = createMessageSpan(
      {},
      {
        entityPath: "entity path",
        host: "host"
      }
    );

    should.exist(span);
    should.exist(span.context().spanId);
    should.exist(span.context().traceId);

    should.equal((span as any).name, "Azure.EventHubs.message");
    assert.deepStrictEqual((span as any).attributes, {
      "az.namespace": "Microsoft.EventHub",
      "message_bus.destination": "entity path",
      "peer.address": "host"
    });

    span.end();
  });
});

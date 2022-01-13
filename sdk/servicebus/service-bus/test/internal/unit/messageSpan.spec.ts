// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { createMessageSpan } from "../../../src/diagnostics/tracing";
import { setTracer } from "@azure/test-utils";

const should = chai.should();
const assert = chai.assert;

describe("#createMessageSpan()", () => {
  before(() => {
    setTracer();
  });

  it("should create a span without a parent", () => {
    const { span } = createMessageSpan({}, "entity path", "host address");

    should.exist(span);
    should.exist(span.spanContext().spanId);
    should.exist(span.spanContext().traceId);

    should.equal((span as any).name, "Azure.ServiceBus.message");
    assert.deepStrictEqual((span as any).attributes, {
      "az.namespace": "Microsoft.ServiceBus",
      "message_bus.destination": "entity path",
      "peer.address": "host address",
    });

    span.end();
  });
});

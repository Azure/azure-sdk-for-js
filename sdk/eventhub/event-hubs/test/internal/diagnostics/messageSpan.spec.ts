// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { createMessageSpan } from "../../../src/diagnostics/messageSpan";
import { TraceFlags, SpanContext } from "@opentelemetry/api";
import { TestTracer, setTracer, getTracer } from "@azure/core-tracing";
import { EventHubConnectionConfig } from "../../../src/eventhubConnectionConfig";

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

  const mockSpanContext: SpanContext = {
    traceId: "d4cda95b652f4a1592b449d5929fda1b",
    spanId: "6e0c63257de34c92",
    traceFlags: TraceFlags.SAMPLED
  };
  const mockEventHubConnectionConfig: Pick<EventHubConnectionConfig, "entityPath" | "host"> = {
    entityPath: "entity",
    host: "foo.example.com"
  };

  it("should create a span without a parent", () => {
    const span = createMessageSpan();

    should.exist(span);
    should.exist(span.context().spanId);
    should.exist(span.context().traceId);

    should.equal((span as any).name, "Azure.EventHubs.message");
    assert.deepStrictEqual((span as any).attributes, {
      "az.namespace": "Microsoft.EventHub"
    });

    span.end();
  });

  it("should create a span with a parent", () => {
    const span = createMessageSpan(mockSpanContext);

    should.exist(span);
    should.equal(span.context().traceId, mockSpanContext.traceId);
    should.exist(span.context().spanId);
    should.not.equal(span.context().spanId, mockSpanContext.spanId);

    should.equal((span as any).name, "Azure.EventHubs.message");
    assert.deepStrictEqual((span as any).attributes, {
      "az.namespace": "Microsoft.EventHub"
    });

    span.end();
  });

  it("should create a span with an eventHubConfig", () => {
    const span = createMessageSpan(mockSpanContext, mockEventHubConnectionConfig);

    should.exist(span);
    should.equal(span.context().traceId, mockSpanContext.traceId);
    should.exist(span.context().spanId);
    should.not.equal(span.context().spanId, mockSpanContext.spanId);

    should.equal((span as any).name, "Azure.EventHubs.message");
    assert.deepStrictEqual((span as any).attributes, {
      "az.namespace": "Microsoft.EventHub",
      "message_bus.destination": mockEventHubConnectionConfig.entityPath,
      "peer.address": mockEventHubConnectionConfig.host
    });

    span.end();
  });
});

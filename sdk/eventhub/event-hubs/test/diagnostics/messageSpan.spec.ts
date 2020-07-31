// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { createMessageSpan } from "../../src/diagnostics/messageSpan";
import { TraceFlags, SpanContext } from "@opentelemetry/api";
import { EventHubConnectionConfig } from '@azure/core-amqp';

const should = chai.should();

describe("#createMessageSpan()", () => {
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
    should.not.exist(span.context().traceId);
    should.not.exist(span.context().spanId);

    should.equal((span as any).name, "Azure.EventHubs.message");
    should.equal((span as any).attributes, {
      "az.namespace": "Microsoft.EventHub"
    });
    should.equal((span as any).ended, false);

    span.end();
    should.equal((span as any).ended, true);
  });

  it("should create a span with a parent", () => {
    const span = createMessageSpan(mockSpanContext);

    should.exist(span);
    should.equal(span.context(), mockSpanContext);

    should.equal((span as any).name, "Azure.EventHubs.message");
    should.equal((span as any).attributes, {
      "az.namespace": "Microsoft.EventHub"
    });
    should.equal((span as any).ended, false);

    span.end();
    should.equal((span as any).ended, true);
  });

  it("should create a span with an eventHubConfig", () => {
    const span = createMessageSpan(mockSpanContext, mockEventHubConnectionConfig);

    should.exist(span);
    should.equal(span.context(), mockSpanContext);

    should.equal((span as any).name, "Azure.EventHubs.message");
    should.equal((span as any).attributes, {
      "az.namespace": "Microsoft.EventHub",
      "message_bus.destination": mockEventHubConnectionConfig.entityPath,
      "peer.address": mockEventHubConnectionConfig.host
    });
    should.equal((span as any).ended, false);

    span.end();
    should.equal((span as any).ended, true);
  });
});

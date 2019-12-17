// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { getStartingPosition, createSpanForReceivedEvents, trace } from "../src/partitionPump";
import { EventPosition } from "../src/eventPosition";
import { NoOpSpan } from "@azure/core-tracing";
import {
  Attributes,
  CanonicalCode,
  Status,
  SpanOptions,
  SpanContext,
  SpanKind
} from "@opentelemetry/types";
import chai from "chai";
import { ReceivedEventData } from "../src/eventData";
import { instrumentEventData } from "../src/diagnostics/instrumentEventData";

const should = chai.should();

describe("PartitionPump", () => {
  it("getStartingPosition", () => {
    // if they explicitly passed in an EventPosition then it trumps any user specified option
    getStartingPosition(EventPosition.earliest(), undefined).offset!.should.equal(-1);
    getStartingPosition(EventPosition.latest(), undefined).offset!.should.equal("@latest");

    // if no initial position was given when we started then we'll allow the user to override....
    getStartingPosition(undefined, EventPosition.fromOffset(100)).offset!.should.equal(100);

    // ...and if they don't override then we give them the default (currently it's EventPosition.earliest())
    getStartingPosition(undefined, undefined).offset!.should.equal(-1);
  });

  describe.only("telemetry", () => {
    const eventHubProperties = {
      endpoint: "theendpoint",
      eventHubName: "theeventhubname"
    };

    it("basic span properties are set", async () => {
      let name: string | undefined;
      let options: SpanOptions | undefined;
      const fakeParentSpan = new NoOpSpan();
      const createdSpan = new SlightlyLessNoOpSpan("myspan");

      const actualReturnedSpan = await createSpanForReceivedEvents(
        [],
        eventHubProperties,
        {
          tracingOptions: {
            spanOptions: {
              parent: fakeParentSpan
            }
          }
        },
        {
          startSpan: (nameArg, optionsArg) => {
            name = nameArg;
            options = optionsArg;
            return createdSpan;
          }
        }
      );

      should.equal(name, "Azure.EventHubs.process");

      should.exist(options);
      options!.kind!.should.equal(SpanKind.CONSUMER);
      options!.parent!.should.equal(fakeParentSpan);

      createdSpan.should.be.equal(actualReturnedSpan);
      createdSpan.attributes!.should.deep.equal({
        component: "eventhubs",
        "message_bus.destination": "theeventhubname",
        "peer.address": "theendpoint"
      });
    });

    it("received events are linked to this span using Diagnostic-Id", async () => {
      let options: SpanOptions | undefined;

      const requiredEventProperties = {
        body: "",
        enqueuedTimeUtc: new Date(),
        offset: 0,
        partitionKey: null,
        sequenceNumber: 0
      };

      const receivedEvents: ReceivedEventData[] = [
        instrumentEventData({ ...requiredEventProperties }, new SlightlyLessNoOpSpan("a")) as ReceivedEventData,
        { properties: {}, ...requiredEventProperties }, // no diagnostic ID means it gets skipped
        instrumentEventData({ ...requiredEventProperties }, new SlightlyLessNoOpSpan("c")) as ReceivedEventData
      ];

      await createSpanForReceivedEvents(
        receivedEvents,
        eventHubProperties,
        {},
        {
          startSpan: (_, optionsArg) => {
            options = optionsArg;
            return new NoOpSpan();
          }
        }
      );

      // middle event, since it has no trace information, doesn't get included
      // in the telemetry
      options!.links!.length.should.equal(3 - 1);
      options!.links![0]!.spanContext.traceId.should.equal(`afaketraceid`);
      options!.links![1]!.spanContext.traceId.should.equal(`cfaketraceid`);
    });

    it("trace - normal", async () => {
      const span = new SlightlyLessNoOpSpan("id");
      await trace(async () => {}, span);

      span.status!.code.should.equal(CanonicalCode.OK);
      span.endCalled.should.be.ok;
    });

    it("trace - throws", async () => {
      const span = new SlightlyLessNoOpSpan("id");

      await trace(async () => {
        throw new Error("error thrown from fn");
      }, span).should.be.rejectedWith(/error thrown from fn/);

      span.status!.code.should.equal(CanonicalCode.UNKNOWN);
      span.status!.message!.should.equal("error thrown from fn");
      span.endCalled.should.be.ok;
    });

    class SlightlyLessNoOpSpan extends NoOpSpan {
      public status: Status | undefined;
      public attributes: Attributes | undefined;
      public endCalled: boolean = false;

      constructor(private _id: string) {
        super();
      }

      context(): SpanContext {
        return {
          traceId: `${this._id}faketraceid`,
          spanId: `${this._id}fakespanid`
        };
      }

      setStatus(status: Status): this {
        if (this.status) {
          throw new Error("Status was already initialized");
        }

        this.status = status;
        return this;
      }

      setAttributes(attributes: Attributes): this {
        this.attributes = attributes;
        return this;
      }

      end() {
        this.endCalled = true;
      }
    }
  });
});

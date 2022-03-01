// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { testWithServiceTypes } from "../public/utils/testWithServiceTypes";
import { toProcessingSpanOptions } from "../../src/partitionPump";
import Sinon from "sinon";
import { tracingClient } from "../../src/diagnostics/tracing";
import { TracingContext } from "@azure/core-tracing";
import { TRACEPARENT_PROPERTY } from "../../src/diagnostics/instrumentEventData";

testWithServiceTypes(() => {
  describe("PartitionPump", () => {
    afterEach(() => {
      Sinon.restore();
    });
    describe("telemetry", () => {
      describe("#getProcessingSpanOptions", () => {
        it("returns basic span properties", () => {
          const processingSpanOptions = toProcessingSpanOptions([], {
            entityPath: "testPath",
            host: "testHost",
          });
          assert.equal(processingSpanOptions.spanKind, "consumer");
          assert.deepEqual(processingSpanOptions.spanAttributes, {
            "message_bus.destination": "testPath",
            "peer.address": "testHost",
          });
        });

        it("creates spanLinks correctly", () => {
          const enqueuedTimeUtc = new Date();
          const requiredEventProperties = {
            body: "",
            enqueuedTimeUtc,
            offset: 0,
            partitionKey: null,
            sequenceNumber: 0,
            properties: {
              [TRACEPARENT_PROPERTY]: "test",
            },
            getRawAmqpMessage() {
              return {} as any;
            },
          };
          const fakeContext = {} as TracingContext;
          Sinon.stub(tracingClient, "parseTraceparentHeader").returns(fakeContext);

          const processingSpanOptions = toProcessingSpanOptions([requiredEventProperties], {
            entityPath: "testPath",
            host: "testHost",
          });

          assert.lengthOf(processingSpanOptions.spanLinks!, 1);
          const spanLink = processingSpanOptions.spanLinks![0];
          assert.equal(spanLink.attributes!["enqueuedTime"], enqueuedTimeUtc.getTime());
          assert.equal(spanLink!.tracingContext, fakeContext);
        });
      });
    });
  });
});

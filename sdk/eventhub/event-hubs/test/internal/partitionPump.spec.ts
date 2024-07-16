// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { toProcessingSpanOptions } from "../../src/partitionPump.js";
import { tracingClient } from "../../src/diagnostics/tracing.js";
import { TracingContext } from "@azure/core-tracing";
import { TRACEPARENT_PROPERTY } from "../../src/diagnostics/instrumentEventData.js";
import { assert } from "../utils/chai.js";
import { describe, it, vi } from "vitest";

describe("telemetry", function () {
  describe("#getProcessingSpanOptions", function () {
    it("returns basic span properties", async function () {
      const processingSpanOptions = toProcessingSpanOptions([], {
        entityPath: "testPath",
        host: "testHost",
      });
      assert.equal(processingSpanOptions.spanKind, "consumer");
      assert.deepEqual(processingSpanOptions.spanAttributes, {
        "messaging.operation": "process",
        "messaging.source.name": "testPath",
        "messaging.system": "eventhubs",
        "net.peer.name": "testHost",
      });
    });

    it("creates spanLinks correctly", async function () {
      const enqueuedTimeUtc = new Date();
      const requiredEventProperties = {
        body: "",
        enqueuedTimeUtc,
        offset: "0",
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
      vi.spyOn(tracingClient, "parseTraceparentHeader").mockReturnValue(fakeContext);

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

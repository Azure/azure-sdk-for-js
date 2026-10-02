// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PartitionPump, toProcessingSpanOptions } from "../../src/partitionPump.js";
import { tracingClient } from "../../src/diagnostics/tracing.js";
import type { TracingContext } from "@azure/core-tracing";
import { TRACEPARENT_PROPERTY } from "../../src/diagnostics/instrumentEventData.js";
import type { CommonEventProcessorOptions } from "../../src/models/private.js";
import type { ConnectionContext } from "../../src/connectionContext.js";
import type { PartitionProcessor } from "../../src/partitionProcessor.js";
import { createReceiver } from "../../src/partitionReceiver.js";
import { assert } from "../utils/chai.js";
import { describe, it, vi, beforeEach } from "vitest";

vi.mock("../../src/partitionReceiver.js", () => ({
  createReceiver: vi.fn(() => ({}) as any),
}));

describe("telemetry", () => {
  describe("#getProcessingSpanOptions", () => {
    it("returns basic span properties", async () => {
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

    it("creates spanLinks correctly", async () => {
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

describe("PartitionPump", () => {
  beforeEach(() => {
    vi.mocked(createReceiver).mockClear();
  });

  function createPump(options: Partial<CommonEventProcessorOptions>): PartitionPump {
    const partitionProcessor = {
      consumerGroup: "$Default",
      eventProcessorId: "processor-id",
      partitionId: "0",
    } as PartitionProcessor;

    return new PartitionPump(
      {} as ConnectionContext,
      partitionProcessor,
      { sequenceNumber: 0, isInclusive: false },
      options as CommonEventProcessorOptions,
    );
  }

  it("passes skipConvertingDate through to the receiver", async () => {
    const pump = createPump({ skipConvertingDate: true });

    // `_setOrReplaceReceiver` is private, and it holds the explicit field copy under test.
    (pump as any)["_setOrReplaceReceiver"]("0", -1);

    assert.isTrue(vi.mocked(createReceiver).mock.calls.length === 1);
    const receiverOptions = vi.mocked(createReceiver).mock.calls[0][5];
    assert.isTrue(receiverOptions!.skipConvertingDate);
  });

  it("leaves skipConvertingDate undefined when the option is not set", async () => {
    const pump = createPump({});

    (pump as any)["_setOrReplaceReceiver"]("0", -1);

    const receiverOptions = vi.mocked(createReceiver).mock.calls[0][5];
    assert.isUndefined(receiverOptions!.skipConvertingDate);
  });
});

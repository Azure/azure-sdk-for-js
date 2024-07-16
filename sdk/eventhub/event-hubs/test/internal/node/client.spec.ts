// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { EventHubConsumerClient, EventHubProducerClient } from "../../../src/index.js";
import { tracingClient } from "../../../src/diagnostics/tracing.js";
import { assert } from "@azure-tools/test-utils";
import { describe, it, afterEach, vi, expect } from "vitest";
import { createConsumer } from "../../utils/clients.js";

describe("Create clients using Azure Identity (Internal)", function (): void {
  let client: EventHubConsumerClient | EventHubProducerClient;

  afterEach(async () => {
    await client.close();
  });

  // TODO: Waiting on https://github.com/Azure/azure-sdk-for-js/issues/29287
  // The supportsTracing assertion from chaiAzure can be used to verify that
  // the `getEventHubProperties` method is being traced correctly, that the
  // tracing span is properly parented and closed.
  it.skip("getEventHubProperties() creates a span with a peer.address attribute as the FQDN", async function () {
    const { consumer, fqdn, eventhubName } = createConsumer();
    client = consumer;
    assert.equal(client.fullyQualifiedNamespace, fqdn);
    assert.equal(client.eventHubName, eventhubName);

    const withSpanStub = vi.spyOn(tracingClient, "withSpan");

    // Ensure tracing is implemented correctly
    await assert.supportsTracing(
      (options) => client.getEventHubProperties(options),
      ["ManagementClient.getEventHubProperties"],
    );

    // Additional validation that we created the correct initial span options
    const expectedSpanOptions = {
      spanAttributes: {
        "messaging.destination.name": client.eventHubName,
        "messaging.system": "eventhubs",
        "net.peer.name": client.fullyQualifiedNamespace,
      },
    };

    expect(withSpanStub).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expectedSpanOptions,
    );
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai, { assert } from "chai";

import { EventHubConsumerClient } from "../../../src/eventHubConsumerClient";
import Sinon from "sinon";
import { TokenCredential } from "@azure/core-auth";
import { createMockServer } from "../../public/utils/mockService";
import { getEnvVars } from "../../public/utils/testUtils";
import { testWithServiceTypes } from "../../public/utils/testWithServiceTypes";
import { tracingClient } from "../../../src/diagnostics/tracing";

const should = chai.should();

testWithServiceTypes((serviceVersion) => {
  const env = getEnvVars();
  if (serviceVersion === "mock") {
    let service: ReturnType<typeof createMockServer>;

    before("Starting mock service", () => {
      service = createMockServer();
      return service.start();
    });

    after("Stopping mock service", async () => {
      await service?.stop();
    });

    let endpoint: string;
    let credential: TokenCredential;
    let client: EventHubConsumerClient;

    afterEach(async () => {
      // The client must always be closed, or MockHub will hang on shutdown.
      await client?.close();
    });

    describe("tracing", () => {
      it("getEventHubProperties() creates a span with a peer.address attribute as the FQNS", async () => {
        client = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          endpoint,
          env.EVENTHUB_NAME,
          credential
        );
        should.equal(client.fullyQualifiedNamespace, endpoint);

        const withSpanStub = Sinon.spy(tracingClient, "withSpan");

        // Ensure tracing is implemented correctly
        await assert.supportsTracing(
          (options) => client.getEventHubProperties(options),
          ["ManagementClient.getEventHubProperties"]
        );

        // Additional validation that we created the correct initial span options
        const expectedSpanOptions = {
          spanAttributes: {
            "peer.address": client.fullyQualifiedNamespace,
            "message_bus.destination": client.eventHubName,
          },
        };

        assert.isTrue(
          withSpanStub.calledWith(
            Sinon.match.any,
            Sinon.match.any,
            Sinon.match.any,
            expectedSpanOptions
          )
        );
      });
    });
  }
});

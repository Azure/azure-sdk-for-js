// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTestCredential, EnvVarKeys, getEnvVars } from "../../public/utils/testUtils";
import { EventHubConsumerClient, EventHubProducerClient } from "../../../src";
import { assert, should as shouldFn } from "@azure-tools/test-utils";

import Sinon from "sinon";
import { createMockServer } from "../../public/utils/mockService";
import { testWithServiceTypes } from "../../public/utils/testWithServiceTypes";
import { tracingClient } from "../../../src/diagnostics/tracing";

const should = shouldFn();

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
  }

  describe.only("Create clients using Azure Identity (Internal)", function (): void {
    let endpoint: string;
    let client: EventHubConsumerClient | EventHubProducerClient;

    afterEach(async () => {
      // The client must always be closed, or MockHub will hang on shutdown.
      await client?.close();
    });

    before("validate environment", function () {
      should.exist(
        env[EnvVarKeys.EVENTHUB_FQDN],
        "define EVENTHUB_FQDN in your environment before running integration tests.",
      );
      // This is of the form <your-namespace>.servicebus.windows.net
      endpoint = env.EVENTHUB_FQDN;
    });

    it("getEventHubProperties() creates a span with a peer.address attribute as the FQNS", async () => {
      client = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        endpoint,
        env.EVENTHUB_NAME,
        createTestCredential(),
      );
      should.equal(client.fullyQualifiedNamespace, endpoint);

      const withSpanStub = Sinon.spy(tracingClient, "withSpan");

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

      assert.isTrue(
        withSpanStub.calledWith(
          Sinon.match.any,
          Sinon.match.any,
          Sinon.match.any,
          expectedSpanOptions,
        ),
      );
    });
  });
});

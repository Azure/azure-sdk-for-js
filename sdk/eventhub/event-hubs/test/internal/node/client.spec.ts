// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EnvVarKeys, getEnvVars } from "../../public/utils/testUtils";
import { EnvironmentCredential, TokenCredential } from "@azure/identity";
import { EventHubConsumerClient, EventHubProducerClient } from "../../../src";
import { assert, should as shouldFn } from "@azure/test-utils";

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

  describe("Create clients using Azure Identity (Internal)", function (): void {
    let endpoint: string;
    let credential: TokenCredential;
    let client: EventHubConsumerClient | EventHubProducerClient;

    afterEach(async () => {
      // The client must always be closed, or MockHub will hang on shutdown.
      await client?.close();
    });

    before("validate environment", function () {
      should.exist(
        env[EnvVarKeys.AZURE_CLIENT_ID],
        "define AZURE_CLIENT_ID in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarKeys.AZURE_TENANT_ID],
        "define AZURE_TENANT_ID in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarKeys.AZURE_CLIENT_SECRET],
        "define AZURE_CLIENT_SECRET in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
      );
      // This is of the form <your-namespace>.servicebus.windows.net
      endpoint = (env.EVENTHUB_CONNECTION_STRING.match("Endpoint=sb://(.*)/;") || "")[1];
      if (serviceVersion === "mock") {
        // Create a mock credential that implements the TokenCredential interface.
        credential = {
          getToken(_args) {
            return Promise.resolve({ token: "token", expiresOnTimestamp: Date.now() + 360000 });
          },
        };
      } else {
        credential = new EnvironmentCredential();
      }
    });

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
});

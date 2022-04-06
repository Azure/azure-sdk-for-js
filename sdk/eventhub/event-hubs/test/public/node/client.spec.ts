// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EnvVarKeys, getEnvVars } from "../utils/testUtils";
import { EnvironmentCredential, TokenCredential } from "@azure/identity";
import { EventHubConsumerClient, EventHubProducerClient } from "../../../src";
import { chai, should as shouldFn } from "@azure/test-utils";
import chaiString from "chai-string";
import { createMockServer } from "../utils/mockService";
import { testWithServiceTypes } from "../utils/testWithServiceTypes";

chai.use(chaiString);
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

  describe("Create clients using Azure Identity", function (): void {
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

    it("creates an EventHubProducerClient from an Azure.Identity credential", async function (): Promise<void> {
      client = new EventHubProducerClient(endpoint, env.EVENTHUB_NAME, credential);
      should.equal(client.fullyQualifiedNamespace, endpoint);

      // Extra check involving actual call to the service to ensure this works
      const hubInfo = await client.getEventHubProperties();
      should.equal(hubInfo.name, client.eventHubName);
    });

    it("creates an EventHubConsumerClient from an Azure.Identity credential", async function (): Promise<void> {
      client = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        endpoint,
        env.EVENTHUB_NAME,
        credential
      );
      should.equal(client.fullyQualifiedNamespace, endpoint);

      // Extra check involving actual call to the service to ensure this works
      const hubInfo = await client.getEventHubProperties();
      should.equal(hubInfo.name, client.eventHubName);
    });
  });
});

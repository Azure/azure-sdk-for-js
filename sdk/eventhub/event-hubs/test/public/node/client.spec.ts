// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTestCredential, EnvVarKeys, getEnvVars } from "../utils/testUtils";
import { EventHubConsumerClient, EventHubProducerClient, TokenCredential } from "../../../src";
import { chai, should as shouldFn } from "@azure-tools/test-utils";
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
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests.",
      );
      // This is of the form <your-namespace>.servicebus.windows.net
      endpoint = env.EVENTHUB_FQDN;
      credential = createTestCredential();
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
        credential,
      );
      should.equal(client.fullyQualifiedNamespace, endpoint);

      // Extra check involving actual call to the service to ensure this works
      const hubInfo = await client.getEventHubProperties();
      should.equal(hubInfo.name, client.eventHubName);
    });
  });
});

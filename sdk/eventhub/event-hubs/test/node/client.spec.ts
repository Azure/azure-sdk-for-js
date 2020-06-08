// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import chaiString from "chai-string";
chai.use(chaiString);
import { EnvVarKeys, getEnvVars } from "../utils/testUtils";
import { EnvironmentCredential, TokenCredential } from "@azure/identity";
import { EventHubProducerClient, EventHubConsumerClient } from "../../src";
const env = getEnvVars();

describe("Create clients using Azure Identity", function(): void {
  let endpoint: string;
  let credential: TokenCredential;
  before("validate environment", function() {
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
    credential = new EnvironmentCredential();
  });

  it("creates an EventHubProducerClient from an Azure.Identity credential", async function(): Promise<
    void
  > {
    const client = new EventHubProducerClient(endpoint, env.EVENTHUB_NAME, credential);
    should.equal(client.fullyQualifiedNamespace, endpoint);

    // Extra check involving actual call to the service to ensure this works
    const hubInfo = await client.getEventHubProperties();
    should.equal(hubInfo.name, client.eventHubName);

    await client.close();
  });

  it("creates an EventHubConsumerClient from an Azure.Identity credential", async function(): Promise<
    void
  > {
    const client = new EventHubConsumerClient(
      EventHubConsumerClient.defaultConsumerGroupName,
      endpoint,
      env.EVENTHUB_NAME,
      credential
    );
    should.equal(client.fullyQualifiedNamespace, endpoint);

    // Extra check involving actual call to the service to ensure this works
    const hubInfo = await client.getEventHubProperties();
    should.equal(hubInfo.name, client.eventHubName);

    await client.close();
  });
});

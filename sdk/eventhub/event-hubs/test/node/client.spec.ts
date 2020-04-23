// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import chaiString from "chai-string";
chai.use(chaiString);
import { EventHubClient } from "../../src/impl/eventHubClient";
import { EnvVarKeys, getEnvVars } from "../utils/testUtils";
import { EnvironmentCredential } from "@azure/identity";
const env = getEnvVars();

describe("Create EventHubClient using Azure Identity", function(): void {
  it("creates an EventHubClient from an Azure.Identity credential", async function(): Promise<
    void
  > {
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
    const endpoint = (env.EVENTHUB_CONNECTION_STRING.match("Endpoint=sb://(.*)/;") || "")[1];

    const credential = new EnvironmentCredential();
    const client = new EventHubClient(endpoint, env.EVENTHUB_NAME, credential);

    // Extra check involving actual call to the service to ensure this works
    const hubInfo = await client.getProperties();
    should.equal(hubInfo.name, client.eventHubName);
    await client.close();
  });

  it("Verify fullyQualifiedNamespace when creating an EventHubClient from an Azure.Identity credential", function(): void {
    const endpoint = "test.servicebus.windows.net";
    const credential = new EnvironmentCredential();
    const client = new EventHubClient(endpoint, "my-event-hub-name", credential);
    should.equal(client.fullyQualifiedNamespace, "test.servicebus.windows.net");
  });
});

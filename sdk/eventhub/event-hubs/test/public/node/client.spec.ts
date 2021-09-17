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
import { EventHubProducerClient, EventHubConsumerClient } from "../../../src";
import { TestTracer, setTracer, resetTracer } from "@azure/test-utils";
import { testWithServiceTypes } from "../utils/testWithServiceTypes";
import { createMockServer } from "../utils/mockService";

testWithServiceTypes((serviceVersion) => {
  const env = getEnvVars();
  if (serviceVersion === "mock") {
    let service: ReturnType<typeof createMockServer>;
    before("Starting mock service", () => {
      service = createMockServer();
      return service.start();
    });

    after("Stopping mock service", () => {
      return service?.stop();
    });
  }

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
      if (serviceVersion === "mock") {
        // Create a mock credential that implements the TokenCredential interface.
        credential = {
          getToken(_args) {
            return Promise.resolve({ token: "token", expiresOnTimestamp: Date.now() + 360000 });
          }
        };
      } else {
        credential = new EnvironmentCredential();
      }
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

    describe("tracing", () => {
      let tracer: TestTracer;
      before(() => {
        tracer = setTracer();
      });

      after(() => {
        resetTracer();
      });

      it("getEventHubProperties() creates a span with a peer.address attribute as the FQNS", async () => {
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

        const spans = tracer
          .getKnownSpans()
          .filter((s) => s.name === "Azure.EventHubs.getEventHubProperties");

        spans.length.should.equal(1);
        spans[0].attributes.should.deep.equal({
          "az.namespace": "Microsoft.EventHub",
          "message_bus.destination": client.eventHubName,
          "peer.address": client.fullyQualifiedNamespace
        });
      });
    });
  });
});

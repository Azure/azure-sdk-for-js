// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import {
  parseEventHubConnectionString,
  EventHubConsumerClient,
  type EventHubProducerClient,
} from "@azure/event-hubs";
import { createConsumer, createProducer } from "../utils/clients.js";
import { isSasTokenProvider } from "@azure/core-amqp";
import { should, assert } from "../utils/chai.js";
import { describe, it, afterEach, beforeEach, beforeAll } from "vitest";
import { getConnectionStringWithKey } from "../utils/vars.js";
import { getConnectionStringWithSAS } from "../utils/sas.js";

function getCredential(client: EventHubConsumerClient | EventHubProducerClient): any {
  const cred =
    // typescript doesn't allow access to a shared member between the two classes.
    client instanceof EventHubConsumerClient
      ? client["_context"].tokenCredential
      : client["_context"].tokenCredential;
  if (!isSasTokenProvider(cred)) {
    assert.fail("Expected a SasTokenProviderImpl instance.");
  }
  // cred is of type SasTokenProviderImpl which is not exported.
  return (cred as any)["_credential"];
}

describe("Authentication via", () => {
  let client: EventHubConsumerClient | EventHubProducerClient;
  let connectionString: string;
  afterEach(async () => {
    const properties = await client.getEventHubProperties();
    should.exist(properties);
    await client.close();
  });

  describe("Keys", () => {
    let sharedAccessKeyName: string;
    let sharedAccessKey: string;

    beforeAll(async () => {
      connectionString = getConnectionStringWithKey();
      const { sharedAccessKeyName: t1, sharedAccessKey: t2 } =
        parseEventHubConnectionString(connectionString);
      if (!t1 || !t2) {
        assert.fail("Failed to parse connection string.");
      }
      sharedAccessKeyName = t1;
      sharedAccessKey = t2;
    });

    describe("using connection string", () => {
      afterEach(async () => {
        assert.deepEqual(getCredential(client), {
          name: sharedAccessKeyName,
          key: sharedAccessKey,
        });
      });

      it("EventHubConsumerClient", async () => {
        const { consumer } = createConsumer({
          connectionString,
        });
        client = consumer;
      });

      it("EventHubProducerClient", async () => {
        const { producer } = createProducer({
          connectionString,
        });
        client = producer;
      });
    });

    describe("using NamedKeyCredential", () => {
      let namedKeyCredential: AzureNamedKeyCredential;
      beforeAll(async () => {
        namedKeyCredential = new AzureNamedKeyCredential(sharedAccessKeyName, sharedAccessKey);
      });

      afterEach(async () => {
        assert.deepEqual(getCredential(client), namedKeyCredential);
      });

      it("EventHubConsumerClient", async () => {
        const { consumer } = createConsumer({ credential: namedKeyCredential });
        client = consumer;
      });

      it("EventHubProducerClient", async () => {
        const { producer } = createProducer({ credential: namedKeyCredential });
        client = producer;
      });
    });
  });

  describe("SAS", () => {
    let sharedAccessSignature: string;

    beforeEach(async () => {
      connectionString = await getConnectionStringWithSAS();
      const { sharedAccessSignature: t } = parseEventHubConnectionString(connectionString);
      if (!t) {
        assert.fail("Failed to parse connection string.");
      }
      sharedAccessSignature = t;
    });

    describe("using connection string", () => {
      afterEach(async () => {
        assert.deepEqual(getCredential(client), {
          signature: sharedAccessSignature,
        });
      });

      it("EventHubConsumerClient", async () => {
        const { consumer } = createConsumer({
          connectionString,
        });
        client = consumer;
      });

      it("EventHubProducerClient", async () => {
        const { producer } = createProducer({
          connectionString,
        });
        client = producer;
      });
    });

    describe("using SASCredential", () => {
      let sasCredential: AzureSASCredential;

      beforeEach(async () => {
        sasCredential = new AzureSASCredential(sharedAccessSignature);
      });

      afterEach(async () => {
        assert.deepEqual(getCredential(client), sasCredential);
      });

      it("EventHubConsumerClient", async () => {
        const { consumer } = createConsumer({ credential: sasCredential });
        client = consumer;
      });

      it("EventHubProducerClient", async () => {
        const { producer } = createProducer({ credential: sasCredential });
        client = producer;
      });
    });
  });
});

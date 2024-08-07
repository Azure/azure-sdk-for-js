// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import {
  parseEventHubConnectionString,
  EventHubConsumerClient,
  type EventHubProducerClient,
} from "../../src/index.js";
import {
  createConsumer,
  createProducer,
  getConnectionStringWithKey,
  getConnectionStringWithSAS,
} from "../utils/clients.js";
import { isSasTokenProvider } from "@azure/core-amqp";
import { should, assert } from "../utils/chai.js";
import { describe, it, afterEach, beforeEach, beforeAll } from "vitest";

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

describe.skipIf(!getConnectionStringWithKey())("Authentication via", function () {
  let client: EventHubConsumerClient | EventHubProducerClient;
  let connectionString: string;
  afterEach(async function () {
    const properties = await client.getEventHubProperties();
    should.exist(properties);
    await client.close();
  });

  describe("Keys", function () {
    let sharedAccessKeyName: string;
    let sharedAccessKey: string;

    beforeAll(async function () {
      const curConnectionString = getConnectionStringWithKey();
      if (!curConnectionString) {
        assert.fail("Connection string is not available in the environment.");
      }
      connectionString = curConnectionString;
      const { sharedAccessKeyName: t1, sharedAccessKey: t2 } =
        parseEventHubConnectionString(connectionString);
      if (!t1 || !t2) {
        assert.fail("Failed to parse connection string.");
      }
      sharedAccessKeyName = t1;
      sharedAccessKey = t2;
    });

    describe("using connection string", function () {
      afterEach(async function () {
        assert.deepEqual(getCredential(client), {
          name: sharedAccessKeyName,
          key: sharedAccessKey,
        });
      });

      it("EventHubConsumerClient", async function () {
        const { consumer } = createConsumer({
          connectionString,
        });
        client = consumer;
      });

      it("EventHubProducerClient", async function () {
        const { producer } = createProducer({
          connectionString,
        });
        client = producer;
      });
    });

    describe("using NamedKeyCredential", function () {
      let namedKeyCredential: AzureNamedKeyCredential;
      beforeAll(async function () {
        namedKeyCredential = new AzureNamedKeyCredential(sharedAccessKeyName, sharedAccessKey);
      });

      afterEach(async function () {
        assert.deepEqual(getCredential(client), namedKeyCredential);
      });

      it("EventHubConsumerClient", async function () {
        const { consumer } = createConsumer({ credential: namedKeyCredential });
        client = consumer;
      });

      it("EventHubProducerClient", async function () {
        const { producer } = createProducer({ credential: namedKeyCredential });
        client = producer;
      });
    });
  });

  describe("SAS", function () {
    let sharedAccessSignature: string;

    beforeEach(async function () {
      const curConnectionString = await getConnectionStringWithSAS();
      if (!curConnectionString) {
        assert.fail("Connection string is not available in the environment.");
      }
      connectionString = curConnectionString;
      const { sharedAccessSignature: t } = parseEventHubConnectionString(connectionString);
      if (!t) {
        assert.fail("Failed to parse connection string.");
      }
      sharedAccessSignature = t;
    });

    describe("using connection string", function () {
      afterEach(async function () {
        assert.deepEqual(getCredential(client), {
          signature: sharedAccessSignature,
        });
      });

      it("EventHubConsumerClient", async function () {
        const { consumer } = createConsumer({
          connectionString,
        });
        client = consumer;
      });

      it("EventHubProducerClient", async function () {
        const { producer } = createProducer({
          connectionString,
        });
        client = producer;
      });
    });

    describe("using SASCredential", function () {
      let sasCredential: AzureSASCredential;

      beforeEach(async function () {
        sasCredential = new AzureSASCredential(sharedAccessSignature);
      });

      afterEach(async function () {
        assert.deepEqual(getCredential(client), sasCredential);
      });

      it("EventHubConsumerClient", async function () {
        const { consumer } = createConsumer({ credential: sasCredential });
        client = consumer;
      });

      it("EventHubProducerClient", async function () {
        const { producer } = createProducer({ credential: sasCredential });
        client = producer;
      });
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubConsumerClient, EventHubProducerClient } from "@azure/event-hubs";
import type { ConnectionContext } from "$internal/connectionContext.js";
import { MessagingError } from "@azure/core-amqp";
import { getRuntimeInfo } from "$internal/util/runtimeInfo.js";
import { packageJsonInfo } from "$internal/util/constants.js";
import { isNodeLike } from "@azure/core-util";
import { describe, it, beforeEach, afterEach } from "vitest";
import { createConsumer, createProducer } from "../utils/clients.js";
import { NoOpCredential } from "@azure-tools/test-credential";
import { getSubscriptionPromise } from "../utils/testUtils.js";
import { assert, expect, should } from "../utils/chai.js";

function createNoOpCred(): NoOpCredential {
  return new NoOpCredential();
}

async function validateConnectionError(promise: Promise<unknown>): Promise<void> {
  await expect(promise).to.be.rejected.then((err) => {
    expect(err)
      .to.be.an.instanceOf(MessagingError)
      .and.has.property("code", isNodeLike ? "ENOTFOUND" : "ServiceCommunicationError");
    return err;
  });
}

async function validateNotFoundError(promise: Promise<unknown>): Promise<void> {
  await expect(promise).to.be.rejected.then((err) => {
    expect(err)
      .to.be.an.instanceOf(MessagingError)
      .and.has.property("code", "MessagingEntityNotFoundError");
    return err;
  });
}

async function validateConnectionClosedError(promise: Promise<unknown>): Promise<void> {
  const expectedErrorMsg = "The underlying AMQP connection is closed.";
  await expect(promise).to.be.rejected.then((err) => {
    expect(err).and.has.property("message", expectedErrorMsg);
    return err;
  });
}

describe("EventHubClient", () => {
  describe("Create EventHubConsumerClient", () => {
    it("throws when no EntityPath in connection string", async () => {
      const connectionString = "Endpoint=sb://abc";
      const test = function (): EventHubConsumerClient {
        return createConsumer({ connectionString, eventhubName: "" }).consumer;
      };
      test.should.throw(
        Error,
        `Either provide "eventHubName" or the "connectionString": "${connectionString}", ` +
          `must contain "EntityPath=<your-event-hub-name>".`,
      );
    });

    it("throws when EntityPath in connection string doesn't match with event hub name parameter", async () => {
      const connectionString =
        "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c=;EntityPath=my-event-hub-name";
      const eventhubName = "event-hub-name";
      const test = function (): EventHubConsumerClient {
        return createConsumer({ connectionString, eventhubName }).consumer;
      };
      test.should.throw(
        Error,
        `The entity path "my-event-hub-name" in connectionString: "${connectionString}" ` +
          `doesn't match with eventHubName: "${eventhubName}".`,
      );
    });

    it("sets eventHubName, fullyQualifiedNamespace properties when created from a connection string", async () => {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const connectionString = `Endpoint=sb://${fqdn};SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=${eventhubName}`;
      const { consumer: client } = createConsumer({ connectionString, eventhubName: "" });
      client.should.be.an.instanceof(EventHubConsumerClient);
      should.equal(client.eventHubName, "my-event-hub-name");
      should.equal(client.fullyQualifiedNamespace, fqdn);
    });

    it("sets eventHubName, fullyQualifiedNamespace properties when created from a connection string and event hub name", async () => {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const connectionString = `Endpoint=sb://${fqdn};SharedAccessKeyName=b;SharedAccessKey=c`;
      const { consumer: client } = createConsumer({ connectionString, eventhubName });
      client.should.be.an.instanceof(EventHubConsumerClient);
      should.equal(client.eventHubName, eventhubName);
      should.equal(client.fullyQualifiedNamespace, fqdn);
    });

    it("sets eventHubName, fullyQualifiedNamespace properties when created from a token credential", async () => {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const { consumer: client } = createConsumer({
        eventhubName,
        fqdn,
        credential: createNoOpCred(),
      });
      client.should.be.an.instanceof(EventHubConsumerClient);
      should.equal(client.eventHubName, eventhubName);
      should.equal(client.fullyQualifiedNamespace, fqdn);
    });

    it("respects customEndpointAddress when using connection string", async () => {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const connectionString = `Endpoint=sb://${fqdn};SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=${eventhubName}`;
      const host = "foo.private.bar";
      const port = 111;
      const customEndpointAddress = `sb://${host}:${port}`;
      const { consumer: client } = createConsumer({
        connectionString,
        eventhubName: "",
        options: { customEndpointAddress },
      });
      client.should.be.an.instanceof(EventHubConsumerClient);
      client["_context"].config.host.should.equal(host);
      client["_context"].config.amqpHostname!.should.equal(fqdn);
      client["_context"].config.port!.should.equal(port);
    });

    it("respects customEndpointAddress when using credentials", async () => {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const host = "foo.private.bar";
      const port = 111;
      const customEndpointAddress = `sb://${host}:${port}`;
      const { consumer: client } = createConsumer({
        fqdn,
        eventhubName,
        credential: createNoOpCred(),
        options: { customEndpointAddress },
      });
      client.should.be.an.instanceof(EventHubConsumerClient);
      client["_context"].config.host.should.equal(host);
      client["_context"].config.amqpHostname!.should.equal(fqdn);
      client["_context"].config.port!.should.equal(port);
    });
  });

  describe("Create EventHubProducerClient", () => {
    it("the identifier options can be set", async () => {
      const identifier = "Test1";
      const connectionString =
        "Endpoint=sb://test.servicebus.windows.net;SharedAccessKeyName=b;SharedAccessKey=c";
      const eventhubName = "my-event-hub-name";
      const { consumer: client } = createConsumer({
        connectionString,
        eventhubName,
        options: { identifier },
      });
      client.identifier.should.equal(identifier, "The client identifier wasn't set correctly");
    });

    it("throws when no EntityPath in connection string ", async () => {
      const connectionString = "Endpoint=sb://abc";
      const test = function (): EventHubProducerClient {
        return createProducer({ connectionString, eventhubName: "" }).producer;
      };
      test.should.throw(
        Error,
        `Either provide "eventHubName" or the "connectionString": "${connectionString}", ` +
          `must contain "EntityPath=<your-event-hub-name>".`,
      );
    });

    it("throws when EntityPath in connection string doesn't match with event hub name parameter", async () => {
      const connectionString =
        "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c=;EntityPath=my-event-hub-name";
      const eventhubName = "event-hub-name";
      const test = function (): EventHubProducerClient {
        return createProducer({ connectionString, eventhubName }).producer;
      };
      test.should.throw(
        Error,
        `The entity path "my-event-hub-name" in connectionString: "${connectionString}" ` +
          `doesn't match with eventHubName: "${eventhubName}".`,
      );
    });

    it("sets eventHubName, fullyQualifiedNamespace properties when created from a connection string", async () => {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const connectionString = `Endpoint=sb://${fqdn};SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=${eventhubName}`;
      const { producer: client } = createProducer({ connectionString, eventhubName: "" });
      client.should.be.an.instanceof(EventHubProducerClient);
      should.equal(client.eventHubName, eventhubName);
      should.equal(client.fullyQualifiedNamespace, fqdn);
    });

    it("sets eventHubName, fullyQualifiedNamespace properties when created from a connection string and event hub name", async () => {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const connectionString = `Endpoint=sb://${fqdn};SharedAccessKeyName=b;SharedAccessKey=c`;
      const { producer: client } = createProducer({ connectionString, eventhubName });
      client.should.be.an.instanceof(EventHubProducerClient);
      should.equal(client.eventHubName, eventhubName);
      should.equal(client.fullyQualifiedNamespace, fqdn);
    });

    it("sets eventHubName, fullyQualifiedNamespace properties when created from a token credential", async () => {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const { producer: client } = createProducer({
        fqdn,
        eventhubName,
        credential: createNoOpCred(),
      });
      client.should.be.an.instanceof(EventHubProducerClient);
      should.equal(client.eventHubName, eventhubName);
      should.equal(client.fullyQualifiedNamespace, fqdn);
    });

    it("respects customEndpointAddress when using connection string", async () => {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const connectionString = `Endpoint=sb://${fqdn};SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=${eventhubName}`;
      const host = "foo.private.bar";
      const port = 111;
      const customEndpointAddress = `sb://${host}:${port}`;
      const { producer: client } = createProducer({
        connectionString,
        eventhubName: "",
        options: { customEndpointAddress },
      });
      client.should.be.an.instanceof(EventHubProducerClient);
      client["_context"].config.host.should.equal(host);
      client["_context"].config.amqpHostname!.should.equal(fqdn);
      client["_context"].config.port!.should.equal(port);
    });

    it("respects customEndpointAddress when using credentials", async () => {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const host = "foo.private.bar";
      const port = 111;
      const customEndpointAddress = `sb://${host}:${port}`;
      const { producer: client } = createProducer({
        fqdn,
        eventhubName,
        credential: createNoOpCred(),
        options: { customEndpointAddress },
      });
      client.should.be.an.instanceof(EventHubProducerClient);
      client["_context"].config.host.should.equal(host);
      client["_context"].config.amqpHostname!.should.equal(fqdn);
      client["_context"].config.port!.should.equal(port);
    });
  });

  describe("EventHubConsumerClient with non existent namespace", () => {
    let client: EventHubConsumerClient;
    beforeEach(async () => {
      const connectionString =
        "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d";
      client = createConsumer({ connectionString, eventhubName: "" }).consumer;
    });

    afterEach(async () => {
      await client.close();
    });

    it("should throw ServiceCommunicationError for getEventHubProperties", async () => {
      await validateConnectionError(client.getEventHubProperties());
    });

    it("should throw ServiceCommunicationError for getPartitionProperties", async () => {
      await validateConnectionError(client.getPartitionProperties("0"));
    });

    it("should throw ServiceCommunicationError for getPartitionIds", async () => {
      await validateConnectionError(client.getPartitionIds());
    });

    it("should throw ServiceCommunicationError while subscribe()", async () => {
      await validateConnectionError(getSubscriptionPromise(client));
    });
  });

  describe("EventHubProducerClient with non existent namespace", () => {
    let client: EventHubProducerClient;
    beforeEach(async () => {
      const connectionString =
        "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d";
      client = createProducer({ connectionString, eventhubName: "" }).producer;
    });

    afterEach(async () => {
      await client.close();
    });

    it("should throw ServiceCommunicationError for getEventHubProperties", async () => {
      await validateConnectionError(client.getEventHubProperties());
    });

    it("should throw ServiceCommunicationError for getPartitionProperties", async () => {
      await validateConnectionError(client.getPartitionProperties("0"));
    });

    it("should throw ServiceCommunicationError for getPartitionIds", async () => {
      await validateConnectionError(client.getPartitionIds());
    });

    it("should throw ServiceCommunicationError while sending", async () => {
      await validateConnectionError(client.sendBatch([{ body: "Hello World" }]));
    });

    it("should throw ServiceCommunicationError while creating a batch", async () => {
      await validateConnectionError(client.createBatch());
    });
  });

  describe("EventHubConsumerClient with non existent event hub", () => {
    let client: EventHubConsumerClient;

    beforeEach(async () => {
      client = createConsumer({ eventhubName: "bad" }).consumer;
    });

    afterEach(async () => {
      await client.close();
    });

    it("should throw MessagingEntityNotFoundError for getEventHubProperties", async () => {
      await validateNotFoundError(client.getEventHubProperties());
    });

    it("should throw MessagingEntityNotFoundError for getPartitionProperties", async () => {
      await validateNotFoundError(client.getPartitionProperties("0"));
    });

    it("should throw MessagingEntityNotFoundError for getPartitionIds", async () => {
      await validateNotFoundError(client.getPartitionIds());
    });

    it("should throw MessagingEntityNotFoundError while subscribe()", async () => {
      await validateNotFoundError(getSubscriptionPromise(client));
    });
  });

  describe("EventHubProducerClient with non existent event hub", () => {
    let client: EventHubProducerClient;

    beforeEach(async () => {
      client = createProducer({ eventhubName: "bad" }).producer;
    });

    afterEach(async () => {
      await client.close();
    });

    it("should throw MessagingEntityNotFoundError for getEventHubProperties", async () => {
      await validateNotFoundError(client.getEventHubProperties());
    });

    it("should throw MessagingEntityNotFoundError for getPartitionProperties", async () => {
      await validateNotFoundError(client.getPartitionProperties("0"));
    });

    it("should throw MessagingEntityNotFoundError for getPartitionIds", async () => {
      await validateNotFoundError(client.getPartitionIds());
    });

    it("should throw MessagingEntityNotFoundError while sending", async () => {
      await validateNotFoundError(client.sendBatch([{ body: "Hello World" }]));
    });

    it("should throw MessagingEntityNotFoundError while creating a batch", async () => {
      await validateNotFoundError(client.createBatch());
    });
  });

  describe("EventHubConsumerClient User Agent String", () => {
    it("should correctly populate the default user agent", async () => {
      const { consumer } = createConsumer();
      testUserAgentString(consumer["_context"]);
      await consumer.close();
    });

    it("should correctly populate the custom user agent", async () => {
      const customUserAgent = "boo";
      const { consumer } = createConsumer({ options: { userAgent: customUserAgent } });
      testUserAgentString(consumer["_context"], customUserAgent);
      await consumer.close();
    });
  });

  describe("EventHubProducerClient User Agent String", () => {
    it("should correctly populate the default user agent", async () => {
      const { producer } = createProducer();
      testUserAgentString(producer["_context"]);
      await producer.close();
    });

    it("should correctly populate the custom user agent", async () => {
      const customUserAgent = "boo";
      const { producer } = createProducer({ options: { userAgent: customUserAgent } });
      testUserAgentString(producer["_context"], customUserAgent);
      await producer.close();
    });
  });

  function testUserAgentString(context: ConnectionContext, customValue?: string): void {
    const packageVersion = packageJsonInfo.version;
    const properties = context.connection.options.properties;
    assert.isTrue(
      properties!["user-agent"].startsWith(
        `azsdk-js-azureeventhubs/${packageVersion} (${getRuntimeInfo()})`,
      ),
    );
    should.equal(properties!.product, "MSJSClient");
    should.equal(properties!.version, packageVersion);
    if (isNodeLike) {
      should.equal(properties!.framework, `Node/${process.version}`);
    } else {
      should.equal(properties!.framework.startsWith("Browser/"), true);
    }
    should.exist(properties!.platform);
    if (customValue) {
      assert.isTrue(properties!["user-agent"].endsWith(customValue));
    }
  }

  describe("EventHubConsumerClient after close()", () => {
    let client: EventHubConsumerClient;

    beforeEach(async () => {
      client = createConsumer().consumer;
      // Ensure that the connection is opened
      await client.getPartitionIds();
      await client.close();
    });

    it("should throw connection closed error for getEventHubProperties", async () => {
      await validateConnectionClosedError(client.getEventHubProperties());
    });

    it("should throw connection closed error for getPartitionProperties", async () => {
      await validateConnectionClosedError(client.getPartitionProperties("0"));
    });

    it("should throw connection closed error for getPartitionIds", async () => {
      await validateConnectionClosedError(client.getPartitionIds());
    });

    it("should throw connection closed error while subscribe()", async () => {
      await validateConnectionClosedError(getSubscriptionPromise(client));
    });
  });

  describe("EventHubProducerClient after close()", () => {
    let client: EventHubProducerClient;

    beforeEach(async () => {
      client = createProducer().producer;
      // Ensure that the connection is opened
      await client.getPartitionIds();
      await client.close();
    });

    it("should throw connection closed error for getEventHubProperties", async () => {
      await validateConnectionClosedError(client.getEventHubProperties());
    });

    it("should throw connection closed error for getPartitionProperties", async () => {
      await validateConnectionClosedError(client.getPartitionProperties("0"));
    });

    it("should throw connection closed error for getPartitionIds", async () => {
      await validateConnectionClosedError(client.getPartitionIds());
    });

    it("should throw connection closed error while sending", async () => {
      await validateConnectionClosedError(client.sendBatch([{ body: "Hello World" }]));
    });

    it("should throw connection closed error while creating a batch", async () => {
      await validateConnectionClosedError(client.createBatch());
    });
  });
});

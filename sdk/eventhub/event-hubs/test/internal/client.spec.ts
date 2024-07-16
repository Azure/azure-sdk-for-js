// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventHubConsumerClient, EventHubProducerClient } from "../../src/index.js";
import type { ConnectionContext } from "../../src/connectionContext.js";
import { MessagingError } from "@azure/core-amqp";
import debugModule from "debug";
import { getRuntimeInfo } from "../../src/util/runtimeInfo.js";
import { packageJsonInfo } from "../../src/util/constants.js";
import { isNodeLike } from "@azure/core-util";
import { describe, it, should as shouldFn, beforeEach, afterEach, expect, chai } from "vitest";
import { createConsumer, createProducer } from "../utils/clients.js";
import { NoOpCredential } from "@azure-tools/test-credential";
import { getSubscriptionPromise } from "../utils/testUtils.js";
import chaiString from "chai-string";

chai.use(chaiString);
const should = shouldFn();
const debug = debugModule("azure:event-hubs:client-spec");

function createNoOpCred(): NoOpCredential {
  return new NoOpCredential();
}

function validateConnectionError<E extends Error & { code?: string }>(err: E): void {
  should.exist(err.code, "Missing code on error object.");
  if (!isNodeLike) {
    should.equal(err.code, "ServiceCommunicationError");
  }
}

function getConnectionErrorCode(): string | undefined {
  return isNodeLike ? "ENOTFOUND" : "ServiceCommunicationError";
}

describe("EventHubClient", function () {
  describe("Create EventHubConsumerClient", function () {
    it("throws when no EntityPath in connection string", async function () {
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

    it("throws when EntityPath in connection string doesn't match with event hub name parameter", async function () {
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

    it("sets eventHubName, fullyQualifiedNamespace properties when created from a connection string", async function () {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const connectionString = `Endpoint=sb://${fqdn};SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=${eventhubName}`;
      const { consumer: client } = createConsumer({ connectionString, eventhubName: "" });
      client.should.be.an.instanceof(EventHubConsumerClient);
      should.equal(client.eventHubName, "my-event-hub-name");
      should.equal(client.fullyQualifiedNamespace, fqdn);
    });

    it("sets eventHubName, fullyQualifiedNamespace properties when created from a connection string and event hub name", async function () {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const connectionString = `Endpoint=sb://${fqdn};SharedAccessKeyName=b;SharedAccessKey=c`;
      const { consumer: client } = createConsumer({ connectionString, eventhubName });
      client.should.be.an.instanceof(EventHubConsumerClient);
      should.equal(client.eventHubName, eventhubName);
      should.equal(client.fullyQualifiedNamespace, fqdn);
    });

    it("sets eventHubName, fullyQualifiedNamespace properties when created from a token credential", async function () {
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

    it("respects customEndpointAddress when using connection string", async function () {
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

    it("respects customEndpointAddress when using credentials", async function () {
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

  describe("Create EventHubProducerClient", function () {
    it("the identifier options can be set", async function () {
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

    it("throws when no EntityPath in connection string ", async function () {
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

    it("throws when EntityPath in connection string doesn't match with event hub name parameter", async function () {
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

    it("sets eventHubName, fullyQualifiedNamespace properties when created from a connection string", async function () {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const connectionString = `Endpoint=sb://${fqdn};SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=${eventhubName}`;
      const { producer: client } = createProducer({ connectionString, eventhubName: "" });
      client.should.be.an.instanceof(EventHubProducerClient);
      should.equal(client.eventHubName, eventhubName);
      should.equal(client.fullyQualifiedNamespace, fqdn);
    });

    it("sets eventHubName, fullyQualifiedNamespace properties when created from a connection string and event hub name", async function () {
      const fqdn = "test.servicebus.windows.net";
      const eventhubName = "my-event-hub-name";
      const connectionString = `Endpoint=sb://${fqdn};SharedAccessKeyName=b;SharedAccessKey=c`;
      const { producer: client } = createProducer({ connectionString, eventhubName });
      client.should.be.an.instanceof(EventHubProducerClient);
      should.equal(client.eventHubName, eventhubName);
      should.equal(client.fullyQualifiedNamespace, fqdn);
    });

    it("sets eventHubName, fullyQualifiedNamespace properties when created from a token credential", async function () {
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

    it("respects customEndpointAddress when using connection string", async function () {
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

    it("respects customEndpointAddress when using credentials", async function () {
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

  describe("EventHubConsumerClient with non existent namespace", function () {
    let client: EventHubConsumerClient;
    beforeEach(async function () {
      const connectionString =
        "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d";
      client = createConsumer({ connectionString, eventhubName: "" }).consumer;
    });

    afterEach(async function () {
      await client.close();
    });

    it("should throw ServiceCommunicationError for getEventHubProperties", async function () {
      await expect(client.getEventHubProperties())
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", getConnectionErrorCode());
    });

    it("should throw ServiceCommunicationError for getPartitionProperties", async function () {
      await expect(client.getPartitionProperties("0"))
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", getConnectionErrorCode());
    });

    it("should throw ServiceCommunicationError for getPartitionIds", async function () {
      await expect(client.getPartitionIds())
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", getConnectionErrorCode());
    });

    it("should throw ServiceCommunicationError while subscribe()", async function () {
      const caughtErr = await getSubscriptionPromise(client);
      debug(caughtErr);
      validateConnectionError(caughtErr);
    });
  });

  describe("EventHubProducerClient with non existent namespace", function () {
    let client: EventHubProducerClient;
    beforeEach(async function () {
      const connectionString =
        "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d";
      client = createProducer({ connectionString, eventhubName: "" }).producer;
    });

    afterEach(async function () {
      await client.close();
    });

    it("should throw ServiceCommunicationError for getEventHubProperties", async function () {
      await expect(client.getEventHubProperties())
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", getConnectionErrorCode());
    });

    it("should throw ServiceCommunicationError for getPartitionProperties", async function () {
      await expect(client.getPartitionProperties("0"))
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", getConnectionErrorCode());
    });

    it("should throw ServiceCommunicationError for getPartitionIds", async function () {
      await expect(client.getPartitionIds())
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", getConnectionErrorCode());
    });

    it("should throw ServiceCommunicationError while sending", async function () {
      await expect(client.sendBatch([{ body: "Hello World" }]))
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", getConnectionErrorCode());
    });

    it("should throw ServiceCommunicationError while creating a batch", async function () {
      await expect(client.createBatch())
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", getConnectionErrorCode());
    });
  });

  describe("EventHubConsumerClient with non existent event hub", function () {
    let client: EventHubConsumerClient;
    const expectedErrCode = "MessagingEntityNotFoundError";

    beforeEach(async function () {
      client = createConsumer({ eventhubName: "bad" }).consumer;
    });

    afterEach(async function () {
      await client.close();
    });

    it("should throw MessagingEntityNotFoundError for getEventHubProperties", async function () {
      await expect(client.getEventHubProperties())
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", expectedErrCode);
    });

    it("should throw MessagingEntityNotFoundError for getPartitionProperties", async function () {
      await expect(client.getPartitionProperties("0"))
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", expectedErrCode);
    });

    it("should throw MessagingEntityNotFoundError for getPartitionIds", async function () {
      await expect(client.getPartitionIds())
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", expectedErrCode);
    });

    it("should throw MessagingEntityNotFoundError while subscribe()", async function () {
      const caughtErr = await getSubscriptionPromise(client);
      debug(caughtErr);
      should.equal(caughtErr instanceof MessagingError && caughtErr.code, expectedErrCode);
    });
  });

  describe("EventHubProducerClient with non existent event hub", function () {
    let client: EventHubProducerClient;
    const expectedErrCode = "MessagingEntityNotFoundError";

    beforeEach(async function () {
      client = createProducer({ eventhubName: "bad" }).producer;
    });

    afterEach(async function () {
      await client.close();
    });

    it("should throw MessagingEntityNotFoundError for getEventHubProperties", async function () {
      await expect(client.getEventHubProperties())
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", expectedErrCode);
    });

    it("should throw MessagingEntityNotFoundError for getPartitionProperties", async function () {
      await expect(client.getPartitionProperties("0"))
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", expectedErrCode);
    });

    it("should throw MessagingEntityNotFoundError for getPartitionIds", async function () {
      await expect(client.getPartitionIds())
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", expectedErrCode);
    });

    it("should throw MessagingEntityNotFoundError while sending", async function () {
      await expect(client.sendBatch([{ body: "Hello World" }]))
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", expectedErrCode);
    });

    it("should throw MessagingEntityNotFoundError while creating a batch", async function () {
      await expect(client.createBatch())
        .to.eventually.be.rejectedWith(MessagingError)
        .and.has.property("code", expectedErrCode);
    });
  });

  describe("EventHubConsumerClient User Agent String", function () {
    it("should correctly populate the default user agent", async function () {
      const { consumer } = createConsumer();
      testUserAgentString(consumer["_context"]);
      await consumer.close();
    });

    it("should correctly populate the custom user agent", async function () {
      const customUserAgent = "boo";
      const { consumer } = createConsumer({ options: { userAgent: customUserAgent } });
      testUserAgentString(consumer["_context"], customUserAgent);
      await consumer.close();
    });
  });

  describe("EventHubProducerClient User Agent String", function () {
    it("should correctly populate the default user agent", async function () {
      const { producer } = createProducer();
      testUserAgentString(producer["_context"]);
      await producer.close();
    });

    it("should correctly populate the custom user agent", async function () {
      const customUserAgent = "boo";
      const { producer } = createProducer({ options: { userAgent: customUserAgent } });
      testUserAgentString(producer["_context"], customUserAgent);
      await producer.close();
    });
  });

  function testUserAgentString(context: ConnectionContext, customValue?: string): void {
    const packageVersion = packageJsonInfo.version;
    const properties = context.connection.options.properties;
    properties!["user-agent"].should.startWith(
      `azsdk-js-azureeventhubs/${packageVersion} (${getRuntimeInfo()})`,
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
      properties!["user-agent"].should.endWith(customValue);
    }
  }

  describe("EventHubConsumerClient after close()", function () {
    let client: EventHubConsumerClient;
    const expectedErrorMsg = "The underlying AMQP connection is closed.";

    beforeEach(async function () {
      client = createConsumer().consumer;
      // Ensure that the connection is opened
      await client.getPartitionIds();
      await client.close();
    });

    it("should throw connection closed error for getEventHubProperties", async function () {
      await expect(client.getEventHubProperties()).to.eventually.be.rejectedWith(expectedErrorMsg);
    });

    it("should throw connection closed error for getPartitionProperties", async function () {
      await expect(client.getPartitionProperties("0")).to.eventually.be.rejectedWith(
        expectedErrorMsg,
      );
    });

    it("should throw connection closed error for getPartitionIds", async function () {
      await expect(client.getPartitionIds()).to.eventually.be.rejectedWith(expectedErrorMsg);
    });

    it("should throw connection closed error while subscribe()", async function () {
      const caughtErr = await getSubscriptionPromise(client);
      debug(caughtErr);
      should.equal(caughtErr.message, expectedErrorMsg);
    });
  });

  describe("EventHubProducerClient after close()", function () {
    let client: EventHubProducerClient;
    const expectedErrorMsg = "The underlying AMQP connection is closed.";

    beforeEach(async function () {
      client = createProducer().producer;
      // Ensure that the connection is opened
      await client.getPartitionIds();
      await client.close();
    });

    it("should throw connection closed error for getEventHubProperties", async function () {
      await expect(client.getEventHubProperties()).to.eventually.be.rejectedWith(expectedErrorMsg);
    });

    it("should throw connection closed error for getPartitionProperties", async function () {
      await expect(client.getPartitionProperties("0")).to.eventually.be.rejectedWith(
        expectedErrorMsg,
      );
    });

    it("should throw connection closed error for getPartitionIds", async function () {
      await expect(client.getPartitionIds()).to.eventually.be.rejectedWith(expectedErrorMsg);
    });

    it("should throw connection closed error while sending", async function () {
      await expect(client.sendBatch([{ body: "Hello World" }])).to.eventually.be.rejectedWith(
        expectedErrorMsg,
      );
    });

    it("should throw connection closed error while creating a batch", async function () {
      await expect(client.createBatch()).to.eventually.be.rejectedWith(expectedErrorMsg);
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import * as os from "os";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import chaiString from "chai-string";
chai.use(chaiString);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:client-spec");
import {
  TokenCredential,
  EventHubProducerClient,
  EventHubConsumerClient,
  Subscription
} from "../src";
import { packageJsonInfo } from "../src/util/constants";
import { EnvVarKeys, getEnvVars, isNode } from "./utils/testUtils";
import { MessagingError } from "@azure/core-amqp";
import { ConnectionContext } from "../src/connectionContext";
const env = getEnvVars();

describe("Create EventHubConsumerClient", function(): void {
  it("throws when no EntityPath in connection string", function(): void {
    const connectionString = "Endpoint=sb://abc";
    const test = function(): EventHubConsumerClient {
      return new EventHubConsumerClient("dummy", connectionString);
    };
    test.should.throw(
      Error,
      `Either provide "eventHubName" or the "connectionString": "${connectionString}", ` +
        `must contain "EntityPath=<your-event-hub-name>".`
    );
  });

  it("throws when EntityPath in connection string doesn't match with event hub name parameter", function(): void {
    const connectionString =
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c=;EntityPath=my-event-hub-name";
    const eventHubName = "event-hub-name";
    const test = function(): EventHubConsumerClient {
      return new EventHubConsumerClient("dummy", connectionString, eventHubName);
    };
    test.should.throw(
      Error,
      `The entity path "my-event-hub-name" in connectionString: "${connectionString}" ` +
        `doesn't match with eventHubName: "${eventHubName}".`
    );
  });

  it("sets eventHubName, fullyQualifiedNamespace properties when created from a connection string", function(): void {
    const client = new EventHubConsumerClient(
      "dummy",
      "Endpoint=sb://test.servicebus.windows.net;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=my-event-hub-name"
    );
    client.should.be.an.instanceof(EventHubConsumerClient);
    should.equal(client.eventHubName, "my-event-hub-name");
    should.equal(client.fullyQualifiedNamespace, "test.servicebus.windows.net");
  });

  it("sets eventHubName, fullyQualifiedNamespace properties when created from a connection string and event hub name", function(): void {
    const client = new EventHubConsumerClient(
      "dummy",
      "Endpoint=sb://test.servicebus.windows.net;SharedAccessKeyName=b;SharedAccessKey=c",
      "my-event-hub-name"
    );
    client.should.be.an.instanceof(EventHubConsumerClient);
    should.equal(client.eventHubName, "my-event-hub-name");
    should.equal(client.fullyQualifiedNamespace, "test.servicebus.windows.net");
  });

  it("sets eventHubName, fullyQualifiedNamespace properties when created from a token credential", function(): void {
    const dummyCredential: TokenCredential = {
      getToken: async () => {
        return {
          token: "boo",
          expiresOnTimestamp: 12324
        };
      }
    };
    const client = new EventHubConsumerClient(
      "dummy",
      "test.servicebus.windows.net",
      "my-event-hub-name",
      dummyCredential
    );
    client.should.be.an.instanceof(EventHubConsumerClient);
    should.equal(client.eventHubName, "my-event-hub-name");
    should.equal(client.fullyQualifiedNamespace, "test.servicebus.windows.net");
  });
});

describe("Create EventHubProducerClient", function(): void {
  it("throws when no EntityPath in connection string ", function(): void {
    const connectionString = "Endpoint=sb://abc";
    const test = function(): EventHubProducerClient {
      return new EventHubProducerClient(connectionString);
    };
    test.should.throw(
      Error,
      `Either provide "eventHubName" or the "connectionString": "${connectionString}", ` +
        `must contain "EntityPath=<your-event-hub-name>".`
    );
  });

  it("throws when EntityPath in connection string doesn't match with event hub name parameter", function(): void {
    const connectionString =
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c=;EntityPath=my-event-hub-name";
    const eventHubName = "event-hub-name";
    const test = function(): EventHubProducerClient {
      return new EventHubProducerClient(connectionString, eventHubName);
    };
    test.should.throw(
      Error,
      `The entity path "my-event-hub-name" in connectionString: "${connectionString}" ` +
        `doesn't match with eventHubName: "${eventHubName}".`
    );
  });

  it("sets eventHubName, fullyQualifiedNamespace properties when created from a connection string", function(): void {
    const client = new EventHubProducerClient(
      "Endpoint=sb://test.servicebus.windows.net;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=my-event-hub-name"
    );
    client.should.be.an.instanceof(EventHubProducerClient);
    should.equal(client.eventHubName, "my-event-hub-name");
    should.equal(client.fullyQualifiedNamespace, "test.servicebus.windows.net");
  });

  it("sets eventHubName, fullyQualifiedNamespace properties when created from a connection string and event hub name", function(): void {
    const client = new EventHubProducerClient(
      "Endpoint=sb://test.servicebus.windows.net;SharedAccessKeyName=b;SharedAccessKey=c",
      "my-event-hub-name"
    );
    client.should.be.an.instanceof(EventHubProducerClient);
    should.equal(client.eventHubName, "my-event-hub-name");
    should.equal(client.fullyQualifiedNamespace, "test.servicebus.windows.net");
  });

  it("sets eventHubName, fullyQualifiedNamespace properties when created from a token credential", function(): void {
    const dummyCredential: TokenCredential = {
      getToken: async () => {
        return {
          token: "boo",
          expiresOnTimestamp: 12324
        };
      }
    };
    const client = new EventHubProducerClient(
      "test.servicebus.windows.net",
      "my-event-hub-name",
      dummyCredential
    );
    client.should.be.an.instanceof(EventHubProducerClient);
    should.equal(client.eventHubName, "my-event-hub-name");
    should.equal(client.fullyQualifiedNamespace, "test.servicebus.windows.net");
  });
});

describe("EventHubConsumerClient with non existent namespace", function(): void {
  let client: EventHubConsumerClient;
  const expectedErrCode = isNode ? "ENOTFOUND" : "ServiceCommunicationError";
  beforeEach(() => {
    client = new EventHubConsumerClient(
      "$Default",
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
  });

  afterEach(() => {
    return client.close();
  });

  it("should throw ServiceCommunicationError for getEventHubProperties", async function(): Promise<
    void
  > {
    try {
      await client.getEventHubProperties();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw ServiceCommunicationError for getPartitionProperties", async function(): Promise<
    void
  > {
    try {
      await client.getPartitionProperties("0");
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw ServiceCommunicationError for getPartitionIds", async function(): Promise<void> {
    try {
      await client.getPartitionIds();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw ServiceCommunicationError while subscribe()", async function(): Promise<void> {
    let subscription: Subscription | undefined;
    const caughtErr = await new Promise<Error | MessagingError>((resolve) => {
      subscription = client.subscribe({
        processEvents: async () => {},
        processError: async (err) => {
          resolve(err);
        }
      });
    });
    if (subscription) {
      await subscription.close();
    }
    debug(caughtErr);
    should.equal(caughtErr instanceof MessagingError && caughtErr.code, expectedErrCode);
    await client.close();
  });
});

describe("EventHubProducerClient with non existent namespace", function(): void {
  let client: EventHubProducerClient;
  const expectedErrCode = isNode ? "ENOTFOUND" : "ServiceCommunicationError";
  beforeEach(() => {
    client = new EventHubProducerClient(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
  });

  afterEach(() => {
    return client.close();
  });

  it("should throw ServiceCommunicationError for getEventHubProperties", async function(): Promise<
    void
  > {
    try {
      await client.getEventHubProperties();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw ServiceCommunicationError for getPartitionProperties", async function(): Promise<
    void
  > {
    try {
      await client.getPartitionProperties("0");
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw ServiceCommunicationError for getPartitionIds", async function(): Promise<void> {
    try {
      await client.getPartitionIds();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw ServiceCommunicationError while sending", async function(): Promise<void> {
    try {
      await client.sendBatch([{ body: "Hello World" }]);
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw ServiceCommunicationError while creating a batch", async function(): Promise<
    void
  > {
    try {
      await client.createBatch();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });
});

describe("EventHubConsumerClient with non existent event hub", function(): void {
  let client: EventHubConsumerClient;
  const expectedErrCode = "MessagingEntityNotFoundError";

  beforeEach(() => {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );

    client = new EventHubConsumerClient("dummy", env[EnvVarKeys.EVENTHUB_CONNECTION_STRING], "bad");
  });

  afterEach(() => {
    return client.close();
  });

  it("should throw MessagingEntityNotFoundError for getEventHubProperties", async function(): Promise<
    void
  > {
    try {
      await client.getEventHubProperties();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw MessagingEntityNotFoundError for getPartitionProperties", async function(): Promise<
    void
  > {
    try {
      await client.getPartitionProperties("0");
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw MessagingEntityNotFoundError for getPartitionIds", async function(): Promise<
    void
  > {
    try {
      await client.getPartitionIds();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw MessagingEntityNotFoundError while subscribe()", async function(): Promise<
    void
  > {
    let subscription: Subscription | undefined;
    const caughtErr = await new Promise<Error | MessagingError>((resolve) => {
      subscription = client.subscribe({
        processEvents: async () => {},
        processError: async (err) => {
          resolve(err);
        }
      });
    });
    if (subscription) {
      await subscription.close();
    }
    debug(caughtErr);
    should.equal(caughtErr instanceof MessagingError && caughtErr.code, expectedErrCode);
    await client.close();
  });
});

describe("EventHubProducerClient with non existent event hub", function(): void {
  let client: EventHubProducerClient;
  const expectedErrCode = "MessagingEntityNotFoundError";

  beforeEach(() => {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    client = new EventHubProducerClient(env[EnvVarKeys.EVENTHUB_CONNECTION_STRING], "bad");
  });

  afterEach(() => {
    return client.close();
  });

  it("should throw MessagingEntityNotFoundError for getEventHubProperties", async function(): Promise<
    void
  > {
    try {
      await client.getEventHubProperties();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw MessagingEntityNotFoundError for getPartitionProperties", async function(): Promise<
    void
  > {
    try {
      await client.getPartitionProperties("0");
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw MessagingEntityNotFoundError for getPartitionIds", async function(): Promise<
    void
  > {
    try {
      await client.getPartitionIds();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw MessagingEntityNotFoundError while sending", async function(): Promise<void> {
    try {
      await client.sendBatch([{ body: "Hello World" }]);
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw MessagingEntityNotFoundError while creating a batch", async function(): Promise<
    void
  > {
    try {
      await client.createBatch();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });
});

describe("EventHubConsumerClient User Agent String", function(): void {
  beforeEach(() => {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );

    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });

  it("should correctly populate the default user agent", async function(): Promise<void> {
    const consumerClient = new EventHubConsumerClient(
      "$Default",
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      env[EnvVarKeys.EVENTHUB_NAME]
    );
    testUserAgentString(consumerClient["_context"]);
    await consumerClient.close();
  });

  it("should correctly populate the custom user agent", async function(): Promise<void> {
    const customUserAgent = "boo";
    const consumerClient = new EventHubConsumerClient(
      "$Default",
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      env[EnvVarKeys.EVENTHUB_NAME],
      { userAgent: customUserAgent }
    );
    testUserAgentString(consumerClient["_context"], customUserAgent);
    await consumerClient.close();
  });
});

describe("EventHubProducerClient User Agent String", function(): void {
  beforeEach(() => {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );

    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });

  it("should correctly populate the default user agent", async function(): Promise<void> {
    const producerClient = new EventHubProducerClient(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      env[EnvVarKeys.EVENTHUB_NAME]
    );
    testUserAgentString(producerClient["_context"]);
    await producerClient.close();
  });

  it("should correctly populate the custom user agent", async function(): Promise<void> {
    const customUserAgent = "boo";
    const producerClient = new EventHubProducerClient(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      env[EnvVarKeys.EVENTHUB_NAME],
      { userAgent: customUserAgent }
    );
    testUserAgentString(producerClient["_context"], customUserAgent);
    await producerClient.close();
  });
});

function testUserAgentString(context: ConnectionContext, customValue?: string) {
  const packageVersion = packageJsonInfo.version;
  const properties = context.connection.options.properties;
  properties!["user-agent"].should.startWith(`azsdk-js-azureeventhubs/${packageVersion}`);
  should.equal(properties!.product, "MSJSClient");
  should.equal(properties!.version, packageVersion);
  if (isNode) {
    should.equal(properties!.framework, `Node/${process.version}`);
  } else {
    should.equal(properties!.framework.startsWith("Browser/"), true);
  }
  should.equal(properties!.platform, `(${os.arch()}-${os.type()}-${os.release()})`);
  if (customValue) {
    properties!["user-agent"].should.endWith(customValue);
  }
}

describe("EventHubConsumerClient after close()", function(): void {
  let client: EventHubConsumerClient;
  const expectedErrorMsg = "The underlying AMQP connection is closed.";

  async function beforeEachTest(): Promise<void> {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
    client = new EventHubConsumerClient(
      "$Default",
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      env[EnvVarKeys.EVENTHUB_NAME]
    );

    // Ensure that the connection is opened
    await client.getPartitionIds();

    // close(), so that we can then test the resulting error.
    await client.close();
  }

  it("should throw connection closed error for getEventHubProperties", async function(): Promise<
    void
  > {
    await beforeEachTest();
    try {
      await client.getEventHubProperties();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.message, expectedErrorMsg);
    }
  });

  it("should throw connection closed error for getPartitionProperties", async function(): Promise<
    void
  > {
    await beforeEachTest();
    try {
      await client.getPartitionProperties("0");
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.message, expectedErrorMsg);
    }
  });

  it("should throw connection closed error for getPartitionIds", async function(): Promise<void> {
    await beforeEachTest();
    try {
      await client.getPartitionIds();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.message, expectedErrorMsg);
    }
  });

  it("should throw connection closed error while subscribe()", async function(): Promise<void> {
    await beforeEachTest();
    let subscription: Subscription | undefined;
    const caughtErr = await new Promise<Error | MessagingError>((resolve) => {
      subscription = client.subscribe({
        processEvents: async () => {},
        processError: async (err) => {
          resolve(err);
        }
      });
    });
    if (subscription) {
      await subscription.close();
    }
    debug(caughtErr);
    should.equal(caughtErr.message, expectedErrorMsg);
  });
});

describe("EventHubProducerClient after close()", function(): void {
  let client: EventHubProducerClient;
  const expectedErrorMsg = "The underlying AMQP connection is closed.";

  async function beforeEachTest(): Promise<void> {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
    client = new EventHubProducerClient(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      env[EnvVarKeys.EVENTHUB_NAME]
    );

    // Ensure that the connection is opened
    await client.getPartitionIds();

    // close(), so that we can then test the resulting error.
    await client.close();
  }

  it("should throw connection closed error for getEventHubProperties", async function(): Promise<
    void
  > {
    await beforeEachTest();
    try {
      await client.getEventHubProperties();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.message, expectedErrorMsg);
    }
  });

  it("should throw connection closed error for getPartitionProperties", async function(): Promise<
    void
  > {
    await beforeEachTest();
    try {
      await client.getPartitionProperties("0");
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.message, expectedErrorMsg);
    }
  });

  it("should throw connection closed error for getPartitionIds", async function(): Promise<void> {
    await beforeEachTest();
    try {
      await client.getPartitionIds();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.message, expectedErrorMsg);
    }
  });

  it("should throw connection closed error while sending", async function(): Promise<void> {
    await beforeEachTest();
    try {
      await client.sendBatch([{ body: "Hello World" }]);
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.message, expectedErrorMsg);
    }
  });

  it("should throw connection closed error while creating a batch", async function(): Promise<
    void
  > {
    await beforeEachTest();
    try {
      await client.createBatch();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.message, expectedErrorMsg);
    }
  });
});

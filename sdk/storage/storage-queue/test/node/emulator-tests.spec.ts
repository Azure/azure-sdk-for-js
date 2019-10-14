import * as assert from "assert";
import { MessagesClient, QueueClient, QueueServiceClient, MessageIdClient } from "../../src";
import { getConnectionStringFromEnvironment, getQSU } from "../utils";
import { isBrowser, getUniqueName } from "../utils/testutils.common";

// Expected environment variables to run this test-suite
// STORAGE_CONNECTION_STRING=UseDevelopmentStorage=true
describe("Emulator Tests", () => {
  const messageContent = "Hello World";
  let queueName: string;
  let queueClient: QueueClient;
  let queueServiceClient = getQSU();
  const env = isBrowser() ? (window as any).__env__ : process.env;
  beforeEach(async function() {
    if (!env.STORAGE_CONNECTION_STRING.startsWith("UseDevelopmentStorage=true")) {
      this.skip();
    }
    queueName = getUniqueName("queue");
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  it("MessagesClient can be created with a connection string and a queue name", async () => {
    const newClient = new MessagesClient(getConnectionStringFromEnvironment(), queueName);

    const eResult = await newClient.enqueue(messageContent);
    assert.equal(newClient.queueName, queueName, "Queue name didn't match with the provided one.");
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
  });

  it("MessageIdClient can update message with 64B encoded characters", async () => {
    const newClient = new MessagesClient(getConnectionStringFromEnvironment(), queueName);

    const eResult = await newClient.enqueue(messageContent);
    assert.equal(newClient.queueName, queueName, "Queue name didn't match with the provided one.");
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);

    const messageIdClient = new MessageIdClient(
      getConnectionStringFromEnvironment(),
      queueName,
      eResult.messageId
    );
    assert.equal(
      messageIdClient.queueName,
      queueName,
      "Queue name didn't match with the provided one."
    );
    assert.equal(
      messageIdClient.messageId,
      eResult.messageId,
      "messageId didn't match with the provided one."
    );

    let buffer = Buffer.alloc(64); //64B
    buffer.fill("a");
    buffer.write("aaaa", 0);
    let newMessage = buffer.toString();

    let uResult = await messageIdClient.update(eResult.popReceipt, newMessage);
    assert.ok(uResult.popReceipt);

    let pResult = await newClient.peek();
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);
  });

  it("QueueClient can be created with a connection string and a queue name", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName);

    const result = await newClient.getProperties();

    assert.equal(newClient.queueName, queueName, "Queue name didn't match with the provided one.");
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("QueueServiceClient can be created from a connection string", async () => {
    const newClient = QueueServiceClient.fromConnectionString(getConnectionStringFromEnvironment());

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });
});

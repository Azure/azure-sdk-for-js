import * as assert from "assert";
import { MessagesClient, QueueClient, QueueServiceClient } from "../../src";
import { getConnectionStringFromEnvironment, isBrowser } from "../utils";

// Expected environment variables to run this test-suite
// STORAGE_CONNECTION_STRING=UseDevelopmentStorage=true
// TEST_MODE=emulator-tests
describe("Emulator Tests", () => {
  const messageContent = "Hello World";
  let queueName: string;
  let queueClient: QueueClient;
  const env = isBrowser() ? (window as any).__env__ : process.env;
  beforeEach(async function() {
    if (env.TEST_MODE !== "emulator-tests") {
      this.skip();
    }
    const queueServiceClient = QueueServiceClient.fromConnectionString(
      getConnectionStringFromEnvironment()
    );
    queueName = "queue";
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  it("MessagesClient can be created with a connection string and a queue name", async () => {
    const newClient = new MessagesClient(getConnectionStringFromEnvironment(), queueName);

    const eResult = await newClient.enqueue(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
  });

  it("QueueClient can be created with a connection string and a queue name", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName);

    const result = await newClient.getProperties();

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

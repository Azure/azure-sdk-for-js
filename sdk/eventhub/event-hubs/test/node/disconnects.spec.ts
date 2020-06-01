// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { EnvVarKeys, getEnvVars } from "../utils/testUtils";
import { EventHubClient } from "../../src/impl/eventHubClient";
import { EventHubProducerClient } from "../../src/index";
const env = getEnvVars();

describe("disconnected", function() {
  let client: EventHubClient;
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  before("validate environment", function(): void {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });

  afterEach("close the connection", async function(): Promise<void> {
    if (client) {
      await client.close();
    }
  });

  describe("HubRuntime", function() {
    it("operations work after disconnect", async () => {
      client = new EventHubClient(service.connectionString, service.path);
      const clientConnectionContext = client["_context"];

      await client.getPartitionIds({});
      const originalConnectionId = clientConnectionContext.connectionId;

      // Trigger a disconnect on the underlying connection.
      clientConnectionContext.connection["_connection"].idle();

      const partitionIds = await client.getPartitionIds({});
      const newConnectionId = clientConnectionContext.connectionId;

      should.not.equal(originalConnectionId, newConnectionId);
      partitionIds.length.should.greaterThan(0, "Invalid number of partition ids returned.");
    });
  });

  describe("Receiver", function() {
    it("should receive after a disconnect", async () => {
      client = new EventHubClient(service.connectionString, service.path);
      const receiver = client.createConsumer(EventHubClient.defaultConsumerGroupName, "0", {
        sequenceNumber: 0
      });
      const clientConnectionContext = receiver["_context"];

      await receiver.receiveBatch(1, 1);
      const originalConnectionId = clientConnectionContext.connectionId;

      // Trigger a disconnect on the underlying connection.
      clientConnectionContext.connection["_connection"].idle();

      await receiver.receiveBatch(1, 1);
      const newConnectionId = clientConnectionContext.connectionId;

      should.not.equal(originalConnectionId, newConnectionId);

      await receiver.close();
    });
  });

  describe("Sender", function() {
    it("should send after a disconnect", async () => {
      const client = new EventHubProducerClient(service.connectionString, service.path);
      const clientConnectionContext = client["_client"]["_context"];

      await client.sendBatch([{ body: "test" }]);
      const originalConnectionId = clientConnectionContext.connectionId;

      // Trigger a disconnect on the underlying connection.
      clientConnectionContext.connection["_connection"].idle();

      await client.sendBatch([{ body: "test2" }]);
      const newConnectionId = clientConnectionContext.connectionId;

      should.not.equal(originalConnectionId, newConnectionId);

      await client.close();
    });

    it("should not throw an uncaught exception", async () => {
      const client = new EventHubProducerClient(service.connectionString, service.path);
      const clientConnectionContext = client["_client"]["_context"];

      // Send an event to open the connection.
      await client.sendBatch([{ body: "test" }]);
      const originalConnectionId = clientConnectionContext.connectionId;

      // We need to dig deep into the internals to get the awaitable sender so that .
      const awaitableSender = client["_producersMap"].get("")!["_eventHubSender"]!["_sender"]!;

      let thirdSend: Promise<void>;
      // Change the timeout on the awaitableSender so it forces an OperationTimeoutError
      awaitableSender.sendTimeoutInSeconds = 0;
      // Ensure that the connection will disconnect, and another sendBatch occurs while a sendBatch is in-flight.
      setTimeout(() => {
        // Trigger a disconnect on the underlying connection while the `sendBatch` is in flight.
        clientConnectionContext.connection["_connection"].idle();
        // Triggering another sendBatch immediately after an idle
        // used to cause the rhea connection remote state to be cleared.
        // This caused the in-flight sendBatch to throw an uncaught error
        // if it timed out.
        thirdSend = client.sendBatch([{ body: "test3" }]);
      }, 0);

      await client.sendBatch([{ body: "test2" }]);
      const newConnectionId = clientConnectionContext.connectionId;

      should.not.equal(originalConnectionId, newConnectionId);

      // ensure the sendBatch from the setTimeout succeeded.
      // Wait for the connectionContext to be ready for opening.
      await thirdSend!;

      await client.close();
    });
  });
});

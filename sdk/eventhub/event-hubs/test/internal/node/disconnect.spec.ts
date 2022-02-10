// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EnvVarKeys, getEnvVars } from "../../public/utils/testUtils";
import { EventHubConsumerClient, latestEventPosition } from "../../../src";
import { EventHubReceiver } from "../../../src/eventHubReceiver";
import { EventHubSender } from "../../../src/eventHubSender";
import { MessagingError } from "@azure/core-amqp";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { createConnectionContext } from "../../../src/connectionContext";
import { createMockServer } from "../../public/utils/mockService";
import { stub } from "sinon";
import { testWithServiceTypes } from "../../public/utils/testWithServiceTypes";

const should = chai.should();
chai.use(chaiAsPromised);

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

  describe("disconnected", function () {
    let partitionIds: string[] = [];
    const service = {
      connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      path: env[EnvVarKeys.EVENTHUB_NAME],
    };
    before("validate environment", function (): void {
      should.exist(
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarKeys.EVENTHUB_NAME],
        "define EVENTHUB_NAME in your environment before running integration tests."
      );
    });

    before("get partition ids", async function () {
      const client = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        service.connectionString,
        service.path
      );
      partitionIds = await client.getPartitionIds();
      return client.close();
    });

    describe("EventHubSender", function () {
      /**
       * Test added for issue https://github.com/Azure/azure-sdk-for-js/issues/15002
       * Prior to fixing this issue, a TypeError would be thrown when this test was ran.
       */
      it("send works after disconnect", async () => {
        const context = createConnectionContext(service.connectionString, service.path);
        const sender = EventHubSender.create(context, { enableIdempotentProducer: false });

        // Create the sender link via getMaxMessageSize() so we can check when 'send' is about to be called on it.
        await sender.getMaxMessageSize();
        should.equal(sender.isOpen(), true, "Expected sender to be open.");

        // Here we stub out the 'send' call on the AwaitableSender.
        // We do 2 things:
        // 1. Call `idle()` on the underlying rhea connection so that a disconnect is triggered.
        // 2. Reject with a MessagingError.
        // The MessagingError is thrown so that the send operation will be retried.
        // The disconnect that's triggered will cause the existing AwaitableSender to be closed.

        // If everything works as expected, then a new AwaitableSender should be created on the next
        // retry attempt and the event should be successfully sent.
        const senderLink = sender["_sender"]!;
        const sendStub = stub(senderLink, "send");
        sendStub.callsFake(async () => {
          context.connection["_connection"].idle();
          throw new MessagingError("Fake rejection!");
        });

        await sender.send([{ body: "foo" }]);

        await context.close();
      });
    });

    describe("ConnectionContext", function () {
      describe("onDisconnected", function () {
        it("does not fail when entities are closed concurrently", async () => {
          const context = createConnectionContext(service.connectionString, service.path);

          // Add 2 receivers.
          const receiver1 = new EventHubReceiver(
            context,
            EventHubConsumerClient.defaultConsumerGroupName,
            partitionIds[0],
            latestEventPosition
          );
          const receiver2 = new EventHubReceiver(
            context,
            EventHubConsumerClient.defaultConsumerGroupName,
            partitionIds[1],
            latestEventPosition
          );

          // Add 2 senders.
          const sender1 = new EventHubSender(context, { enableIdempotentProducer: false });
          const sender2 = new EventHubSender(context, { enableIdempotentProducer: false });

          // Initialize sender links
          await sender1["_getLink"]();
          await sender2["_getLink"]();

          // Initialize receiver links
          await receiver1.initialize({
            abortSignal: undefined,
            timeoutInMs: 60000,
          });
          await receiver2.initialize({
            abortSignal: undefined,
            timeoutInMs: 60000,
          });

          // We are going to override sender1's close method so that it also invokes receiver2's close method.
          const sender1Close = sender1.close.bind(sender1);
          sender1.close = async function () {
            sender2.close().catch(() => {
              /* no-op */
            });
            return sender1Close();
          };

          // We are going to override receiver1's close method so that it also invokes receiver2's close method.
          const receiver1Close = receiver1.close.bind(receiver1);
          receiver1.close = async function () {
            receiver2.close().catch(() => {
              /* no-op */
            });
            return receiver1Close();
          };

          context.connection["_connection"].idle();
          await context.readyToOpenLink();
          await context.close();
        });
      });

      describe("close", function () {
        it("does not fail when entities are closed concurrently", async () => {
          const context = createConnectionContext(service.connectionString, service.path);

          // Add 2 receivers.
          const receiver1 = new EventHubReceiver(
            context,
            EventHubConsumerClient.defaultConsumerGroupName,
            partitionIds[0],
            latestEventPosition
          );
          const receiver2 = new EventHubReceiver(
            context,
            EventHubConsumerClient.defaultConsumerGroupName,
            partitionIds[1],
            latestEventPosition
          );

          // Add 2 senders.
          const sender1 = new EventHubSender(context, { enableIdempotentProducer: false });
          const sender2 = new EventHubSender(context, { enableIdempotentProducer: false });

          // Initialize sender links
          await sender1["_getLink"]();
          await sender2["_getLink"]();

          // Initialize receiver links
          await receiver1.initialize({
            abortSignal: undefined,
            timeoutInMs: 60000,
          });
          await receiver2.initialize({
            abortSignal: undefined,
            timeoutInMs: 60000,
          });

          // We are going to override sender1's close method so that it also invokes receiver2's close method.
          const sender1Close = sender1.close.bind(sender1);
          sender1.close = async function () {
            sender2.close().catch(() => {
              /* no-op */
            });
            return sender1Close();
          };

          // We are going to override receiver1's close method so that it also invokes receiver2's close method.
          const originalClose = receiver1.close.bind(receiver1);
          receiver1.close = async function () {
            receiver2.close().catch(() => {
              /* no-op */
            });
            return originalClose();
          };
          await context.close();
        });
      });
    });
  });
});

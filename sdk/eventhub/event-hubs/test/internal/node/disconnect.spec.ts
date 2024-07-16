// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventHubConsumerClient, latestEventPosition } from "../../../src/index.js";
import { createReceiver, WritableReceiver } from "../../../src/partitionReceiver.js";
import { EventHubSender } from "../../../src/eventHubSender.js";
import { MessagingError } from "@azure/core-amqp";
import { should } from "../../utils/chai.js";
import { describe, it, beforeAll, vi } from "vitest";
import { createConsumer, createContext } from "../../utils/clients.js";

describe("disconnected", function () {
  let partitionIds: string[] = [];

  beforeAll(async function () {
    const client = createConsumer().consumer;
    partitionIds = await client.getPartitionIds();
    return client.close();
  });

  describe("EventHubSender", function () {
    /**
     * Test added for issue https://github.com/Azure/azure-sdk-for-js/issues/15002
     * Prior to fixing this issue, a TypeError would be thrown when this test was ran.
     */
    it("send works after disconnect", async function () {
      const context = createContext().context;
      const sender = EventHubSender.create(context, "Sender1", {
        enableIdempotentProducer: false,
      });

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
      vi.spyOn(senderLink, "send").mockImplementationOnce(async (_) => {
        context.connection["_connection"].idle();
        throw new MessagingError("Fake rejection!");
      });

      await sender.send([{ body: "foo" }]);

      await context.close();
    });
  });

  describe("ConnectionContext", function () {
    describe("onDisconnected", function () {
      it("does not fail when entities are closed concurrently", async function () {
        const context = createContext().context;

        // Add 2 receivers.
        const receiver1 = createReceiver(
          context,
          EventHubConsumerClient.defaultConsumerGroupName,
          "Consumer1",
          partitionIds[0],
          latestEventPosition,
        );
        const receiver2 = createReceiver(
          context,
          EventHubConsumerClient.defaultConsumerGroupName,
          "Consumer2",
          partitionIds[1],
          latestEventPosition,
        );

        // Add 2 senders.
        const sender1 = new EventHubSender(context, "Sender1", {
          enableIdempotentProducer: false,
        });
        const sender2 = new EventHubSender(context, "Sender2", {
          enableIdempotentProducer: false,
        });

        // Initialize sender links
        await sender1["_getLink"]();
        await sender2["_getLink"]();

        // Initialize receiver links
        await receiver1.connect({
          abortSignal: undefined,
          timeoutInMs: 60000,
        });
        await receiver2.connect({
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
        (receiver1 as WritableReceiver).close = async function () {
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
      it("does not fail when entities are closed concurrently", async function () {
        const context = createContext().context;

        // Add 2 receivers.
        const receiver1 = createReceiver(
          context,
          EventHubConsumerClient.defaultConsumerGroupName,
          "Consumer1",
          partitionIds[0],
          latestEventPosition,
        );
        const receiver2 = createReceiver(
          context,
          EventHubConsumerClient.defaultConsumerGroupName,
          "Consumer2",
          partitionIds[1],
          latestEventPosition,
        );

        // Add 2 senders.
        const sender1 = new EventHubSender(context, "Sender1", {
          enableIdempotentProducer: false,
        });
        const sender2 = new EventHubSender(context, "Sender2", {
          enableIdempotentProducer: false,
        });

        // Initialize sender links
        await sender1["_getLink"]();
        await sender2["_getLink"]();

        // Initialize receiver links
        await receiver1.connect({
          abortSignal: undefined,
          timeoutInMs: 60000,
        });
        await receiver2.connect({
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
        (receiver1 as WritableReceiver).close = async function () {
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

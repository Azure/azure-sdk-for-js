// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  captureConsoleOutputToAppInsights,
  createRandomQueue,
  createServiceBusClient,
  getUniqueQueueName,
  isReceiveMode,
} from "./serviceBusStressTester";
import { defaultClient as appInsightsClient, Contracts } from "applicationinsights";
import {
  ServiceBusClient,
  ServiceBusReceivedMessage,
  ServiceBusReceiver,
} from "@azure/service-bus";
import { EventEmitter } from "stream";
import { EventContext, ReceiverEvents } from "rhea-promise";
import parsedArgs from "minimist";
import { generateUuid } from "@azure/core-http";

const messageNumberPropertyName = "messageNumber";

/**
 * This test is checking for a few boundary/edge conditions that we've had in the library when
 * receiving messages over longer periods of time with receiveMessages(). The bugs would typically
 * result in message loss, as well as rhea printing out 'Received transfer when credit was 0'.
 */
async function main() {
  captureConsoleOutputToAppInsights();

  appInsightsClient.commonProperties = {
    // these will be reported with each event
    testName: "scenarioShortLivedReceiver",
    testRunId: generateUuid(),
  };

  const { receiveMode, maxWaitTimeInMs, numMessagesToSend, messagesPerReceive } = {
    ...parsedArgs<{
      receiveMode: string;
      maxWaitTimeInMs: number;
      numMessagesToSend: number;
      messagesPerReceive: number;
    }>(process.argv, {
      default: {
        receiveMode: "peekLock",

        // there's nothing particularly special about these numbers but they do a decent job of provoking the bug
        // when targeted to a Service Bus in AUS, connecting from a consumer network in Redmond.
        maxWaitTimeInMs: 500,
        numMessagesToSend: 1000,
        messagesPerReceive: 5,
      },
    }),
  };

  try {
    const queueName = getUniqueQueueName();

    appInsightsClient.trackEvent({
      name: "start",
      properties: {
        queueName,
        receiveMode,
        maxWaitTimeInMs,
        numMessagesToSend,
        messagesPerReceive,
      },
    });

    if (!isReceiveMode(receiveMode)) {
      throw new TypeError(`Invalid receive mode: ${receiveMode}`);
    }

    console.log(`Test run ID(${appInsightsClient.commonProperties.testRunId!})`, {
      queueName,
      receiveMode,
      maxWaitTimeInMs,
      numMessagesToSend,
      messagesPerReceive,
    });

    await createRandomQueue(queueName);

    // create our entity
    const serviceBusClient = createServiceBusClient();

    const receiver = serviceBusClient.createReceiver(queueName, {
      receiveMode,
      // auto lock renewal is just noise for this particular test, disabling.
      maxAutoLockRenewalDurationInMs: 0,
    });

    const rheaMessageNumbers = new Set<number>();
    const userMessageNumbers = new Set<number>();

    await addValidatingListener(receiver, rheaMessageNumbers);

    await sendTestMessages(serviceBusClient, queueName, numMessagesToSend);

    console.log(`Starting receiver...`);

    // this is just a fail-safe so we don't run forever if we somehow don't get all the messages.
    let gotZeroMessagesCounter = 0;

    while (userMessageNumbers.size < numMessagesToSend && gotZeroMessagesCounter < 3) {
      const messages = await receiver.receiveMessages(messagesPerReceive, {
        maxWaitTimeInMs,
      });

      if (messages.length === 0) {
        ++gotZeroMessagesCounter;
      }

      for (const message of messages) {
        assertAndAddMessageNumber(message, userMessageNumbers);

        if (receiveMode === "peekLock") {
          await receiver.completeMessage(message);
        }
      }

      console.log(`Total: ${userMessageNumbers.size} messages`);

      appInsightsClient.trackMetric({
        name: "totalReceivedMessages",
        value: userMessageNumbers.size,
      });
    }

    await receiver.close();
    await serviceBusClient.close();

    // validate nothing is missing
    let missingUserVisibleMessages = 0;
    let missingInternalMessages = 0;

    for (let i = 0; i < numMessagesToSend; ++i) {
      if (!userMessageNumbers.has(i)) {
        missingUserVisibleMessages++;
      }

      if (!rheaMessageNumbers.has(i)) {
        missingInternalMessages++;
      }
    }

    appInsightsClient.trackMetric({
      name: "totalMissingUserVisibleMessages",
      value: missingUserVisibleMessages,
    });

    appInsightsClient.trackMetric({
      name: "totalMissingInternalMessages",
      value: missingInternalMessages,
    });

    if (missingUserVisibleMessages > 0 || missingInternalMessages > 0) {
      console.log(
        `Messages were missing: user:${missingUserVisibleMessages}, internal:${missingInternalMessages}`
      );
      process.exit(1);
    } else {
      console.log(`Success - all messages accounted for with no duplicates.`);
      process.exit(0);
    }
  } catch (err) {
    console.log(`Exception thrown: `, err);

    appInsightsClient.trackException({
      exception: err as any,
    });
  } finally {
    appInsightsClient.trackEvent({
      name: "End",
    });

    appInsightsClient.flush();
  }

  function assertAndAddMessageNumber(
    message: ServiceBusReceivedMessage,
    receivedMessageIndices: Set<number>
  ) {
    const messageNumber = message.applicationProperties?.[messageNumberPropertyName];

    if (messageNumber == null) {
      console.log(`Message with id of ${message.messageId} did not have a messageNumber`);
      throw new Error(`Message with id of ${message.messageId} did not have a messageNumber`);
    }

    if (typeof messageNumber !== "number") {
      console.log(
        `Message with id of ${
          message.messageId
        } had a messageNumber property with an incorrect type (${typeof messageNumber})`
      );
      throw new TypeError(
        `Message with id of ${
          message.messageId
        } had a messageNumber property with an incorrect type (${typeof messageNumber})`
      );
    }

    if (receivedMessageIndices.has(messageNumber)) {
      console.log(
        `Message with id of ${message.messageId} and message number ${messageNumber} has already been received`
      );
      throw new Error(
        `Message with id of ${message.messageId} and message number ${messageNumber} has already been received`
      );
    }

    receivedMessageIndices.add(messageNumber);
  }
}

main().catch((err) => {
  console.log(`Fatal error, exiting...`, err);
  process.exit(1);
});

/**
 * Adds in (through undocumented means) an event listener for messages. This is meant to be a simple check
 * that we're not somehow losing messages that were actually delivered through rhea but not surfaced to the
 * caller of our API.
 *
 * NOTE: This method does a single receive, so we can add in our batching receiver hook. The queue should be empty or
 * else it could result in message loss.
 *
 * ADDITIONAL NOTE: this method (and it's associated message listener) will terminate the test if it detects these conditions:
 * - Message received when the queue should have been empty (ie, initial call)
 * - Batching receiver not properly initialized (ie: internal details have changed and broken us)
 * - Duplicate messages are arriving (ie: all assumptions are wrong)
 *
 * @param receiver A receiver.
 * @param rawMessageNumbers A set to add the 'messageNumber' property value to.
 */
async function addValidatingListener(
  receiver: ServiceBusReceiver,
  rawMessageNumbers: Set<number>
): Promise<void> {
  // warm up the receiver so the batching receiver will be available (and we can install our 'raw messages' hook
  // for some bookkeeping.
  const ignoredMessages = await receiver.receiveMessages(1);

  if (ignoredMessages.length > 0) {
    // the queue should start off empty!
    console.log("Got messages when the queue should have been empty");
    throw new Error("Got messages when the queue should have been empty");
  }

  const linkEntity = (receiver as any)?.["_batchingReceiver"]?.["_link"] as EventEmitter;

  if (linkEntity == null) {
    console.log(
      "[raw message callback] Couldn't get a receiver._batchingReceiver._link property in the passed in receiver"
    );
    process.exit(1);
  }

  linkEntity.addListener(ReceiverEvents.message, (eventContext: EventContext) => {
    const message = eventContext.message;

    if (message == null) {
      console.log(
        "[raw message callback] Fatal test error - no message was on EventContext, but we got a message callback."
      );
      process.exit(1);
    }

    const messageNumber = message?.application_properties?.[messageNumberPropertyName];

    if (messageNumber == null || typeof messageNumber !== "number") {
      console.log(
        `[raw message callback] Fatal test error - message arrived, but without the '${messageNumberPropertyName}' property, type: ${typeof messageNumber}`
      );
      process.exit(1);
    }

    if (rawMessageNumbers.has(messageNumber)) {
      console.log(
        `[raw message callback] Fatal test error - ${messageNumber} was already received - we're receiving duplicates in our raw message callback`
      );
      process.exit(1);
    }

    rawMessageNumbers.add(messageNumber);
  });
}

/**
 * Sends `numMessagesToSend` messages that are 1000 bytes apiece. Each message
 * will have an `messageNumber` application property, which will be unique
 * for each message sent in this batch.
 */
async function sendTestMessages(
  serviceBusClient: ServiceBusClient,
  queueName: string,
  numMessagesToSend: number
): Promise<void> {
  console.log(`Starting to send ${numMessagesToSend} messages to ${queueName}`);

  const sender = serviceBusClient.createSender(queueName);

  try {
    let batch = await sender.createMessageBatch();

    const largeMessagePayload = new Array(1000).fill("a", 0);

    for (let i = 0; i < numMessagesToSend; ++i) {
      const message = {
        body: largeMessagePayload,
        applicationProperties: {
          messageNumber: i,
        },
      };

      const added = batch.tryAddMessage(message);

      if (!added) {
        await sender.sendMessages(batch);
        batch = await sender.createMessageBatch();

        if (!batch.tryAddMessage(message)) {
          console.log("Message was too big to fit in the array and can NEVER fit");
          throw new Error("Message was too big to fit in the array and can NEVER fit");
        }
      }
    }

    if (batch?.count > 0) {
      await sender.sendMessages(batch);
    }

    console.log(`Done sending messages to ${queueName}`);
  } catch (err) {
    console.log(`Exception thrown: `, err);

    appInsightsClient.trackException({
      exception: err as Error,
      severity: Contracts.SeverityLevel.Critical,
    });
  } finally {
    await sender.close();
  }
}

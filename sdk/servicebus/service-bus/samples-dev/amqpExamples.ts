// API skeleton:
import { ServiceBusClient, ServiceBusReceivedMessage } from "../src";
import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import * as dotenv from "dotenv";
import { assert } from "chai";

dotenv.config();

const queue = process.env.SERVICEBUS_QUEUE!;
const serviceBusClient = new ServiceBusClient(process.env.SERVICEBUS_CONNECTION_STRING!);
const sender = serviceBusClient.createSender(queue);
const receiver = serviceBusClient.createReceiver(queue, { receiveMode: "receiveAndDelete" });

/**
 * Overall explanation of the feature:
 *
 * Our AMQP support was previously released in a read-only manner, where a _rawAmqpMessage would be
 * filled out for every received ServiceBusReceivedMessage.
 *
 * There are three sections that we can use:
 * - value (demonstrated via `sendingAmqpValue`)
 * - sequence (demonstrated via `sendingAmqpSequenceValue`)
 * - data (demonstrated via `sendingAmqpData`). 'data' is the default section we use when you also just
 *     send a ServiceBusMessage via the non-advanced (and common) API.
 */

export async function sendingAmqpValue() {
  console.log(`Sending AMQP message, encoded into 'value'`);

  // AmqpAnnotatedMessage can be sent or scheduled from any method that takes a ServiceBusMessage
  await sender.sendMessages(<AmqpAnnotatedMessage>{
    body: "hello",
    bodyType: "value" // other options: 'sequence' and 'data'
  });

  const [receivedMessage]: ServiceBusReceivedMessage[] = await receiver.receiveMessages(1);
  const rawAmqpMessage = receivedMessage._rawAmqpMessage;
  assert.equal(rawAmqpMessage.bodyType, "value");

  console.log(`receivedMessage: `, {
    // (clipping out some of the noisy fields)
    body: receivedMessage.body,
    _rawAmqpMessage: receivedMessage._rawAmqpMessage
  });

  // (console output:)
  // receivedMessage:  {
  //   body: 'hello',
  //   _rawAmqpMessage: {
  //     header: { deliveryCount: 0, timeToLive: 1209600000 },
  //     footer: undefined,
  //     messageAnnotations: {
  //       'x-opt-enqueued-time': 1621992757797,
  //       'x-opt-sequence-number': 12,
  //       'x-opt-enqueue-sequence-number': 12
  //     },
  //     deliveryAnnotations: {},
  //     applicationProperties: undefined,
  //     properties: {
  //       absoluteExpiryTime: 1623202357797,
  //       creationTime: 1621992757797,
  //       messageId: 'd05a3c672e7242808136804c22222c1c'
  //     },
  //     body: 'hello',
  //     bodyType: 'value'
  //   }
  // }
}

export async function sendingAmqpSequence() {
  console.log(`Sending AMQP message, encoded into 'sequence'`);

  // AmqpAnnotatedMessage can be sent or scheduled from any method that takes a ServiceBusMessage
  await sender.sendMessages(<AmqpAnnotatedMessage>{
    // note that this a sequence of sequences. You can also send simple sequences like [1,2,3,4,5] as well.
    body: [[1, 2], [3, 4], [5]],
    bodyType: "sequence" // other options: 'value' and 'data'
  });

  const [receivedMessage]: ServiceBusReceivedMessage[] = await receiver.receiveMessages(1);
  const rawAmqpMessage = receivedMessage._rawAmqpMessage;
  assert.equal(rawAmqpMessage.bodyType, "sequence");

  console.log(`receivedMessage: `, {
    // (clipping out some of the noisy fields)
    body: receivedMessage.body,
    _rawAmqpMessage: receivedMessage._rawAmqpMessage
  });

  // (console output:)
  // receivedMessage:  {
  //   body: [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ],
  //   _rawAmqpMessage: {
  //     header: { deliveryCount: 0, timeToLive: 1209600000 },
  //     footer: undefined,
  //     messageAnnotations: {
  //       'x-opt-enqueued-time': 1622053737561,
  //       'x-opt-sequence-number': 16
  //     },
  //     deliveryAnnotations: undefined,
  //     applicationProperties: undefined,
  //     properties: {
  //       absoluteExpiryTime: 1623263337561,
  //       creationTime: 1622053737561,
  //       messageId: '48ebb2fbc45149ce975bc63c8e8604ca'
  //     },
  //     body: Section { typecode: 118, content: [Array], multiple: undefined },
  //     bodyType: 'sequence'
  //   }
  // }
}

export async function sendingAmqpData() {
  console.log(`Sending AMQP message, encoded into 'data'`);

  // AmqpAnnotatedMessage can be sent or scheduled from any method that takes a ServiceBusMessage
  await sender.sendMessages(<AmqpAnnotatedMessage>{
    // note that this a sequence of sequences. You can also send simple sequences like [1,2,3,4,5] as well.
    body: Buffer.from("hello"),
    bodyType: "data" // other options: 'value' and 'data'
  });

  const [receivedMessage]: ServiceBusReceivedMessage[] = await receiver.receiveMessages(1);
  const rawAmqpMessage = receivedMessage._rawAmqpMessage;
  assert.equal(rawAmqpMessage.bodyType, "data");

  console.log(`receivedMessage: `, {
    // (clipping out some of the noisy fields)
    body: receivedMessage.body,
    _rawAmqpMessage: receivedMessage._rawAmqpMessage
  });

  // (console output:)
  //   receivedMessage:  {
  //   body: <Buffer 68 65 6c 6c 6f>,
  //   _rawAmqpMessage: {
  //     header: { deliveryCount: 0, timeToLive: 1209600000 },
  //     footer: undefined,
  //     messageAnnotations: {
  //       'x-opt-enqueued-time': 1622056147873,
  //       'x-opt-sequence-number': 22
  //     },
  //     deliveryAnnotations: undefined,
  //     applicationProperties: undefined,
  //     properties: {
  //       absoluteExpiryTime: 1623265747873,
  //       creationTime: 1622056147873,
  //       messageId: 'b6a697b2a5474bd3988065afb39e4486'
  //     },
  //     body: Section {
  //       typecode: 117,
  //       content: <Buffer 68 65 6c 6c 6f>,
  //       multiple: undefined
  //     },
  //     bodyType: 'data'
  //   }
  // }
}

// some edge cases

export async function roundTrip() {
  console.log(`Running roundTrip() test (receiving an encoded AMQP message and resending it)`);

  // For the most part if a user sends a message we do a type check on it either being a
  // ServiceBusMessage (in which case we ignore any potential `._rawAmqpMessage`) or
  // an AmqpAnnotatedMesssage.
  //
  // For the most part that holds well, but breaks down in one case:
  //
  // 1. User receives a message encoded to a specific bodyType (ie, "value" or "sequence")
  // 2. User _forwards_ this message, unchanged
  // 3. (before my change) Message would automatically be re-encoded with the body into the 'data' section.
  //     (after my change) If _rawAmqpMessage is present we use _rawAmqpMessage.bodyType
  //
  await sender.sendMessages(<AmqpAnnotatedMessage>{
    body: "hello",
    bodyType: "value" // other options: 'sequence' and 'data'
  });

  let [receivedMessage] = await receiver.receiveMessages(1);

  // now resend it (ie, maybe this would be to a different queue but I'm just re-using my sender)
  // the case I want to avoid is this:
  //
  await sender.sendMessages(receivedMessage);

  [receivedMessage] = await receiver.receiveMessages(1);
  assert.equal(
    receivedMessage._rawAmqpMessage.bodyType,
    "value",
    "body type is preserved across resends"
  );
}

(async () => {
  try {
    console.log(`Running AMQP message encoding tests, using queue ${queue}`);

    // purge queue before we run the examples
    while ((await receiver.receiveMessages(10, { maxWaitTimeInMs: 1000 })).length > 0) {}

    await sendingAmqpValue();
    await sendingAmqpSequence();
    await sendingAmqpData();
    await roundTrip();
  } catch (err) {
    console.log(`ERROR: ${err}`);
  } finally {
    await serviceBusClient.close();
  }
})();

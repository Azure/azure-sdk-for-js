// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import Long from "long";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { ServiceBusClient } from "../src";
import { TestMessage, getSenderReceiverClients, TestClientType } from "./utils/testUtils";
import {
  ReceiverClientTypeForUserT,
  NonSessionReceiver,
  SubscriptionRuleManagement,
  SessionReceiver
} from "../src/serviceBusReceiverClient";
import { Sender } from "../src/sender";

describe("Invalid parameters in Sender/ReceiverClients for PartitionedQueue #RunInBrowser", function(): void {
  let senderClient: Sender;
  let queueReceiverClient: ReceiverClientTypeForUserT<"peekLock">;

  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    const clients = await getSenderReceiverClients(TestClientType.PartitionedQueue, "peekLock");
    senderClient = clients.senderClient;
    queueReceiverClient = clients.receiverClient;
  });

  after(async () => {
    await senderClient.close();
    await queueReceiverClient.close();
  });

  it("Peek: Invalid maxMessageCount for Queue", async function(): Promise<void> {
    const peekedResults = await queueReceiverClient.diagnostics.peek(-100);
    should.equal(peekedResults.length, 0);
  });

  it("Peek: Wrong type maxMessageCount for Queue", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await queueReceiverClient.diagnostics.peek("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "maxMessageCount" should be of type "number"`
    );
  });

  it("PeekBySequenceNumber: Invalid maxMessageCount for Queue", async function(): Promise<void> {
    const peekedResults = await queueReceiverClient.diagnostics.peekBySequenceNumber(
      Long.ZERO,
      -100
    );
    should.equal(peekedResults.length, 0);
  });

  it("PeekBySequenceNumber: Wrong type maxMessageCount for Queue", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await queueReceiverClient.diagnostics.peekBySequenceNumber(Long.ZERO, "somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "maxMessageCount" should be of type "number"`
    );
  });

  it("PeekBySequenceNumber: Wrong type fromSequenceNumber for Queue", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await queueReceiverClient.diagnostics.peekBySequenceNumber("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "fromSequenceNumber" should be of type "Long"`
    );
  });

  it("PeekBySequenceNumber: Missing fromSequenceNumber for Queue", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await queueReceiverClient.diagnostics.peekBySequenceNumber(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "fromSequenceNumber"`);
  });
});

describe("Invalid parameters in Sender/ReceiverClients for PartitionedSubscription #RunInBrowser", function(): void {
  let senderClient: Sender;
  let subscriptionReceiverClient: NonSessionReceiver<"peekLock"> & SubscriptionRuleManagement;

  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    const clients = await getSenderReceiverClients(
      TestClientType.PartitionedSubscription,
      "peekLock"
    );
    senderClient = clients.senderClient;
    subscriptionReceiverClient = clients.receiverClient as NonSessionReceiver<"peekLock"> &
      SubscriptionRuleManagement;
  });

  after(async () => {
    await senderClient.close();
    await subscriptionReceiverClient.close();
  });

  it("Peek: Invalid maxMessageCount for Subscription", async function(): Promise<void> {
    const peekedResults = await subscriptionReceiverClient.diagnostics.peek(-100);
    should.equal(peekedResults.length, 0);
  });

  it("Peek: Wrong type maxMessageCount for Subscription", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionReceiverClient.diagnostics.peek("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "maxMessageCount" should be of type "number"`
    );
  });

  it("PeekBySequenceNumber: Invalid maxMessageCount for Subscription", async function(): Promise<
    void
  > {
    const peekedResults = await subscriptionReceiverClient.diagnostics.peekBySequenceNumber(
      Long.ZERO,
      -100
    );
    should.equal(peekedResults.length, 0);
  });

  it("PeekBySequenceNumber: Wrong type maxMessageCount for Subscription", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await subscriptionReceiverClient.diagnostics.peekBySequenceNumber(
        Long.ZERO,
        "somestring" as any
      );
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "maxMessageCount" should be of type "number"`
    );
  });

  it("PeekBySequenceNumber: Wrong type fromSequenceNumber for Subscription", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await subscriptionReceiverClient.diagnostics.peekBySequenceNumber("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "fromSequenceNumber" should be of type "Long"`
    );
  });

  it("PeekBySequenceNumber: Missing fromSequenceNumber for Subscription", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await subscriptionReceiverClient.diagnostics.peekBySequenceNumber(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "fromSequenceNumber"`);
  });

  it("AddRule: Missing ruleName", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionReceiverClient.addRule(undefined as any, undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "ruleName"`);
  });

  it("AddRule: Empty string as ruleName", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionReceiverClient.addRule("", false);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `Empty string not allowed in parameter "ruleName"`
    );
  });

  it("AddRule: Missing filter", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionReceiverClient.addRule("myrule", undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "filter"`);
  });

  it("AddRule: Invalid filter", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionReceiverClient.addRule("myrule", { random: "value" } as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "filter" should be either a boolean, string or implement the CorrelationFilter interface.`
    );
  });

  it("RemoveRule: Missing ruleName", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionReceiverClient.removeRule(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "ruleName"`);
  });

  it("RemoveRule: Empty string as ruleName", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionReceiverClient.removeRule("");
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `Empty string not allowed in parameter "ruleName"`
    );
  });

  it("Add and Remove Rule: Coerce RuleName into string", async function(): Promise<void> {
    // Clean up existing rules
    let rules = await subscriptionReceiverClient.getRules();
    await Promise.all(rules.map((rule) => subscriptionReceiverClient.removeRule(rule.name)));

    // Add rule with number as name
    await subscriptionReceiverClient.addRule(123 as any, true);
    rules = await subscriptionReceiverClient.getRules();
    should.equal(
      rules.some((rule) => rule.name === "123"),
      true,
      "Added rule not found"
    );

    // Remove rule with number as name
    await subscriptionReceiverClient.removeRule(123 as any);
    rules = await subscriptionReceiverClient.getRules();
    should.equal(
      rules.some((rule) => rule.name === "123"),
      false,
      "Removed rule still found"
    );

    // Add default rule so that other tests are not affected
    await subscriptionReceiverClient.addRule(subscriptionReceiverClient.defaultRuleName, true);
  });
});

describe("Invalid parameters in SessionReceiver #RunInBrowser", function(): void {
  let senderClient: Sender;
  let receiverClient: SessionReceiver<"peekLock">;
  let serviceBusClient: ServiceBusClient;

  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    const clients = await getSenderReceiverClients(
      TestClientType.PartitionedQueueWithSessions,
      "peekLock"
    );

    senderClient = clients.senderClient;
    await senderClient.send(TestMessage.getSessionSample());

    receiverClient = clients.receiverClient as SessionReceiver<"peekLock">;

    serviceBusClient = clients.serviceBusClient;
  });

  after(async () => {
    await senderClient.close();
    await receiverClient.close();
    await serviceBusClient.close();
  });

  // TODO: this should just throw.
  // it("SessionReceiver: Invalid ReceiveMode", async function(): Promise<void> {
  //   receiverClient = serviceBusClient.createSessionReceiver(
  //     EntityNames.QUEUE_NAME_SESSION,
  //     "peekLock",
  //     TestMessage.sessionId
  //   );

  //     {
  //       id: TestMessage.sessionId
  //     }
  //   ) as any;
  //   should.equal(
  //     receiverClient.receiveMode,
  //     ReceiveMode.peekLock,
  //     "Default receiveMode not set when receiveMode not provided to constructor."
  //   );
  // });

  it("Peek: Invalid maxMessageCount in SessionReceiver", async function(): Promise<void> {
    const peekedResults = await receiverClient.diagnostics.peek(-100);
    should.equal(peekedResults.length, 0);
  });

  it("Peek: Wrong type maxMessageCount in SessionReceiver", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await receiverClient.diagnostics.peek("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "maxMessageCount" should be of type "number"`
    );
  });

  it("PeekBySequenceNumber: Invalid maxMessageCount in SessionReceiver", async function(): Promise<
    void
  > {
    const peekedResults = await receiverClient.diagnostics.peekBySequenceNumber(Long.ZERO, -100);
    should.equal(peekedResults.length, 0);
  });

  it("PeekBySequenceNumber: Wrong type maxMessageCount in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiverClient.diagnostics.peekBySequenceNumber(Long.ZERO, "somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "maxMessageCount" should be of type "number"`
    );
  });

  it("PeekBySequenceNumber: Wrong type sequenceNumber in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiverClient.diagnostics.peekBySequenceNumber("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "fromSequenceNumber" should be of type "Long"`
    );
  });

  it("PeekBySequenceNumber: Missing sequenceNumber in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiverClient.diagnostics.peekBySequenceNumber(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "fromSequenceNumber"`);
  });

  it("RegisterMessageHandler: Missing onMessage in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiverClient.subscribe(undefined as any, undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "onMessage"`);
  });

  it("RegisterMessageHandler: Wrong type for onMessage in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiverClient.subscribe("somestring" as any, "somethingelse" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter 'onMessage' must be of type 'function'.`
    );
  });

  // it("RegisterMessageHandler: Missing onError in SessionReceiver", async function(): Promise<void> {
  //   let caughtError: Error | undefined;
  //   try {
  //     await receiverClient.registerMessageHandler(async () => {
  //       /** */
  //     }, undefined as any);
  //   } catch (error) {
  //     caughtError = error;
  //   }
  //   should.equal(caughtError && caughtError.name, "TypeError");
  //   should.equal(caughtError && caughtError.message, `Missing parameter "onError"`);
  // });

  // it("RegisterMessageHandler: Wrong type for onError in SessionReceiver", async function(): Promise<
  //   void
  // > {
  //   let caughtError: Error | undefined;
  //   try {
  //     await receiverClient.registerMessageHandler(async () => {
  //       /** */
  //     }, "somethingelse" as any);
  //   } catch (error) {
  //     caughtError = error;
  //   }
  //   should.equal(caughtError && caughtError.name, "TypeError");
  //   should.equal(
  //     caughtError && caughtError.message,
  //     `The parameter 'onError' must be of type 'function'.`
  //   );
  // });

  it("ReceiveDeferredMessage: Wrong type sequenceNumber in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiverClient.receiveDeferredMessage("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "sequenceNumber" should be of type "Long"`
    );
  });

  it("ReceiveDeferredMessage: Missing sequenceNumber in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiverClient.receiveDeferredMessage(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumber"`);
  });

  it("ReceiveDeferredMessages: Wrong type sequenceNumbers in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiverClient.receiveDeferredMessages(["somestring"] as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "sequenceNumbers" should be an array of type "Long"`
    );
  });

  it("ReceiveDeferredMessages: Missing sequenceNumbers in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiverClient.receiveDeferredMessages(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumbers"`);
  });
});

// Same as the previous describe block - session vs non-session
// describe("Invalid parameters in Receiver #RunInBrowser", function(): void {
//   let receiver: InternalReceiver;
//   let receiverClient: QueueClient;

//   // Since, the below tests never actually make use of any AMQP links, there is no need to create
//   // new sender/receiver clients before each test. Doing it once for each describe block.
//   before(async () => {
//     createServiceBusClient();
//     const clients = await getSenderReceiverClients(
//       sbClient,
//       TestClientType.PartitionedQueue,
//       TestClientType.PartitionedQueue
//     );

//     const sender = clients.senderClient.createSender();
//     await sender.send(TestMessage.getSample());

//     receiverClient = <QueueClient>clients.receiverClient;
//     receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
//   });

//   after(async () => {
//     await sbClient.close();
//   });

//   it("Receiver: Missing ReceiveMode", async function(): Promise<void> {
//     await receiver.close();
//     receiver = receiverClient.createReceiver(undefined as any);
//     should.equal(
//       receiver.receiveMode,
//       ReceiveMode.peekLock,
//       "Default receiveMode not set when receiveMode not provided to constructor."
//     );
//   });

//   it("Receiver: Invalid ReceiveMode", async function(): Promise<void> {
//     await receiver.close();
//     receiver = receiverClient.createReceiver(123 as any);
//     should.equal(
//       receiver.receiveMode,
//       ReceiveMode.peekLock,
//       "Default receiveMode not set when receiveMode not provided to constructor."
//     );
//   });

//   it("RegisterMessageHandler: Missing onMessage in Receiver", async function(): Promise<void> {
//     let caughtError: Error | undefined;
//     try {
//       await receiver.registerMessageHandler(undefined as any, undefined as any);
//     } catch (error) {
//       caughtError = error;
//     }
//     should.equal(caughtError && caughtError.name, "TypeError");
//     should.equal(caughtError && caughtError.message, `Missing parameter "onMessage"`);
//   });

//   it("RegisterMessageHandler: Wrong type for onMessage in Receiver", async function(): Promise<
//     void
//   > {
//     let caughtError: Error | undefined;
//     try {
//       await receiver.registerMessageHandler("somestring" as any, "somethingelse" as any);
//     } catch (error) {
//       caughtError = error;
//     }
//     should.equal(caughtError && caughtError.name, "TypeError");
//     should.equal(
//       caughtError && caughtError.message,
//       `The parameter 'onMessage' must be of type 'function'.`
//     );
//   });

//   it("RegisterMessageHandler: Missing onError in Receiver", async function(): Promise<void> {
//     let caughtError: Error | undefined;
//     try {
//       await receiver.registerMessageHandler(async () => {
//         /** */
//       }, undefined as any);
//     } catch (error) {
//       caughtError = error;
//     }
//     should.equal(caughtError && caughtError.name, "TypeError");
//     should.equal(caughtError && caughtError.message, `Missing parameter "onError"`);
//   });

//   it("RegisterMessageHandler: Wrong type for onError in Receiver", async function(): Promise<void> {
//     let caughtError: Error | undefined;
//     try {
//       await receiver.registerMessageHandler(async () => {
//         /** */
//       }, "somethingelse" as any);
//     } catch (error) {
//       caughtError = error;
//     }
//     should.equal(caughtError && caughtError.name, "TypeError");
//     should.equal(
//       caughtError && caughtError.message,
//       `The parameter 'onError' must be of type 'function'.`
//     );
//   });

//   it("ReceiveDeferredMessage: Wrong type sequenceNumber in Receiver", async function(): Promise<
//     void
//   > {
//     let caughtError: Error | undefined;
//     try {
//       await receiver.receiveDeferredMessage("somestring" as any);
//     } catch (error) {
//       caughtError = error;
//     }
//     should.equal(caughtError && caughtError.name, "TypeError");
//     should.equal(
//       caughtError && caughtError.message,
//       `The parameter "sequenceNumber" should be of type "Long"`
//     );
//   });

//   it("ReceiveDeferredMessage: Missing sequenceNumber in Receiver", async function(): Promise<void> {
//     let caughtError: Error | undefined;
//     try {
//       await receiver.receiveDeferredMessage(undefined as any);
//     } catch (error) {
//       caughtError = error;
//     }
//     should.equal(caughtError && caughtError.name, "TypeError");
//     should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumber"`);
//   });

//   it("ReceiveDeferredMessages: Wrong type sequenceNumbers in Receiver", async function(): Promise<
//     void
//   > {
//     let caughtError: Error | undefined;
//     try {
//       await receiver.receiveDeferredMessages(["somestring"] as any);
//     } catch (error) {
//       caughtError = error;
//     }
//     should.equal(caughtError && caughtError.name, "TypeError");
//     should.equal(
//       caughtError && caughtError.message,
//       `The parameter "sequenceNumbers" should be an array of type "Long"`
//     );
//   });

//   it("ReceiveDeferredMessages: Missing sequenceNumbers in Receiver", async function(): Promise<
//     void
//   > {
//     let caughtError: Error | undefined;
//     try {
//       await receiver.receiveDeferredMessages(undefined as any);
//     } catch (error) {
//       caughtError = error;
//     }
//     should.equal(caughtError && caughtError.name, "TypeError");
//     should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumbers"`);
//   });

//   it("RenewMessageLock: Missing lockTokenOrMessage in Receiver", async function(): Promise<void> {
//     let caughtError: Error | undefined;
//     try {
//       await (<InternalReceiver>receiver).renewMessageLock(undefined as any);
//     } catch (error) {
//       caughtError = error;
//     }
//     should.equal(caughtError && caughtError.name, "TypeError");
//     should.equal(caughtError && caughtError.message, `Missing parameter "lockTokenOrMessage"`);
//   });

//   it("RenewMessageLock: Invalid string lockToken in Receiver", async function(): Promise<void> {
//     let caughtError: Error | undefined;
//     try {
//       await (<InternalReceiver>receiver).renewMessageLock("string-which-is-not-uuid");
//     } catch (error) {
//       caughtError = error;
//     }
//     should.equal(
//       caughtError && caughtError.message,
//       `Not a valid UUID string: string-which-is-not-uuid`
//     );
//   });

//   it("RenewMessageLock: Invalid message lockToken in Receiver", async function(): Promise<void> {
//     let caughtError: Error | undefined;
//     try {
//       const [receivedMsg] = await receiver.receiveMessages(1);
//       if (!receivedMsg) {
//         throw new Error("Message not received to renew lock on.");
//       }
//       (<any>receivedMsg).lockToken = "string-which-is-not-uuid";
//       await (<InternalReceiver>receiver).renewMessageLock(receivedMsg);
//     } catch (error) {
//       caughtError = error;
//     }
//     should.equal(
//       caughtError && caughtError.message,
//       `Not a valid UUID string: string-which-is-not-uuid`
//     );
//   });
// });

describe("Invalid parameters in Sender #RunInBrowser", function(): void {
  let sender: Sender;

  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    const clients = await getSenderReceiverClients(TestClientType.PartitionedQueue, "peekLock");

    sender = clients.senderClient;
  });

  after(async () => {
    await sender.close();
  });

  it("Send: Missing message in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.send(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "message"`);
  });

  it("Sendbatch: Missing messages in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.sendBatch(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "messages"`);
  });

  it("ScheduledMessage: Missing date in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.scheduleMessage(undefined as any, undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "scheduledEnqueueTimeUtc"`);
  });

  it("ScheduledMessage: Missing message in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.scheduleMessage(new Date(), undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "message"`);
  });

  it("ScheduledMessages: Missing date in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.scheduleMessages(undefined as any, undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "scheduledEnqueueTimeUtc"`);
  });

  it("ScheduledMessages: Missing messages in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.scheduleMessages(new Date(), undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "messages"`);
  });

  it("CancelScheduledMessage: Wrong type sequenceNumber in Sender", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sender.cancelScheduledMessage("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "sequenceNumber" should be of type "Long"`
    );
  });

  it("CancelScheduledMessage: Missing sequenceNumber in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.cancelScheduledMessage(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumber"`);
  });

  it("CancelScheduledMessages: Wrong type sequenceNumbers in Sender", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sender.cancelScheduledMessages(["somestring"] as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "sequenceNumbers" should be an array of type "Long"`
    );
  });

  it("CancelScheduledMessages: Missing sequenceNumbers in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.cancelScheduledMessages(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumbers"`);
  });
});

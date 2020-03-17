// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { ContextWithSettlement } from "../src";
import { TestClientType } from "./utils/testUtils";
import { Receiver } from "../src/receivers/receiver";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength
} from "./utils/testutils2";
import { Sender } from "../src/sender";

describe("send scheduled messages", () => {
  let senderClient: Sender;
  let receiverClient: Receiver<ContextWithSettlement>;
  let serviceBusClient: ServiceBusClientForTests;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);
    receiverClient = serviceBusClient.test.getPeekLockReceiver(entityNames);

    senderClient = serviceBusClient.test.addToCleanup(
      serviceBusClient.getSender(entityNames.queue ?? entityNames.topic!)
    );
  }

  async function afterEachTest(): Promise<void> {
    await senderClient.close();
    await receiverClient.close();
  }

  describe("Simple Send Batch 2", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testSimpleSendBatch(
      useSessions: boolean,
      usePartitions: boolean
    ): Promise<void> {
      useSessions;
      usePartitions;

      const batchMessage = await senderClient.createBatch();
      let numberOfMessagesInBatch = 0;
      for (let i = 0; i < 1000000; i++) {
        const bool = batchMessage.tryAdd({
          body: Buffer.alloc(2000),
          messageId: `message ${i}`
        });
        if (!bool) {
          1;
          console.log("broken", bool, numberOfMessagesInBatch, `message ${i}`);
          break;
        } else {
          numberOfMessagesInBatch++;
          console.log(bool, numberOfMessagesInBatch, `message ${i}`);
        }
      }
      await senderClient.sendBatch2(batchMessage);
      console.log("count -", (await receiverClient.receiveBatch(126)).messages.length);
      await testPeekMsgsLength(receiverClient, 0);
    }

    it("Partitioned Queue: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSimpleSendBatch(false, true);
    });

    it("Partitioned Topic: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSimpleSendBatch(false, true);
    });

    it.only("Unpartitioned Queue: Simple SendBatch #RunInBrowser", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testSimpleSendBatch(false, false);
    });

    it("Unpartitioned Topic: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testSimpleSendBatch(false, false);
    });

    it("Partitioned Queue with Sessions: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSimpleSendBatch(true, true);
    });

    it("Partitioned Topic with Sessions: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSimpleSendBatch(true, true);
    });

    it("Unpartitioned Queue with Sessions: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSimpleSendBatch(true, false);
    });

    it("Unpartitioned Topic with Sessions: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSimpleSendBatch(true, false);
    });
  });

  async function testReceivedMsgsLength(
    receiverClient: Receiver<ContextWithSettlement>,
    expectedReceivedMsgsLength: number
  ): Promise<void> {
    const receivedMsgs = await receiverClient.receiveBatch(expectedReceivedMsgsLength + 1, 5);

    should.equal(
      receivedMsgs.messages.length,
      expectedReceivedMsgsLength,
      "Unexpected number of msgs found when receiving"
    );
  }
});

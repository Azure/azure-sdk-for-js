// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";
import * as dotenv from "dotenv";
import {
  CorrelationRuleFilter,
  ServiceBusReceivedMessage,
  ServiceBusClient,
  ServiceBusMessage,
  SqlRuleFilter,
  ServiceBusAdministrationClient,
} from "../../src";
import { DEFAULT_RULE_NAME } from "../../src/util/constants";
import { recreateSubscription, recreateTopic } from "../public/utils/managementUtils";
import { getConnectionString } from "../public/utils/testutils2";

chai.use(chaiAsPromised);
chai.use(chaiExclude);
const should = chai.should();

dotenv.config();

const serviceBusAtomManagementClient: ServiceBusAdministrationClient =
  new ServiceBusAdministrationClient(getConnectionString());

describe("Filter messages with the rules set by the ATOM API", () => {
  const topicName = "new-topic";
  const subscriptionName = "new-subscription";
  const serviceBusClient = new ServiceBusClient(getConnectionString());

  beforeEach(async () => {
    await recreateTopic(topicName);
    await recreateSubscription(topicName, subscriptionName);
    await serviceBusAtomManagementClient.deleteRule(topicName, subscriptionName, DEFAULT_RULE_NAME);
  });

  after(async () => {
    await serviceBusClient.close();
  });

  async function verifyRuleFilter(
    messagesToSend: ServiceBusMessage[],
    filter: SqlRuleFilter | CorrelationRuleFilter,
    numberOfMessagesToBeFiltered: number,
    toCheck: (msg: ServiceBusReceivedMessage) => void
  ): Promise<void> {
    await serviceBusAtomManagementClient.createRule(
      topicName,
      subscriptionName,
      "rule-name",
      filter
    );

    await serviceBusClient.createSender(topicName).sendMessages(messagesToSend);

    const receivedMessages = await serviceBusClient
      .createReceiver(topicName, subscriptionName)
      .receiveMessages(5);
    should.equal(
      receivedMessages.length,
      numberOfMessagesToBeFiltered,
      "Unexpected number of messages received"
    );

    // Making sure the filtered message is same as the expected one.
    toCheck(receivedMessages[0]);
  }

  it("subject", async () => {
    const subject = "new-subject";
    await verifyRuleFilter(
      [
        { body: "msg-1", subject }, // to be filtered
        { body: "msg-2" }, // not to be filtered
      ],
      { subject },
      1,
      (msg) => {
        chai.assert.deepEqual(msg.subject, subject, "Unexpected subject on the message");
      }
    );
  });

  // TODO: New tests for rule filters to match the sent messages can be added
});

describe("getSubscriptionRuntimeProperties", () => {
  const topicName = "new-topic-2";
  const subscriptionName1 = "new-subscription-1";
  const subscriptionName2 = "new-subscription-2";
  const serviceBusClient = new ServiceBusClient(getConnectionString());

  beforeEach(async () => {
    await recreateTopic(topicName);
  });

  after(async () => {
    await serviceBusClient.close();
    await serviceBusAtomManagementClient.deleteTopic(topicName);
  });

  async function receiveMessagesAndAbandon(subscriptionName: string): Promise<void> {
    const receiver = serviceBusClient.createReceiver(topicName, subscriptionName);
    const receivedMessages = await receiver.receiveMessages(10);

    for (const msg of receivedMessages) {
      await receiver.abandonMessage(msg);
    }
  }

  it("Active Message Count - single subscription", async () => {
    await recreateSubscription(topicName, subscriptionName1);
    const messages = [1, 2, 3].map((num) => {
      return {
        body: `msg-${num}`,
      };
    });
    await serviceBusClient.createSender(topicName).sendMessages(messages);
    await receiveMessagesAndAbandon(subscriptionName1);

    const activeMessageCount = (
      await serviceBusAtomManagementClient.getSubscriptionRuntimeProperties(
        topicName,
        subscriptionName1
      )
    ).activeMessageCount;
    chai.assert.equal(activeMessageCount, messages.length, "Unexpected active message count");
  });

  it("Active Message Count - multiple subscriptions", async () => {
    await recreateSubscription(topicName, subscriptionName1);
    await recreateSubscription(topicName, subscriptionName2);
    const messages = [1, 2, 3].map((num) => {
      return {
        body: `msg-${num}`,
      };
    });
    await serviceBusClient.createSender(topicName).sendMessages(messages);
    await receiveMessagesAndAbandon(subscriptionName1);
    await receiveMessagesAndAbandon(subscriptionName2);

    for await (const subscription of serviceBusAtomManagementClient.listSubscriptionsRuntimeProperties(
      topicName
    )) {
      chai.assert.equal(
        subscription.activeMessageCount,
        messages.length,
        "Unexpected active message count"
      );
    }
  });
});

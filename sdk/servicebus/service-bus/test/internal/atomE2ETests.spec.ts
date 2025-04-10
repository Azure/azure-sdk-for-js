// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type {
  CorrelationRuleFilter,
  ServiceBusReceivedMessage,
  ServiceBusMessage,
  SqlRuleFilter,
} from "../../src/index.js";
import { ServiceBusClient, ServiceBusAdministrationClient } from "../../src/index.js";
import { DEFAULT_RULE_NAME } from "../../src/util/constants.js";
import { recreateSubscription, recreateTopic } from "../public/utils/managementUtils.js";
import { getFullyQualifiedNamespace } from "../utils/injectables.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { afterAll, beforeEach, describe, it } from "vitest";
import { assert, should } from "../public/utils/chai.js";

const fullyQualifiedNamespace = getFullyQualifiedNamespace();
const serviceBusAtomManagementClient: ServiceBusAdministrationClient =
  new ServiceBusAdministrationClient(fullyQualifiedNamespace, createTestCredential());

describe("Filter messages with the rules set by the ATOM API", () => {
  const topicName = "new-topic";
  const subscriptionName = "new-subscription";
  const serviceBusClient = new ServiceBusClient(fullyQualifiedNamespace, createTestCredential());

  beforeEach(async () => {
    await recreateTopic(topicName);
    await recreateSubscription(topicName, subscriptionName);
    await serviceBusAtomManagementClient.deleteRule(topicName, subscriptionName, DEFAULT_RULE_NAME);
  });

  afterAll(async () => {
    await serviceBusClient.close();
  });

  async function verifyRuleFilter(
    messagesToSend: ServiceBusMessage[],
    filter: SqlRuleFilter | CorrelationRuleFilter,
    numberOfMessagesToBeFiltered: number,
    toCheck: (msg: ServiceBusReceivedMessage) => void,
  ): Promise<void> {
    await serviceBusAtomManagementClient.createRule(
      topicName,
      subscriptionName,
      "rule-name",
      filter,
    );

    await serviceBusClient.createSender(topicName).sendMessages(messagesToSend);

    const receivedMessages = await serviceBusClient
      .createReceiver(topicName, subscriptionName)
      .receiveMessages(5);
    should.equal(
      receivedMessages.length,
      numberOfMessagesToBeFiltered,
      "Unexpected number of messages received",
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
        assert.deepEqual(msg.subject, subject, "Unexpected subject on the message");
      },
    );
  });

  // TODO: New tests for rule filters to match the sent messages can be added
});

describe("getSubscriptionRuntimeProperties", () => {
  const topicName = "new-topic-2";
  const subscriptionName1 = "new-subscription-1";
  const subscriptionName2 = "new-subscription-2";
  const serviceBusClient = new ServiceBusClient(fullyQualifiedNamespace, createTestCredential());

  beforeEach(async () => {
    await recreateTopic(topicName);
  });

  afterAll(async () => {
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
        subscriptionName1,
      )
    ).activeMessageCount;
    assert.equal(activeMessageCount, messages.length, "Unexpected active message count");
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
      topicName,
    )) {
      assert.equal(
        subscription.activeMessageCount,
        messages.length,
        "Unexpected active message count",
      );
    }
  });
});

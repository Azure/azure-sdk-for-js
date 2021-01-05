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
  SqlRuleFilter
} from "../src";
import { ServiceBusAdministrationClient } from "../src/serviceBusAtomManagementClient";
import { DEFAULT_RULE_NAME } from "../src/util/constants";
import { recreateSubscription, recreateTopic } from "./utils/managementUtils";
import { getConnectionString } from "./utils/testutils2";

chai.use(chaiAsPromised);
chai.use(chaiExclude);
const should = chai.should();

dotenv.config();

const serviceBusAtomManagementClient: ServiceBusAdministrationClient = new ServiceBusAdministrationClient(
  getConnectionString()
);

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
    messageToSend: ServiceBusMessage,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    toCheck: (msg: ServiceBusReceivedMessage) => void
  ) {
    await serviceBusAtomManagementClient.createRule(
      topicName,
      subscriptionName,
      "rule-name",
      filter
    );
    try {
      await serviceBusClient.createSender(topicName).sendMessages(messageToSend);
    } catch (error) {
      console.log(error);
    }
    const receivedMessages = await serviceBusClient
      .createReceiver(topicName, subscriptionName)
      .receiveMessages(1);
    should.equal(receivedMessages.length, 1, "Unexpected number of messages received");

    toCheck(receivedMessages[0]);
  }

  it("subject", async () => {
    const subject = "new-subject";
    await verifyRuleFilter({ body: "random-body", subject }, { subject }, (msg) => {
      chai.assert.deepEqual(msg.subject, subject, "Unexpected subject on the message");
    });
  });
});

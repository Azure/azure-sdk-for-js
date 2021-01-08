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
import { sanitizeSerializableObject } from "../src/util/atomXmlHelper";
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

describe.only("Filter messages with the rules set by the ATOM API", () => {
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
  ) {
    try {
      const ruleName = "rule-name";
      await serviceBusAtomManagementClient.createRule(
        topicName,
        subscriptionName,
        ruleName,
        filter
      );

      const getRuleResponse = await serviceBusAtomManagementClient.getRule(
        topicName,
        subscriptionName,
        ruleName
      );
      // Rule filter might have undefined fields, which need to be deleted to match with the created rule
      sanitizeSerializableObject(getRuleResponse);
      chai.assert.deepEqual(getRuleResponse.filter, filter, "Unexpected filter");

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
    } catch (error) {
      console.log(error);
    }
  }

  for (let index = 0; index < 1000; index++) {
    it(`subject test - iteration ${index}`, async () => {
      const subject = "new-subject";
      await verifyRuleFilter(
        [
          { body: "msg-1", subject }, // to be filtered
          { body: "msg-2" } // not to be filtered
        ],
        { subject },
        1,
        (msg) => {
          chai.assert.deepEqual(msg.subject, subject, "Unexpected subject on the message");
        }
      );
    });
  }

  // TODO: New tests for rule filters to match the sent messages can be added
});

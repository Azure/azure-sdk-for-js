// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";
import * as dotenv from "dotenv";
import {
  CorrelationRuleFilter,
  ReceivedMessage,
  ServiceBusClient,
  ServiceBusMessage,
  SqlRuleFilter
} from "../src";
import { ServiceBusManagementClient } from "../src/serviceBusAtomManagementClient";
import { recreateSubscription, recreateTopic } from "./utils/managementUtils";
import { getConnectionString } from "./utils/testutils2";

chai.use(chaiAsPromised);
chai.use(chaiExclude);
const should = chai.should();

dotenv.config();

const serviceBusAtomManagementClient: ServiceBusManagementClient = new ServiceBusManagementClient(
  getConnectionString()
);

describe.only("Filter messages with the rules set by the ATOM API", () => {
  const topicName = "new-topic";
  const subscriptionName = "new-subscription";
  const serviceBusClient = new ServiceBusClient(getConnectionString());

  beforeEach(async () => {
    await recreateTopic(topicName);
    await recreateSubscription(topicName, subscriptionName);
  });

  after(async () => {
    await serviceBusClient.close();
  });

  async function verifyRuleFilter(
    messageToSend: ServiceBusMessage,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    toCheck: (msg: ReceivedMessage) => void
  ) {
    await serviceBusAtomManagementClient.createRule(topicName, subscriptionName, {
      name: "rule-name",
      filter
    });

    await serviceBusClient.createSender(topicName).sendMessages(messageToSend);

    const receivedMessages = await serviceBusClient
      .createReceiver(topicName, subscriptionName, "peekLock")
      .receiveMessages(1);
    should.equal(receivedMessages.length, 1, "Unexpected number of messages received");

    toCheck(receivedMessages[0]);
  }

  it("Rule - 1", async () => {
    const label = "new-label";
    await verifyRuleFilter({ body: "random-body", label }, { label }, (msg) => {
      chai.assert.deepEqual(msg.label, label, "Unexpected label on the message");
    });
  });

  it("Rule - 2", async () => {
    const filter: CorrelationRuleFilter = { properties: { state: "OH", colour: "blue" } };
    await verifyRuleFilter(
      { body: "random-body", properties: filter.properties },
      filter,
      (msg) => {
        chai.assert.deepEqual(
          msg.properties,
          filter.properties,
          "Unexpected properties on the message"
        );
      }
    );
  });

  it("Rule - 3", async () => {
    const filter: CorrelationRuleFilter = { properties: { state: "OH" } };
    await verifyRuleFilter(
      { body: "random-body", properties: filter.properties },
      filter,
      (msg) => {
        chai.assert.deepEqual(
          msg.properties,
          filter.properties,
          "Unexpected properties on the message"
        );
      }
    );
  });
});

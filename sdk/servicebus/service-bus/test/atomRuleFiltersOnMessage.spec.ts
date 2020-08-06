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

describe("Filter messages with the rules set by the ATOM API", () => {
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
    await serviceBusAtomManagementClient.createRule(
      topicName,
      subscriptionName,
      "rule-name",
      filter
    );
    serviceBusAtomManagementClient;
    filter;

    await serviceBusClient.createSender(topicName).sendMessages(messageToSend);

    const receivedMessages = await serviceBusClient
      .createReceiver(topicName, subscriptionName, "peekLock")
      .receiveMessages(1);
    should.equal(receivedMessages.length, 1, "Unexpected number of messages received");

    toCheck(receivedMessages[0]);
  }

  it("Label", async () => {
    const label = "new-label";
    await verifyRuleFilter({ body: "random-body", label }, { label }, (msg) => {
      chai.assert.deepEqual(msg.label, label, "Unexpected label on the message");
    });
  });

  it("properties: string values", async () => {
    const filter: CorrelationRuleFilter = { properties: { state: "OH", colour: "blue" } };
    await verifyRuleFilter(
      { body: "random-body", properties: { state: filter.properties.state } },
      filter,
      (msg) => {
        chai.assert.deepEqual(
          msg.properties!.state,
          filter.properties.state,
          "Unexpected properties on the message"
        );
      }
    );
  });

  it("properties: bool value", async () => {
    const filter: CorrelationRuleFilter = { properties: { boolVal: true } };
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

  it("properties: number value", async () => {
    const filter: CorrelationRuleFilter = { properties: { numVal: 1 } };
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

  it("properties: array value", async () => {
    // While sending the message, the following error is thrown
    //   MessagingError: Serialization operation failed due to unsupported type System.Collections.Generic.List`1[[System.Object, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]].
    // Arrays are not supported as values
    // So, nothing to do here
    const filter: CorrelationRuleFilter = {
      properties: { arrayVal: ["random"] }
    };
    await verifyRuleFilter(
      {
        body: "random-body",
        properties: filter.properties
      },
      filter,
      (msg) => {
        chai.assert.deepEqual(
          msg.properties!.arrayVal,
          filter.properties.arrayVal,
          "Unexpected properties on the message"
        );
      }
    );
  });

  it.only("properties: date value", async () => {
    const filter: CorrelationRuleFilter = {
      properties: { dateVal: new Date() }
    };
    await verifyRuleFilter(
      {
        body: "random-body",
        properties: filter.properties
      },
      filter,
      (msg) => {
        chai.assert.deepEqual(
          msg.properties!.arrayVal,
          filter.properties.arrayVal,
          "Unexpected properties on the message"
        );
      }
    );
  });
});

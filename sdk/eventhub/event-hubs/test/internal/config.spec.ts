// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventHubConnectionConfig } from "../../src/eventhubConnectionConfig.js";
import { describe, it } from "vitest";
import { should, expect } from "../utils/chai.js";
import { EventHubConsumerClient } from "../../src/eventHubConsumerClient.js";

const expectedHost = "hostname.servicebus.windows.net";
const expectedSharedAccessKeyName = "sakName";
const expectedSharedAccessKey = "sak";
const expectedEntityPath = "ep";
const expectedDefaultConsumerGroup = EventHubConsumerClient.defaultConsumerGroupName;
const commonConnectionString = `Endpoint=sb://${expectedHost}/;SharedAccessKeyName=${expectedSharedAccessKeyName};SharedAccessKey=${expectedSharedAccessKey};EntityPath=${expectedEntityPath}`;

describe("ConnectionConfig", function () {
  describe("EventHub", function () {
    it("should fail if connection config does not contain path and the connectionstring also does not contain EntityPath", async function () {
      const connectionString =
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak";
      expect(() => EventHubConnectionConfig.create(connectionString)).to.throw(
        /Either provide "path" or the "connectionString"/,
      );
    });

    it("should correctly populate config properties from an EventHubs connection string and the helper methods should work as expected", async function () {
      const config = EventHubConnectionConfig.create(commonConnectionString);
      assertConnectionConfig(config, {
        defaultConsumerGroup: expectedDefaultConsumerGroup,
        host: expectedHost,
        sharedAccessKeyName: expectedSharedAccessKeyName,
        sharedAccessKey: expectedSharedAccessKey,
        entityPath: expectedEntityPath,
      });
    });

    it("requires that Endpoint be present in the connection string", async function () {
      const connectionString = `Endpoint=sb://a`;
      should.throw(() => {
        EventHubConnectionConfig.create(connectionString);
      }, /must contain EntityPath/);
    });

    describe("setCustomEndpointAddress", async function () {
      it("overwrites host", async function () {
        const config = EventHubConnectionConfig.create(commonConnectionString);
        const customHost = "foo.private.endpoint";
        EventHubConnectionConfig.setCustomEndpointAddress(config, `https://${customHost}`);
        config.should.have.property("amqpHostname").that.equals(expectedHost);
        config.should.have.property("host").that.equals(customHost);
        config.should.not.have.property("port");
      });

      it("overwrites host and port", async function () {
        const config = EventHubConnectionConfig.create(commonConnectionString);
        const customHost = "foo.private.endpoint";
        const port = 1111;
        EventHubConnectionConfig.setCustomEndpointAddress(config, `https://${customHost}:${port}`);
        config.should.have.property("amqpHostname").that.equals(expectedHost);
        config.should.have.property("host").that.equals(customHost);
        config.should.have.property("port").that.equals(port);
      });
    });
  });
});

function assertConnectionConfig(
  config: EventHubConnectionConfig,
  expectations: {
    host: string;
    sharedAccessKeyName: string;
    sharedAccessKey: string;
    entityPath: string;
    defaultConsumerGroup: string;
  },
): void {
  const customConsumerGroup = "cg";
  config.should.have.property("host").that.equals(expectations.host);
  config.should.have.property("sharedAccessKeyName").that.equals(expectations.sharedAccessKeyName);
  config.should.have.property("sharedAccessKey").that.equals(expectations.sharedAccessKey);
  config.should.have.property("entityPath").that.equals(expectations.entityPath);

  config.getManagementAddress().should.equal(`${expectations.entityPath}/$management`);
  config.getSenderAddress().should.equal(expectations.entityPath);
  config.getSenderAddress("0").should.equal(`${expectations.entityPath}/Partitions/0`);
  config.getSenderAddress(0).should.equal(`${expectations.entityPath}/Partitions/0`);
  config
    .getReceiverAddress("0")
    .should.equal(
      `${expectations.entityPath}/ConsumerGroups/${expectations.defaultConsumerGroup}/Partitions/0`,
    );
  config
    .getReceiverAddress(0)
    .should.equal(
      `${expectations.entityPath}/ConsumerGroups/${expectations.defaultConsumerGroup}/Partitions/0`,
    );
  config
    .getReceiverAddress("0", customConsumerGroup)
    .should.equal(`${expectations.entityPath}/ConsumerGroups/${customConsumerGroup}/Partitions/0`);
  config
    .getReceiverAddress(0, customConsumerGroup)
    .should.equal(`${expectations.entityPath}/ConsumerGroups/${customConsumerGroup}/Partitions/0`);

  config
    .getManagementAudience()
    .should.equal(`sb://${expectations.host}/${expectations.entityPath}/$management`);
  config.getSenderAudience().should.equal(`sb://${expectations.host}/${expectations.entityPath}`);
  config
    .getSenderAudience("0")
    .should.equal(`sb://${expectations.host}/${expectations.entityPath}/Partitions/0`);
  config
    .getSenderAudience(0)
    .should.equal(`sb://${expectations.host}/${expectations.entityPath}/Partitions/0`);
  config
    .getReceiverAudience("0")
    .should.equal(
      `sb://${expectations.host}/${expectations.entityPath}/ConsumerGroups/${expectations.defaultConsumerGroup}/Partitions/0`,
    );
  config
    .getReceiverAudience(0)
    .should.equal(
      `sb://${expectations.host}/${expectations.entityPath}/ConsumerGroups/${expectations.defaultConsumerGroup}/Partitions/0`,
    );
  config
    .getReceiverAudience("0", customConsumerGroup)
    .should.equal(
      `sb://${expectations.host}/${expectations.entityPath}/ConsumerGroups/${customConsumerGroup}/Partitions/0`,
    );
  config
    .getReceiverAudience(0, customConsumerGroup)
    .should.equal(
      `sb://${expectations.host}/${expectations.entityPath}/ConsumerGroups/${customConsumerGroup}/Partitions/0`,
    );
}

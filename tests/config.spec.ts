// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import { ConnectionConfig, EventHubConnectionConfig, IotHubConnectionConfig } from "../lib";
import * as chai from "chai";
chai.should();

describe("ConnectionConfig", function () {
  describe("Base", function () {
    it("populates config properties from an Event Hubs connection string", function (done) {
      const config = ConnectionConfig.create("Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep");
      config.should.have.property("host").that.equals("hostname.servicebus.windows.net");
      config.should.have.property("sharedAccessKeyName").that.equals("sakName");
      config.should.have.property("sharedAccessKey").that.equals("sak");
      config.should.have.property("entityPath").that.equals("ep");
      done();
    });

    it("populates path from the path argument if connection string does not have EntityPath", function (done) {
      const config = ConnectionConfig.create("Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak", "abc");
      config.should.have.property("entityPath").that.equals("abc");
      done();
    });

    it("should fail if connection config does not contain path and the connectionstring also does not contain EntityPath", function (done) {
      const connectionString = "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak";
      try {
        ConnectionConfig.create(connectionString);
        done(new Error("Should not have reached here."));
      } catch (err) {
        err.message.should.match(/Either provide "path" or the "connectionString".*/ig);
      }
      done();
    });
  });

  describe("EventHub", function () {
    it("should correctly populate config properties from an EventHubs connection string and the helper methods should work as expected", function (done) {
      const config = EventHubConnectionConfig.create("Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep");
      config.should.have.property("host").that.equals("hostname.servicebus.windows.net");
      config.should.have.property("sharedAccessKeyName").that.equals("sakName");
      config.should.have.property("sharedAccessKey").that.equals("sak");
      config.should.have.property("entityPath").that.equals("ep");

      config.getEventHubManagementAddress().should.equal("ep/$management");
      config.getEventHubSenderAddress().should.equal("ep");
      config.getEventHubSenderAddress("0").should.equal("ep/Partitions/0");
      config.getEventHubSenderAddress(0).should.equal("ep/Partitions/0");
      config.getEventHubReceiverAddress("0").should.equal("ep/ConsumerGroups/$default/Partitions/0");
      config.getEventHubReceiverAddress(0).should.equal("ep/ConsumerGroups/$default/Partitions/0");
      config.getEventHubReceiverAddress("0", "cg").should.equal("ep/ConsumerGroups/cg/Partitions/0");
      config.getEventHubReceiverAddress(0, "cg").should.equal("ep/ConsumerGroups/cg/Partitions/0");

      config.getEventHubManagementAudience().should.equal("sb://hostname.servicebus.windows.net/ep/$management");
      config.getEventHubSenderAudience().should.equal("sb://hostname.servicebus.windows.net/ep");
      config.getEventHubSenderAudience("0").should.equal("sb://hostname.servicebus.windows.net/ep/Partitions/0");
      config.getEventHubSenderAudience(0).should.equal("sb://hostname.servicebus.windows.net/ep/Partitions/0");
      config.getEventHubReceiverAudience("0").should.equal("sb://hostname.servicebus.windows.net/ep/ConsumerGroups/$default/Partitions/0");
      config.getEventHubReceiverAudience(0).should.equal("sb://hostname.servicebus.windows.net/ep/ConsumerGroups/$default/Partitions/0");
      config.getEventHubReceiverAudience("0", "cg").should.equal("sb://hostname.servicebus.windows.net/ep/ConsumerGroups/cg/Partitions/0");
      config.getEventHubReceiverAudience(0, "cg").should.equal("sb://hostname.servicebus.windows.net/ep/ConsumerGroups/cg/Partitions/0");
      done();
    });
  });

  describe("IotHub", function () {
    const iotString = "HostName=someiot.azure-devices.net;SharedAccessKeyName=sakName;SharedAccessKey=sak;DeviceId=device-1234";
    it("should correctly create an iothub connection config from an iothub connectionstring", function (done) {
      const config = IotHubConnectionConfig.create(iotString);
      config.should.have.property("hostName").that.equals("someiot.azure-devices.net");
      config.should.have.property("host").that.equals("someiot");
      config.should.have.property("sharedAccessKeyName").that.equals("sakName");
      config.should.have.property("sharedAccessKey").that.equals("sak");
      config.should.have.property("entityPath").that.equals("messages/events");
      done();
    });

    it("populates path from the path argument if provided", function (done) {
      const config = IotHubConnectionConfig.create(iotString, "abc");
      config.should.have.property("entityPath").that.equals("abc");
      done();
    });

    it("converts an IotHubConnectionConfig to an EventHubConnectionConfig", function (done) {
      const config = IotHubConnectionConfig.create(iotString);
      const ehConfig = IotHubConnectionConfig.convertToEventHubConnectionConfig(config);
      ehConfig.should.have.property("endpoint").that.equals("sb://someiot.azure-devices.net/");
      ehConfig.should.have.property("host").that.equals("someiot.azure-devices.net");
      ehConfig.should.have.property("sharedAccessKeyName").that.equals("sakName");
      ehConfig.should.have.property("sharedAccessKey").that.equals("sak");
      ehConfig.should.have.property("entityPath").that.equals("messages/events");

      ehConfig.getEventHubManagementAddress().should.equal("messages/events/$management");
      ehConfig.getEventHubSenderAddress().should.equal("messages/events");
      ehConfig.getEventHubSenderAddress("0").should.equal("messages/events/Partitions/0");
      ehConfig.getEventHubSenderAddress(0).should.equal("messages/events/Partitions/0");
      ehConfig.getEventHubReceiverAddress("0").should.equal("messages/events/ConsumerGroups/$default/Partitions/0");
      ehConfig.getEventHubReceiverAddress(0).should.equal("messages/events/ConsumerGroups/$default/Partitions/0");
      ehConfig.getEventHubReceiverAddress("0", "cg").should.equal("messages/events/ConsumerGroups/cg/Partitions/0");
      ehConfig.getEventHubReceiverAddress(0, "cg").should.equal("messages/events/ConsumerGroups/cg/Partitions/0");

      ehConfig.getEventHubManagementAudience().should.equal("sb://someiot.azure-devices.net/messages/events/$management");
      ehConfig.getEventHubSenderAudience().should.equal("sb://someiot.azure-devices.net/messages/events");
      ehConfig.getEventHubSenderAudience("0").should.equal("sb://someiot.azure-devices.net/messages/events/Partitions/0");
      ehConfig.getEventHubSenderAudience(0).should.equal("sb://someiot.azure-devices.net/messages/events/Partitions/0");
      ehConfig.getEventHubReceiverAudience("0").should.equal("sb://someiot.azure-devices.net/messages/events/ConsumerGroups/$default/Partitions/0");
      ehConfig.getEventHubReceiverAudience(0).should.equal("sb://someiot.azure-devices.net/messages/events/ConsumerGroups/$default/Partitions/0");
      ehConfig.getEventHubReceiverAudience("0", "cg").should.equal("sb://someiot.azure-devices.net/messages/events/ConsumerGroups/cg/Partitions/0");
      ehConfig.getEventHubReceiverAudience(0, "cg").should.equal("sb://someiot.azure-devices.net/messages/events/ConsumerGroups/cg/Partitions/0");
      done();
    });
  });
});

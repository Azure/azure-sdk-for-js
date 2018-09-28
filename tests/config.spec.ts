// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import { ConnectionConfig, EventHubConnectionConfig } from "../lib";
import * as chai from "chai";
chai.should();

describe("ConnectionConfig", function () {
  describe("Base", function () {
    it("populates config properties from an Event Hubs connection string", function () {
      const config = ConnectionConfig.create("Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep");
      config.should.have.property("host").that.equals("hostname.servicebus.windows.net");
      config.should.have.property("sharedAccessKeyName").that.equals("sakName");
      config.should.have.property("sharedAccessKey").that.equals("sak");
      config.should.have.property("entityPath").that.equals("ep");
    });

    it("populates path from the path argument if connection string does not have EntityPath", function () {
      const config = ConnectionConfig.create("Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak", "abc");
      config.should.have.property("entityPath").that.equals("abc");
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
    it("should correctly populate config properties from an EventHubs connection string and the helper methods should work as expected", function () {
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
    });
  });
});

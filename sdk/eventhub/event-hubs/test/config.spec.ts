// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventHubConnectionConfig } from "../src/eventhubConnectionConfig";
import chai from "chai";
const should = chai.should();

describe("ConnectionConfig", function() {
  describe("EventHub", function() {
    it("should fail if connection config does not contain path and the connectionstring also does not contain EntityPath", function(done) {
      const connectionString =
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak";
      try {
        EventHubConnectionConfig.create(connectionString);
        done(new Error("Should not have reached here."));
      } catch (err) {
        err.message.should.match(/Either provide "path" or the "connectionString".*/gi);
      }
      done();
    });

    it("should correctly populate config properties from an EventHubs connection string and the helper methods should work as expected", function(done) {
      const config = EventHubConnectionConfig.create(
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep"
      );
      config.should.have.property("host").that.equals("hostname.servicebus.windows.net");
      config.should.have.property("sharedAccessKeyName").that.equals("sakName");
      config.should.have.property("sharedAccessKey").that.equals("sak");
      config.should.have.property("entityPath").that.equals("ep");

      config.getManagementAddress().should.equal("ep/$management");
      config.getSenderAddress().should.equal("ep");
      config.getSenderAddress("0").should.equal("ep/Partitions/0");
      config.getSenderAddress(0).should.equal("ep/Partitions/0");
      config.getReceiverAddress("0").should.equal("ep/ConsumerGroups/$default/Partitions/0");
      config.getReceiverAddress(0).should.equal("ep/ConsumerGroups/$default/Partitions/0");
      config.getReceiverAddress("0", "cg").should.equal("ep/ConsumerGroups/cg/Partitions/0");
      config.getReceiverAddress(0, "cg").should.equal("ep/ConsumerGroups/cg/Partitions/0");

      config
        .getManagementAudience()
        .should.equal("sb://hostname.servicebus.windows.net/ep/$management");
      config.getSenderAudience().should.equal("sb://hostname.servicebus.windows.net/ep");
      config
        .getSenderAudience("0")
        .should.equal("sb://hostname.servicebus.windows.net/ep/Partitions/0");
      config
        .getSenderAudience(0)
        .should.equal("sb://hostname.servicebus.windows.net/ep/Partitions/0");
      config
        .getReceiverAudience("0")
        .should.equal(
          "sb://hostname.servicebus.windows.net/ep/ConsumerGroups/$default/Partitions/0"
        );
      config
        .getReceiverAudience(0)
        .should.equal(
          "sb://hostname.servicebus.windows.net/ep/ConsumerGroups/$default/Partitions/0"
        );
      config
        .getReceiverAudience("0", "cg")
        .should.equal("sb://hostname.servicebus.windows.net/ep/ConsumerGroups/cg/Partitions/0");
      config
        .getReceiverAudience(0, "cg")
        .should.equal("sb://hostname.servicebus.windows.net/ep/ConsumerGroups/cg/Partitions/0");
      done();
    });

    it("requires that Endpoint be present in the connection string", (done) => {
      const connectionString = `Endpoint=sb://a`;

      should.throw(() => {
        EventHubConnectionConfig.create(connectionString);
      }, /must contain EntityPath/);

      done();
    });
  });
});

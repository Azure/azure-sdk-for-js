// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { EnvVarKeys, getEnvVars } from "../../public/utils/testUtils";
import { EventHubSender } from "../../../src/eventHubSender";
import { createConnectionContext } from "../../../src/connectionContext";
import { stub } from "sinon";
import { MessagingError } from "@azure/core-amqp";
const env = getEnvVars();

describe("disconnected", function() {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  before("validate environment", function(): void {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });

  describe("EventHubSender", function() {
    /**
     * Test added for issue https://github.com/Azure/azure-sdk-for-js/issues/15002
     * Prior to fixing this issue, a TypeError would be thrown when this test was ran.
     */
    it("send works after disconnect", async () => {
      const context = createConnectionContext(service.connectionString, service.path);
      const sender = EventHubSender.create(context);

      // Create the sender link via getMaxMessageSize() so we can check when 'send' is about to be called on it.
      await sender.getMaxMessageSize();
      should.equal(sender.isOpen(), true, "Expected sender to be open.");

      // Here we stub out the 'send' call on the AwaitableSender.
      // We do 2 things:
      // 1. Call `idle()` on the underlying rhea connection so that a disconnect is triggered.
      // 2. Reject with a MessagingError.
      // The MessagingError is thrown so that the send operation will be retried.
      // The disconnect that's triggered will cause the existing AwaitableSender to be closed.

      // If everything works as expected, then a new AwaitableSender should be created on the next
      // retry attempt and the event should be successfully sent.
      const senderLink = sender["_sender"]!;
      const sendStub = stub(senderLink, "send");
      sendStub.callsFake(async () => {
        context.connection["_connection"].idle();
        throw new MessagingError("Fake rejection!");
      });

      await sender.send([{ body: "foo" }]);

      await context.close();
    });
  });
});

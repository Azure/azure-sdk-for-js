// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const assert = chai.assert;
import chaiAsPromised from "chai-as-promised";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
} from "../public/utils/testutils2";
import { TestClientType } from "../public/utils/testUtils";
import { ServiceBusSenderImpl } from "../../src/sender";
import { getErrorMessage } from "@azure/core-util";

chai.use(chaiAsPromised);

describe("controlled connection initialization", () => {
  let sender: ServiceBusSenderImpl;
  let senderEntityPath: string;
  let serviceBusClient: ServiceBusClientForTests;
  beforeEach(async () => {
    serviceBusClient = createServiceBusClientForTests();

    // there's nothing entity specific about what I'm doing here so it can be any
    // entity...
    const { queue } = await serviceBusClient.test.createTestEntities(
      TestClientType.UnpartitionedQueue
    );

    if (queue == null) {
      throw new Error("queue name should not be null");
    }

    senderEntityPath = queue!;
  });

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
    // Cleaning the client as well since we are using a new client for each test
    await serviceBusClient.test.after();
  });

  it("preconnect() establishes the link up front", async () => {
    try {
      // casting because I need access to 'open' and the return type of createSender() is an
      // interface.
      sender = serviceBusClient.createSender(senderEntityPath) as ServiceBusSenderImpl;
      await sender.preconnect();
      assert.ok(sender["_sender"]["isOpen"](), "Expecting link being opened");
      await sender.sendMessages({ body: "hello" });
    } finally {
      sender.close();
    }
  });

  it("open() doesn't re-open a sender when it's been close()'d", async () => {
    // casting because I need access to 'open' and the return type of createSender() is an
    // interface.
    sender = serviceBusClient.createSender(senderEntityPath) as ServiceBusSenderImpl;
    sender["_sender"]["_negotiateClaim"] = async () => {
      // this is a decent way to tell that we tried to open the connection
      throw new Error(
        "_negotiateClaim(): We won't get here until _after_ the lock has been released"
      );
    };
    // we can't revive a sender.
    await sender.close();

    try {
      await sender.preconnect();
      assert.fail("Should have thrown once we reached our stubbed out _negotiateClaim() call");
    } catch (err) {
      assert.equal(
        getErrorMessage(err),
        `The sender for "${senderEntityPath}" has been closed and can no longer be used. Please create a new sender using the "createSender" method on the ServiceBusClient.`
      );
    }
  });
});

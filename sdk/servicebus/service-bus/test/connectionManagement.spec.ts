// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const assert = chai.assert;
import chaiAsPromised from "chai-as-promised";
import {
  QueueClient,
  Sender,
  Receiver,
  SubscriptionClient,
  TopicClient,
  ReceiveMode
} from "../src";
import { getServiceBusClient, getSenderReceiverClients, TestClientType } from "./utils/testUtils";

const should = chai.should();
chai.use(chaiAsPromised);

describe("controlled connection initialization", () => {
  let closeAll: () => Promise<void>;
  let sender: Sender;
  let receiver: Receiver;

  beforeEach(async () => {
    let serviceBusClient = getServiceBusClient();
    let senderClient: QueueClient | TopicClient;
    let receiverClient: QueueClient | SubscriptionClient;

    ({ senderClient, receiverClient } = await getSenderReceiverClients(
      serviceBusClient,
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue
    ));

    sender = senderClient.createSender();
    receiver = receiverClient.createReceiver(ReceiveMode.receiveAndDelete);

    closeAll = async () => {
      await sender.close();
      await senderClient.close();

      await receiver.close();
      await receiverClient.close();

      await serviceBusClient?.close();
    };
  });

  afterEach(async () => {
    if (closeAll) {
      await closeAll();
    }
  });

  it("baseline - normal lazy init()", async () => {
    // first, establish some baseline - the connection is not yet open, right?
    should.not.exist(sender["_context"].sender);

    await sender.send({
      body: "message sent just to prove the sender() initialization flow"
    });

    await checkThatInitializationDoesntReoccur(sender);
  });

  it("non-lazy init", async () => {
    // first, establish some baseline - the connection is not yet open, right?
    should.not.exist(sender["_context"].sender);

    await sender.open();

    await checkThatInitializationDoesntReoccur(sender);
  });

  // connection should not get opened more than once (ie, underlying to _init(), nothing else should get called)
  // ['negotiateClaim'] doesn't get called on the second time through.
  // context.sender is initialized?
});
async function checkThatInitializationDoesntReoccur(sender: Sender) {
  // validate that the internals haven't shifted out from underneath me...
  should.exist(sender["_context"].sender);
  should.exist(sender["_context"].sender!["_negotiateClaim"]);
  assert.isTrue(sender["_context"].sender!["isOpen"](), "The connection is actually open()");

  // stub out the `MessageSender` methods that handle initializing the
  // connection - now that everything is up we should always see that it
  // takes the "early exit" path when it sees that the connection is open
  let negotiateClaimWasCalled = false;

  // now we'll just fake the rest
  let isOpenWasCalled = false;

  sender["_context"].sender!["isOpen"] = () => {
    isOpenWasCalled = true;
    return true;
  };

  sender["_context"].sender!["_negotiateClaim"] = async () => {
    negotiateClaimWasCalled = true;
  };

  await sender.send({
    body: "sending another message just to prove the connection checks work"
  });

  assert.isTrue(isOpenWasCalled, "we should have checked that the connection was open");
  assert.isFalse(
    negotiateClaimWasCalled,
    "we should NOT have tried to _negotiateClaim since the connection was open"
  );
}

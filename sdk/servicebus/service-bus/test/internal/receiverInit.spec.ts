// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ReceiverOptions } from "rhea-promise";
chai.use(chaiAsPromised);
const assert = chai.assert;

import { ClientEntityContext } from "../../src/clientEntityContext";
import { BatchingReceiver } from "../../src/core/batchingReceiver";
import { MessageReceiver, ReceiverType } from "../../src/core/messageReceiver";

describe("init() and close() interactions", () => {
  function fakeContext(): ClientEntityContext {
    return ({
      namespace: {
        config: {}
      }
    } as unknown) as ClientEntityContext;
  }

  it("close() called just after init() but before the next step", async () => {
    const batchingReceiver = new BatchingReceiver(fakeContext());

    let initWasCalled = false;
    batchingReceiver["_init"] = async () => {
      initWasCalled = true;
      // ie, pretend that somebody called close() and the
      // call happened between .init().then()
      batchingReceiver["_receiver"] = undefined;
    };

    // make an init() happen internally.
    const emptyArrayOfMessages = await batchingReceiver.receive(1, 1, 1);

    assert.isEmpty(emptyArrayOfMessages);
    assert.isTrue(initWasCalled);
  });

  it("message receiver init() bails out early if object is closed()", async () => {
    const messageReceiver2 = new MessageReceiver(fakeContext(), ReceiverType.streaming);

    // so our object basically looks like an unopened receiver
    messageReceiver2["isOpen"] = () => false;
    messageReceiver2["isConnecting"] = false;

    // close() the object. Closed objects should not be able to be reopened.
    await messageReceiver2.close();

    let negotiateClaimWasCalled = false;

    messageReceiver2["_negotiateClaim"] = async () => {
      negotiateClaimWasCalled = true;
      throw new Error(
        "Negotiate claim was called - we should have early exited and never tried to init a close()'d instance."
      );
    };

    await messageReceiver2["_init"]({} as ReceiverOptions);

    assert.isFalse(negotiateClaimWasCalled);
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Receiver, ReceiverOptionsWithSession } from "rhea-promise";
import { LinkEntity } from "../../src/core/linkEntity";
import { createClientEntityContextForTests, createRheaReceiverForTests } from "./unittestUtils";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe("LinkEntity unit tests", () => {
  class BasicLink extends LinkEntity<Receiver> {
    async createRheaLink(options: ReceiverOptionsWithSession): Promise<Receiver> {
      return createRheaReceiverForTests(options);
    }
  }

  it("initLink - basic case", async () => {
    const linkEntity = new BasicLink("some initial name", createClientEntityContextForTests());

    assert.isFalse(linkEntity.isOpen(), "link isn't yet open, the class is just created.");

    await linkEntity.initLink({});
    assert.exists(linkEntity);

    assert.isTrue(linkEntity.isOpen(), "link is now open - initLink() has been called.");
    assert.match(linkEntity.name, /^some initial name-.*$/);

    // when we close with 'linkonly' it closes the link but the
    // link can be reopened.
    await linkEntity["closeLink"]("linkonly");
    assert.isFalse(linkEntity.isOpen());
    assert.isFalse(linkEntity["_wasClosedByUser"]);

    await linkEntity.initLink({});

    assert.isTrue(
      linkEntity.isOpen(),
      'We are allowed to reopen a link if it\'s been closed with the "detach" flag'
    );

    await linkEntity["closeLink"]("permanently");
    assert.isFalse(linkEntity.isOpen());
    assert.isTrue(linkEntity["_wasClosedByUser"]);

    linkEntity.initLink({});
    assert.isFalse(
      linkEntity.isOpen(),
      'Once a link is closed with the "close" flag it cannot be reopened'
    );
  });

  it("initLink - multiple simultaneous initLink calls are ignored", async () => {
    const linkEntity = new BasicLink("some initial name", createClientEntityContextForTests());

    let timesCalled = 0;

    linkEntity["_negotiateClaim"] = async () => {
      ++timesCalled;

      // this will just resolve immediately because
      // we're already connecting.
      await linkEntity.initLink({});
    };

    await linkEntity.initLink({});

    assert.equal(
      timesCalled,
      1,
      "Only one negotiateClaim call should make it through since the others were turned away because of the isConnecting field"
    );
  });

  it("initLink - early exit when link is already open", async () => {
    const linkEntity = new BasicLink("some initial name", createClientEntityContextForTests());

    await linkEntity.initLink({});

    let negotiateClaimCalled = 0;

    linkEntity["_negotiateClaim"] = async () => {
      ++negotiateClaimCalled;
    };

    // connection already open
    await linkEntity.initLink({});
    assert.isTrue(linkEntity.isOpen(), "Link should be open already");
    assert.equal(negotiateClaimCalled, 0, "If the link is already open we don't open another");
  });

  it("initLink - early exit when link has been permanently closed", async () => {
    const linkEntity = new BasicLink("some initial name", createClientEntityContextForTests());

    await linkEntity.initLink({});

    let negotiateClaimCalled = 0;

    linkEntity["_negotiateClaim"] = async () => {
      ++negotiateClaimCalled;
    };

    await linkEntity["closeLink"]("permanently");

    await linkEntity.initLink({});
    assert.isFalse(linkEntity.isOpen(), "Link was closed and will remain closed");
    assert.equal(negotiateClaimCalled, 0, "We shouldn't attempt to reopen the link.");
  });

  it("initLink - error handling", async () => {
    const linkEntity = new BasicLink("some initial name", createClientEntityContextForTests());

    linkEntity["_negotiateClaim"] = async () => {
      throw new Error("SPECIAL ERROR THROWN FROM NEGOTIATECLAIM");
    };

    try {
      await linkEntity.initLink({});
      assert.fail("Should have thrown");
    } catch (err) {
      assert.equal(err.message, "SPECIAL ERROR THROWN FROM NEGOTIATECLAIM");
    }
  });

  it("initLink - abortSignal - simple abort signal flow", async () => {
    const linkEntity = new BasicLink("some initial name", createClientEntityContextForTests());

    try {
      await linkEntity.initLink({}, {
        aborted: true
      } as AbortSignalLike);
      assert.fail("Should have thrown.");
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("initLink - abortSignal - if a link was actually created we clean up", async () => {
    const linkEntity = new BasicLink("some initial name", createClientEntityContextForTests());

    let isAborted = false;

    const orig = linkEntity["createRheaLink"];
    let returnedReceiver: Receiver | undefined;

    linkEntity["createRheaLink"] = async (options) => {
      isAborted = true;

      returnedReceiver = await orig.call(linkEntity, options);
      assert.isTrue(
        returnedReceiver.isOpen(),
        "Sanity check - the returnedReceiver was open when we returned it."
      );
      return returnedReceiver;
    };

    try {
      await linkEntity.initLink({}, {
        get aborted(): boolean {
          return isAborted;
        }
      } as AbortSignalLike);
      assert.fail("Should have thrown");
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }

    assert.isFalse(linkEntity.isOpen());
    assert.isFalse(returnedReceiver?.isOpen(), "The retruned receiver was closed since we aborted");

    // also, this doesn't count as a "close permanently" event
    linkEntity["createRheaLink"] = orig;
    await linkEntity.initLink({});

    assert.isTrue(
      linkEntity.isOpen(),
      "Can always reopen if the reason we closed the link is because of the abortSignal"
    );
  });

  it("initLink - can use a custom name via options", async () => {
    const linkEntity = new BasicLink("some initial name", createClientEntityContextForTests(), {
      address: "my-address"
    });
    assert.match(linkEntity.name, /some initial name-/);

    await linkEntity.initLink({
      name: "some new name"
    });

    assert.equal(linkEntity["_logPrefix"], "[connection-id|r:some new name|a:my-address]");

    // note that specifying a name is a complete override - no additional tacking
    // on of a GUID or anything happens (that's up to you when you override the
    // name)
    assert.equal(
      linkEntity.name,
      "some new name",
      "Name is an exact match to the name passed in the receiver options"
    );

    // we also update the log prefix
    assert.equal(linkEntity["_logPrefix"], "[connection-id|r:some new name|a:my-address]");
  });
});

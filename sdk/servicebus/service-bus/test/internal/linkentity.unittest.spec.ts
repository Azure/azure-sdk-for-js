// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Receiver, ReceiverOptions } from "rhea-promise";
import { LinkEntity } from "../../src/core/linkEntity";
import * as log from "../../src/log";
import { createConnectionContextForTests, createRheaReceiverForTests } from "./unittestUtils";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe("LinkEntity unit tests", () => {
  class LinkForTests extends LinkEntity<Receiver> {
    async createRheaLink(options: ReceiverOptions): Promise<Receiver> {
      return createRheaReceiverForTests(options);
    }
  }

  let linkEntity: LinkEntity<Receiver>;

  beforeEach(() => {
    linkEntity = new LinkForTests("some initial name", createConnectionContextForTests(), "sr", {
      address: "my-address"
    });
  });

  afterEach(async () => {
    await linkEntity.close();
  });

  it("initLink - basic case", async () => {
    assert.isFalse(linkEntity.isOpen(), "link isn't yet open, the class is just created.");

    await linkEntity.initLink({});

    assert.match(linkEntity.name, /^some initial name-.*$/);
    assertLinkEntityOpen();

    // when we close with 'linkonly' it closes the link but the
    // link can be reopened.
    await linkEntity["closeLink"]();
    assertLinkEntityClosedTemporarily();

    await linkEntity.initLink({});
    assertLinkEntityOpen();

    await linkEntity.close();
    assertLinkEntityClosedPermanently();

    linkEntity.initLink({});
    assertLinkEntityClosedPermanently();
  });

  it("initLink - multiple simultaneous initLink calls are ignored", async () => {
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
    await linkEntity.initLink({});

    let negotiateClaimCalled = 0;

    linkEntity["_negotiateClaim"] = async () => {
      ++negotiateClaimCalled;
    };

    // connection already open
    await linkEntity.initLink({});
    assertLinkEntityOpen();
    assert.equal(negotiateClaimCalled, 0, "If the link is already open we don't open another");
  });

  it("initLink - early exit when link has been permanently closed", async () => {
    await linkEntity.initLink({});
    assert.exists(linkEntity["_tokenRenewalTimer"], "the tokenrenewal timer should have been set");

    let negotiateClaimCalled = 0;

    linkEntity["_negotiateClaim"] = async () => {
      ++negotiateClaimCalled;
    };

    await linkEntity.close();
    assertLinkEntityClosedPermanently();

    await linkEntity.initLink({});
    assert.isFalse(linkEntity.isOpen(), "Link was closed and will remain closed");
    assert.equal(negotiateClaimCalled, 0, "We shouldn't attempt to reopen the link.");
  });

  it("initLink - error handling", async () => {
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

    // The returned receiver was closed since we aborted
    // but it's not permanent since the user didn't initiate it.
    assertLinkEntityClosedTemporarily();

    // we can reinitialize an aborted link.
    linkEntity["createRheaLink"] = orig;
    await linkEntity.initLink({});

    assert.isTrue(
      linkEntity.isOpen(),
      "Can always reopen if the reason we closed the link is because of the abortSignal"
    );
  });

  it("initLink - can use a custom name via options", async () => {
    assert.match(linkEntity.name, /some initial name-/);

    await linkEntity.initLink({
      name: "some new name"
    });

    assert.equal(linkEntity["_logPrefix"], "[connection-id|sr:some new name|a:my-address]");

    // note that specifying a name is a complete override - no additional tacking
    // on of a GUID or anything happens (that's up to you when you override the
    // name)
    assert.equal(
      linkEntity.name,
      "some new name",
      "Name is an exact match to the name passed in the receiver options"
    );

    // we also update the log prefix
    assert.equal(linkEntity["_logPrefix"], "[connection-id|sr:some new name|a:my-address]");
  });

  it("initLink - user closes link while it's initializing", async () => {
    linkEntity["createRheaLink"] = async () => {
      await linkEntity.close();
      return createRheaReceiverForTests();
    };

    try {
      await linkEntity.initLink({
        name: "some new name"
      });
      assert.fail("Should have thrown");
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }

    assert.equal(linkEntity["_logPrefix"], "[connection-id|sr:some new name|a:my-address]");
    assertLinkEntityClosedPermanently();
  });

  it("initLink - multiple closes don't cause errors", async () => {
    // TODO: there is a possibility of a race condition here. We can address this
    // when we properly lock around init operations that are in progress.
    await linkEntity["closeLink"]();
    await linkEntity["closeLink"]();

    await linkEntity.close();
    await linkEntity.close();
  });

  it("initLink - get logger", async () => {
    assert.strictEqual(LinkEntity["getLogger"]("br"), log.batching);
    assert.strictEqual(LinkEntity["getLogger"]("sr"), log.streaming);
    assert.strictEqual(LinkEntity["getLogger"]("s"), log.sender);
    assert.strictEqual(LinkEntity["getLogger"]("m"), log.mgmt);
    assert.strictEqual(LinkEntity["getLogger"]("ms"), log.messageSession);
  });

  function assertLinkEntityOpen(): void {
    assert.isTrue(linkEntity.isOpen(), "link should be open");
    assert.exists(linkEntity["_tokenRenewalTimer"], "the tokenrenewal timer should have been set");
  }

  function assertLinkEntityClosedPermanently(): void {
    assert.isFalse(linkEntity.isOpen(), "link should be closed");
    assert.isTrue(linkEntity["_wasClosedPermanently"], "link was closed permanently");

    assert.notExists(
      linkEntity["_tokenRenewalTimer"],
      'the tokenrenewal timer should be cleared when we close("permanently")'
    );
  }

  function assertLinkEntityClosedTemporarily(): void {
    assert.isFalse(linkEntity.isOpen(), "link should be closed");
    assert.isFalse(linkEntity["_wasClosedPermanently"], "Only the internal link was closed");

    assert.notExists(
      linkEntity["_tokenRenewalTimer"],
      'the tokenrenewal timer should be cleared when we close("linkonly")'
    );
  }
});

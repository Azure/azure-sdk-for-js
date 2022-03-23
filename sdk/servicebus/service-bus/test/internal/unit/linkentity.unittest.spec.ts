// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Receiver, ReceiverOptions } from "rhea-promise";
import sinon from "sinon";
import { ConnectionContext } from "../../../src/connectionContext";
import { BatchingReceiver } from "../../../src/core/batchingReceiver";
import { LinkEntity } from "../../../src/core/linkEntity";
import { ManagementClient } from "../../../src/core/managementClient";
import { MessageSender } from "../../../src/core/messageSender";
import { StreamingReceiver } from "../../../src/core/streamingReceiver";
import { receiverLogger } from "../../../src/log";
import { MessageSession } from "../../../src/session/messageSession";
import { createConnectionContextForTests, createRheaReceiverForTests } from "./unittestUtils";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe("LinkEntity unit tests", () => {
  class LinkForTests extends LinkEntity<Receiver> {
    private _removeLinkFromContextCalled: boolean = false;

    protected removeLinkFromContext(): void {
      this._removeLinkFromContextCalled = true;
    }

    async createRheaLink(options: ReceiverOptions): Promise<Receiver> {
      return createRheaReceiverForTests(options);
    }
  }

  let linkEntity: LinkEntity<Receiver>;
  let connectionContext: ConnectionContext;

  beforeEach(function () {
    connectionContext = createConnectionContextForTests();
    linkEntity = new LinkForTests(
      "some initial name",
      "some initial name",
      connectionContext,
      "streaming",
      receiverLogger,
      {
        address: "my-address",
      }
    );
  });

  afterEach(async () => {
    await linkEntity.close();
    assert.isTrue(
      (linkEntity as LinkForTests)["_removeLinkFromContextCalled"],
      "Every link should have a chance to remove themselves from the cache"
    );
  });

  describe("initLink", () => {
    it("basic case", async () => {
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

      try {
        await linkEntity.initLink({});
        assert.fail("Should have thrown");
      } catch (err) {
        assert.equal(err.message, "Link has been permanently closed. Not reopening.");
        assert.equal(err.name, "AbortError");
      }
      assertLinkEntityClosedPermanently();
    });

    it("multiple simultaneous initLink calls obey the lock", async () => {
      let timesCalled = 0;

      const innerPromises: Promise<void>[] = [];

      linkEntity["_negotiateClaim"] = async () => {
        ++timesCalled;
      };

      await linkEntity.initLink({});

      assert.equal(
        timesCalled,
        1,
        "Only one negotiateClaim call should make it through since the others were turned away because of the isConnecting field"
      );

      await Promise.all(innerPromises);
    });

    describe("connection in a 'restarting' state causes initLink to throw", () => {
      it("connection in restarting state before we called initLink", async () => {
        connectionContext["isConnectionClosing"] = () => true;

        try {
          await linkEntity.initLink({});
          assert.fail("Should have thrown");
        } catch (err) {
          assertInitAbortError(err);
        }
      });

      it("connection is restarting just before cbsSession.init()", async () => {
        try {
          const old = linkEntity["checkIfConnectionReady"];
          linkEntity["checkIfConnectionReady"] = () => {
            connectionContext["isConnectionClosing"] = () => true;
            old.apply(linkEntity);
          };

          await linkEntity.initLink({});
          assert.fail("Should have thrown");
        } catch (err) {
          assertInitAbortError(err);
        }
      });

      it("connection is restarting just before cbsSession.negotiateClaim()", async () => {
        try {
          const old = linkEntity["checkIfConnectionReady"];
          linkEntity["checkIfConnectionReady"] = () => {
            connectionContext["isConnectionClosing"] = () => true;
            old.apply(linkEntity);
          };

          await linkEntity.initLink({});
          assert.fail("Should have thrown");
        } catch (err) {
          assertInitAbortError(err);
        }
      });

      it("connection is restarting just before createRheaLink()", async () => {
        try {
          const old = linkEntity["_negotiateClaim"];
          linkEntity["_negotiateClaim"] = async (...args) => {
            await old.apply(linkEntity, args);
            connectionContext["isConnectionClosing"] = () => true;
          };

          await linkEntity.initLink({});
          assert.fail("Should have thrown");
        } catch (err) {
          assertInitAbortError(err);
        }
      });

      function assertInitAbortError(err: any): void {
        assert.equal(err.message, "Connection is reopening, aborting link initialization.");
        assert.equal(err.name, "ServiceBusError");
        assert.isTrue(
          err.retryable,
          "Exception thrown when the connection is closing should be retryable"
        );
      }
    });

    it("connection is not ready causes initLink to block", async () => {
      connectionContext["readyToOpenLink"] = async () => {
        // should be safe for readyToOpenLink to close the link object
        // without this it's possible for us to deadlock.
        await linkEntity["closeLink"]();
      };

      assert.isFalse(linkEntity.isOpen());
      await linkEntity.initLink({});
      assert.isTrue(linkEntity.isOpen());
    });

    it("early exit when link is already open", async () => {
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

    it("early exit when link has been permanently closed", async () => {
      await linkEntity.initLink({});
      assert.exists(
        linkEntity["_tokenRenewalTimer"],
        "the tokenrenewal timer should have been set"
      );

      const negotiateClaimSpy = sinon.spy(linkEntity as any, "_negotiateClaim");

      await linkEntity.close();
      assertLinkEntityClosedPermanently();

      try {
        await linkEntity.initLink({});
        assert.fail("Should throw");
      } catch (err) {
        assert.equal("Link has been permanently closed. Not reopening.", err.message);
        assert.isFalse(linkEntity.isOpen(), "Link was closed and will remain closed");
        assert.isFalse(negotiateClaimSpy.called, "We shouldn't attempt to reopen the link.");
      }
    });

    it("error handling", async () => {
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

    it("abortSignal - simple abort signal flow", async () => {
      try {
        await linkEntity.initLink({}, {
          aborted: true,
        } as AbortSignalLike);
        assert.fail("Should have thrown.");
      } catch (err) {
        assert.equal(err.name, "AbortError");
      }
    });

    it("abortSignal - if a link was actually created we clean up", async () => {
      const abortController = new AbortController();

      const orig = linkEntity["createRheaLink"];
      let returnedReceiver: Receiver | undefined;

      linkEntity["createRheaLink"] = async (options) => {
        abortController.abort();

        returnedReceiver = await orig.call(linkEntity, options);
        assert.isTrue(
          returnedReceiver.isOpen(),
          "Sanity check - the returnedReceiver was open when we returned it."
        );
        return returnedReceiver;
      };

      try {
        await linkEntity.initLink({}, abortController.signal);
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

    it("abortSignal - is passed through to negotiateClaim", async () => {
      const abortController = new AbortController();

      let sawAbortSignal = false;
      try {
        const old = linkEntity["_negotiateClaim"];
        linkEntity["_negotiateClaim"] = async (props) => {
          if (props.abortSignal) {
            sawAbortSignal = true;
          }
          abortController.abort();
          return old.call(linkEntity, props);
        };

        await linkEntity.initLink({}, abortController.signal);
        assert.fail("Should have thrown");
      } catch (err) {
        assert.isTrue(sawAbortSignal, "Should have seen the abortSignal.");
        assert.deepNestedInclude(err, {
          name: "AbortError",
          message: "The operation was aborted.",
        });
      }
    });

    it("can use a custom name via options", async () => {
      assert.match(linkEntity.name, /some initial name-/);

      await linkEntity.initLink({
        name: "some new name",
      });

      assert.equal(linkEntity["_logPrefix"], "[connection-id|streaming:some new name]");

      // note that specifying a name is a complete override - no additional tacking
      // on of a GUID or anything happens (that's up to you when you override the
      // name)
      assert.equal(
        linkEntity.name,
        "some new name",
        "Name is an exact match to the name passed in the receiver options"
      );

      // we also update the log prefix
      assert.equal(linkEntity["_logPrefix"], "[connection-id|streaming:some new name]");
    });

    it("multiple closes don't cause errors", async () => {
      // TODO: there is a possibility of a race condition here. We can address this
      // when we properly lock around init operations that are in progress.
      await linkEntity["closeLink"]();
      await linkEntity["closeLink"]();

      await linkEntity.close();
      await linkEntity.close();
    });
  });

  describe("cache cleanup", () => {
    it("batchingreceiver", () => {
      const batchingReceiver = new BatchingReceiver(connectionContext, "entityPath", {
        abortSignal: undefined,
        lockRenewer: undefined,
        receiveMode: "receiveAndDelete",
        skipParsingBodyAsJson: false,
        tracingOptions: {},
      });

      initCachedLinks(batchingReceiver.name);

      batchingReceiver["removeLinkFromContext"]();

      assertLinkCaches({
        name: batchingReceiver.name,
        clearedCache: connectionContext.messageReceivers,
        unchangedCaches: [
          connectionContext.managementClients,
          connectionContext.messageSessions,
          connectionContext.senders,
        ],
      });
    });

    it("streamingreceiver", () => {
      const streamingReceiver = new StreamingReceiver(connectionContext, "entityPath", {
        abortSignal: undefined,
        lockRenewer: undefined,
        receiveMode: "receiveAndDelete",
        skipParsingBodyAsJson: false,
        tracingOptions: {},
      });

      initCachedLinks(streamingReceiver.name);

      streamingReceiver["removeLinkFromContext"]();

      assertLinkCaches({
        name: streamingReceiver.name,
        clearedCache: connectionContext.messageReceivers,
        unchangedCaches: [
          connectionContext.managementClients,
          connectionContext.messageSessions,
          connectionContext.senders,
        ],
      });
    });

    it("sender", () => {
      const sender = new MessageSender(connectionContext, "entityPath", {});

      initCachedLinks(sender.name);

      sender["removeLinkFromContext"]();

      assertLinkCaches({
        name: sender.name,
        clearedCache: connectionContext.senders,
        unchangedCaches: [
          connectionContext.managementClients,
          connectionContext.messageReceivers,
          connectionContext.messageSessions,
        ],
      });
    });

    it("session", () => {
      const messageSession = new MessageSession(connectionContext, "entityPath", "session-id", {
        abortSignal: undefined,
        retryOptions: {},
        skipParsingBodyAsJson: false,
      });

      initCachedLinks(messageSession.name);

      messageSession["removeLinkFromContext"]();

      assertLinkCaches({
        name: messageSession.name,
        clearedCache: connectionContext.messageSessions,
        unchangedCaches: [
          connectionContext.managementClients,
          connectionContext.messageReceivers,
          connectionContext.senders,
        ],
      });
    });

    it("managementclient", () => {
      const mgmtClient = new ManagementClient(connectionContext, "entityPath");

      initCachedLinks(mgmtClient.name);

      mgmtClient["removeLinkFromContext"]();

      assertLinkCaches({
        name: mgmtClient.name,
        clearedCache: connectionContext.managementClients,
        unchangedCaches: [
          connectionContext.messageSessions,
          connectionContext.messageReceivers,
          connectionContext.senders,
        ],
      });
    });

    function assertLinkCaches(args: {
      name: string;
      clearedCache: { [name: string]: any };
      unchangedCaches: { [name: string]: any }[];
    }): void {
      assert.isEmpty(
        args.unchangedCaches.filter((cache) => cache[args.name] == null),
        "Unrelated caches should not be changed."
      );
    }

    function initCachedLinks(name: string): void {
      connectionContext.messageReceivers[name] = {} as any;
      connectionContext.senders[name] = {} as any;
      connectionContext.managementClients[name] = {} as any;
      connectionContext.messageSessions[name] = {} as any;
    }
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

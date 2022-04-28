// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SyncTokens, parseSyncToken } from "../../../src/internal/synctokenpolicy";
import { assert } from "chai";
import { AppConfigurationClient } from "../../../src";
import nock from "nock";
import { InternalAppConfigurationClientOptions } from "../../../src/appConfigurationClient";
import {
  assertThrowsRestError,
  createAppConfigurationClientForTests,
  startRecorder,
} from "../../public/utils/testHelpers";

import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("http request related tests", function () {
  describe("unit tests", () => {
    describe("parseSyncToken", () => {
      it("can parse various sync tokens", () => {
        assert.deepEqual(parseSyncToken("theid=thevalue;sn=1"), {
          id: "theid",
          value: "thevalue",
          sequenceNumber: 1,
        });
      });

      it("throws on invalid sync tokens", () => {
        for (const invalidToken of ["invalid token", "missing=sequencenumber", "key=value;"]) {
          assert.throws(
            () => parseSyncToken(invalidToken),
            new RegExp(`Failed to parse sync token '${invalidToken}' with regex .+$`)
          );
        }
      });
    });

    describe("syncTokens", () => {
      it("basic", () => {
        const syncTokens = new SyncTokens();
        syncTokens.addSyncTokenFromHeaderValue("a=value;sn=0");

        // note that 'sn' is purposefully not serialized
        assert.equal("a=value", syncTokens.getSyncTokenHeaderValue());

        syncTokens.addSyncTokenFromHeaderValue("b=value2;sn=0");
        assert.equal("a=value,b=value2", splitAndSort(syncTokens.getSyncTokenHeaderValue()));

        // now we'll rev the sequence number field - it should overwrite the original value
        // for b
        syncTokens.addSyncTokenFromHeaderValue("b=value2.1;sn=1");
        assert.equal("a=value,b=value2.1", splitAndSort(syncTokens.getSyncTokenHeaderValue()));

        // sending in an older version of an existing key should do nothing
        syncTokens.addSyncTokenFromHeaderValue("b=value2.1;sn=0");
        // note that 'b' didn't change
        assert.equal("a=value,b=value2.1", splitAndSort(syncTokens.getSyncTokenHeaderValue()));

        // and sending in multiple values acts the same as passing them in one
        // at a time.
        syncTokens.addSyncTokenFromHeaderValue("b=value2.2;sn=100,c=value3;sn=1");
        assert.equal(
          "a=value,b=value2.2,c=value3",
          splitAndSort(syncTokens.getSyncTokenHeaderValue())
        );

        // and if we get back undefined (ie, the header wasn't there) then it
        // resets the entire thing
        // (sync tokens are temporary in nature and expire as things are committed
        // and moved out of cache)
        syncTokens.addSyncTokenFromHeaderValue(undefined);
        assert.ok(!syncTokens.getSyncTokenHeaderValue());
      });
    });
  });

  describe("custom client ID", () => {
    let client: AppConfigurationClient;
    let recorder: Recorder;

    beforeEach(function (this: Context) {
      recorder = startRecorder(this);
      client = createAppConfigurationClientForTests() || this.skip();
    });

    afterEach(async function () {
      await recorder.stop();
    });

    it("custom client request ID", async () => {
      const iterator = client.listConfigurationSettings({
        requestOptions: {
          customHeaders: {
            "x-ms-client-request-id": "this is my custom client request id",
          },
        },
      });

      await iterator.next();
    });

    it("default client request ID", async () => {
      const iterator = client.listConfigurationSettings();
      await iterator.next();
    });
  });

  // these tests are only testing that the requests and responses are
  // properly extracting and sending the sync token header (which is
  // why they appear to not do much of anything meaningful with what
  // they send or reply back with).
  describe("request/reply tests for sync token headers", () => {
    let client: AppConfigurationClient;
    let syncTokens: SyncTokens;
    let scope: nock.Scope;

    beforeEach(function (this: Context) {
      if (nock == null || nock.recorder == null) {
        this.skip();
        return;
      }

      syncTokens = new SyncTokens();

      client =
        createAppConfigurationClientForTests<InternalAppConfigurationClientOptions>({
          syncTokens: syncTokens,
        }) || this.skip();

      nock.recorder.clear();
      nock.restore();
      nock.cleanAll();
      if (!nock.isActive()) {
        nock.activate();
      }
      scope = nock(/.*/);
    });

    afterEach(function (this: Context) {
      if (nock == null || nock.recorder == null) {
        return;
      }

      if (!this.currentTest?.isPending()) {
        assert.ok(scope.isDone());
      }
      nock.recorder.clear();
      nock.restore();
      nock.cleanAll();
    });

    it("policy is setup properly to send sync tokens", async function () {
      syncTokens.addSyncTokenFromHeaderValue(`hello=world;sn=1`);

      const policyScope = nock(/.*/, {
        reqheaders: {
          "sync-token": "hello=world",
        },
      })
        .get(/.*/)
        .reply(418);

      await assertThrowsRestError(
        async () =>
          client.getConfigurationSetting({
            key: "doesntmatter",
          }),
        418
      );

      assert.ok(policyScope.isDone());
    });

    it("addConfigurationSetting", async () => {
      scope.put(/.*/).reply(200, "", { "sync-token": "addConfigurationSetting=value;sn=1" });

      await client.addConfigurationSetting({
        key: "doesntmatter",
      });

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "addConfigurationSetting=value");
    });

    it("getConfigurationSetting", async () => {
      scope.get(/.*/).reply(200, "", { "sync-token": "getConfigurationSetting=value;sn=1" });

      await client.getConfigurationSetting({
        key: "doesntmatter",
      });

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "getConfigurationSetting=value");
    });

    it("setConfigurationSetting", async () => {
      scope.put(/.*/).reply(200, "", { "sync-token": "setConfigurationSetting=value;sn=1" });

      await client.setConfigurationSetting({
        key: "doesntmatter",
      });

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "setConfigurationSetting=value");
    });

    it("deleteConfigurationSetting", async () => {
      scope.delete(/.*/).reply(200, "", { "sync-token": "deleteConfigurationSetting=value;sn=1" });

      await client.deleteConfigurationSetting({
        key: "doesntmatter",
      });

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "deleteConfigurationSetting=value");
    });

    it("listConfigurationSetting", async () => {
      scope.get(/.*/).reply(200, "", { "sync-token": "listConfigurationSetting=value;sn=1" });

      const iterator = client.listConfigurationSettings({
        keyFilter: "doesntmatter",
      });

      await iterator.next();
      assert.equal(syncTokens.getSyncTokenHeaderValue(), "listConfigurationSetting=value");
    });

    it("listRevisions", async () => {
      scope.get(/.*/).reply(200, "", { "sync-token": "listRevisions=value;sn=1" });

      const iterator = client.listRevisions({
        keyFilter: "doesntmatter",
      });

      await iterator.next();
      assert.equal(syncTokens.getSyncTokenHeaderValue(), "listRevisions=value");
    });

    it("setReadOnly (clear and set)", async () => {
      scope.put(/.*/).reply(200, "", { "sync-token": "setReadOnly=value;sn=1" });

      scope.delete(/.*/).reply(200, "", { "sync-token": "clearReadOnly=value;sn=1" });

      await client.setReadOnly(
        {
          key: "doesntmatter",
        },
        true
      );

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "setReadOnly=value");

      syncTokens.addSyncTokenFromHeaderValue(undefined); // clear out any previous sync tokens

      await client.setReadOnly(
        {
          key: "doesntmatter",
        },
        false
      );

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "clearReadOnly=value");
    });
  });

  describe("syncToken", async () => {
    it("update sync token", async () => {
      const syncTokens = new SyncTokens();
      syncTokens.addSyncTokenFromHeaderValue("a=value;sn=0");
      const client = new AppConfigurationClient(
        "Endpoint=https://endpoint.azconfig.io;Id=abc;Secret=123",
        { syncTokens } as InternalAppConfigurationClientOptions
      );
      assert.equal(
        syncTokens["_currentSyncTokens"].size,
        1,
        "Unexpected number of syncTokens before the `update` call"
      );
      client.updateSyncToken("b=value;sn=3");
      assert.equal(
        syncTokens["_currentSyncTokens"].size,
        2,
        "Unexpected number of syncTokens after the `update` call"
      );
      assert.deepEqual(
        syncTokens["_currentSyncTokens"].get("a"),
        { id: "a", value: "value", sequenceNumber: 0 },
        "Unexpected object present for key `a`"
      );
      assert.deepEqual(
        syncTokens["_currentSyncTokens"].get("b"),
        { id: "b", value: "value", sequenceNumber: 3 },
        "Unexpected object present for key `b`"
      );
    });
  });
});

function splitAndSort(syncTokens: string | undefined): string {
  if (!syncTokens) {
    throw new Error("Undefined can't be split and sorted");
  }

  return syncTokens.split(",").sort().join(",");
}

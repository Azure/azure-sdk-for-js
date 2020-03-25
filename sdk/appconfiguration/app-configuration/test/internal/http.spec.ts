// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseSyncToken, SyncTokens } from "../../src/internal/synctokenpolicy";
import * as assert from "assert";
import { AppConfigurationClient } from "../../src";
import nock from "nock";
import { getGeneratedClientOptions, packageVersion } from "../../src/appConfigurationClient";
import { createAppConfigurationClientForTests, assertThrowsRestError } from "../testHelpers";
import * as chai from "chai";

describe("http request related tests", () => {
  describe("unit tests", () => {
    describe("parseSyncToken", () => {
      it("can parse various sync tokens", () => {
        assert.deepEqual(parseSyncToken("theid=thevalue;sn=1"), {
          id: "theid",
          value: "thevalue",
          sequenceNumber: 1
        });
      });

      it("throws on invalid sync tokens", () => {
        for (const invalidToken of ["invalid token", "missing=sequencenumber", "key=value;"])
          assert.throws(
            () => parseSyncToken(invalidToken),
            new RegExp(`Failed to parse sync token '${invalidToken}' with regex .+$`)
          );
      });
    });

    it("useragentheadername", () => {
      let options = getGeneratedClientOptions("base-uri", new SyncTokens(), {
        isNodeOverride: false
      });

      assert.equal(
        options.userAgentHeaderName,
        "x-ms-useragent",
        "Pretending we're running in a browser."
      );

      options = getGeneratedClientOptions("base-uri", new SyncTokens(), {
        isNodeOverride: true
      });

      assert.equal(options.userAgentHeaderName, "User-Agent", "Pretending we're running in node.");

      // since we're only running these tests in node this will be the same as the
      // case above (undefined, thus using the normal User-Agent header)
      options = getGeneratedClientOptions("base-uri", new SyncTokens(), {});

      assert.equal(options.userAgentHeaderName, "User-Agent", "We know that we're running node.");
    });

    it("useragent", () => {
      let options = getGeneratedClientOptions("base-uri", new SyncTokens(), {
        userAgentOptions: {
          userAgentPrefix: "MyCustomUserAgent"
        }
      });

      chai.assert.match(
        options.userAgent as string,
        new RegExp(
          `^MyCustomUserAgent azsdk-js-app-configuration\/${packageVersion}+ core-http\/[^ ]+.+$`
        ),
        `Using a custom user agent`
      );

      options = getGeneratedClientOptions("base-uri", new SyncTokens(), {});
      chai.assert.match(
        options.userAgent as string,
        new RegExp(`^azsdk-js-app-configuration\/${packageVersion}+ core-http\/[^ ]+.+$`),
        "Using the default user agent"
      );
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
    let scope: nock.Scope;

    beforeEach(function() {
      client = createAppConfigurationClientForTests() || this.skip();
      scope = nock(/.*/);
    });

    afterEach(() => {
      assert.ok(scope.isDone());
      nock.cleanAll();
    });

    it("custom client request ID", async () => {
      scope
        .matchHeader("x-ms-client-request-id", /this is my custom client request id/)
        .get(/.*/)
        .reply(200);

      const iterator = await client.listConfigurationSettings({
        requestOptions: {
          customHeaders: {
            "x-ms-client-request-id": "this is my custom client request id"
          }
        }
      });

      await iterator.next();
    });

    it("default client request ID", async () => {
      scope
        .matchHeader("x-ms-client-request-id", /^[A-Za-z0-9\-]+$/)
        .get(/.*/)
        .reply(200);

      const iterator = await client.listConfigurationSettings();

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

    beforeEach(function() {
      syncTokens = new SyncTokens();

      client =
        createAppConfigurationClientForTests({
          syncTokens: syncTokens
        }) || this.skip();

      scope = nock(/.*/);
    });

    afterEach(() => {
      assert.ok(scope.isDone());
      nock.cleanAll();
    });

    it("policy is setup properly to send sync tokens", async function() {
      syncTokens.addSyncTokenFromHeaderValue(`hello=world;sn=1`);

      const policyScope = nock(/.*/, {
        reqheaders: {
          "sync-token": "hello=world"
        }
      })
        .get(/.*/)
        .reply(418);

      await assertThrowsRestError(
        async () =>
          await client.getConfigurationSetting({
            key: "doesntmatter"
          }),
        418
      );

      assert.ok(policyScope.isDone());
    });

    it("addConfigurationSetting", async () => {
      scope.put(/.*/).reply(200, "", { "sync-token": "addConfigurationSetting=value;sn=1" });

      await client.addConfigurationSetting({
        key: "doesntmatter"
      });

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "addConfigurationSetting=value");
    });

    it("getConfigurationSetting", async () => {
      scope.get(/.*/).reply(200, "", { "sync-token": "getConfigurationSetting=value;sn=1" });

      await client.getConfigurationSetting({
        key: "doesntmatter"
      });

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "getConfigurationSetting=value");
    });

    it("setConfigurationSetting", async () => {
      scope.put(/.*/).reply(200, "", { "sync-token": "setConfigurationSetting=value;sn=1" });

      await client.setConfigurationSetting({
        key: "doesntmatter"
      });

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "setConfigurationSetting=value");
    });

    it("deleteConfigurationSetting", async () => {
      scope.delete(/.*/).reply(200, "", { "sync-token": "deleteConfigurationSetting=value;sn=1" });

      await client.deleteConfigurationSetting({
        key: "doesntmatter"
      });

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "deleteConfigurationSetting=value");
    });

    it("listConfigurationSetting", async () => {
      scope.get(/.*/).reply(200, "", { "sync-token": "listConfigurationSetting=value;sn=1" });

      const iterator = client.listConfigurationSettings({
        keyFilter: "doesntmatter"
      });

      await iterator.next();
      assert.equal(syncTokens.getSyncTokenHeaderValue(), "listConfigurationSetting=value");
    });

    it("listRevisions", async () => {
      scope.get(/.*/).reply(200, "", { "sync-token": "listRevisions=value;sn=1" });

      const iterator = client.listRevisions({
        keyFilter: "doesntmatter"
      });

      await iterator.next();
      assert.equal(syncTokens.getSyncTokenHeaderValue(), "listRevisions=value");
    });

    it("setReadOnly (clear and set)", async () => {
      scope.put(/.*/).reply(200, "", { "sync-token": "setReadOnly=value;sn=1" });

      scope.delete(/.*/).reply(200, "", { "sync-token": "clearReadOnly=value;sn=1" });

      await client.setReadOnly(
        {
          key: "doesntmatter"
        },
        true
      );

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "setReadOnly=value");

      syncTokens.addSyncTokenFromHeaderValue(undefined); // clear out any previous sync tokens

      await client.setReadOnly(
        {
          key: "doesntmatter"
        },
        false
      );

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "clearReadOnly=value");
    });
  });
});

function splitAndSort(syncTokens: string | undefined): string {
  if (!syncTokens) {
    throw new Error("Undefined can't be split and sorted");
  }

  return syncTokens
    .split(",")
    .sort()
    .join(",");
}

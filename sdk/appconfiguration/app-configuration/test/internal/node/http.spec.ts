// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SyncTokens, parseSyncToken } from "../../../src/internal/syncTokenPolicy.js";
import {
  assertThrowsRestError,
  createAppConfigurationClientForTests,
  startRecorder,
} from "../../public/utils/testHelpers.js";
import { AppConfigurationClient } from "../../../src/index.js";
import type { InternalAppConfigurationClientOptions } from "../../../src/appConfigurationClient.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { NoOpCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import type { HttpClient, PipelineRequest, SendRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

describe("http request related tests", () => {
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
            new RegExp(`Failed to parse sync token '${invalidToken}' with regex .+$`),
          );
        }
      });
    });

    describe("syncTokens", () => {
      it("basic", () => {
        const syncTokens = new SyncTokens();
        syncTokens.addSyncTokenFromHeaderValue("a=value;sn=0");

        // note that 'sn' is purposefully not serialized
        assert.equal(syncTokens.getSyncTokenHeaderValue(), "a=value");

        syncTokens.addSyncTokenFromHeaderValue("b=value2;sn=0");
        assert.equal(splitAndSort(syncTokens.getSyncTokenHeaderValue()), "a=value,b=value2");

        // now we'll rev the sequence number field - it should overwrite the original value
        // for b
        syncTokens.addSyncTokenFromHeaderValue("b=value2.1;sn=1");
        assert.equal(splitAndSort(syncTokens.getSyncTokenHeaderValue()), "a=value,b=value2.1");

        // sending in an older version of an existing key should do nothing
        syncTokens.addSyncTokenFromHeaderValue("b=value2.1;sn=0");
        // note that 'b' didn't change
        assert.equal(splitAndSort(syncTokens.getSyncTokenHeaderValue()), "a=value,b=value2.1");

        // and sending in multiple values acts the same as passing them in one
        // at a time.
        syncTokens.addSyncTokenFromHeaderValue("b=value2.2;sn=100,c=value3;sn=1");
        assert.equal(
          "a=value,b=value2.2,c=value3",
          splitAndSort(syncTokens.getSyncTokenHeaderValue()),
        );

        // and if we get back undefined (ie, the header wasn't there) then it
        // resets the entire thing
        // (sync tokens are temporary in nature and expire as things are committed
        // and moved out of cache)
        syncTokens.addSyncTokenFromHeaderValue(undefined);
        assert.ok(!syncTokens.getSyncTokenHeaderValue());
      });
    });

    describe("URL encoding", () => {
      it("encodes reserved characters in resource identifiers", async () => {
        const requests: PipelineRequest[] = [];
        const client = createMockSyncTokenClient(
          new SyncTokens(),
          async (request: PipelineRequest) => {
            requests.push(request);
            return {
              headers: createHttpHeaders(),
              status: 200,
              request,
              bodyAsText: request.url.includes("/snapshots/")
                ? JSON.stringify({ filters: [] })
                : "{}",
            };
          },
        );
        const key = "path/to?setting#fragment&name=value+plus%percent";
        const label = "label?part#fragment&name=value+plus%percent";
        const snapshotName = "snapshot?part#fragment&name=value+plus%percent";

        await client.setConfigurationSetting({ key, label, value: "value" });
        await client.getConfigurationSetting({ key, label });
        await client.setReadOnly({ key, label }, true);
        await client.setReadOnly({ key, label }, false);
        await client.deleteConfigurationSetting({ key, label });
        await client.getSnapshot(snapshotName);

        const encodedKey = encodeURIComponent(key);
        const expectedRequests = [
          { method: "PUT", pathname: `/kv/${encodedKey}`, label },
          { method: "GET", pathname: `/kv/${encodedKey}`, label },
          { method: "PUT", pathname: `/locks/${encodedKey}`, label },
          { method: "DELETE", pathname: `/locks/${encodedKey}`, label },
          { method: "DELETE", pathname: `/kv/${encodedKey}`, label },
          {
            method: "GET",
            pathname: `/snapshots/${encodeURIComponent(snapshotName)}`,
            label: undefined,
          },
        ];

        assert.lengthOf(requests, expectedRequests.length);
        requests.forEach((request, index) => {
          const expected = expectedRequests[index];
          const url = new URL(request.url);

          assert.equal(request.method, expected.method);
          assert.equal(url.pathname, expected.pathname);
          assert.equal(url.searchParams.get("label") ?? undefined, expected.label);
          assert.equal(url.hash, "");
        });
      });

      it("encodes list filters and tags exactly once", async () => {
        const requests: PipelineRequest[] = [];
        const client = createMockSyncTokenClient(
          new SyncTokens(),
          async (request: PipelineRequest) => {
            requests.push(request);
            return {
              headers: createHttpHeaders(),
              status: 200,
              request,
              bodyAsText: JSON.stringify({ items: [] }),
            };
          },
        );
        const keyFilter = "prefix?key#fragment&name=value*";
        const labelFilter = "label?part#fragment&name=value";
        const tagFilter = "tag=value & more#1";
        const snapshotNameFilter = "snapshot?part#fragment&name=value*";

        await client
          .listConfigurationSettings({
            keyFilter,
            labelFilter,
            tagsFilter: [tagFilter],
          })
          .byPage()
          .next();
        await client.listLabels({ nameFilter: labelFilter }).byPage().next();
        await client
          .listRevisions({ keyFilter, labelFilter, tagsFilter: [tagFilter] })
          .byPage()
          .next();
        await client.listSnapshots({ nameFilter: snapshotNameFilter }).byPage().next();

        assert.lengthOf(requests, 4);

        const listSettingsUrl = new URL(requests[0].url);
        assert.equal(listSettingsUrl.pathname, "/kv");
        assert.equal(listSettingsUrl.searchParams.get("key"), keyFilter);
        assert.equal(listSettingsUrl.searchParams.get("label"), labelFilter);
        assert.deepEqual(listSettingsUrl.searchParams.getAll("tags"), [tagFilter]);
        assert.include(requests[0].url, `tags=${encodeURIComponent(tagFilter)}`);
        assert.notInclude(requests[0].url, "tags=tag%253D");

        const listLabelsUrl = new URL(requests[1].url);
        assert.equal(listLabelsUrl.pathname, "/labels");
        assert.equal(listLabelsUrl.searchParams.get("name"), labelFilter);

        const listRevisionsUrl = new URL(requests[2].url);
        assert.equal(listRevisionsUrl.pathname, "/revisions");
        assert.equal(listRevisionsUrl.searchParams.get("key"), keyFilter);
        assert.equal(listRevisionsUrl.searchParams.get("label"), labelFilter);
        assert.deepEqual(listRevisionsUrl.searchParams.getAll("tags"), [tagFilter]);

        const listSnapshotsUrl = new URL(requests[3].url);
        assert.equal(listSnapshotsUrl.pathname, "/snapshots");
        assert.equal(listSnapshotsUrl.searchParams.get("name"), snapshotNameFilter);
      });

      it("re-encodes continuation tokens exactly once", async () => {
        const requests: PipelineRequest[] = [];
        const continuationToken = "opaque+/==";
        const client = createMockSyncTokenClient(
          new SyncTokens(),
          async (request: PipelineRequest) => {
            requests.push(request);
            return {
              headers: createHttpHeaders(),
              status: 200,
              request,
              bodyAsText: JSON.stringify({
                items: [],
                "@nextLink":
                  requests.length === 1
                    ? `/kv?api-version=2026-04-01&after=${encodeURIComponent(continuationToken)}`
                    : undefined,
              }),
            };
          },
        );

        for await (const _page of client.listConfigurationSettings().byPage()) {
          // Drain the iterator to request the continuation page.
        }

        assert.lengthOf(requests, 2);
        const continuationUrl = new URL(requests[1].url);
        assert.equal(continuationUrl.searchParams.get("after"), continuationToken);
        assert.include(requests[1].url, `after=${encodeURIComponent(continuationToken)}`);
        assert.notInclude(requests[1].url, "after=opaque%252B");
      });
    });
  });

  describe("custom client ID", () => {
    let client: AppConfigurationClient;
    let recorder: Recorder;

    beforeEach(async (ctx) => {
      recorder = await startRecorder(ctx);
      client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
    });

    afterEach(async () => {
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

    beforeEach(async () => {
      syncTokens = new SyncTokens();
    });

    it("policy is setup properly to send sync tokens", async () => {
      client = createMockSyncTokenClient(syncTokens, async (request: PipelineRequest) => {
        return { headers: createHttpHeaders(), status: 418, request };
      });

      syncTokens.addSyncTokenFromHeaderValue(`hello=world;sn=1`);

      await assertThrowsRestError(
        async () =>
          client.getConfigurationSetting({
            key: "doesntmatter",
          }),
        418,
      );
    });

    it("addConfigurationSetting", async () => {
      client = createMockSyncTokenClient(syncTokens, async (request: PipelineRequest) => {
        return {
          headers: createHttpHeaders({ "sync-token": "addConfigurationSetting=value;sn=1" }),
          status: 200,
          request,
        };
      });

      await client.addConfigurationSetting({
        key: "doesntmatter",
      });

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "addConfigurationSetting=value");
    });

    it("getConfigurationSetting", async () => {
      client = createMockSyncTokenClient(syncTokens, async (request: PipelineRequest) => {
        return {
          headers: createHttpHeaders({ "sync-token": "getConfigurationSetting=value;sn=1" }),
          status: 200,
          request,
        };
      });

      await client.getConfigurationSetting({
        key: "doesntmatter",
      });

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "getConfigurationSetting=value");
    });

    it("setConfigurationSetting", async () => {
      client = createMockSyncTokenClient(syncTokens, async (request: PipelineRequest) => {
        return {
          headers: createHttpHeaders({ "sync-token": "setConfigurationSetting=value;sn=1" }),
          status: 200,
          request,
        };
      });

      await client.setConfigurationSetting({
        key: "doesntmatter",
      });

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "setConfigurationSetting=value");
    });

    it("deleteConfigurationSetting", async () => {
      client = createMockSyncTokenClient(syncTokens, async (request: PipelineRequest) => {
        return {
          headers: createHttpHeaders({ "sync-token": "deleteConfigurationSetting=value;sn=1" }),
          status: 200,
          request,
        };
      });

      await client.deleteConfigurationSetting({
        key: "doesntmatter",
      });

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "deleteConfigurationSetting=value");
    });

    it("listConfigurationSetting", async () => {
      client = createMockSyncTokenClient(syncTokens, async (request: PipelineRequest) => {
        return {
          headers: createHttpHeaders({ "sync-token": "listConfigurationSetting=value;sn=1" }),
          status: 200,
          request,
        };
      });

      const iterator = client.listConfigurationSettings({
        keyFilter: "doesntmatter",
      });

      await iterator.next();
      assert.equal(syncTokens.getSyncTokenHeaderValue(), "listConfigurationSetting=value");
    });

    it("listRevisions", async () => {
      client = createMockSyncTokenClient(syncTokens, async (request: PipelineRequest) => {
        return {
          headers: createHttpHeaders({ "sync-token": "listRevisions=value;sn=1" }),
          status: 200,
          request,
        };
      });

      const iterator = client.listRevisions({
        keyFilter: "doesntmatter",
      });

      await iterator.next();
      assert.equal(syncTokens.getSyncTokenHeaderValue(), "listRevisions=value");
    });

    it("setReadOnly (clear and set)", async () => {
      client = createMockSyncTokenClient(syncTokens, async (request: PipelineRequest) => {
        return {
          headers: createHttpHeaders({ "sync-token": "setReadOnly=value;sn=1" }),
          status: 200,
          request,
        };
      });

      await client.setReadOnly(
        {
          key: "doesntmatter",
        },
        true,
      );

      assert.equal(syncTokens.getSyncTokenHeaderValue(), "setReadOnly=value");

      syncTokens.addSyncTokenFromHeaderValue(undefined); // clear out any previous sync tokens
      client = createMockSyncTokenClient(syncTokens, async (request: PipelineRequest) => {
        return {
          headers: createHttpHeaders({ "sync-token": "clearReadOnly=value;sn=1" }),
          status: 200,
          request,
        };
      });

      await client.setReadOnly(
        {
          key: "doesntmatter",
        },
        false,
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
        { syncTokens } as InternalAppConfigurationClientOptions,
      );
      assert.equal(
        syncTokens["_currentSyncTokens"].size,
        1,
        "Unexpected number of syncTokens before the `update` call",
      );
      client.updateSyncToken("b=value;sn=3");
      assert.equal(
        syncTokens["_currentSyncTokens"].size,
        2,
        "Unexpected number of syncTokens after the `update` call",
      );
      assert.deepEqual(
        syncTokens["_currentSyncTokens"].get("a"),
        { id: "a", value: "value", sequenceNumber: 0 },
        "Unexpected object present for key `a`",
      );
      assert.deepEqual(
        syncTokens["_currentSyncTokens"].get("b"),
        { id: "b", value: "value", sequenceNumber: 3 },
        "Unexpected object present for key `b`",
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

function createMockSyncTokenClient(
  syncTokens: SyncTokens,
  sendRequest: SendRequest,
): AppConfigurationClient {
  const fakeHttpClient: HttpClient = {
    sendRequest,
  };

  // Use NoOpCredential to avoid interception for credential request
  return new AppConfigurationClient("https://example.com", new NoOpCredential(), {
    syncTokens: syncTokens,
    httpClient: fakeHttpClient,
  } as InternalAppConfigurationClientOptions);
}

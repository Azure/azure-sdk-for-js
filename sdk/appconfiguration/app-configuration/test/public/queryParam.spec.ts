// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationClient } from "../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import type {
  HttpClient,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("request url query parameters", () => {
  it.each([
    { key: "key?/#%=!'()*", encodedKey: "key%3F%2F%23%25%3D%21%27%28%29%2A" },
    { key: "key%3F", encodedKey: "key%253F" },
  ])("encodes key $key and its label exactly once", async ({ key, encodedKey }) => {
    const requests: PipelineRequest[] = [];
    const label = "label?/#%&=+value";
    const mockHttpClient: HttpClient = {
      sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
        requests.push(request);
        return {
          request,
          status: 200,
          headers: createHttpHeaders(),
          bodyAsText: JSON.stringify({ key, label, value: "value" }),
        };
      },
    };
    const client = new AppConfigurationClient(
      "Endpoint=https://contoso.azconfig.io;Id=fake-id;Secret=ABCD",
      { httpClient: mockHttpClient },
    );

    const options = { requestOptions: { headers: { "x-test-header": "encoding" } } };
    await client.addConfigurationSetting({ key, label, value: "value" }, options);
    await client.setConfigurationSetting({ key, label, value: "value" }, options);
    await client.getConfigurationSetting({ key, label }, { ...options, fields: ["key", "value"] });
    await client.deleteConfigurationSetting({ key, label }, options);
    await client.setReadOnly({ key, label }, true, options);
    await client.setReadOnly({ key, label }, false, options);

    assert.lengthOf(requests, 6);
    for (const request of requests) {
      const url = new URL(request.url);
      assert.match(url.pathname, new RegExp(`^/(?:kv|locks)/${encodedKey}$`));
      assert.equal(url.hash, "");
      assert.equal(url.searchParams.get("label"), label);
      assert.equal(url.searchParams.get("api-version"), "2026-05-01-preview");
      assert.equal(request.headers.get("x-test-header"), "encoding");
      assert.notInclude(url.search, "%2524");
    }
    assert.equal(new URL(requests[2].url).searchParams.get("$select"), "key,value");
  });

  it.each([
    "listConfigurationSettings",
    "listRevisions",
    "listConfigurationSettingsForSnapshot",
    "checkConfigurationSettings",
  ] as const)("encodes filters and continuation tokens for %s", async (method) => {
    const requests: PipelineRequest[] = [];
    const keyFilter = "key?/#%=!'()*";
    const labelFilter = "label &+?/#%=";
    const tagsFilter = ["tier=beta & canary", "literal=%2F"];
    const continuationToken = "next/+==";
    const snapshotName = "snapshot?/#%";
    const mockHttpClient: HttpClient = {
      sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
        requests.push(request);
        const nextLink =
          requests.length === 1
            ? "/kv?api-version=2026-05-01-preview&after=next%2F%2B%3D%3D"
            : undefined;
        return {
          request,
          status: 200,
          headers: createHttpHeaders(nextLink ? { link: `<${nextLink}>; rel="next"` } : {}),
          bodyAsText:
            request.method === "HEAD"
              ? undefined
              : JSON.stringify({ items: [], "@nextLink": nextLink }),
        };
      },
    };
    const client = new AppConfigurationClient(
      "Endpoint=https://contoso.azconfig.io;Id=fake-id;Secret=ABCD",
      { httpClient: mockHttpClient },
    );
    const options = {
      keyFilter,
      labelFilter,
      tagsFilter,
      fields: ["key", "isReadOnly"] as const,
    };
    const listOptions = { ...options, fields: [...options.fields] };
    const iterator = (
      method === "listConfigurationSettingsForSnapshot"
        ? client[method](snapshotName, listOptions)
        : client[method](listOptions)
    ).byPage();
    let pageCount = 0;
    for await (const _page of iterator) {
      pageCount++;
    }

    assert.equal(pageCount, 2);
    assert.lengthOf(requests, 2);
    for (const [index, request] of requests.entries()) {
      const url = new URL(request.url);
      assert.equal(url.pathname, method === "listRevisions" ? "/revisions" : "/kv");
      assert.equal(url.hash, "");
      assert.equal(url.searchParams.get("key"), keyFilter);
      assert.equal(url.searchParams.get("label"), labelFilter);
      assert.deepEqual(url.searchParams.getAll("tags"), tagsFilter);
      assert.equal(url.searchParams.get("$select"), "key,locked");
      assert.equal(url.searchParams.get("after"), index === 0 ? null : continuationToken);
      assert.equal(
        url.searchParams.get("snapshot"),
        method === "listConfigurationSettingsForSnapshot" ? snapshotName : null,
      );
      assert.notInclude(url.search, "%2524");
    }
    assert.deepEqual(tagsFilter, ["tier=beta & canary", "literal=%2F"]);
  });

  it.each(["listLabels", "listSnapshots"] as const)(
    "encodes name filters and fields for %s",
    async (method) => {
      const requests: PipelineRequest[] = [];
      const nameFilter = "name?/#%&=+*";
      const mockHttpClient: HttpClient = {
        sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
          requests.push(request);
          return {
            request,
            status: 200,
            headers: createHttpHeaders(),
            bodyAsText: JSON.stringify({
              items: [],
              "@nextLink":
                requests.length === 1
                  ? "/labels?api-version=2026-05-01-preview&after=next%3D"
                  : undefined,
            }),
          };
        },
      };
      const client = new AppConfigurationClient(
        "Endpoint=https://contoso.azconfig.io;Id=fake-id;Secret=ABCD",
        { httpClient: mockHttpClient },
      );
      const iterator = client[method]({ nameFilter, fields: ["name"] }).byPage();
      for await (const _page of iterator) {
        // Iterate to send both page requests.
      }

      assert.lengthOf(requests, 2);
      for (const [index, request] of requests.entries()) {
        const url = new URL(request.url);
        assert.equal(url.pathname, method === "listLabels" ? "/labels" : "/snapshots");
        assert.equal(url.hash, "");
        assert.equal(url.searchParams.get("name"), nameFilter);
        assert.equal(url.searchParams.get("$select"), "name");
        assert.equal(url.searchParams.get("after"), index === 0 ? null : "next=");
        assert.notInclude(url.search, "%2524");
        if (method === "listLabels") {
          assert.equal(url.searchParams.get("resourcetype"), "kv");
        }
      }
    },
  );

  it("encodes snapshot names for create, get, archive, and recover", async () => {
    const requests: PipelineRequest[] = [];
    const name = "snapshot?/#%";
    const mockHttpClient: HttpClient = {
      sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
        requests.push(request);
        return {
          request,
          status: 200,
          headers: createHttpHeaders(),
          bodyAsText: JSON.stringify({ name, status: "ready", filters: [] }),
        };
      },
    };
    const client = new AppConfigurationClient(
      "Endpoint=https://contoso.azconfig.io;Id=fake-id;Secret=ABCD",
      { httpClient: mockHttpClient },
    );

    const poller = await client.beginCreateSnapshot({ name, filters: [] });
    await poller.pollUntilDone();
    await client.beginCreateSnapshotAndWait({ name, filters: [] });
    await client.getSnapshot(name);
    await client.archiveSnapshot(name);
    await client.recoverSnapshot(name);

    assert.lengthOf(requests, 5);
    for (const request of requests) {
      const url = new URL(request.url);
      assert.equal(url.pathname, "/snapshots/snapshot%3F%2F%23%25");
      assert.equal(url.hash, "");
      assert.equal(url.searchParams.get("api-version"), "2026-05-01-preview");
    }
  });

  describe("normalize query parameters", () => {
    let recorder: Recorder;

    beforeEach(async (ctx) => {
      recorder = await startRecorder(ctx);
      await recorder.setMatcher("CustomDefaultMatcher", {
        excludedHeaders: ["sync-token"],
      });
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("sort query params in alphabetical order", async () => {
      const key = recorder.variable(
        "sortQueryParams",
        `sortQueryParams${Math.floor(Math.random() * 1000)}`,
      );

      const { getCapturedUrl, client } = createClientWithUrlCapturePolicy();

      await client.addConfigurationSetting({
        key,
        label: "dev",
        value: "some value",
        tags: { tag1: "value1" },
      });

      const configurationSetting = await client.getConfigurationSetting(
        { key, label: "dev" },
        { fields: ["key"] },
      );

      assert.ok(
        getCapturedUrl(),
        "Expected to have captured a request URL for getConfigurationSetting",
      );
      // Regex enforces exact ordering of query params: $select (or %24select), api-version, label
      let queryOrderRegex = /\?(?:\$|%24)select=key&api-version=[^&]+&label=dev$/;
      assert.match(
        getCapturedUrl()!,
        queryOrderRegex,
        `Query parameters not in expected order or values. URL: ${getCapturedUrl()}`,
      );

      assert.equal(configurationSetting.key, key);

      const listResult = client.listConfigurationSettings({ keyFilter: "*", labelFilter: "dev" });

      for await (const _ of listResult.byPage()) {
        // do nothing, just drain the iterator
      }

      // Regex enforces exact ordering of query params: api-version, key, label
      queryOrderRegex = /\?api-version=[^&]+&key=(?:\*|%2A)&label=dev$/;
      assert.match(
        getCapturedUrl()!,
        queryOrderRegex,
        `Query parameters not in expected order or values. URL: ${getCapturedUrl()}`,
      );

      const listWithTagsResult = client.listConfigurationSettings({
        keyFilter: "*",
        labelFilter: "dev",
        tagsFilter: ["tag2=value2", "tag1=value1", "tag3=value3"],
      });

      for await (const _ of listWithTagsResult.byPage()) {
        // do nothing, just drain the iterator
      }

      // Regex enforces exact ordering of query params: api-version, key, label, tags
      queryOrderRegex =
        /\?api-version=[^&]+&key=(?:\*|%2A)&label=dev&tags=tag2%3Dvalue2&tags=tag1%3Dvalue1&tags=tag3%3Dvalue3$/;
      assert.match(
        getCapturedUrl()!,
        queryOrderRegex,
        `Query parameters not in expected order or values. URL: ${getCapturedUrl()}`,
      );

      await client.deleteConfigurationSetting({ key, label: "dev" });
    });

    // This occasionally hits 429 error (throttling) since we are making 100s of requests in the test to create, get and delete keys.
    // To avoid hitting the service with too many requests, skipping the test in live.
    // More details at https://github.com/Azure/azure-sdk-for-js/issues/16743
    //
    // Remove the following line if you want to hit the live service.
    it(
      "sort query params in alphabetical order - continuation token",
      { skip: isLiveMode() },
      async () => {
        const key = recorder.variable(
          "sortQueryParamsMultiplePages",
          `sortQueryParamsMultiplePages${Math.floor(Math.random() * 1000)}`,
        );

        const { getCapturedUrl, client } = createClientWithUrlCapturePolicy();

        // this number is arbitrarily chosen to match the size of a page + 1
        const expectedNumberOfLabels = 101;

        let addSettingPromises = [];

        for (let i = 0; i < expectedNumberOfLabels; i++) {
          addSettingPromises.push(
            client.addConfigurationSetting({
              key,
              value: `the value for ${i}`,
              label: i.toString(),
            }),
          );

          if (i !== 0 && i % 2 === 0) {
            await Promise.all(addSettingPromises);
            addSettingPromises = [];
          }
        }

        const listResult = client.listConfigurationSettings({
          keyFilter: key,
        });

        for await (const _ of listResult.byPage()) {
          // do nothing, just drain the iterator
        }

        // Regex enforces exact ordering of query params for continuation page: after, api-version, key
        // Note that only the request for the second page has the 'after' query param
        const queryOrderRegex = new RegExp(`\\?after=[^&]+&api-version=[^&]+&key=[^&]+$`);

        assert.match(
          getCapturedUrl()!,
          queryOrderRegex,
          `Query parameters not in expected order or values. URL: ${getCapturedUrl()}`,
        );

        for (let i = 0; i < expectedNumberOfLabels; i++) {
          await client.deleteConfigurationSetting({ key, label: i.toString() });
        }
      },
    );

    function createClientWithUrlCapturePolicy(): {
      getCapturedUrl: () => string | undefined;
      client: AppConfigurationClient;
    } {
      let capturedUrl: string | undefined;
      const urlCapturePolicy: PipelinePolicy = {
        name: "UrlCapturePolicy",
        async sendRequest(request, next) {
          capturedUrl = request.url;
          return next(request);
        },
      };

      const client = createAppConfigurationClientForTests(
        recorder.configureClientOptions({
          additionalPolicies: [
            {
              policy: urlCapturePolicy,
              position: "perRetry",
            },
          ],
        }),
      );
      return { getCapturedUrl: () => capturedUrl, client };
    }
  });
});

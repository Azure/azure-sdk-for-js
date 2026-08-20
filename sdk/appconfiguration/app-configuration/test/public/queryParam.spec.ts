// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationClient } from "../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("request url query parameters", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  describe("normalize query parameters", () => {
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
      queryOrderRegex = /\?api-version=[^&]+&key=\*&label=dev$/;
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
        /\?api-version=[^&]+&key=\*&label=dev&tags=tag2%3Dvalue2&tags=tag1%3Dvalue1&tags=tag3%3Dvalue3$/;
      assert.match(
        getCapturedUrl()!,
        queryOrderRegex,
        `Query parameters not in expected order or values. URL: ${getCapturedUrl()}`,
      );

      await client.deleteConfigurationSetting({ key, label: "dev" });
    });

    it("round-trips reserved URL characters in keys and query values", async () => {
      const suffix = Math.floor(Math.random() * 1_000_000);
      const key = recorder.variable("urlEncodingKey", `js-url?key#frag/seg&x=y+z-${suffix}`);
      const label = recorder.variable("urlEncodingLabel", `js-label?part#frag&x=y+z-${suffix}`);
      const tagValue = "beta & canary#1+2";
      const tagFilter = `url-tag=${tagValue}`;
      const { getCapturedUrl, client } = createClientWithUrlCapturePolicy();
      let isReadOnly = false;

      try {
        await client.addConfigurationSetting({
          key,
          label,
          value: "initial value",
          tags: { "url-tag": tagValue },
        });

        let capturedUrl = getCapturedUrl();
        assert.isDefined(capturedUrl);
        assert.equal(new URL(capturedUrl!).pathname, `/kv/${encodeURIComponent(key)}`);
        assert.include(capturedUrl!, `label=${encodeURIComponent(label)}`);

        const setting = await client.getConfigurationSetting({ key, label });
        assert.equal(setting.key, key);
        assert.equal(setting.label, label);
        assert.equal(setting.value, "initial value");

        let foundSetting = false;
        for await (const listedSetting of client.listConfigurationSettings({
          keyFilter: key,
          labelFilter: label,
          tagsFilter: [tagFilter],
        })) {
          if (listedSetting.key === key && listedSetting.label === label) {
            foundSetting = true;
          }
        }

        assert.isTrue(foundSetting, "expected the encoded setting filters to match");
        capturedUrl = getCapturedUrl();
        assert.isDefined(capturedUrl);
        const listUrl = new URL(capturedUrl!);
        assert.equal(listUrl.searchParams.get("key"), key);
        assert.equal(listUrl.searchParams.get("label"), label);
        assert.deepEqual(listUrl.searchParams.getAll("tags"), [tagFilter]);
        assert.notInclude(capturedUrl!, "tags=url-tag%253D");

        let foundLabel = false;
        for await (const listedLabel of client.listLabels({ nameFilter: label })) {
          if (listedLabel.name === label) {
            foundLabel = true;
          }
        }
        assert.isTrue(foundLabel, "expected the encoded label filter to match");

        await client.setReadOnly({ key, label }, true);
        isReadOnly = true;
        await client.setReadOnly({ key, label }, false);
        isReadOnly = false;
        await client.setConfigurationSetting({ key, label, value: "updated value" });

        let revisionCount = 0;
        for await (const revision of client.listRevisions({
          keyFilter: key,
          labelFilter: label,
        })) {
          if (revision.key === key && revision.label === label) {
            revisionCount++;
          }
        }
        assert.isAtLeast(revisionCount, 2);
      } finally {
        if (isReadOnly) {
          await client.setReadOnly({ key, label }, false);
        }
        await client.deleteConfigurationSetting({ key, label });
      }
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

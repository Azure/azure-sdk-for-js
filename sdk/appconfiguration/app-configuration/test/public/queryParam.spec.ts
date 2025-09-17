// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AppConfigurationClient
} from "../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode} from "@azure-tools/test-recorder";
import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import {
  createAppConfigurationClientForTests,
  startRecorder,
} from "./utils/testHelpers.js";
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

      await client.addConfigurationSetting({ key, label: "dev", value: "some value" });

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

      await client.deleteConfigurationSetting({ key, label: "dev" });
    });

    // This occasionally hits 429 error (throttling) since we are making 100s of requests in the test to create, get and delete keys.
    // To avoid hitting the service with too many requests, skipping the test in live.
    // More details at https://github.com/Azure/azure-sdk-for-js/issues/16743
    //
    // Remove the following line if you want to hit the live service.
    it("sort query params in alphabetical order - continuation token", /* { skip: isLiveMode() }, */ async () => {
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
        const queryOrderRegex = new RegExp(
          `\\?after=[^&]+&api-version=[^&]+&key=[^&]+$`,
        );

      assert.match(
        getCapturedUrl()!,
        queryOrderRegex,
        `Query parameters not in expected order or values. URL: ${getCapturedUrl()}`,
      );

      for (let i = 0; i < expectedNumberOfLabels; i++) {
        await client.deleteConfigurationSetting({ key, label: i.toString() });
      }
    });

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

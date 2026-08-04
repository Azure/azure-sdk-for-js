// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, assert, describe, it } from "vitest";
import nock from "nock";
import { makeOneSettingsRequest } from "../../src/_configuration/utils.js";
import { ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS } from "../../src/Declarations/Constants.js";

describe("OneSettings utils", () => {
  const host = "https://settings.example.test";
  const path = "/config";
  const url = host + path;

  afterEach(() => {
    nock.cleanAll();
  });

  describe("makeOneSettingsRequest", () => {
    it("parses settings, ETag, and refresh interval from a 200 response", async () => {
      nock(host)
        .get(path)
        .reply(200, JSON.stringify({ settings: { FEATURE_SDK_STATS: "enabled" } }), {
          ETag: '"abc123"',
          // OneSettings reports the interval in minutes.
          "x-ms-onesetinterval": "30",
        });

      const response = await makeOneSettingsRequest(url);

      assert.strictEqual(response.statusCode, 200);
      assert.strictEqual(response.hasException, false);
      assert.strictEqual(response.etag, '"abc123"');
      assert.strictEqual(response.refreshIntervalMs, 30 * 60 * 1000);
      assert.deepStrictEqual(response.settings, { FEATURE_SDK_STATS: "enabled" });
    });

    it("returns empty settings but keeps the ETag on a 304 response", async () => {
      nock(host).get(path).reply(304, "", { ETag: '"unchanged"' });

      const response = await makeOneSettingsRequest(url);

      assert.strictEqual(response.statusCode, 304);
      assert.strictEqual(response.hasException, false);
      assert.strictEqual(response.etag, '"unchanged"');
      assert.deepStrictEqual(response.settings, {});
    });

    it("preserves the status code and returns empty settings on a 4xx response", async () => {
      nock(host).get(path).reply(404, "not found");

      const response = await makeOneSettingsRequest(url);

      assert.strictEqual(response.statusCode, 404);
      assert.strictEqual(response.hasException, false);
      assert.deepStrictEqual(response.settings, {});
    });

    it("preserves the status code and returns empty settings on a 5xx response", async () => {
      nock(host).get(path).reply(500, "server error");

      const response = await makeOneSettingsRequest(url);

      assert.strictEqual(response.statusCode, 500);
      assert.strictEqual(response.hasException, false);
      assert.deepStrictEqual(response.settings, {});
    });

    it("returns empty settings and no exception when a 200 body is not valid JSON", async () => {
      nock(host).get(path).reply(200, "not-json");

      const response = await makeOneSettingsRequest(url);

      assert.strictEqual(response.statusCode, 200);
      assert.strictEqual(response.hasException, false);
      assert.deepStrictEqual(response.settings, {});
    });

    it.each(["not-a-number", "30.5", "0", "-5", ""])(
      "falls back to the default refresh interval when the header is invalid (%j)",
      async (headerValue) => {
        nock(host)
          .get(path)
          .reply(200, JSON.stringify({ settings: {} }), { "x-ms-onesetinterval": headerValue });

        const response = await makeOneSettingsRequest(url);

        assert.strictEqual(response.refreshIntervalMs, ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS);
      },
    );

    it("sends provided query parameters and headers", async () => {
      const scope = nock(host, { reqheaders: { "if-none-match": '"etag-1"' } })
        .get(path)
        .query({ namespaces: "nodejs" })
        .reply(200, JSON.stringify({ settings: {} }));

      const response = await makeOneSettingsRequest(
        url,
        { namespaces: "nodejs" },
        { "If-None-Match": '"etag-1"' },
      );

      assert.strictEqual(response.statusCode, 200);
      assert.isTrue(scope.isDone());
    });

    it("reports a transient error when the request fails", async () => {
      nock(host).get(path).replyWithError("network down");

      const response = await makeOneSettingsRequest(url);

      assert.strictEqual(response.hasException, true);
      assert.strictEqual(response.statusCode, 0);
      assert.strictEqual(response.refreshIntervalMs, ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS);
      assert.deepStrictEqual(response.settings, {});
    });
  });
});

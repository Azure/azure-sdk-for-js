// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { isNodeLike } from "@azure/core-util";
import { createTestCredential } from "@azure-tools/test-credential";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import type { MapsSearchClient } from "@azure-rest/maps-search";
import MapsSearch, { isUnexpected } from "@azure-rest/maps-search";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Authentication", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  /**
   * Skip this test in browser because we have to use InteractiveBrowserCredential in the browser.
   * But it requires user's interaction, which is not testable in karma.
   * */
  it("should work with Microsoft Entra ID authentication", { skip: !isNodeLike }, async () => {
    /**
     * Use createTestCredential() instead of new DefaultAzureCredential(), else the playback mode won't work
     * Reference: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/test-quickstart.md#azuread-oauth2-authentication
     */
    const credential = createTestCredential();
    const client = MapsSearch(
      credential,
      env["MAPS_RESOURCE_CLIENT_ID"] as string,
      recorder.configureClientOptions({}),
    );

    const response = await client.path("/geocode").get({ queryParameters: { query: "Starbucks" } });
    assert.isOk(!isUnexpected(response));
  });
});

describe("Endpoint can be overwritten", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should be executed without specifying baseUrl", async () => {
    const client = createClient(recorder.configureClientOptions({}));
    const response = await client.path("/geocode").get({ queryParameters: { query: "Starbucks" } });
    assert.isOk(!isUnexpected(response));
  });

  it("should be executed with different baseUrl", async () => {
    const client = createClient(
      recorder.configureClientOptions({ baseUrl: "https://us.atlas.microsoft.com/" }),
    );
    const response = await client.path("/geocode").get({ queryParameters: { query: "Starbucks" } });
    assert.isOk(!isUnexpected(response));
  });
});

describe("Get Search Polygon", () => {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should accept coordinates and other options and return geometry data", async () => {
    const response = await client.path("/search/polygon").get({
      queryParameters: {
        coordinates: [-122.204141, 47.61256],
        resultType: "locality",
        resolution: "small",
      },
    });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error");
    }
    assert.isNotEmpty(response.body.geometry);
  });
});

describe("/geocode", () => {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should return non-empty results", async () => {
    const response = await client
      .path("/geocode")
      .get({ queryParameters: { query: "1 Microsoft Way, Redmond, WA 98052" } });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error");
    }
    assert.isNotEmpty(response.body);
  });
});

describe("/geocode:batch", () => {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should return non-empty results", async () => {
    const response = await client.path("/geocode:batch").post({
      body: {
        batchItems: [
          { query: "400 Broad St, Seattle, WA 98109" },
          { query: "One, Microsoft Way, Redmond, WA 98052" },
          { query: "350 5th Ave, New York, NY 10118" },
        ],
      },
    });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error");
    }
    assert.isNotEmpty(response.body);
  });

  it("should be expected even one of the batch items failed", async () => {
    const response = await client.path("/geocode:batch").post({
      body: {
        batchItems: [
          { query: "400 Broad St, Seattle, WA 98109" },
          { query: "One, Microsoft Way, Redmond, WA 98052" },
          { query: "350 5th Ave, New York, NY 10118" },
          // This is an invalid query
          { query: "" },
        ],
      },
    });
    assert.isFalse(isUnexpected(response));
  });
});

describe("/reverseGeocode", () => {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should throw error if query is invalid", async () => {
    // "The provided coordinates in query are invalid, out of range, or not in the expected format"
    assert.isTrue(
      isUnexpected(
        await client.path("/reverseGeocode").get({ queryParameters: { coordinates: [121, -100] } }),
      ),
    );
    assert.isTrue(
      isUnexpected(
        await client.path("/reverseGeocode").get({ queryParameters: { coordinates: [250, 25] } }),
      ),
    );
  });

  it("should return non-empty results", async () => {
    const response = await client
      .path("/reverseGeocode")
      .get({ queryParameters: { coordinates: [121, 25] } });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error");
    }
    assert.isNotEmpty(response.body);
  });
});

describe("/reverseGeocode:batch", () => {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should return non-empty results", async () => {
    const response = await client.path("/reverseGeocode:batch").post({
      body: {
        batchItems: [
          { coordinates: [-122.34255, 47.6101] },
          { coordinates: [-122.33817, 47.6155] },
        ],
      },
    });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error");
    }
    assert.isNotEmpty(response.body);
  });

  it("should be expected even one of the batch items failed", async () => {
    const response = await client.path("/reverseGeocode:batch").post({
      body: {
        batchItems: [
          // This is an invalid query
          { coordinates: [2.294911, 148.858561] },
          { coordinates: [-122.34255, 47.6101] },
          { coordinates: [-122.33817, 47.6155] },
        ],
      },
    });
    assert.isFalse(isUnexpected(response));
  });
});

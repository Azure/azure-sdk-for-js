// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { env, Recorder } from "@azure-tools/test-recorder";
import { isNodeLike } from "@azure/core-util";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import MapsSearch, { isUnexpected, MapsSearchClient } from "../../src";

describe("Authentication", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should work with AAD authentication", async function () {
    /**
     * Skip this test in browser because we have to use InteractiveBrowserCredential in the browser.
     * But it requires user's interaction, which is not testable in karma.
     * */
    if (!isNodeLike) this.skip();
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

describe("Endpoint can be overwritten", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should be executed without specifying baseUrl", async function () {
    const client = createClient(recorder.configureClientOptions({}));
    const response = await client.path("/geocode").get({ queryParameters: { query: "Starbucks" } });
    assert.isOk(!isUnexpected(response));
  });

  it("should be executed with different baseUrl", async function () {
    const client = createClient(
      recorder.configureClientOptions({ baseUrl: "https://us.atlas.microsoft.com/" }),
    );
    const response = await client.path("/geocode").get({ queryParameters: { query: "Starbucks" } });
    assert.isOk(!isUnexpected(response));
  });
});

describe("Get Search Polygon", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should accept coordinates and other options and return geometry data", async function () {
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

describe("/geocode", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should return non-empty results", async function () {
    const response = await client
      .path("/geocode")
      .get({ queryParameters: { query: "1 Microsoft Way, Redmond, WA 98052" } });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error");
    }
    assert.isNotEmpty(response.body);
  });
});

describe("/geocode:batch", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should return non-empty results", async function () {
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

  it("should be expected even one of the batch items failed", async function () {
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

describe("/reverseGeocode", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should throw error if query is invalid", async function () {
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

  it("should return non-empty results", async function () {
    const response = await client
      .path("/reverseGeocode")
      .get({ queryParameters: { coordinates: [121, 25] } });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error");
    }
    assert.isNotEmpty(response.body);
  });
});

describe("/reverseGeocode:batch", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should return non-empty results", async function () {
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

  it("should be expected even one of the batch items failed", async function () {
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

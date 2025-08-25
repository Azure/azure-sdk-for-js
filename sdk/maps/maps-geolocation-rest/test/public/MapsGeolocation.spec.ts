// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { isNodeLike } from "@azure/core-util";
import { createTestCredential } from "@azure-tools/test-credential";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import type { MapsGeolocationClient } from "@azure-rest/maps-geolocation";
import MapsGeolocation, { isUnexpected } from "@azure-rest/maps-geolocation";
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
    const client = MapsGeolocation(
      credential,
      env["MAPS_RESOURCE_CLIENT_ID"] as string,
      recorder.configureClientOptions({}),
    );

    const response = await client
      .path("/geolocation/ip/{format}", "json")
      .get({ queryParameters: { ip: "2001:4898:80e8:b::189" } });
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
    const response = await client
      .path("/geolocation/ip/{format}", "json")
      .get({ queryParameters: { ip: "2001:4898:80e8:b::189" } });

    assert.isOk(!isUnexpected(response));
  });

  it("should be executed with different baseUrl", async () => {
    const client = createClient(
      recorder.configureClientOptions({ baseUrl: "https://us.atlas.microsoft.com/" }),
    );
    const response = await client
      .path("/geolocation/ip/{format}", "json")
      .get({ queryParameters: { ip: "2001:4898:80e8:b::189" } });

    assert.isOk(!isUnexpected(response));
  });
});

describe("MapsGeolocation", () => {
  let recorder: Recorder;
  let client: MapsGeolocationClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can transform IP to location", async () => {
    const response = await client
      .path("/geolocation/ip/{format}", "json")
      .get({ queryParameters: { ip: "2001:4898:80e8:b::189" } });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.isNotEmpty(response.body.countryRegion);
    }
  });
});

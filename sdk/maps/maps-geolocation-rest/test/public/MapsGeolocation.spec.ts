// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { isNode } from "@azure/test-utils";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import MapsGeolocation, { isUnexpected, MapsGeolocationClient } from "../../src";
import { AzureKeyCredential } from "@azure/core-auth";

describe("Authentication", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should work with Shared Key authentication", async function () {
    const credential = new AzureKeyCredential(env["MAPS_SUBSCRIPTION_KEY"] as string);
    const client = MapsGeolocation(credential, recorder.configureClientOptions({}));

    const response = await client
      .path("/geolocation/ip/{format}", "json")
      .get({ queryParameters: { ip: "2001:4898:80e8:b::189" } });
    assert.isOk(!isUnexpected(response));
  });

  it("should work with AAD authentication", async function () {
    /**
     * Skip this test in browser because we have to use InteractiveBrowserCredential in the browser.
     * But it requires user's interaction, which is not testable in karma.
     * */
    if (!isNode) this.skip();
    /**
     * Use createTestCredential() instead of new DefaultAzureCredential(), else the playback mode won't work
     * Reference: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/test-quickstart.md#azuread-oauth2-authentication
     */
    const credential = createTestCredential();
    const client = MapsGeolocation(
      credential,
      env["MAPS_CLIENT_ID"] as string,
      recorder.configureClientOptions({})
    );

    const response = await client
      .path("/geolocation/ip/{format}", "json")
      .get({ queryParameters: { ip: "2001:4898:80e8:b::189" } });
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
    const response = await client
      .path("/geolocation/ip/{format}", "json")
      .get({ queryParameters: { ip: "2001:4898:80e8:b::189" } });

    assert.isOk(!isUnexpected(response));
  });

  it("should be executed with different baseUrl", async function () {
    const client = createClient(
      recorder.configureClientOptions({ baseUrl: "https://us.atlas.microsoft.com/" })
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

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can transform IP to location", async function () {
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

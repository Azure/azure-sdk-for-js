// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { isNodeLike } from "@azure/core-util";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import MapsRender, { isUnexpected, MapsRenderClient } from "../../src";

describe("Authentication", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should work with Microsoft Entra ID authentication", async function () {
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
    const client = MapsRender(
      credential,
      env["MAPS_RESOURCE_CLIENT_ID"] as string,
      recorder.configureClientOptions({}),
    );

    const response = await client.path("/map/copyright/caption/{format}", "json").get();
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
    const response = await client.path("/map/copyright/caption/{format}", "json").get();

    assert.isOk(!isUnexpected(response));
  });

  it("should be executed with different baseUrl", async function () {
    const client = createClient(
      recorder.configureClientOptions({ baseUrl: "https://us.atlas.microsoft.com/" }),
    );
    const response = await client.path("/map/copyright/caption/{format}", "json").get();

    assert.isOk(!isUnexpected(response));
  });
});

describe("MapsRender", () => {
  let recorder: Recorder;
  let client: MapsRenderClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can get copyright caption", async function () {
    const response = await client.path("/map/copyright/caption/{format}", "json").get();
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.isNotEmpty(response.body.copyrightsCaption);
    }
  });

  it("can get copyright information for tile", async function () {
    const response = await client
      .path("/map/copyright/tile/{format}", "json")
      .get({ queryParameters: { zoom: 6, x: 9, y: 22 } });

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.isNotEmpty(response.body.generalCopyrights);
      assert.isNotEmpty(response.body.regions);
    }
  });

  it("can get copyright information for world", async function () {
    const response = await client.path("/map/copyright/world/{format}", "json").get();

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    }
    assert.isNotEmpty(response.body.generalCopyrights);
    assert.isNotEmpty(response.body.regions);
  });

  it("can get copyright from bounding box", async function () {
    const response = await client.path("/map/copyright/bounding/{format}", "json").get({
      queryParameters: {
        maxcoordinates: [52.41064, 4.84228],
        mincoordinates: [52.41072, 4.84239],
      },
    });

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    }
    assert.isNotEmpty(response.body.generalCopyrights);
    assert.isNotEmpty(response.body.regions);
  });

  it("can get copyright information for map attribution", async function () {
    const response = await client.path("/map/attribution").get({
      queryParameters: {
        tilesetId: "microsoft.base",
        zoom: 6,
        bounds: [-122.414162, 47.57949, -122.247157, 47.668372],
      },
    });

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    }

    assert.isNotEmpty(response.body.copyrights);
  });

  it("can get static image", async function () {
    const response = await client.path("/map/static/{format}", "png").get({
      queryParameters: {
        layer: "basic",
        style: "main",
        zoom: 2,
        bbox: [1.355233, 42.982261, 24.980233, 56.526017],
      },
    });

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    }

    assert.isNotEmpty(response.body);
  });

  it("can get map tile", async function () {
    const response = await client.path("/map/tile").get({
      queryParameters: {
        tilesetId: "microsoft.base",
        zoom: 6,
        x: 10,
        y: 22,
      },
    });

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    }
    assert.isNotEmpty(response.body);
  });

  it("can get map tilest information", async function () {
    const response = await client
      .path("/map/tileset")
      .get({ queryParameters: { tilesetId: "microsoft.base" } });

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    }

    assert.isNotEmpty(response.body.tiles);
  });
});

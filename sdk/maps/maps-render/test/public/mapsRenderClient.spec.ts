// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createClient, createRecorder, testLogger } from "./utils/createClient";
import { assert, use as chaiUse } from "chai";
import { Context, Suite } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { MapsRenderClient } from "src/mapsRenderClient";
import chaiPromises from "chai-as-promised";
import { KnownTilesetId } from "../../src";
chaiUse(chaiPromises);

describe(`Render Client Test`, function (this: Suite) {
  let recorder: Recorder;
  let client: MapsRenderClient;
  const testTimeout = 10000;

  beforeEach(async function (this: Context) {
    testLogger.verbose(`Recorder: starting...`);
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    testLogger.verbose(`Recorder: stopping...`);
    await recorder.stop();
  });

  before(function (this: Context) {
    this.timeout(testTimeout);
  });

  it("can get copyright caption", async function () {
    const copyrightCaptionResult = await client.getCopyrightCaption();

    assert.isNotEmpty(copyrightCaptionResult.copyrightsCaption);
  });

  it("can get copyright information for tile", async function () {
    const tileIndex = { z: 6, x: 9, y: 22 };
    const copyright = await client.getCopyrightForTile(tileIndex);

    assert.isNotEmpty(copyright.generalCopyrights);
    assert.isNotEmpty(copyright.regions);
  });

  it("can get copyright information for world", async function () {
    const copyright = await client.getCopyrightForWorld();

    assert.isNotEmpty(copyright.generalCopyrights);
    assert.isNotEmpty(copyright.regions);
  });

  it("can get copyright from bounding box", async function () {
    const boundingBox = {
      bottomRight: { latitude: 52.41064, longitude: 4.84239 },
      topLeft: { latitude: 52.41072, longitude: 4.84228 },
    };
    const copyright = await client.getCopyrightFromBoundingBox(boundingBox);

    assert.isNotEmpty(copyright.generalCopyrights);
    assert.isNotEmpty(copyright.regions);
  });


  it("can get copyright information for map attribution", async function () {
    const boundingBox = {
      bottomRight: { latitude: 47.57949, longitude: -122.247157 },
      topLeft: { latitude: 47.668372, longitude: -122.414162 },
    };
    const attribution = await client.getMapAttribution(
      KnownTilesetId.MicrosoftBase,
      6,
      boundingBox
    );

    assert.isNotEmpty(attribution.copyrights);
  });

  /* describe("#getMapStaticImage", function () {
    it("can get stream response body", async function () {
      const boundingBox = {
        bottomRight: { latitude: 42.982261, longitude: 24.980233 },
        topLeft: { latitude: 56.526017, longitude: 1.355233 },
      };
      const mapStaticImageOptions = {
        layer: "basic",
        style: "dark",
        zoom: 2,
      };
      const mapTile = await client.getMapStaticImage(
        KnownRasterTileFormat.Png,
        boundingBox,
        mapStaticImageOptions
      );

      assert.isNotEmpty(mapTile.contentType);
      assert.ok(mapTile.readableStreamBody);
    });
  });

  describe("#getMapTile", function () {
    it("should stream response body on successful request", async function () {
      const tileIndex = { z: 6, x: 9, y: 22 };
      const mapTileOptions = { tileSize: "512" };
      const mapTile = await client.getMapTile(
        KnownTilesetId.MicrosoftBase,
        tileIndex,
        mapTileOptions
      );

      assert.isNotEmpty(mapTile.contentType);
      assert.ok(mapTile.readableStreamBody);
    });
  });*/


  it("can get map tilest information", async function () {
    const tileset = await client.getMapTileset(KnownTilesetId.MicrosoftBase);

    assert.isNotEmpty(tileset.tilejson);
    assert.isNotEmpty(tileset.tiles);
  });
});

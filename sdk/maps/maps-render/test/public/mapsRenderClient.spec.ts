// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthMethod, createClient, createRecorder } from "./utils/createClient";
import { Context, Suite } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { MapsRenderClient } from "src/mapsRenderClient";
import { assert, use as chaiUse } from "chai";
import { matrix } from "@azure/test-utils";
import chaiPromises from "chai-as-promised";
import { KnownRasterTileFormat, KnownTilesetId } from "../../src";
chaiUse(chaiPromises);

matrix([["SubscriptionKey", "AAD"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] MapsRenderClient`, function (this: Suite) {
    let recorder: Recorder;
    let client: MapsRenderClient;
    const fastTimeout = 10000;

    beforeEach(function (this: Context) {
      recorder = createRecorder(this);
      client = createClient(authMethod);
    });

    afterEach(async function () {
      await recorder.stop();
    });

    describe("fast tests", function () {
      before(function (this: Context) {
        this.timeout(fastTimeout);
      });

      describe("#getCopyrightCaption", function () {
        it("should able to retreive copyright caption", async function () {
          const copyrightCaptionResult = await client.getCopyrightCaption();

          assert.isNotEmpty(copyrightCaptionResult.copyrightsCaption);
        });
      });

      describe("#getCopyrightForTile", function () {
        it("should able to retrieve copyright information", async function () {
          const tileIndex = { z: 6, x: 9, y: 22 };
          const copyright = await client.getCopyrightForTile(tileIndex);

          assert.isNotEmpty(copyright.generalCopyrights);
          assert.isNotEmpty(copyright.regions);
        });
      });

      describe("#getCopyrightForWorld", function () {
        it("should able to retrieve copyright information", async function () {
          const copyright = await client.getCopyrightForWorld();

          assert.isNotEmpty(copyright.generalCopyrights);
          assert.isNotEmpty(copyright.regions);
        });
      });

      describe("#getCopyrightFromBoundingBox", function () {
        it("should able to retrieve copyright information", async function () {
          const boundingBox = {
            bottomRight: { latitude: 52.41064, longitude: 4.84239 },
            topLeft: { latitude: 52.41072, longitude: 4.84228 },
          };
          const copyright = await client.getCopyrightFromBoundingBox(boundingBox);

          assert.isNotEmpty(copyright.generalCopyrights);
          assert.isNotEmpty(copyright.regions);
        });
      });

      describe("#getMapAttribution", function () {
        it("should able to retrieve copyright information", async function () {
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
      });

      describe("#getMapStaticImage", function () {
        it("should stream response body on successful request", async function () {
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
      });

      describe("#getMapTileset", function () {
        it("should able to retrieve tilest information", async function () {
          const tileset = await client.getMapTileset(KnownTilesetId.MicrosoftBase);

          assert.isNotEmpty(tileset.tilejson);
          assert.isNotEmpty(tileset.tiles);
        });
      });
    });
  });
});

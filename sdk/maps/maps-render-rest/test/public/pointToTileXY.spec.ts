// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { isUnexpected, MapsRenderClient, positionToTileXY } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("position to tile index helper", function () {
  let recorder: Recorder;
  let client: MapsRenderClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });
  it("positionToTileXY", async () => {
    const zoom = 10;
    const tileSize = "512";
    const tileIndex = positionToTileXY([52.517, 13.3854], zoom, tileSize);
    assert.equal(tileIndex.x, 550);
    assert.equal(tileIndex.y, 335);

    const response = await client.path("/map/tile").get({
      queryParameters: {
        tilesetId: "microsoft.base",
        zoom,
        x: tileIndex.x,
        y: tileIndex.y,
        tileSize,
      },
    });

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    }
    assert.isNotEmpty(response.body);
  });
});

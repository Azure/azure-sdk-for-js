// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { MapsRenderClient } from "@azure-rest/maps-render";
import { isUnexpected, positionToTileXY } from "@azure-rest/maps-render";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("position to tile index helper", () => {
  let recorder: Recorder;
  let client: MapsRenderClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
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

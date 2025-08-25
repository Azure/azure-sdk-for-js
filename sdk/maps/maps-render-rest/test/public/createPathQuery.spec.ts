// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { LatLon } from "@azure/maps-common";
import type { MapsRenderClient } from "@azure-rest/maps-render";
import { isUnexpected, createPathQuery } from "@azure-rest/maps-render";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("create path query helper", () => {
  let recorder: Recorder;
  let client: MapsRenderClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create a query string with a collection of paths", async () => {
    const circularPath = {
      center: [52.4559, 13.228] as LatLon,
      radiusInMeters: 10000,
      options: {
        lineColor: "000000",
        lineOpacity: 0.9,
        lineWidthInPixels: 2,
      },
    };

    const linearPath = {
      coordinates: [
        [52.577, 13.35],
        [52.6, 13.2988],
        [52.32, 13.2988],
      ] as LatLon[],
      options: {
        lineColor: "000000",
        lineOpacity: 0.9,
        lineWidthInPixels: 2,
      },
    };

    const polygonPath = {
      coordinates: [
        [52.577, 13.35],
        [52.6, 13.2988],
        [52.32, 13.2988],
        [52.577, 13.35],
      ] as LatLon[],
      options: {
        lineColor: "000000",
        lineOpacity: 0.9,
        lineWidthInPixels: 2,
        fillColor: "FFFFFF",
        fillOpacity: 0.8,
      },
    };

    const path = createPathQuery([circularPath, linearPath, polygonPath]);
    assert.equal(
      path,
      "lc000000|la0.9|lw2|ra10000||13.228 52.4559&path=lc000000|la0.9|lw2||13.35 52.577|13.2988 52.6|13.2988 52.32&path=lc000000|la0.9|lw2|fcFFFFFF|fa0.8||13.35 52.577|13.2988 52.6|13.2988 52.32|13.35 52.577",
    );

    const res = await client.path("/map/static").get({
      queryParameters: {
        zoom: 10,
        bbox: [13.228, 52.4559, 13.5794, 52.629],
        path,
      },
      // Need to skip the url encoding to make the path works.
      skipUrlEncoding: true,
    });
    if (isUnexpected(res)) assert.fail(JSON.stringify(res.body));

    assert.isNotEmpty(res.body);
  });
});

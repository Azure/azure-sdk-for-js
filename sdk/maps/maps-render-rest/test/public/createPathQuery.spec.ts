// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { LatLon } from "@azure/maps-common";
import { assert } from "chai";
import { Context } from "mocha";
import { isUnexpected, MapsRenderClient, createPathQuery } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("create path query helper", () => {
  let recorder: Recorder;
  let client: MapsRenderClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
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
        path: path,
      },
      // Need to skip the url encoding to make the path works.
      skipUrlEncoding: true,
    });
    if (isUnexpected(res)) assert.fail(JSON.stringify(res.body));

    assert.isNotEmpty(res.body);
  });
});

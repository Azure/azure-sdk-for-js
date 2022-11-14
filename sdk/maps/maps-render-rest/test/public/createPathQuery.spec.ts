// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
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

  it("can create a circular path query", async () => {
    const pathQuery = createPathQuery([52.4559, 13.228], 10000, {
      lineColor: "000000",
      lineOpacity: 0.9,
      lineWidthInPixels: 2,
    });

    assert.equal(pathQuery, "lc000000|la0.9|lw2|ra10000||13.228 52.4559");
    const res = await client.path("/map/static/{format}", "png").get({
      queryParameters: {
        zoom: 10,
        bbox: [13.228, 52.4559, 13.5794, 52.629],
        path: [pathQuery],
      },
    });
    if (isUnexpected(res)) assert.fail(res.body.error?.message || "Unexpected error");

    assert.isNotEmpty(res.body);
  });

  it("can create a linear path query", async () => {
    const pathQuery = createPathQuery(
      [
        [52.577, 13.35],
        [52.6, 13.2988],
        [52.32, 13.2988],
      ],
      {
        lineColor: "000000",
        lineOpacity: 0.9,
        lineWidthInPixels: 2,
      }
    );

    assert.equal(pathQuery, "lc000000|la0.9|lw2||13.35 52.577|13.2988 52.6|13.2988 52.32");

    const res = await client.path("/map/static/{format}", "png").get({
      queryParameters: {
        zoom: 10,
        bbox: [13.228, 52.4559, 13.5794, 52.629],
        path: [pathQuery],
      },
    });

    if (isUnexpected(res)) assert.fail(res.body.error?.message || "Unexpected error");

    assert.isNotEmpty(res.body);
  });
  it("can create a polygonal path query", async () => {
    const pathQuery = createPathQuery(
      [
        [52.577, 13.35],
        [52.6, 13.2988],
        [52.32, 13.2988],
        [52.577, 13.35],
      ],
      {
        lineColor: "000000",
        lineOpacity: 0.9,
        lineWidthInPixels: 2,
        fillColor: "FFFFFF",
        fillOpacity: 0.8,
      }
    );

    assert.equal(
      pathQuery,
      "lc000000|la0.9|lw2|fcFFFFFF|fa0.8||13.35 52.577|13.2988 52.6|13.2988 52.32|13.35 52.577"
    );

    const res = await client.path("/map/static/{format}", "png").get({
      queryParameters: {
        zoom: 10,
        bbox: [13.228, 52.4559, 13.5794, 52.629],
        path: [pathQuery],
      },
    });
    if (isUnexpected(res)) assert.fail(res.body.error?.message || "Unexpected error");

    assert.isNotEmpty(res.body);
  });
});

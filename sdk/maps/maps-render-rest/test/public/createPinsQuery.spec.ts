// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { LatLon } from "@azure/maps-common";
import { assert } from "chai";
import { Context } from "mocha";
import { createPinsQuery, isUnexpected, MapsRenderClient } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("create pins query helper", () => {
  let recorder: Recorder;
  let client: MapsRenderClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create pins query from a collection of pin sets", async () => {
    const defaultPinSet = {
      pins: [
        { coordinate: [52.577, 13.35] as LatLon, label: "A" },
        { coordinate: [52.6, 13.2988] as LatLon },
      ],
    };

    const coloredPinSet = {
      pins: [
        { coordinate: [52.577, 13.35] as LatLon, label: "A" },
        { coordinate: [52.6, 13.2988] as LatLon },
      ],
      options: {
        pinColor: "FFFFFF",
      },
    };

    const noImagePinSet = {
      pins: [
        { coordinate: [52.577, 13.35] as LatLon, label: "A" },
        { coordinate: [52.6, 13.2988] as LatLon },
      ],
      pinImage: "none",
      options: {
        pinColor: "FFFFFF",
      },
    };

    const customImagePin = {
      pins: [
        { coordinate: [52.577, 13.35] as LatLon, label: "A" },
        { coordinate: [52.6, 13.2988] as LatLon },
      ],
      pinImage: "http://contoso.com/pushpins/red.png",
      options: {
        pinColor: "FFFFFF",
      },
    };

    const pinsQuery = createPinsQuery([
      defaultPinSet,
      coloredPinSet,
      noImagePinSet,
      customImagePin,
    ]);

    assert.equal(
      pinsQuery,
      "default||'A'13.35 52.577|13.2988 52.6&pins=default|coFFFFFF||'A'13.35 52.577|13.2988 52.6&pins=none|coFFFFFF||'A'13.35 52.577|13.2988 52.6&pins=custom|coFFFFFF||'A'13.35 52.577|13.2988 52.6||http://contoso.com/pushpins/red.png",
    );

    /* We don't test custom pin E2E since we have no reliable image source */
    const res = await client.path("/map/static").get({
      queryParameters: {
        zoom: 10,
        bbox: [13.228, 52.4559, 13.5794, 52.629],
        pins: createPinsQuery([defaultPinSet, coloredPinSet, noImagePinSet]),
      },
      skipUrlEncoding: true,
    });
    if (isUnexpected(res)) assert.fail(res.body.error?.message || "Unexpected Error");

    assert.isNotEmpty(res.body);
  });

  it("should map the options key name correctly", async () => {
    const pinsQuery = createPinsQuery([
      {
        pins: [{ coordinate: [52.577, 13.35] as LatLon }],
        options: {
          opacity: 0.8,
          labelAnchor: [10, 4],
          labelColor: "000000",
          labelSizeInPixels: 10,
          pinAnchor: [0, 0],
          rotationInDegree: 90,
          scale: 2,
          pinColor: "123456",
        },
      },
    ]);

    assert.equal(
      pinsQuery,
      "default|al0.8|la10 4|lc000000|ls10|an0 0|ro90|sc2|co123456||13.35 52.577",
    );

    const res = await client.path("/map/static").get({
      queryParameters: {
        zoom: 10,
        bbox: [13.228, 52.4559, 13.5794, 52.629],
        pins: pinsQuery,
      },
      skipUrlEncoding: true,
    });
    if (isUnexpected(res)) assert.fail(res.body.error?.message || "Unexpected Error");

    assert.isNotEmpty(res.body);
  });
});

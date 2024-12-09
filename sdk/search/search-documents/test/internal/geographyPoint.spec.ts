// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import GeographyPoint from "../../src/geographyPoint.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("geographyPoint", function () {
  it("JSON.stringify", function () {
    const geoPoint = new GeographyPoint({
      longitude: -122.123889,
      latitude: 47.669444,
    });
    const result = JSON.parse(JSON.stringify(geoPoint));
    assert.deepEqual(result, {
      type: "Point",
      coordinates: [-122.123889, 47.669444],
      crs: { type: "name", properties: { name: "EPSG:4326" } },
    });
  });

  afterEach(function () {
    vi.restoreAllMocks();
  });
});

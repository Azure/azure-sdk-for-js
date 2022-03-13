// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { toColonDelimitedLatLonString, toLatLon, toNumericArray } from "../../src/models/mappers";

describe("LatLon mappers", () => {
  describe("toLatLon", () => {
    it("should create a LatLon object", () => {
      const lat = 45.2;
      const lon = 120.3;
      const latLon = toLatLon(lat, lon);

      assert.hasAllKeys(latLon, ["latitude", "longitude"]);
      assert.equal(latLon.latitude, lat);
      assert.equal(latLon.longitude, lon);
    });
  });
  describe("toNumericArray", () => {
    it("should create a numeric array of [lat, lon]", () => {
      const latLon = toLatLon(45.2, 120.3);

      assert.deepEqual(toNumericArray(latLon), [45.2, 120.3]);
    });
  });

  describe("toColonDelimitedLatLonString", () => {
    it("should create colon-delimited lat-lon string", () => {
      const latLons = [toLatLon(45.2, 120.3), toLatLon(45.4, 120.1), toLatLon(45.6, 120.1)];
      const latLonString = toColonDelimitedLatLonString(latLons);

      assert.equal(latLonString, "45.2,120.3:45.4,120.1:45.6,120.1");
    });
  });
});

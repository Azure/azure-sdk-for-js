// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { toColonDelimitedLatLonString, toNumericArray } from "../../src/models/mappers";
import { assert } from "chai";

describe("LatLon mappers", () => {
  describe("toNumericArray", () => {
    it("should create a numeric array of [lat, lon]", () => {
      const latLon = { latitude: 45.2, longitude: 120.3 };

      assert.deepEqual(toNumericArray(latLon), [45.2, 120.3]);
    });
  });

  describe("toColonDelimitedLatLonString", () => {
    it("should create colon-delimited lat-lon string", () => {
      const latLons = [
        { latitude: 45.2, longitude: 120.3 },
        { latitude: 45.4, longitude: 120.1 },
        { latitude: 45.6, longitude: 120.1 },
      ];
      const latLonString = toColonDelimitedLatLonString(latLons);

      assert.equal(latLonString, "45.2,120.3:45.4,120.1:45.6,120.1");
    });
  });
});

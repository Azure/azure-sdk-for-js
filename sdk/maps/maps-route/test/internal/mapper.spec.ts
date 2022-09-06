// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { toColonDelimitedLatLonString } from "../../src/models/mappers";
import { assert } from "chai";
import { LatLon } from "../../../maps-common/src";

describe("LatLon mappers", () => {
  describe("toColonDelimitedLatLonString", () => {
    it("should create colon-delimited lat-lon string", () => {
      const latLons: LatLon[] = [
        [45.2, 120.3],
        [45.4, 120.1],
        [45.6, 120.1],
      ];
      const latLonString = toColonDelimitedLatLonString(latLons);

      assert.equal(latLonString, "45.2,120.3:45.4,120.1:45.6,120.1");
    });
  });
});

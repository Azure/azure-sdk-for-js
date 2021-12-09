// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LatLon } from "../../src/models/models";
import { assert } from "chai";
import {
  mapLatLongPairAbbreviatedToLatLon,
  mapStringToLatLon,
  toLatLonString
} from "../../src/models/mappers";
import { LatLongPairAbbreviated } from "../../src/generated";

describe("LatLon/BoundingBox mappers", () => {
  describe("toLatLonString", () => {
    it("should serialize properly", () => {
      const latLon = new LatLon(45.2, 120.3);
      assert.equal(toLatLonString(latLon), "45.2,120.3");
    });
  });
  describe("mapLatLongPairAbbreviatedToLatLon", () => {
    it("should convert LatLongPairAbbreviated to LatLong correctly", () => {
      const latLongAbbr: LatLongPairAbbreviated = {
        lat: 45.2,
        lon: 120.3
      };

      const latLon = mapLatLongPairAbbreviatedToLatLon(latLongAbbr);
      assert.equal(latLongAbbr.lat, latLon?.latitude);
      assert.equal(latLongAbbr.lon, latLon?.longitude);
    });
  });
  describe("mapStringToLatLon", () => {
    it("should deserialize lat-lon string", () => {
      const latLon = mapStringToLatLon("45.2,120.3");
      assert.equal(latLon?.latitude, 45.2);
      assert.equal(latLon?.longitude, 120.3);
    });
  });
});

describe("Options mappers", () => {
  describe("extractOperationOptions", () => {});
  describe("mapSearchBaseOptions", () => {});
  describe("mapSearchExtraFilterOptions", () => {});
  describe("mapSearchAddressOptions", () => {});
  describe("mapSearchPointOfInterestOptions", () => {});
  describe("mapSearchNearbyPointOfInterestOptions", () => {});
  describe("mapFuzzySearchOptions", () => {});
});

describe("Result mappers", () => {
  describe("mapAddress", () => {});
  describe("mapSearchAddressResult", () => {});
  describe("removeUndefinedProperties", () => {});
  describe("mapReverseSearchAddressResult", () => {});
  describe("mapReverseSearchCrossStreetAddressResult", () => {});
  describe("mapSearchAddressBatchResult", () => {});
  describe("mapReverseSearchAddressBatchResult", () => {});
  describe("createPartialQueryStringFromOptions", () => {});
  describe("createFuzzySearchBatchRequest", () => {});
  describe("createSearchAddressBatchRequest", () => {});
  describe("createReverseSearchAddressBatchRequest", () => {});
});

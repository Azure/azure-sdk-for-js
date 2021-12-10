// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BoundingBox, LatLon } from "../../src/models/models";
import { assert } from "chai";
import {
  mapBoundingBox,
  mapBoundingBoxFromCompassNotation,
  mapLatLongPairAbbreviatedToLatLon,
  mapStringToLatLon,
  toBoundingBox,
  toLatLon,
  toLatLonString
} from "../../src/models/mappers";
import {
  LatLongPairAbbreviated,
  BoundingBox as BoundingBoxInternal,
  BoundingBoxCompassNotation
} from "../../src/generated";

describe("LatLon/BoundingBox mappers", () => {
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

  describe("toLatLonString", () => {
    it("should serialize properly", () => {
      const latLon = toLatLon(45.2, 120.3);

      assert.equal(toLatLonString(latLon), "45.2,120.3");
    });
  });

  describe("mapLatLongPairAbbreviatedToLatLon", () => {
    it("should convert LatLongPairAbbreviated to LatLong correctly", () => {
      const latLongAbbr: LatLongPairAbbreviated = {
        lat: 45.2,
        lon: 120.3
      };
      const latLon = mapLatLongPairAbbreviatedToLatLon(latLongAbbr) as LatLon;

      assert.isNotNull(latLon);
      assert.equal(latLongAbbr.lat, latLon.latitude);
      assert.equal(latLongAbbr.lon, latLon.longitude);
    });

    it("should return undefined if the input is also undefined", () => {
      assert.isUndefined(mapLatLongPairAbbreviatedToLatLon(undefined));
    });
  });

  describe("mapStringToLatLon", () => {
    it("should deserialize lat-lon string", () => {
      const latLon = mapStringToLatLon("45.2,120.3") as LatLon;

      assert.isNotNull(latLon);
      assert.equal(latLon.latitude, 45.2);
      assert.equal(latLon.longitude, 120.3);
    });

    it("should return undefined if the input is also undefined", () => {
      assert.isUndefined(mapStringToLatLon(undefined));
    });
  });

  describe("toBoundingBox", () => {
    it("should create a BondingBox object", () => {
      const topLeft = toLatLon(45.2, 12.3);
      const bottomRight = toLatLon(45.1, 120.4);
      const bbox = toBoundingBox(topLeft, bottomRight);

      assert.hasAllKeys(bbox, ["topLeft", "bottomRight"]);
      assert.deepEqual(bbox.topLeft, topLeft);
      assert.deepEqual(bbox.bottomRight, bottomRight);
    });
  });

  describe("mapBoundingBox", () => {
    const topLeft: LatLongPairAbbreviated = { lat: 45.2, lon: 12.3 };
    const bottomRight: LatLongPairAbbreviated = { lat: 45.1, lon: 120.4 };

    it("should convert an internel bounding box to a BondingBox object", () => {
      const concreteBbox: BoundingBoxInternal = {
        topLeft: topLeft,
        bottomRight: bottomRight
      };
      const bbox = mapBoundingBox(concreteBbox) as BoundingBox;
      assert.hasAllKeys(bbox, ["topLeft", "bottomRight"]);
      assert.isDefined(bbox.topLeft);
      assert.isDefined(bbox.bottomRight);
    });

    it("should not convert to a BoundingBox is some properties are null", () => {
      const incompleteBbox1: BoundingBoxInternal = {
        topLeft: topLeft,
        bottomRight: undefined
      };
      const incompleteBbox2: BoundingBoxInternal = {
        topLeft: undefined,
        bottomRight: bottomRight
      };
      assert.isUndefined(mapBoundingBox(incompleteBbox1));
      assert.isUndefined(mapBoundingBox(incompleteBbox2));
    });

    it("should return undefined if the input is also undefined", () => {
      assert.isUndefined(mapBoundingBox(undefined));
    });
  });

  xdescribe("mapBoundingBoxFromCompassNotation", () => {
    const northEast = "45.2,12.4";
    const southWest = "45.1,12.3";

    it("should convert an internel bounding box to a BondingBox object", () => {
      const concreteBbox: BoundingBoxCompassNotation = {
        northEast: northEast,
        southWest: southWest
      };
      const bbox = mapBoundingBoxFromCompassNotation(concreteBbox) as BoundingBox;
      assert.hasAllKeys(bbox, ["topLeft", "bottomRight"]);
      assert.isDefined(bbox.topLeft);
      assert.isDefined(bbox.bottomRight);
    });

    it("should not convert to a BoundingBox is some properties are null", () => {
      const incompleteBbox1: BoundingBoxCompassNotation = {
        northEast: northEast,
        southWest: undefined
      };
      const incompleteBbox2: BoundingBoxCompassNotation = {
        northEast: undefined,
        southWest: southWest
      };
      assert.isUndefined(mapBoundingBoxFromCompassNotation(incompleteBbox1));
      assert.isUndefined(mapBoundingBoxFromCompassNotation(incompleteBbox2));
    });

    it("should return undefined if the input is also undefined", () => {
      assert.isUndefined(mapBoundingBoxFromCompassNotation(undefined));
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

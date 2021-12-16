// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BoundingBox, LatLon } from "../../src/models/models";
import { assert } from "chai";
import {
  extractOperationOptions,
  mapBoundingBox,
  mapBoundingBoxFromCompassNotation,
  mapFuzzySearchOptions,
  mapLatLongPairAbbreviatedToLatLon,
  mapSearchAddressOptions,
  mapSearchBaseOptions,
  mapSearchExtraFilterOptions,
  mapSearchPointOfInterestOptions,
  mapStringToLatLon,
  toBoundingBox,
  toLatLon,
  toLatLonString
} from "../../src/models/mappers";
import {
  FuzzySearchOptions,
  SearchAddressBaseOptions,
  SearchAddressOptions,
  SearchBaseOptions,
  SearchExtraFilterOptions,
  SearchNearbyPointOfInterestOptions,
  SearchPointOfInterestOptions
} from "../../src/models/options";
import {
  LatLongPairAbbreviated,
  BoundingBox as BoundingBoxInternal,
  BoundingBoxCompassNotation
} from "../../src/generated";
import {
  SearchSearchAddressOptionalParams as SearchAddressOptionalParams,
  SearchSearchPointOfInterestOptionalParams as SearchPointOfInterestOptionalParams,
  SearchFuzzySearchOptionalParams as FuzzySearchOptionalParams
} from "../../src/generated/models";
import { OperationOptions } from "@azure/core-client";

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

  describe("mapBoundingBoxFromCompassNotation", () => {
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
      assert.equal(bbox.topLeft.latitude, 45.2);
      assert.equal(bbox.topLeft.longitude, 12.3);
      assert.equal(bbox.bottomRight.latitude, 45.1);
      assert.equal(bbox.bottomRight.longitude, 12.4);
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
  const operationOptionsKeys: (keyof OperationOptions)[] = [
    "abortSignal",
    "requestOptions",
    "tracingOptions",
    "serializerOptions",
    "onResponse"
  ];
  const searchBaseOptionsKeys: (keyof SearchBaseOptions)[] = [
    ...operationOptionsKeys,
    "top",
    "skip",
    "language",
    "extendedPostalCodesFor",
    "localizedMapView"
  ];
  const searchExtraFilterOptionsKeys: (keyof SearchExtraFilterOptions)[] = [
    "categoryFilter",
    "brandFilter",
    "electricVehicleConnectorFilter"
  ];

  const searchAddressOptionalParamsKeys: (keyof SearchAddressOptionalParams)[] = [
    ...searchBaseOptionsKeys,
    "isTypeAhead",
    "countryFilter",
    "lat",
    "lon",
    "radiusInMeters",
    "topLeft",
    "btmRight"
  ];

  const searchPointOfInterestOptionalParamsKeys: (keyof SearchPointOfInterestOptionalParams)[] = [
    ...searchBaseOptionsKeys,
    "operatingHours",
    "isTypeAhead",
    "radiusInMeters",
    "topLeft",
    "btmRight"
  ];

  const fuzzySearchOptionalParams: (keyof FuzzySearchOptionalParams)[] = [
    ...searchPointOfInterestOptionalParamsKeys,
    "entityType",
    "minFuzzyLevel",
    "maxFuzzyLevel",
    "indexFilter"
  ];

  describe("extractOperationOptions", () => {
    it("should only return properties of OperationOptions", () => {
      const options: SearchBaseOptions = {
        top: 5,
        skip: 1
      };
      const convertedOptions = extractOperationOptions(options);
      assert.hasAllKeys(convertedOptions, operationOptionsKeys);
      assert.doesNotHaveAnyKeys(convertedOptions, ["top", "skip"]);
    });
  });
  describe("mapSearchBaseOptions", () => {
    it("should only return properties of SearchBaseOptions", () => {
      const options: SearchAddressBaseOptions = {
        isTypeAhead: true
      };
      const convertedOptions = mapSearchBaseOptions(options);
      assert.hasAllKeys(convertedOptions, searchBaseOptionsKeys);
      assert.doesNotHaveAnyKeys(convertedOptions, ["isTypeAhead"]);
    });
  });
  describe("mapSearchExtraFilterOptions", () => {
    it("should only return properties of SearchExtraFilterOptions", () => {
      const options: SearchNearbyPointOfInterestOptions = {
        radiusInMeters: 5000
      };
      const convertedOptions = mapSearchExtraFilterOptions(options);
      assert.hasAllKeys(convertedOptions, searchExtraFilterOptionsKeys);
      assert.doesNotHaveAnyKeys(convertedOptions, ["radiusInMeters"]);
    });
  });
  describe("mapSearchAddressOptions", () => {
    it("should only return properties of SearchAddressOptionalParams", () => {
      const options: SearchAddressOptions = {
        coordinates: { latitude: 50, longitude: 100 }
      };
      const convertedOptions = mapSearchAddressOptions(options);
      assert.hasAllKeys(convertedOptions, searchAddressOptionalParamsKeys);
      assert.doesNotHaveAnyKeys(convertedOptions, ["coordinates"]);
    });
  });
  describe("mapSearchPointOfInterestOptions", () => {
    it("should only return properties of SearchPointOfInterestOptionalParams", () => {
      const options: SearchPointOfInterestOptions = {
        boundingBox: {
          bottomRight: { latitude: 60, longitude: 50 },
          topLeft: { latitude: 61, longitude: 49 }
        }
      };
      const convertedOptions = mapSearchPointOfInterestOptions(options);
      assert.hasAllKeys(convertedOptions, searchPointOfInterestOptionalParamsKeys);
      assert.doesNotHaveAnyKeys(convertedOptions, ["boundingBox"]);
    });
  });
  describe("mapFuzzySearchOptions", () => {
    it("should only return properties of FuzzySearchOptionalParams", () => {
      const options: FuzzySearchOptions = {
        boundingBox: {
          bottomRight: { latitude: 60, longitude: 50 },
          topLeft: { latitude: 61, longitude: 49 }
        }
      };
      const convertedOptions = mapFuzzySearchOptions(options);
      assert.hasAllKeys(convertedOptions, fuzzySearchOptionalParams);
      assert.doesNotHaveAnyKeys(convertedOptions, ["boundingBox"]);
    });
  });
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

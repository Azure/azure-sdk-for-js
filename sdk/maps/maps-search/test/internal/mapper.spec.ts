// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BoundingBox, LatLon } from "../../src/models/models";
import { assert } from "chai";
import {
  createFuzzySearchBatchRequest,
  createReverseSearchAddressBatchRequest,
  createSearchAddressBatchRequest,
  extractOperationOptions,
  mapAddress,
  mapBoundingBox,
  mapBoundingBoxFromCompassNotation,
  mapFuzzySearchOptions,
  mapLatLongPairAbbreviatedToLatLon,
  mapReverseSearchAddressBatchResult,
  mapReverseSearchAddressResult,
  mapReverseSearchCrossStreetAddressResult,
  mapSearchAddressBatchResult,
  mapSearchAddressOptions,
  mapSearchAddressResult,
  mapSearchBaseOptions,
  mapSearchExtraFilterOptions,
  mapSearchPointOfInterestOptions,
  mapStringToLatLon,
  removeUndefinedProperties,
  toBoundingBox,
  toLatLon,
  toLatLonString,
} from "../../src/models/mappers";
import {
  FuzzySearchBaseOptions,
  FuzzySearchOptions,
  FuzzySearchRequest,
  ReverseSearchAddressOptions,
  ReverseSearchAddressRequest,
  SearchAddressBaseOptions,
  SearchAddressOptions,
  SearchAddressRequest,
  SearchBaseOptions,
  SearchExtraFilterOptions,
  SearchNearbyPointOfInterestOptions,
  SearchPointOfInterestBaseOptions,
  SearchPointOfInterestOptions,
} from "../../src/models/options";
import {
  LatLongPairAbbreviated,
  BoundingBox as BoundingBoxInternal,
  BoundingBoxCompassNotation,
} from "../../src/generated";
import {
  SearchSearchAddressOptionalParams as SearchAddressOptionalParams,
  SearchSearchPointOfInterestOptionalParams as SearchPointOfInterestOptionalParams,
  SearchFuzzySearchOptionalParams as FuzzySearchOptionalParams,
  KnownRoadUseType,
  KnownGeographicEntityType,
  BatchRequest,
  KnownSearchIndexes,
  KnownOperatingHoursRange,
  KnownElectricVehicleConnector,
  Address as AddressInternal,
  SearchAddressResult as SearchAddressResultInternal,
  ReverseSearchAddressResult as ReverseSearchAddressResultInternal,
  ReverseSearchCrossStreetAddressResult as ReverseSearchCrossStreetAddressResultInternal,
  KnownMatchType,
  SearchAddressBatchResult,
  ReverseSearchAddressBatchResult,
} from "../../src/generated/models";
import { OperationOptions } from "@azure/core-client";
import {
  Address,
  BatchResult,
  ReverseSearchAddressResult,
  ReverseSearchCrossStreetAddressResult,
  SearchAddressResult,
} from "../../src/models/results";

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
        lon: 120.3,
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
        bottomRight: bottomRight,
      };
      const bbox = mapBoundingBox(concreteBbox) as BoundingBox;
      assert.hasAllKeys(bbox, ["topLeft", "bottomRight"]);
      assert.isDefined(bbox.topLeft);
      assert.isDefined(bbox.bottomRight);
    });

    it("should not convert to a BoundingBox is some properties are null", () => {
      const incompleteBbox1: BoundingBoxInternal = {
        topLeft: topLeft,
        bottomRight: undefined,
      };
      const incompleteBbox2: BoundingBoxInternal = {
        topLeft: undefined,
        bottomRight: bottomRight,
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
        southWest: southWest,
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
        southWest: undefined,
      };
      const incompleteBbox2: BoundingBoxCompassNotation = {
        northEast: undefined,
        southWest: southWest,
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
    "onResponse",
  ];
  const searchBaseOptionsKeys: (keyof SearchBaseOptions)[] = [
    "top",
    "skip",
    "language",
    "extendedPostalCodesFor",
    "localizedMapView",
  ];
  const searchExtraFilterOptionsKeys: (keyof SearchExtraFilterOptions)[] = [
    "categoryFilter",
    "brandFilter",
    "electricVehicleConnectorFilter",
  ];
  const searchAddressOptionalParamsKeys: (keyof SearchAddressOptionalParams)[] = [
    ...operationOptionsKeys,
    ...searchBaseOptionsKeys,
    "isTypeAhead",
    "countryFilter",
    "lat",
    "lon",
    "radiusInMeters",
    "topLeft",
    "btmRight",
  ];

  const searchPointOfInterestOptionalParamsKeys: (keyof SearchPointOfInterestOptionalParams)[] = [
    ...operationOptionsKeys,
    ...searchBaseOptionsKeys,
    "operatingHours",
    "isTypeAhead",
    "radiusInMeters",
    "topLeft",
    "btmRight",
  ];

  const fuzzySearchOptionalParams: (keyof FuzzySearchOptionalParams)[] = [
    ...searchPointOfInterestOptionalParamsKeys,
    "entityType",
    "minFuzzyLevel",
    "maxFuzzyLevel",
    "indexFilter",
  ];

  describe("extractOperationOptions", () => {
    it("should only return properties of OperationOptions", () => {
      const options: SearchPointOfInterestOptions = {
        top: 5,
        skip: 1,
      };
      const convertedOptions = extractOperationOptions(options);
      assert.hasAllKeys(convertedOptions, operationOptionsKeys);
      assert.doesNotHaveAnyKeys(convertedOptions, ["top", "skip"]);
    });
  });
  describe("mapSearchBaseOptions", () => {
    it("should only return properties of SearchBaseOptions", () => {
      const options: SearchAddressBaseOptions = {
        isTypeAhead: true,
      };
      const convertedOptions = mapSearchBaseOptions(options);
      assert.hasAllKeys(convertedOptions, searchBaseOptionsKeys);
      assert.doesNotHaveAnyKeys(convertedOptions, ["isTypeAhead"]);
    });
  });
  describe("mapSearchExtraFilterOptions", () => {
    it("should only return properties of SearchExtraFilterOptions", () => {
      const options: SearchNearbyPointOfInterestOptions = {
        radiusInMeters: 5000,
      };
      const convertedOptions = mapSearchExtraFilterOptions(options);
      assert.hasAllKeys(convertedOptions, searchExtraFilterOptionsKeys);
      assert.doesNotHaveAnyKeys(convertedOptions, ["radiusInMeters"]);
    });
  });
  describe("mapSearchAddressOptions", () => {
    it("should only return properties of SearchAddressOptionalParams", () => {
      const options: SearchAddressOptions = {
        coordinates: { latitude: 50, longitude: 100 },
      };
      const convertedOptions = mapSearchAddressOptions(options);
      assert.hasAllKeys(convertedOptions, searchAddressOptionalParamsKeys);
      assert.doesNotHaveAnyKeys(convertedOptions, ["coordinates"]);
    });
  });
  describe("mapSearchPointOfInterestOptions", () => {
    it("should only return properties of SearchPointOfInterestOptionalParams", () => {
      const options: SearchPointOfInterestBaseOptions = {
        boundingBox: {
          bottomRight: { latitude: 60, longitude: 50 },
          topLeft: { latitude: 61, longitude: 49 },
        },
      };
      const convertedOptions = mapSearchPointOfInterestOptions(options);
      assert.hasAllKeys(convertedOptions, searchPointOfInterestOptionalParamsKeys);
      assert.doesNotHaveAnyKeys(convertedOptions, ["boundingBox"]);
    });
  });
  describe("mapFuzzySearchOptions", () => {
    it("should only return properties of FuzzySearchOptionalParams", () => {
      const options: FuzzySearchBaseOptions = {
        boundingBox: {
          bottomRight: { latitude: 60, longitude: 50 },
          topLeft: { latitude: 61, longitude: 49 },
        },
      };
      const convertedOptions = mapFuzzySearchOptions(options);
      assert.hasAllKeys(convertedOptions, fuzzySearchOptionalParams);
      assert.doesNotHaveAnyKeys(convertedOptions, ["boundingBox"]);
    });
  });
});

describe("Result mappers", () => {
  describe("mapAddress", () => {
    it("should transform an internal address to custom address object", () => {
      const bboxCompass: BoundingBoxCompassNotation = {
        northEast: "45.2,12.4",
        southWest: "45.1,12.3",
      };
      const internalAddr: AddressInternal = {
        buildingNumber: "buildingNumber",
        street: "street",
        crossStreet: "crossStreet",
        streetNumber: "streetNumber",
        routeNumbers: [],
        streetName: "streetName",
        streetNameAndNumber: "streetNameAndNumber",
        municipality: "municipality",
        municipalitySubdivision: "municipalitySubdivision",
        countryTertiarySubdivision: "countryTertiarySubdivision",
        countrySecondarySubdivision: "countrySecondarySubdivision",
        countrySubdivision: "countrySubdivision",
        postalCode: "postalCode",
        extendedPostalCode: "extendedPostalCode",
        countryCode: "countryCode",
        country: "country",
        countryCodeISO3: "countryCodeISO3",
        freeformAddress: "freeformAddress",
        countrySubdivisionName: "countrySecondarySubdivision",
        localName: "localName",
        boundingBox: bboxCompass,
      };
      const expectedAddress: Address = {
        ...internalAddr,
        boundingBox: mapBoundingBoxFromCompassNotation(bboxCompass),
      };
      assert.deepEqual(mapAddress(internalAddr), expectedAddress);
    });
    it("should not include undefined properties", () => {
      const internalAddr: AddressInternal = {
        buildingNumber: "buildingNumber",
        crossStreet: "crossStreet",
        streetNumber: undefined,
      };
      const expectedAddress = {
        buildingNumber: "buildingNumber",
        crossStreet: "crossStreet",
      };
      assert.deepEqual(mapAddress(internalAddr), expectedAddress);
    });
    it("should return undefined if the input is also undefined", () => {
      assert.isUndefined(mapAddress(undefined));
    });
  });
  describe("mapSearchAddressResult", () => {
    it("should transform an internal search address result to custom result object", () => {
      const internalResult: SearchAddressResultInternal = {
        summary: {
          query: "15127 98052 ne redmond wa",
          queryType: "NON_NEAR",
          numResults: 1,
          geoBias: {
            lat: 47.301293179130347,
            lon: -120.88247999999997,
          },
        },
        results: [
          {
            type: "Point Address",
            score: 8.074,
            position: {
              lat: 47.6308,
              lon: -122.1385,
            },
            viewport: {
              topLeft: {
                lat: 47.6317,
                lon: -122.13983,
              },
              bottomRight: {
                lat: 47.6299,
                lon: -122.13717,
              },
            },
          },
        ],
      };

      const expectedResult: SearchAddressResult = {
        query: "15127 98052 ne redmond wa",
        queryType: "NON_NEAR",
        numResults: 1,
        geoBias: {
          latitude: 47.301293179130347,
          longitude: -120.88247999999997,
        },
        results: [
          {
            type: "Point Address",
            score: 8.074,
            position: {
              latitude: 47.6308,
              longitude: -122.1385,
            },
            viewport: {
              topLeft: {
                latitude: 47.6317,
                longitude: -122.13983,
              },
              bottomRight: {
                latitude: 47.6299,
                longitude: -122.13717,
              },
            },
          },
        ],
      };

      assert.deepEqual(mapSearchAddressResult(internalResult), expectedResult);
    });
  });
  describe("removeUndefinedProperties", () => {
    it("should remove undefined properties of an object", () => {
      const obj: Record<string, any> = {
        prop1: 5,
        prop2: "text",
        prop3: undefined,
      };
      const convertedObj = removeUndefinedProperties(obj);
      assert.hasAllKeys(convertedObj, ["prop1", "prop2"]);
      assert.doesNotHaveAnyKeys(convertedObj, ["prop3"]);
    });
  });
  describe("mapReverseSearchAddressResult", () => {
    it("should transform an internal reverse search address result to custom result object", () => {
      const internalResult: ReverseSearchAddressResultInternal = {
        summary: { queryTime: 100, numResults: 10 },
        addresses: [
          {
            roadUse: [],
            matchType: KnownMatchType.Street,
            address: { country: "Japan" },
            position: "60.12,120.34",
          },
        ],
      };

      const expectedResult: ReverseSearchAddressResult = {
        queryTime: 100,
        numResults: 10,
        results: [
          {
            roadUse: [],
            matchType: KnownMatchType.Street,
            address: { country: "Japan" },
            position: { latitude: 60.12, longitude: 120.34 },
          },
        ],
      };

      assert.deepEqual(mapReverseSearchAddressResult(internalResult), expectedResult);
    });
  });
  describe("mapReverseSearchCrossStreetAddressResult", () => {
    it("should transform an internal reverse search cross street address result to custom result object", () => {
      const internalResult: ReverseSearchCrossStreetAddressResultInternal = {
        summary: { queryTime: 100, numResults: 10 },
        addresses: [
          {
            address: { country: "Japan" },
            position: "60.12,120.34",
          },
        ],
      };

      const expectedResult: ReverseSearchCrossStreetAddressResult = {
        queryTime: 100,
        numResults: 10,
        results: [
          {
            address: { country: "Japan" },
            position: { latitude: 60.12, longitude: 120.34 },
          },
        ],
      };

      assert.deepEqual(mapReverseSearchCrossStreetAddressResult(internalResult), expectedResult);
    });
  });
  describe("mapSearchAddressBatchResult", () => {
    it("should transform an internal search address batch result to custom result object", () => {
      const searchAddressBatchResult: SearchAddressBatchResult = {
        batchSummary: { successfulRequests: 2, totalRequests: 3 },
        batchItems: [
          {
            statusCode: 200,
            response: {
              summary: { numResults: 1, query: "one microsoft way redmond wa 98052" },
              results: [{ position: { lat: 47.63989, lon: -122.12509 } }],
            },
          },
          {
            statusCode: 200,
            response: {
              summary: { numResults: 2, query: "pike pl seattle wa 98101" },
              results: [{ position: { lat: 47.60963, lon: -122.34215 } }],
            },
          },
          { statusCode: 400, response: { error: { code: "400 BadRequest" } } },
        ],
      };

      const expectedResult: BatchResult<SearchAddressResult> = {
        successfulRequests: 2,
        totalRequests: 3,
        batchItems: [
          {
            statusCode: 200,
            response: {
              numResults: 1,
              query: "one microsoft way redmond wa 98052",
              results: [{ position: { latitude: 47.63989, longitude: -122.12509 } }],
            },
          },
          {
            statusCode: 200,
            response: {
              numResults: 2,
              query: "pike pl seattle wa 98101",
              results: [{ position: { latitude: 47.60963, longitude: -122.34215 } }],
            },
          },
          { statusCode: 400, response: { error: { code: "400 BadRequest" } } },
        ],
      };

      assert.deepEqual(mapSearchAddressBatchResult(searchAddressBatchResult), expectedResult);
    });
  });
  describe("mapReverseSearchAddressBatchResult", () => {
    it("should transform an internal reverse search address batch result to custom result object", () => {
      const searchAddressBatchResult: ReverseSearchAddressBatchResult = {
        batchSummary: { successfulRequests: 2, totalRequests: 3 },
        batchItems: [
          {
            statusCode: 200,
            response: {
              summary: { queryTime: 11 },
              addresses: [
                {
                  address: {
                    country: "France",
                    freeformAddress: "Avenue Anatole France, 75007 Paris",
                  },
                  position: "48.858490,2.294820",
                },
              ],
            },
          },
          { statusCode: 400, response: { error: { code: "400 BadRequest" } } },
        ],
      };

      const expectedResult: BatchResult<ReverseSearchAddressResult> = {
        successfulRequests: 2,
        totalRequests: 3,
        batchItems: [
          {
            statusCode: 200,
            response: {
              queryTime: 11,
              results: [
                {
                  address: {
                    country: "France",
                    freeformAddress: "Avenue Anatole France, 75007 Paris",
                  },
                  position: { latitude: 48.85849, longitude: 2.29482 },
                },
              ],
            },
          },
          { statusCode: 400, response: { error: { code: "400 BadRequest" } } },
        ],
      };

      assert.deepEqual(
        mapReverseSearchAddressBatchResult(searchAddressBatchResult),
        expectedResult
      );
    });
  });
  describe("createFuzzySearchBatchRequest", () => {
    it("should properly transform the request objects to query strings", () => {
      const query = "pizza";
      const coordinates = { latitude: 47.59118, longitude: -122.3327 };
      const countryFilter = ["fr", "us"];
      const options1: FuzzySearchOptions = {
        entityType: KnownGeographicEntityType.Country,
        minFuzzyLevel: 1,
        maxFuzzyLevel: 1,
        indexFilter: [KnownSearchIndexes.Address, KnownSearchIndexes.Streets],
      };
      const options2: FuzzySearchOptions = {
        operatingHours: KnownOperatingHoursRange.NextSevenDays,
        categoryFilter: [7315025, 7315017],
        brandFilter: ["Foo", "Bar"],
      };
      const options3: FuzzySearchOptions = {
        electricVehicleConnectorFilter: [
          KnownElectricVehicleConnector.IEC62196Type1CCS,
          KnownElectricVehicleConnector.IEC62196Type3,
        ],
        isTypeAhead: false,
        radiusInMeters: 5000,
      };
      const options4: FuzzySearchOptions = {
        boundingBox: {
          topLeft: { latitude: 47.59118, longitude: -122.3327 },
          bottomRight: { latitude: 45.59118, longitude: -121.3327 },
        },
        top: 10,
        skip: 3,
      };
      const options5: FuzzySearchOptions = {
        language: "en-US",
        extendedPostalCodesFor: [KnownSearchIndexes.Address, KnownSearchIndexes.PointAddresses],
        localizedMapView: "Auto",
      };
      const options6: FuzzySearchOptions = {
        indexFilter: [],
        categoryFilter: [],
        brandFilter: undefined,
        electricVehicleConnectorFilter: undefined,
      };
      const queries: FuzzySearchRequest[] = [
        { searchQuery: { query: query, coordinates: coordinates } },
        { searchQuery: { query: query, countryFilter: countryFilter } },
        { searchQuery: { query: query, coordinates: coordinates, countryFilter: countryFilter } },
        { searchQuery: { query: query, coordinates }, options: options1 },
        { searchQuery: { query: query, coordinates }, options: options2 },
        { searchQuery: { query: query, coordinates }, options: options3 },
        { searchQuery: { query: query, coordinates }, options: options4 },
        { searchQuery: { query: query, coordinates }, options: options5 },
        { searchQuery: { query: query, coordinates }, options: options6 },
      ];
      const expectedBatchRequest: BatchRequest = {
        batchItems: [
          {
            query: "?query=pizza&lat=47.59118&lon=-122.3327",
          },
          {
            query: "?query=pizza&countrySet=fr,us",
          },
          {
            query: "?query=pizza&lat=47.59118&lon=-122.3327&countrySet=fr,us",
          },
          {
            query:
              "?query=pizza&lat=47.59118&lon=-122.3327&entityType=Country&minFuzzyLevel=1&maxFuzzyLevel=1&idxSet=Addr,Str",
          },
          {
            query:
              "?query=pizza&lat=47.59118&lon=-122.3327&openingHours=nextSevenDays&categorySet=7315025,7315017&brandSet=Foo,Bar",
          },
          {
            query:
              "?query=pizza&lat=47.59118&lon=-122.3327&connectorSet=IEC62196Type1CCS,IEC62196Type3&typeahead=false&radius=5000",
          },
          {
            query:
              "?query=pizza&lat=47.59118&lon=-122.3327&topLeft=47.59118,-122.3327&btmRight=45.59118,-121.3327&limit=10&ofs=3",
          },
          {
            query:
              "?query=pizza&lat=47.59118&lon=-122.3327&language=en-US&extendedPostalCodesFor=Addr,PAD&view=Auto",
          },
          { query: "?query=pizza&lat=47.59118&lon=-122.3327" },
        ],
      };
      const actualBatchRequest = createFuzzySearchBatchRequest(queries);

      assert.deepEqual(actualBatchRequest, expectedBatchRequest);
    });
  });
  describe("createSearchAddressBatchRequest", () => {
    it("should properly transform the request objects to query strings", () => {
      const query = "Paris";
      const options1: SearchAddressOptions = {
        entityType: KnownGeographicEntityType.Country,
        countryFilter: ["fr", "us"],
        coordinates: { latitude: 47.59118, longitude: -122.3327 },
        isTypeAhead: false,
        radiusInMeters: 5000,
      };
      const options2: SearchAddressOptions = {
        boundingBox: {
          topLeft: { latitude: 47.59118, longitude: -122.3327 },
          bottomRight: { latitude: 45.59118, longitude: -121.3327 },
        },
        top: 10,
        skip: 3,
      };
      const options3: SearchAddressOptions = {
        language: "en-US",
        extendedPostalCodesFor: [KnownSearchIndexes.Address, KnownSearchIndexes.PointAddresses],
        localizedMapView: "Auto",
      };
      const options4: SearchAddressOptions = {
        countryFilter: [],
        coordinates: undefined,
        boundingBox: undefined,
        extendedPostalCodesFor: undefined,
        localizedMapView: "Auto",
      };
      const queries: SearchAddressRequest[] = [
        { query: query },
        { query: query, options: options1 },
        { query: query, options: options2 },
        { query: query, options: options3 },
        { query: query, options: options4 },
      ];
      const expectedBatchRequest: BatchRequest = {
        batchItems: [
          { query: "?query=Paris" },
          {
            query:
              "?query=Paris&entityType=Country&countrySet=fr,us&lat=47.59118&lon=-122.3327&typeahead=false&radius=5000",
          },
          {
            query:
              "?query=Paris&topLeft=47.59118,-122.3327&btmRight=45.59118,-121.3327&limit=10&ofs=3",
          },
          { query: "?query=Paris&language=en-US&extendedPostalCodesFor=Addr,PAD&view=Auto" },
          { query: "?query=Paris&view=Auto" },
        ],
      };
      const actualBatchRequest = createSearchAddressBatchRequest(queries);

      assert.deepEqual(actualBatchRequest, expectedBatchRequest);
    });
  });
  describe("createReverseSearchAddressBatchRequest", () => {
    it("should properly transform the request objects to query strings", () => {
      const coordinates = { latitude: 60.12, longitude: -100.34 };
      const options1: ReverseSearchAddressOptions = {
        radiusInMeters: 5000,
        language: "en-US",
        localizedMapView: "Auto",
        heading: 0,
        entityType: KnownGeographicEntityType.Country,
      };
      const options2: ReverseSearchAddressOptions = {
        includeSpeedLimit: false,
        allowFreeformNewline: false,
        includeMatchType: false,
      };
      const options3: ReverseSearchAddressOptions = {
        includeRoadUse: true,
        roadUse: [KnownRoadUseType.Arterial, KnownRoadUseType.Ramp],
      };
      const options4: ReverseSearchAddressOptions = {
        radiusInMeters: 5000,
        entityType: undefined,
        includeRoadUse: true,
        roadUse: [],
      };
      const queries: ReverseSearchAddressRequest[] = [
        { coordinates: coordinates },
        { coordinates: coordinates, options: options1 },
        { coordinates: coordinates, options: options2 },
        { coordinates: coordinates, options: options3 },
        { coordinates: coordinates, options: options4 },
      ];
      const expectedBatchRequest: BatchRequest = {
        batchItems: [
          { query: "?query=60.12,-100.34" },
          {
            query:
              "?query=60.12,-100.34&radius=5000&language=en-US&view=Auto&heading=0&entityType=Country",
          },
          {
            query:
              "?query=60.12,-100.34&returnSpeedLimit=false&allowFreeformNewline=false&returnMatchType=false",
          },
          { query: "?query=60.12,-100.34&returnRoadUse=true&roadUse=Arterial,Ramp" },
          { query: "?query=60.12,-100.34&radius=5000&returnRoadUse=true" },
        ],
      };
      const actualBatchRequest = createReverseSearchAddressBatchRequest(queries);

      assert.deepEqual(actualBatchRequest, expectedBatchRequest);
    });
  });
});

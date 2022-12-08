// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Address,
  BatchResult,
  BoundingBox,
  FuzzySearchBaseOptions,
  FuzzySearchOptions,
  FuzzySearchRequest,
  LatLon,
  ReverseSearchAddressOptions,
  ReverseSearchAddressRequest,
  ReverseSearchAddressResult,
  ReverseSearchCrossStreetAddressResult,
  SearchAddressBaseOptions,
  SearchAddressOptions,
  SearchAddressRequest,
  SearchAddressResult,
  SearchBaseOptions,
  SearchExtraFilterOptions,
  SearchNearbyPointOfInterestOptions,
  SearchPointOfInterestBaseOptions,
  SearchPointOfInterestOptions,
} from "../../src";
import {
  Address as AddressInternal,
  BatchRequest,
  SearchFuzzySearchOptionalParams as FuzzySearchOptionalParams,
  KnownElectricVehicleConnector,
  KnownGeographicEntityType,
  KnownMatchType,
  KnownOperatingHoursRange,
  KnownRoadUseType,
  KnownSearchIndexes,
  ReverseSearchAddressBatchItemResponse,
  ReverseSearchAddressBatchResult,
  ReverseSearchAddressResult as ReverseSearchAddressResultInternal,
  ReverseSearchCrossStreetAddressResult as ReverseSearchCrossStreetAddressResultInternal,
  SearchAddressBatchItemResponse,
  SearchAddressBatchResult,
  SearchSearchAddressOptionalParams as SearchAddressOptionalParams,
  SearchAddressResult as SearchAddressResultInternal,
  SearchSearchPointOfInterestOptionalParams as SearchPointOfInterestOptionalParams,
} from "../../src/generated/models";
import {
  BoundingBoxCompassNotation,
  BoundingBox as BoundingBoxInternal,
  LatLongPairAbbreviated,
} from "../../src/generated";
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
  toBoundingBox,
  toLatLonString,
} from "../../src/models/mappers";
import { OperationOptions } from "@azure/core-client";
import { assert } from "chai";

describe("LatLon/BoundingBox mappers", () => {
  describe("toLatLonString", () => {
    it("should serialize properly", () => {
      const latLon: LatLon = [45.2, 120.3];

      assert.equal(toLatLonString(latLon), "45.2,120.3");
    });
  });

  describe("mapLatLongPairAbbreviatedToLatLon", () => {
    it("should convert LatLongPairAbbreviated to LatLong correctly", () => {
      const latLongAbbr: LatLongPairAbbreviated = {
        lat: 45.2,
        lon: 120.3,
      };
      const latLon = mapLatLongPairAbbreviatedToLatLon(latLongAbbr);

      assert.isNotNull(latLon);
      assert.equal(latLongAbbr.lat, latLon[0]);
      assert.equal(latLongAbbr.lon, latLon[1]);
    });
  });

  describe("mapStringToLatLon", () => {
    it("should deserialize lat-lon string", () => {
      const latLon = mapStringToLatLon("45.2,120.3");

      assert.isNotNull(latLon);
      assert.equal(latLon[0], 45.2);
      assert.equal(latLon[1], 120.3);
    });

    it("should throw error if the input string is invalid", () => {
      assert.throw(() => mapStringToLatLon("123"), /Failed to deserialize LatLon string./);
    });
  });

  describe("toBoundingBox", () => {
    it("should create a BondingBox object", () => {
      const topLeft: LatLon = [45.2, 12.3];
      const bottomRight: LatLon = [45.1, 120.4];
      const bbox = toBoundingBox(topLeft, bottomRight);

      assert.hasAllKeys(bbox, ["topLeft", "bottomRight"]);
      assert.deepEqual(bbox.topLeft, topLeft);
      assert.deepEqual(bbox.bottomRight, bottomRight);
    });
  });

  describe("mapBoundingBox", () => {
    const topLeft: LatLongPairAbbreviated = { lat: 45.2, lon: 12.3 };
    const bottomRight: LatLongPairAbbreviated = { lat: 45.1, lon: 120.4 };

    it("should convert an internal bounding box to a BondingBox object", () => {
      const concreteBbox: BoundingBoxInternal = {
        topLeft: topLeft,
        bottomRight: bottomRight,
      };
      const bbox = mapBoundingBox(concreteBbox) as BoundingBox;
      assert.hasAllKeys(bbox, ["topLeft", "bottomRight"]);
      assert.isDefined(bbox.topLeft);
      assert.isDefined(bbox.bottomRight);
    });
  });

  describe("mapBoundingBoxFromCompassNotation", () => {
    const northEast = "45.2,12.4";
    const southWest = "45.1,12.3";

    it("should convert an internal bounding box to a BondingBox object", () => {
      const concreteBbox: BoundingBoxCompassNotation = {
        northEast: northEast,
        southWest: southWest,
      };
      const bbox = mapBoundingBoxFromCompassNotation(concreteBbox) as BoundingBox;
      assert.hasAllKeys(bbox, ["topLeft", "bottomRight"]);
      assert.isDefined(bbox.topLeft);
      assert.isDefined(bbox.bottomRight);
      assert.equal(bbox.topLeft[0], 45.2);
      assert.equal(bbox.topLeft[1], 12.3);
      assert.equal(bbox.bottomRight[0], 45.1);
      assert.equal(bbox.bottomRight[1], 12.4);
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
    "countryCodeFilter",
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
        coordinates: [50, 100],
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
          bottomRight: [60, 50],
          topLeft: [61, 49],
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
          bottomRight: [60, 50],
          topLeft: [61, 49],
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
  });
  describe("mapSearchAddressResult", () => {
    it("should transform an internal search address result to custom result object", () => {
      const internalResult: SearchAddressResultInternal = {
        summary: {
          query: "15127 98052 ne redmond wa",
          queryType: "NON_NEAR",
          queryTime: 100,
          numResults: 1,
          geoBias: {
            lat: 47.301293179130347,
            lon: -120.88247999999997,
          },
        },
        results: [
          {
            type: "Point Address",
            id: "id",
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
            address: {
              streetName: "street name",
              municipality: "municipality",
              countryCode: "countryCode",
              country: "country",
              countryCodeISO3: "countryCodeISO3",
              freeformAddress: "freeformAddress",
            },
          },
        ],
      };

      const expectedResult: SearchAddressResult = {
        query: "15127 98052 ne redmond wa",
        queryType: "NON_NEAR",
        queryTime: 100,
        numberResults: 1,
        geoBias: [47.301293179130347, -120.88247999999997],
        results: [
          {
            type: "Point Address",
            id: "id",
            score: 8.074,
            position: [47.6308, -122.1385],
            viewport: {
              topLeft: [47.6317, -122.13983],
              bottomRight: [47.6299, -122.13717],
            },
            address: {
              streetName: "street name",
              municipality: "municipality",
              countryCode: "countryCode",
              country: "country",
              countryCodeISO3: "countryCodeISO3",
              freeformAddress: "freeformAddress",
            },
          },
        ],
      };

      assert.deepEqual(mapSearchAddressResult(internalResult), expectedResult);
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
            address: {
              country: "Japan",
              countryCode: "JP",
              countryCodeISO3: "JPN",
              freeformAddress: "Matsuyama, Shikoku",
              municipality: "Matsuyama",
              boundingBox: {
                northEast: "33.583073,133.356155",
                southWest: "33.561634,133.309204",
                entity: "position",
              },
            },
            position: "33.56,133.35",
          },
        ],
      };

      const expectedResult: ReverseSearchAddressResult = {
        queryTime: 100,
        numberResults: 10,
        results: [
          {
            roadUse: [],
            matchType: KnownMatchType.Street,
            address: {
              country: "Japan",
              countryCode: "JP",
              countryCodeISO3: "JPN",
              freeformAddress: "Matsuyama, Shikoku",
              municipality: "Matsuyama",
              boundingBox: {
                topLeft: [33.583073, 133.309204],
                bottomRight: [33.561634, 133.356155],
              },
            },
            position: [33.56, 133.35],
          },
        ],
      };

      assert.deepEqual(mapReverseSearchAddressResult(internalResult), expectedResult);
    });
  });
  describe("mapReverseSearchCrossStreetAddressResult", () => {
    it("should transform an internal reverse search cross street address result to custom result object", () => {
      const internalResult: ReverseSearchCrossStreetAddressResultInternal = {
        summary: { queryTime: 100, numResults: 1 },
        addresses: [
          {
            address: {
              streetName: "Sarphatistraat & Frederiksplein",
              crossStreet: "Sarphatistraat",
              municipality: "Amsterdam",
              countryCode: "NL",
              country: "Nederland",
              countryCodeISO3: "NLD",
              freeformAddress: "Sarphatistraat & Frederiksplein, 1017 Amsterdam",
            },
            position: "52.36,4.90",
          },
        ],
      };

      const expectedResult: ReverseSearchCrossStreetAddressResult = {
        queryTime: 100,
        numberResults: 1,
        results: [
          {
            address: {
              streetName: "Sarphatistraat & Frederiksplein",
              crossStreet: "Sarphatistraat",
              municipality: "Amsterdam",
              countryCode: "NL",
              country: "Nederland",
              countryCodeISO3: "NLD",
              freeformAddress: "Sarphatistraat & Frederiksplein, 1017 Amsterdam",
            },
            position: [52.36, 4.9],
          },
        ],
      };

      assert.deepEqual(mapReverseSearchCrossStreetAddressResult(internalResult), expectedResult);
    });
  });
  describe("mapSearchAddressBatchResult", () => {
    it("should transform an internal search address batch result to custom result object", () => {
      const searchAddressBatchResult: SearchAddressBatchResult = {
        batchSummary: { totalSuccessfulRequests: 2, totalRequests: 3 },
        batchItems: [
          {
            statusCode: 200,
            response: {
              summary: {
                numResults: 1,
                query: "one microsoft way redmond wa 98052",
                queryTime: 100,
              },
              results: [
                {
                  type: "Street",
                  id: "id",
                  score: 10.22519207,
                  viewport: {
                    topLeft: {
                      lat: 47.64016,
                      lon: -122.12466,
                    },
                    bottomRight: {
                      lat: 47.64012,
                      lon: -122.12424,
                    },
                  },
                  address: {
                    streetName: "Microsoft Way",
                    municipality: "Redmond",
                    countryCode: "US",
                    country: "United States",
                    countryCodeISO3: "USA",
                    freeformAddress: "Microsoft Way, Redmond, WA 98052",
                    localName: "Redmond",
                  },
                  position: { lat: 47.64016, lon: -122.1245 },
                },
              ],
            },
          },
          {
            statusCode: 400,
            response: {
              error: {
                code: "400 BadRequest",
                message:
                  "Bad request: one or more parameters were incorrectly specified or are mutually exclusive.",
              },
            } as SearchAddressBatchItemResponse,
          },
        ],
      };

      const expectedResult: BatchResult<SearchAddressResult> = {
        totalSuccessfulRequests: 2,
        totalRequests: 3,
        batchItems: [
          {
            statusCode: 200,
            response: {
              numberResults: 1,
              query: "one microsoft way redmond wa 98052",
              queryTime: 100,
              results: [
                {
                  type: "Street",
                  id: "id",
                  score: 10.22519207,
                  viewport: {
                    topLeft: [47.64016, -122.12466],
                    bottomRight: [47.64012, -122.12424],
                  },
                  address: {
                    streetName: "Microsoft Way",
                    municipality: "Redmond",
                    countryCode: "US",
                    country: "United States",
                    countryCodeISO3: "USA",
                    freeformAddress: "Microsoft Way, Redmond, WA 98052",
                    localName: "Redmond",
                  },

                  position: [47.64016, -122.1245],
                },
              ],
            },
          },
          {
            statusCode: 400,
            response: {
              error: {
                code: "400 BadRequest",
                message:
                  "Bad request: one or more parameters were incorrectly specified or are mutually exclusive.",
              },
            },
          },
        ],
      };

      assert.deepEqual(mapSearchAddressBatchResult(searchAddressBatchResult), expectedResult);
    });
  });
  describe("mapReverseSearchAddressBatchResult", () => {
    it("should transform an internal reverse search address batch result to custom result object", () => {
      const searchAddressBatchResult: ReverseSearchAddressBatchResult = {
        batchSummary: { totalSuccessfulRequests: 2, totalRequests: 3 },
        batchItems: [
          {
            statusCode: 200,
            response: {
              summary: {
                queryTime: 7,
                numResults: 1,
              },
              addresses: [
                {
                  address: {
                    municipality: "Paris",
                    country: "France",
                    countryCode: "FR",
                    countryCodeISO3: "FRA",
                    freeformAddress: "Avenue Anatole France, 75007 Paris",
                  },
                  position: "48.858490,2.294820",
                },
              ],
            },
          },
          {
            statusCode: 400,
            response: {
              error: {
                code: "400 BadRequest",
                message:
                  "Bad request: one or more parameters were incorrectly specified or are mutually exclusive.",
              },
            } as ReverseSearchAddressBatchItemResponse,
          },
        ],
      };

      const expectedResult: BatchResult<ReverseSearchAddressResult> = {
        totalSuccessfulRequests: 2,
        totalRequests: 3,
        batchItems: [
          {
            statusCode: 200,
            response: {
              queryTime: 7,
              numberResults: 1,
              results: [
                {
                  address: {
                    municipality: "Paris",
                    country: "France",
                    countryCode: "FR",
                    countryCodeISO3: "FRA",
                    freeformAddress: "Avenue Anatole France, 75007 Paris",
                  },
                  position: [48.85849, 2.29482],
                },
              ],
            },
          },
          {
            statusCode: 400,
            response: {
              error: {
                code: "400 BadRequest",
                message:
                  "Bad request: one or more parameters were incorrectly specified or are mutually exclusive.",
              },
            },
          },
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
      const coordinates: LatLon = [47.59118, -122.3327];
      const countryCodeFilter = ["fr", "us"];
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
          topLeft: [47.59118, -122.3327],
          bottomRight: [45.59118, -121.3327],
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
        { searchQuery: { query: query, countryCodeFilter: countryCodeFilter } },
        {
          searchQuery: {
            query: query,
            coordinates: coordinates,
            countryCodeFilter: countryCodeFilter,
          },
        },
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
        countryCodeFilter: ["fr", "us"],
        coordinates: [47.59118, -122.3327],
        isTypeAhead: false,
        radiusInMeters: 5000,
      };
      const options2: SearchAddressOptions = {
        boundingBox: {
          topLeft: [47.59118, -122.3327],
          bottomRight: [45.59118, -121.3327],
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
        countryCodeFilter: [],
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
      const coordinates: LatLon = [60.12, -100.34];
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

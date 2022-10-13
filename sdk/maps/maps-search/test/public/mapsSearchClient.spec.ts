// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context, Suite } from "mocha";
import {
  FuzzySearchRequest,
  GeoJsonCircleOrPolygonFeatureCollection,
  GeoJsonLineString,
  GeoJsonPolygon,
  GeoJsonPolygonCollection,
  KnownSearchAddressResultType,
  ReverseSearchAddressRequest,
  SearchAddressResultItem,
} from "../../src";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert, use as chaiUse } from "chai";
import { createClient, createRecorder, testLogger } from "./utils/createClient";
import { MapsSearchClient } from "src/mapsSearchClient";
import chaiPromises from "chai-as-promised";

chaiUse(chaiPromises);

describe("Endpoint can be overwritten", function (this: Suite) {
  let recorder: Recorder;
  const fastTimeout = 10000;

  beforeEach(async function (this: Context) {
    testLogger.verbose(`Recorder: starting...`);
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    testLogger.verbose(`Recorder: stopping...`);
    await recorder.stop();
  });

  before(function (this: Context) {
    this.timeout(fastTimeout);
  });

  it("should be executed without specifying endpoint", async function () {
    const client = createClient(recorder.configureClientOptions({}));
    const geometries = await client.getGeometries(["8bceafe8-3d98-4445-b29b-fd81d3e9adf5"]);
    assert.isOk(geometries);
  });

  it("should be executed with different endpoint", async function () {
    const client = createClient(
      recorder.configureClientOptions({ endpoint: "https://us.atlas.microsoft.com/" })
    );
    const geometries = await client.getGeometries(["8bceafe8-3d98-4445-b29b-fd81d3e9adf5"]);
    assert.isOk(geometries);
  });
});

describe("Get Geometries", function (this: Suite) {
  let recorder: Recorder;
  let client: MapsSearchClient;
  const fastTimeout = 10000;

  beforeEach(async function (this: Context) {
    testLogger.verbose(`Recorder: starting...`);
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    testLogger.verbose(`Recorder: stopping...`);
    await recorder.stop();
  });

  before(function (this: Context) {
    this.timeout(fastTimeout);
  });

  it("should accept string array and return geometries", async function () {
    const geometryId: string[] = [
      "8bceafe8-3d98-4445-b29b-fd81d3e9adf5",
      "00005858-5800-1200-0000-0000773670cd",
    ];
    const geometries = await client.getGeometries(geometryId);
    assert.equal(geometries.length, geometryId.length);
    geometries.forEach((g) => assert.ok(g.geometryData));
  });

  it("throw error on empty geometryIds array", async function () {
    return assert.isRejected(client.getGeometries([]), /geometryIds must be a non-empty array/);
  });

  it("return undefined geometryData if geometry id is invalid", async function () {
    const geometryIds: string[] = ["invalid-geometry-id"];
    const geometries = await client.getGeometries(geometryIds);
    assert.isUndefined(geometries[0].geometryData);
  });
});

describe("Get Point Of Interest Categories", function (this: Suite) {
  let recorder: Recorder;
  let client: MapsSearchClient;
  const fastTimeout = 10000;

  beforeEach(async function (this: Context) {
    testLogger.verbose(`Recorder: starting...`);
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    testLogger.verbose(`Recorder: stopping...`);
    await recorder.stop();
  });

  before(function (this: Context) {
    this.timeout(fastTimeout);
  });

  it("return a list of POI categories", async function () {
    const poiCategories = await client.getPointOfInterestCategories();
    assert.isAtLeast(poiCategories.length, 1);
    poiCategories.forEach((poiCategory) => {
      assert.isFinite(poiCategory.id);
      assert.isString(poiCategory.name);
      assert.hasAllKeys(poiCategory, ["id", "name", "childIds", "synonyms"]);
    });
  });
});

describe("Geocoding", function (this: Suite) {
  let recorder: Recorder;
  let client: MapsSearchClient;
  const fastTimeout = 10000;

  beforeEach(async function (this: Context) {
    testLogger.verbose(`Recorder: starting...`);
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    testLogger.verbose(`Recorder: stopping...`);
    await recorder.stop();
  });

  before(function (this: Context) {
    this.timeout(fastTimeout);
  });

  const expectedTypes = [
    KnownSearchAddressResultType.Street,
    KnownSearchAddressResultType.Geography,
    KnownSearchAddressResultType.PointAddress,
    KnownSearchAddressResultType.AddressRange,
    KnownSearchAddressResultType.CrossStreet,
  ];
  const nonExpectedTypes = [KnownSearchAddressResultType.POI];

  function assertGeocodingResults(results: SearchAddressResultItem[]): void {
    assert.isNotEmpty(results);
    results.forEach((r) => {
      // Could be any types except POI
      assert.oneOf(r.type, expectedTypes);
      assert.notInclude(nonExpectedTypes, r.type);
      // Has valid score
      assert.isFinite(r.score);
    });
  }

  describe("#searchAddress", function () {
    it("should throw error if query is empty", async function () {
      // "query is missing or empty"
      return assert.isRejected(client.searchAddress(""));
    });

    it("should return non-empty results", async function () {
      const searchResult = await client.searchAddress("pizza");
      assertGeocodingResults(searchResult.results);
    });
  });

  describe("#searchStructuredAddress", function () {
    it("throw error if query contains invalid countryCode", async function () {
      const structuredAddress = {
        countryCode: "",
      };
      // "Missing or invalid countryCode parameter"
      assert.isRejected(client.searchStructuredAddress(structuredAddress));
    });

    it("return non-empty results", async function () {
      const structuredAddress = {
        countryCode: "US",
        streetNumber: "15127",
        streetName: "NE 24th Street",
        municipality: "Redmond",
        countrySubdivision: "WA",
        postalCode: "98052",
      };
      const searchResult = await client.searchStructuredAddress(structuredAddress);
      assertGeocodingResults(searchResult.results);
    });
  });
});

describe("Reverse Search Address", function (this: Suite) {
  let recorder: Recorder;
  let client: MapsSearchClient;
  const fastTimeout = 10000;

  beforeEach(async function (this: Context) {
    testLogger.verbose(`Recorder: starting...`);
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    testLogger.verbose(`Recorder: stopping...`);
    await recorder.stop();
  });

  before(function (this: Context) {
    this.timeout(fastTimeout);
  });

  it("should throw error is query is invalid", async function () {
    // "The provided coordinates in query are invalid, out of range, or not in the expected format"
    assert.isRejected(client.reverseSearchAddress([-100, 121]));
    assert.isRejected(client.reverseSearchAddress([25, 250]));
  });

  it("should return non-empty results", async function () {
    const searchResult = await client.reverseSearchAddress([25, 121]);
    assert.isNotEmpty(searchResult.results);
    searchResult.results.forEach((r) => {
      assert.isString(r.address.streetName);
    });
  });
});

describe("Reverse Search Cross Street Address", function (this: Suite) {
  let recorder: Recorder;
  let client: MapsSearchClient;
  const fastTimeout = 10000;

  beforeEach(async function (this: Context) {
    testLogger.verbose(`Recorder: starting...`);
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    testLogger.verbose(`Recorder: stopping...`);
    await recorder.stop();
  });

  before(function (this: Context) {
    this.timeout(fastTimeout);
  });

  it("should throw error if query is invalid", async function () {
    // "The provided coordinates in query are invalid, out of range, or not in the expected format"
    assert.isRejected(client.reverseSearchCrossStreetAddress([-100, 121]));
    assert.isRejected(client.reverseSearchCrossStreetAddress([25, 250]));
  });

  it("should return non-empty results", async function () {
    const searchResult = await client.reverseSearchCrossStreetAddress([47.59118, -122.3327]);
    assert.isNotEmpty(searchResult);
    searchResult.results.forEach((r) => {
      assert.isString(r.address?.crossStreet);
    });
  });
});

describe("POI search", function (this: Suite) {
  let recorder: Recorder;
  let client: MapsSearchClient;
  const fastTimeout = 10000;

  beforeEach(async function (this: Context) {
    testLogger.verbose(`Recorder: starting...`);
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    testLogger.verbose(`Recorder: stopping...`);
    await recorder.stop();
  });

  before(function (this: Context) {
    this.timeout(fastTimeout);
  });

  const expectedType = KnownSearchAddressResultType.POI;
  function assertPOISearchResults(results: SearchAddressResultItem[]): void {
    assert.isNotEmpty(results);
    results.forEach((r) => {
      // Could be any types except POI
      assert.equal(r.type, expectedType);
      // Has valid score
      assert.isFinite(r.score);
    });
  }

  describe("#SearchPointOfInterest", function () {
    it("should throw errors if the options is not valid", async function () {
      // "query is missing or empty"
      assert.isRejected(
        client.searchPointOfInterest({
          query: "",
          coordinates: [25, 121],
        })
      );
      // "Bad request: one or more parameters were incorrectly specified or are mutually exclusive."
      assert.isRejected(
        client.searchPointOfInterest({
          query: "juice bars",
          coordinates: [-200, 121],
        })
      );
    });

    it("should return non-empty results", async function () {
      const searchResult = await client.searchPointOfInterest({
        query: "juice bars",
        coordinates: [47.606038, -122.333345],
      });
      assertPOISearchResults(searchResult.results);
    });
  });

  describe("#SearchNearbyPointOfInterest", function () {
    it("should throw errors if LatLon is not valid", async function () {
      assert.isRejected(client.searchNearbyPointOfInterest([-200, 121]));
    });

    it("should return non-empty results", async function () {
      const searchResult = await client.searchNearbyPointOfInterest([47.606038, -122.333345]);
      assertPOISearchResults(searchResult.results);
    });
  });

  describe("#SearchPointOfInterestCategory", function () {
    it("should throw errors if the options is not valid", async function () {
      // "query is missing or empty"
      assert.isRejected(
        client.searchPointOfInterestCategory({
          query: "",
          coordinates: [25, 121],
        })
      );
      // "Bad request: one or more parameters were incorrectly specified or are mutually exclusive."
      assert.isRejected(
        client.searchPointOfInterestCategory({
          query: "Restaurant",
          coordinates: [-200, 121],
        })
      );
    });

    it("should return non-empty results", async function () {
      const searchResult = await client.searchPointOfInterestCategory({
        query: "Restaurant",
        coordinates: [47.606038, -122.333345],
      });
      assertPOISearchResults(searchResult.results);
    });
  });

  describe("#searchAlongRoute", function () {
    it("should throw error on empty query", async function () {
      const route: GeoJsonLineString = {
        type: "LineString",
        coordinates: [
          [-122.143035, 47.653536],
          [-122.187164, 47.617556],
          [-122.114981, 47.570599],
          [-122.132756, 47.654009],
        ],
      };
      // "query is missing or empty"
      assert.isRejected(client.searchAlongRoute("", 1000, route));
    });

    it("should throw error for invalid maxDetourTimeInSeconds", async function () {
      const route: GeoJsonLineString = {
        type: "LineString",
        coordinates: [
          [-122.143035, 47.653536],
          [-122.187164, 47.617556],
          [-122.114981, 47.570599],
          [-122.132756, 47.654009],
        ],
      };
      // "maxDetourTimeInSeconds value should be between 0 and 3600 inclusive"
      assert.isRejected(client.searchAlongRoute("burger", 3601, route));
    });

    it("should return non-empty results", async function () {
      const route: GeoJsonLineString = {
        type: "LineString",
        coordinates: [
          [-122.143035, 47.653536],
          [-122.187164, 47.617556],
          [-122.114981, 47.570599],
          [-122.132756, 47.654009],
        ],
      };
      const searchResult = await client.searchAlongRoute("burger", 1000, route);
      assertPOISearchResults(searchResult.results);
    });
  });
});

describe("General search", function (this: Suite) {
  let recorder: Recorder;
  let client: MapsSearchClient;
  const fastTimeout = 10000;

  beforeEach(async function (this: Context) {
    testLogger.verbose(`Recorder: starting...`);
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    testLogger.verbose(`Recorder: stopping...`);
    await recorder.stop();
  });

  before(function (this: Context) {
    this.timeout(fastTimeout);
  });

  const expectedTypes = [
    KnownSearchAddressResultType.Street,
    KnownSearchAddressResultType.Geography,
    KnownSearchAddressResultType.PointAddress,
    KnownSearchAddressResultType.AddressRange,
    KnownSearchAddressResultType.CrossStreet,
    KnownSearchAddressResultType.POI,
  ];

  function assertSearchResults(results: SearchAddressResultItem[]): void {
    assert.isNotEmpty(results);
    results.forEach((r) => {
      // Could be any types except POI
      assert.oneOf(r.type, expectedTypes);
      // Has valid score
      assert.isFinite(r.score);
    });
  }

  describe("#fuzzySearch", function () {
    it("should throw errors if the options is not valid", async function () {
      // "query is missing or empty"
      assert.isRejected(
        client.fuzzySearch({
          query: "",
          coordinates: [25, 121],
        })
      );
      assert.isRejected(
        client.fuzzySearch({
          query: "Restaurant",
          coordinates: [-200, 121],
        })
      );
    });

    it("should return non-empty results", async function () {
      const searchResult = await client.fuzzySearch({
        query: "Restaurant",
        coordinates: [47.606038, -122.333345],
      });
      assertSearchResults(searchResult.results);
    });
  });

  describe("#searchInsideGeometry", function () {
    it("should throw error if query is invalid", async function () {
      const polygon: GeoJsonPolygon = {
        type: "Polygon",
        coordinates: [
          [
            [-122.43576049, 37.75241523],
            [-122.43301391, 37.70660472],
            [-122.36434936, 37.71205985],
            [-122.43576049, 37.75241523],
          ],
        ],
      };
      // "query is missing or empty"
      assert.isRejected(client.searchInsideGeometry("", polygon));
    });
    it("Accept GeoJSON polygon and return results", async function () {
      const polygon: GeoJsonPolygon = {
        type: "Polygon",
        coordinates: [
          [
            [-122.43576049, 37.75241523],
            [-122.43301391, 37.70660472],
            [-122.36434936, 37.71205985],
            [-122.43576049, 37.75241523],
          ],
        ],
      };
      const searchResult = await client.searchInsideGeometry("pizza", polygon);
      assertSearchResults(searchResult.results);
    });
    it("should accept polygon geometry collection", async function () {
      const polygonCollection: GeoJsonPolygonCollection = {
        type: "GeometryCollection",
        geometries: [
          {
            type: "Polygon",
            coordinates: [
              [
                [-122.43576049, 37.75241523],
                [-122.43301391, 37.70660472],
                [-122.36434936, 37.71205985],
                [-122.43576049, 37.75241523],
              ],
            ],
          },
          {
            type: "Polygon",
            coordinates: [
              [
                [-121.43576049, 38.75241523],
                [-121.43301391, 38.70660472],
                [-121.36434936, 38.71205985],
                [-121.43576049, 38.75241523],
              ],
            ],
          },
        ],
      };
      const searchResult = await client.searchInsideGeometry("pizza", polygonCollection);
      assertSearchResults(searchResult.results);
    });
    it("should accept circle or polygon feature collection", async function () {
      const polygonsOrCircles: GeoJsonCircleOrPolygonFeatureCollection = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-122.43576049, 37.75241523],
                  [-122.43301391, 37.70660472],
                  [-122.36434936, 37.71205985],
                  [-122.43576049, 37.75241523],
                ],
              ],
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-121.43576049, 38.75241523],
            },
            properties: {
              subType: "Circle",
              radius: 5000,
            },
          },
        ],
      };
      const searchResult = await client.searchInsideGeometry("pizza", polygonsOrCircles);
      assertSearchResults(searchResult.results);
    });
  });
});

describe("LRO", function (this: Suite) {
  let recorder: Recorder;
  let client: MapsSearchClient;
  const CLITimeout = this.timeout();
  const fastTimeout = 10000;

  beforeEach(async function (this: Context) {
    testLogger.verbose(`Recorder: starting...`);
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    testLogger.verbose(`Recorder: stopping...`);
    await recorder.stop();
  });

  before(function (this: Context) {
    this.timeout(fastTimeout);
  });

  const pollingInterval = isPlaybackMode() ? 0 : 2000;

  before(function (this: Context) {
    this.timeout(isPlaybackMode() ? fastTimeout : CLITimeout);
  });

  describe("#beginFuzzySearchBatch", function () {
    it("should throw errors if given empty requests", async function () {
      // "Number of queries must be between 1 and 10000 inclusive.""
      assert.isRejected(client.beginFuzzySearchBatch([]));
    });
    it("could take an array of fuzzy search requests as input", async function () {
      const batchRequests: FuzzySearchRequest[] = [
        { searchQuery: { query: "pizza", countryCodeFilter: ["fr"] } },
        { searchQuery: { query: "pizza", coordinates: [25, 121] } },
        {
          searchQuery: {
            query: "pizza",
            countryCodeFilter: ["tw"],
            coordinates: [25, 121],
          },
        },
      ];

      const poller = await client.beginFuzzySearchBatch(batchRequests, {
        updateIntervalInMs: pollingInterval,
      });

      const batchResult = await poller.pollUntilDone();

      assert.equal(batchResult.totalRequests, batchRequests.length);
      assert.equal(batchResult.batchItems.length, batchRequests.length);
    });
  });

  describe("#resumeFuzzySearchBatch", function () {
    it("should be able to resume the previous request", async function () {
      const batchRequests: FuzzySearchRequest[] = [
        { searchQuery: { query: "pizza", countryCodeFilter: ["fr"] } },
        { searchQuery: { query: "pizza", coordinates: [25, 121] } },
        {
          searchQuery: {
            query: "pizza",
            countryCodeFilter: ["tw"],
            coordinates: [25, 121],
          },
        },
      ];

      // Initiate fuzzy search batch
      const originalPoller = await client.beginFuzzySearchBatch(batchRequests, {
        updateIntervalInMs: pollingInterval,
      });
      const serializedState = originalPoller.toString();

      // Use serialized state to retrieve the result
      const rehydratedPoller = await client.resumeFuzzySearchBatch(serializedState, {
        updateIntervalInMs: pollingInterval,
      });
      const batchResult = await rehydratedPoller.pollUntilDone();
      assert.equal(batchResult.totalRequests, batchRequests.length);
      assert.equal(batchResult.batchItems.length, batchRequests.length);
    });

    it("should obtain the same result from the rehydrated poller after the lro is finished", async function () {
      const batchRequests: FuzzySearchRequest[] = [
        { searchQuery: { query: "pizza", countryCodeFilter: ["fr"] } },
        { searchQuery: { query: "pizza", coordinates: [25, 121] } },
        {
          searchQuery: {
            query: "pizza",
            countryCodeFilter: ["tw"],
            coordinates: [25, 121],
          },
        },
      ];

      // Initiate fuzzy search batch
      const originalPoller = await client.beginFuzzySearchBatch(batchRequests, {
        updateIntervalInMs: pollingInterval,
      });
      const originalResult = await originalPoller.pollUntilDone();

      // Use serialized state to retrieve the result
      const serializedState = originalPoller.toString();
      const rehydratedPoller = await client.resumeFuzzySearchBatch(serializedState, {
        updateIntervalInMs: pollingInterval,
      });
      const rehydratedResult = await rehydratedPoller.pollUntilDone();
      assert.deepEqual(originalResult, rehydratedResult);
    });
  });

  describe("#beginSearchAddressBatch", function () {
    it("should throw errors if given empty requests", async function () {
      // "Number of queries must be between 1 and 10000 inclusive.""
      assert.isRejected(client.beginSearchAddressBatch([]));
    });
    it("could take an array of fuzzy search requests as input", async function () {
      const batchRequests = [
        { query: "400 Broad St, Seattle, WA 98109", options: { top: 3 } },
        { query: "One, Microsoft Way, Redmond, WA 98052", options: { top: 3 } },
        { query: "350 5th Ave, New York, NY 10118", options: { top: 1 } },
      ];

      const poller = await client.beginSearchAddressBatch(batchRequests, {
        updateIntervalInMs: pollingInterval,
      });

      const batchResult = await poller.pollUntilDone();

      assert.equal(batchResult.totalRequests, batchRequests.length);
      assert.equal(batchResult.batchItems.length, batchRequests.length);
    });
  });

  describe("#resumeSearchAddressBatch", function () {
    it("should be able to resume the previous request", async function () {
      const batchRequests = [
        { query: "400 Broad St, Seattle, WA 98109", options: { top: 3 } },
        { query: "One, Microsoft Way, Redmond, WA 98052", options: { top: 3 } },
        { query: "350 5th Ave, New York, NY 10118", options: { top: 1 } },
      ];

      // Initiate search address batch
      const originalPoller = await client.beginSearchAddressBatch(batchRequests, {
        updateIntervalInMs: pollingInterval,
      });

      // Use serialized state to retrieve the result
      const serializedState = originalPoller.toString();
      const rehydratedPoller = await client.resumeSearchAddressBatch(serializedState, {
        updateIntervalInMs: pollingInterval,
      });
      const batchResult = await rehydratedPoller.pollUntilDone();
      assert.equal(batchResult.totalRequests, batchRequests.length);
      assert.equal(batchResult.batchItems.length, batchRequests.length);
    });

    it("should obtain the same result from the rehydrated poller after the lro is finished", async function () {
      const batchRequests = [
        { query: "400 Broad St, Seattle, WA 98109", options: { top: 3 } },
        { query: "One, Microsoft Way, Redmond, WA 98052", options: { top: 3 } },
        { query: "350 5th Ave, New York, NY 10118", options: { top: 1 } },
      ];

      // Initiate search address batch
      const originalPoller = await client.beginSearchAddressBatch(batchRequests, {
        updateIntervalInMs: pollingInterval,
      });
      const result = await originalPoller.pollUntilDone();

      // Use saved batchId to retrieve the result
      const serializedState = originalPoller.toString();
      const rehydratedPoller = await client.resumeSearchAddressBatch(serializedState, {
        updateIntervalInMs: pollingInterval,
      });
      const rehydratedResult = await rehydratedPoller.pollUntilDone();
      assert.deepEqual(result, rehydratedResult);
    });
  });

  describe("#beginReverseSearchAddressBatch", function () {
    it("should throw errors if given empty requests", async function () {
      // "Number of queries must be between 1 and 10000 inclusive.""
      assert.isRejected(client.beginReverseSearchAddressBatch([]));
    });

    it("could take an array of fuzzy search requests as input", async function () {
      const batchRequests: ReverseSearchAddressRequest[] = [
        { coordinates: [48.858561, 2.294911] },
        {
          coordinates: [47.639765, -122.127896],
          options: { radiusInMeters: 5000 },
        },
        { coordinates: [47.621028, -122.34817] },
      ];

      const poller = await client.beginReverseSearchAddressBatch(batchRequests, {
        updateIntervalInMs: pollingInterval,
      });

      const batchResult = await poller.pollUntilDone();

      assert.equal(batchResult.totalRequests, batchRequests.length);
      assert.equal(batchResult.batchItems.length, batchRequests.length);
    });
  });

  describe("#resumeReverseSearchAddressBatch", function () {
    it("should be able to resume the previous request", async function () {
      const batchRequests: ReverseSearchAddressRequest[] = [
        { coordinates: [48.858561, 2.294911] },
        {
          coordinates: [47.639765, -122.127896],
          options: { radiusInMeters: 5000 },
        },
        { coordinates: [47.621028, -122.34817] },
      ];

      // Initiate search address batch
      const originalPoller = await client.beginReverseSearchAddressBatch(batchRequests, {
        updateIntervalInMs: pollingInterval,
      });

      // Use serialized state to retrieve the result
      const serializedState = originalPoller.toString();
      const rehydratedPoller = await client.resumeReverseSearchAddressBatch(serializedState, {
        updateIntervalInMs: pollingInterval,
      });
      const batchResult = await rehydratedPoller.pollUntilDone();
      assert.equal(batchResult.totalRequests, batchRequests.length);
      assert.equal(batchResult.batchItems.length, batchRequests.length);
    });

    it("should obtain the same result from the rehydrated poller after the lro is finished", async function () {
      const batchRequests: ReverseSearchAddressRequest[] = [
        { coordinates: [48.858561, 2.294911] },
        {
          coordinates: [47.639765, -122.127896],
          options: { radiusInMeters: 5000 },
        },
        { coordinates: [47.621028, -122.34817] },
      ];

      // Initiate search address batch
      const originalPoller = await client.beginReverseSearchAddressBatch(batchRequests, {
        updateIntervalInMs: pollingInterval,
      });
      const result = await originalPoller.pollUntilDone();

      // Use saved batchId to retrieve the result
      const serializedState = originalPoller.toString();
      const rehydratedPoller = await client.resumeReverseSearchAddressBatch(serializedState, {
        updateIntervalInMs: pollingInterval,
      });
      const rehydratedResult = await rehydratedPoller.pollUntilDone();
      assert.deepEqual(result, rehydratedResult);
    });
  });
});

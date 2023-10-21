// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { isNode } from "@azure/test-utils";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { AzureKeyCredential } from "@azure/core-auth";
import MapsSearch, {
  createBatchItems,
  GeoJsonLineString,
  getLongRunningPoller,
  isUnexpected,
  MapsSearchClient,
  SearchAddressResultOutput,
  SearchGetFuzzySearchBatch200Response,
  SearchReverseSearchAddressBatch200Response,
  SearchSearchAddressBatch200Response,
} from "../../src";

describe("Authentication", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should work with Shared Key authentication", async function () {
    const credential = new AzureKeyCredential(env["MAPS_SUBSCRIPTION_KEY"] as string);
    const client = MapsSearch(credential, recorder.configureClientOptions({}));

    const response = await client
      .path("/search/fuzzy/{format}", "json")
      .get({ queryParameters: { query: "Starbucks" } });
    assert.isOk(!isUnexpected(response));
  });

  it("should work with AAD authentication", async function () {
    /**
     * Skip this test in browser because we have to use InteractiveBrowserCredential in the browser.
     * But it requires user's interaction, which is not testable in karma.
     * */
    if (!isNode) this.skip();
    /**
     * Use createTestCredential() instead of new DefaultAzureCredential(), else the playback mode won't work
     * Reference: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/test-quickstart.md#azuread-oauth2-authentication
     */
    const credential = createTestCredential();
    const client = MapsSearch(
      credential,
      env["MAPS_RESOURCE_CLIENT_ID"] as string,
      recorder.configureClientOptions({})
    );

    const response = await client
      .path("/search/fuzzy/{format}", "json")
      .get({ queryParameters: { query: "Starbucks" } });
    assert.isOk(!isUnexpected(response));
  });
});

describe("Endpoint can be overwritten", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should be executed without specifying baseUrl", async function () {
    const client = createClient(recorder.configureClientOptions({}));
    const response = await client
      .path("/search/fuzzy/{format}", "json")
      .get({ queryParameters: { query: "Starbucks" } });
    assert.isOk(!isUnexpected(response));
  });

  it("should be executed with different baseUrl", async function () {
    const client = createClient(
      recorder.configureClientOptions({ baseUrl: "https://us.atlas.microsoft.com/" })
    );
    const response = await client
      .path("/search/fuzzy/{format}", "json")
      .get({ queryParameters: { query: "Starbucks" } });
    assert.isOk(!isUnexpected(response));
  });
});

describe("Get Search Polygon", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should accept a collection of geometry Ids and return geometry data", async function () {
    const geometries: string[] = [
      "8bceafe8-3d98-4445-b29b-fd81d3e9adf5",
      "00005858-5800-1200-0000-0000773670cd",
    ];
    const response = await client
      .path("/search/polygon/{format}", "json")
      .get({ queryParameters: { geometries } });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error");
    }
    if (!response.body.additionalData) {
      assert.fail("additionalData is undefined");
    }
    assert.equal(response.body.additionalData.length, geometries.length);
    response.body.additionalData.forEach((g) => assert.ok(g.geometryData));
  });
});

describe("Get Point Of Interest Categories", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("return a list of POI categories", async function () {
    const poiCategories = await client.path("/search/poi/category/tree/{format}", "json").get();
    if (isUnexpected(poiCategories)) {
      assert.fail(poiCategories.body.error?.message || "Unexpected error");
    }
    if (!poiCategories.body.poiCategories) {
      assert.fail("poiCategories is undefined");
    }
    assert.isAtLeast(poiCategories.body.poiCategories.length, 1);
    poiCategories.body.poiCategories.forEach((poiCategory) => {
      assert.isFinite(poiCategory.id);
      assert.isString(poiCategory.name);
      assert.hasAllKeys(poiCategory, ["id", "name", "childCategoryIds", "synonyms"]);
    });
  });
});

describe("Geocoding", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  const expectedTypes = ["Street", "Geography", "Point Address", "Address Range", "Cross Street"];
  const nonExpectedTypes = ["POI"];
  function assertGeocodingResponse(response: SearchAddressResultOutput): void {
    assert.isNotEmpty(response);
    response.results.forEach((r) => {
      // Could be any types except POI
      assert.oneOf(r.type, expectedTypes);
      assert.notInclude(nonExpectedTypes, r.type);
      // Has valid score
      assert.isFinite(r.score);
    });
  }

  describe("Search Address", function () {
    it("should return non-empty results", async function () {
      const response = await client
        .path("/search/address/{format}", "json")
        .get({ queryParameters: { query: "1 Microsoft Way, Redmond, WA 98052" } });
      if (isUnexpected(response)) {
        assert.fail(response.body.error?.message || "Unexpected error");
      }
      assertGeocodingResponse(response.body);
    });
  });

  describe("Search Structured Address", function () {
    it("return non-empty results", async function () {
      const response = await client.path("/search/address/structured/{format}", "json").get({
        queryParameters: {
          countryCode: "US",
          streetNumber: "15127",
          streetName: "NE 24th Street",
          municipality: "Redmond",
          countrySubdivision: "WA",
          postalCode: "98052",
        },
      });
      if (isUnexpected(response)) {
        assert.fail(response.body.error?.message || "Unexpected error");
      }
      assertGeocodingResponse(response.body);
    });
  });
});

describe("Reverse Search Address", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should throw error if query is invalid", async function () {
    // "The provided coordinates in query are invalid, out of range, or not in the expected format"
    assert.isTrue(
      isUnexpected(
        await client
          .path("/search/address/reverse/{format}", "json")
          .get({ queryParameters: { query: [-100, 121] } })
      )
    );
    assert.isTrue(
      isUnexpected(
        await client
          .path("/search/address/reverse/{format}", "json")
          .get({ queryParameters: { query: [25, 250] } })
      )
    );
  });

  it("should return non-empty results", async function () {
    const response = await client
      .path("/search/address/reverse/{format}", "json")
      .get({ queryParameters: { query: [25, 121] } });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error");
    }
    assert.isNotEmpty(response.body);
    response.body.addresses.forEach((r) => {
      assert.isString(r.address.streetName);
    });
  });
});

describe("Reverse Search Cross Street Address", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should throw error if query is invalid", async function () {
    // "The provided coordinates in query are invalid, out of range, or not in the expected format"
    assert.isTrue(
      isUnexpected(
        await client
          .path("/search/address/reverse/crossStreet/{format}", "json")
          .get({ queryParameters: { query: [-100, 121] } })
      )
    );
    assert.isTrue(
      isUnexpected(
        await client
          .path("/search/address/reverse/crossStreet/{format}", "json")
          .get({ queryParameters: { query: [25, 250] } })
      )
    );
  });

  it("should return non-empty results", async function () {
    const response = await client
      .path("/search/address/reverse/crossStreet/{format}", "json")
      .get({ queryParameters: { query: [47.59118, -122.3327] } });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error");
    }
    assert.isNotEmpty(response.body);
    response.body.addresses.forEach((r) => {
      assert.isString(r.address?.crossStreet);
    });
  });
});

describe("POI search", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  const expectedType = "POI";
  function assertPOISearchResults(resBody: SearchAddressResultOutput): void {
    assert.isNotEmpty(resBody);
    resBody.results.forEach((r) => {
      // Could be any types except POI
      assert.equal(r.type, expectedType);
      // Has valid score
      assert.isFinite(r.score);
    });
  }

  describe("Search Point of Interest", function () {
    it("should throw errors if the options is not valid", async function () {
      // "query is missing or empty"
      assert.isTrue(
        isUnexpected(
          await client.path("/search/poi/{format}", "json").get({
            queryParameters: {
              query: "",
              lat: 25,
              lon: 121,
            },
          })
        )
      );
      // "Bad request: one or more parameters were incorrectly specified or are mutually exclusive."
      assert.isTrue(
        isUnexpected(
          await client.path("/search/poi/{format}", "json").get({
            queryParameters: {
              query: "juice bars",
              lat: -200,
              lon: 121,
            },
          })
        )
      );
    });

    it("should return non-empty results", async function () {
      const response = await client.path("/search/poi/{format}", "json").get({
        queryParameters: {
          query: "juice bars",
          lat: 47.606038,
          lon: -122.333345,
        },
      });
      if (isUnexpected(response)) {
        assert.fail(response.body.error?.message || "Unexpected error");
      }
      assertPOISearchResults(response.body);
    });
  });

  describe("Search Nearby Point of Interest", function () {
    it("should throw errors if LatLon is not valid", async function () {
      assert.isTrue(
        isUnexpected(
          await client
            .path("/search/nearby/{format}", "json")
            .get({ queryParameters: { lat: -200, lon: 121 } })
        )
      );
    });

    it("should return non-empty results", async function () {
      const response = await client
        .path("/search/nearby/{format}", "json")
        .get({ queryParameters: { lat: 47.606038, lon: -122.333345 } });
      if (isUnexpected(response)) {
        assert.fail(response.body.error?.message || "Unexpected error");
      }
      assertPOISearchResults(response.body);
    });
  });

  describe("Search point of interest category", function () {
    it("should throw errors if the options is not valid", async function () {
      // "query is missing or empty"
      assert.isTrue(
        isUnexpected(
          await client.path("/search/poi/category/{format}", "json").get({
            queryParameters: {
              query: "",
              lat: 25,
              lon: 121,
            },
          })
        )
      );
      // "Bad request: one or more parameters were incorrectly specified or are mutually exclusive."
      assert.isTrue(
        isUnexpected(
          await client.path("/search/poi/category/{format}", "json").get({
            queryParameters: {
              query: "Restaurant",
              lat: -200,
              lon: 121,
            },
          })
        )
      );
    });

    it("should return non-empty results", async function () {
      const response = await client.path("/search/poi/category/{format}", "json").get({
        queryParameters: {
          query: "Restaurant",
          lat: 47.606038,
          lon: -122.333345,
        },
      });
      if (isUnexpected(response)) {
        assert.fail(response.body.error?.message || "Unexpected error");
      }
      assertPOISearchResults(response.body);
    });
  });

  describe("Search along route", function () {
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
      assert.isTrue(
        isUnexpected(
          await client
            .path("/search/alongRoute/{format}", "json")
            .post({ queryParameters: { query: "", maxDetourTime: 1000 }, body: { route } })
        )
      );
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
      assert.isTrue(
        isUnexpected(
          await client
            .path("/search/alongRoute/{format}", "json")
            .post({ queryParameters: { query: "burger", maxDetourTime: 3601 }, body: { route } })
        )
      );
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
      const searchResult = await client
        .path("/search/alongRoute/{format}", "json")
        .post({ queryParameters: { query: "burger", maxDetourTime: 1000 }, body: { route } });
      if (isUnexpected(searchResult)) {
        assert.fail(searchResult.body.error?.message || "Unexpected error");
      }
      assertPOISearchResults(searchResult.body);
    });
  });
});

describe("General search", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;
  const fastTimeout = 10000;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  before(function (this: Context) {
    this.timeout(fastTimeout);
  });

  const expectedTypes = [
    "Street",
    "Geography",
    "Point Address",
    "Address Range",
    "Cross Street",
    "POI",
  ];

  function assertSearchResults(resBody: SearchAddressResultOutput): void {
    assert.isNotEmpty(resBody);
    resBody.results.forEach((r) => {
      // Could be any types except POI
      assert.oneOf(r.type, expectedTypes);
      // Has valid score
      assert.isFinite(r.score);
    });
  }

  describe("Fuzzy search", function () {
    it("should throw errors if the options is not valid", async function () {
      // "query is missing or empty"
      assert.isTrue(
        isUnexpected(
          await client.path("/search/fuzzy/{format}", "json").get({
            queryParameters: {
              query: "",
              lat: 25,
              lon: 121,
            },
          })
        )
      );
      assert.isTrue(
        isUnexpected(
          await client.path("/search/fuzzy/{format}", "json").get({
            queryParameters: {
              query: "Restaurant",
              lat: -200,
              lon: 121,
            },
          })
        )
      );
    });

    it("should return non-empty results", async function () {
      const response = await client.path("/search/fuzzy/{format}", "json").get({
        queryParameters: {
          query: "Restaurant",
          lat: 47.606038,
          lon: -122.333345,
        },
      });
      if (isUnexpected(response)) {
        assert.fail(response.body.error?.message || "Unexpected error");
      }
      assertSearchResults(response.body);
    });
  });

  describe("Search inside geometry", function () {
    it("should throw error if query is invalid", async function () {
      const polygon = {
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
      assert.isTrue(
        isUnexpected(
          await client
            .path("/search/geometry/{format}", "json")
            .post({ queryParameters: { query: "" }, body: { geometry: polygon } })
        )
      );
    });

    it("Accept GeoJSON polygon and return results", async function () {
      const polygon = {
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
      const response = await client
        .path("/search/geometry/{format}", "json")
        .post({ queryParameters: { query: "pizza" }, body: { geometry: polygon } });
      if (isUnexpected(response)) {
        assert.fail(response.body.error?.message || "Unexpected error");
      }
      assertSearchResults(response.body);
    });

    it("should accept polygon geometry collection", async function () {
      const polygonCollection = {
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
      const response = await client
        .path("/search/geometry/{format}", "json")
        .post({ queryParameters: { query: "pizza" }, body: { geometry: polygonCollection } });
      if (isUnexpected(response)) {
        assert.fail(response.body.error?.message || "Unexpected error");
      }
      assertSearchResults(response.body);
    });

    it("should accept circle or polygon feature collection", async function () {
      // TODO
      const polygonsOrCircles = {
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
            properties: {},
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
      const searchResult = await client
        .path("/search/geometry/{format}", "json")
        .post({ queryParameters: { query: "pizza" }, body: { geometry: polygonsOrCircles } });
      if (isUnexpected(searchResult)) {
        assert.fail(searchResult.body.error?.message || "Unexpected error");
      }
      assertSearchResults(searchResult.body);
    });
  });
});

describe("LRO", function () {
  let recorder: Recorder;
  let client: MapsSearchClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  const pollingInterval = isPlaybackMode() ? 0 : 2000;

  describe("Begin fuzzy search batch", function () {
    it("could take an array of fuzzy search requests as input", async function () {
      const batchItems = createBatchItems([
        { query: "pizza", countrySet: ["fr"] },
        { query: "pizza", lat: 25, lon: 121 },
        {
          query: "pizza",
          countrySet: ["tw"],
          lat: 25,
          lon: 121,
        },
      ]);

      const response = await client
        .path("/search/fuzzy/batch/{format}", "json")
        .post({ body: { batchItems } });
      const poller = getLongRunningPoller(client, response, { intervalInMs: pollingInterval });
      const batchResult = (await poller.pollUntilDone()) as SearchGetFuzzySearchBatch200Response;

      assert.equal(batchResult.body.summary.totalRequests, batchItems.length);
      assert.equal(batchResult.body.batchItems.length, batchItems.length);
    });
  });

  describe("Resume fuzzy search batch", function () {
    it("should be able to resume the previous request", async function () {
      const batchItems = createBatchItems([
        { query: "pizza", countrySet: ["fr"] },
        { query: "pizza", lat: 25, lon: 121 },
        {
          query: "pizza",
          countrySet: ["tw"],
          lat: 25,
          lon: 121,
        },
      ]);

      // Initiate fuzzy search batch
      const response = await client
        .path("/search/fuzzy/batch/{format}", "json")
        .post({ body: { batchItems } });
      const originalPoller = getLongRunningPoller(client, response, {
        intervalInMs: pollingInterval,
      });
      const serializedState = originalPoller.toString();

      // Use serialized state to retrieve the result
      const rehydratedPoller = getLongRunningPoller(client, response, {
        intervalInMs: pollingInterval,
        resumeFrom: serializedState,
      });
      const batchResult =
        (await rehydratedPoller.pollUntilDone()) as SearchGetFuzzySearchBatch200Response;
      assert.equal(batchResult.body.summary.totalRequests, batchItems.length);
      assert.equal(batchResult.body.batchItems.length, batchItems.length);
    });

    it("should obtain the same result from the rehydrated poller after the lro is finished", async function () {
      const batchItems = createBatchItems([
        { query: "pizza", countrySet: ["fr"] },
        { query: "pizza", lat: 25, lon: 121 },
        {
          query: "pizza",
          countrySet: ["tw"],
          lat: 25,
          lon: 121,
        },
      ]);

      // Initiate fuzzy search batch
      const response = await client
        .path("/search/fuzzy/batch/{format}", "json")
        .post({ body: { batchItems } });
      const originalPoller = getLongRunningPoller(client, response, {
        intervalInMs: pollingInterval,
      });
      const originalResult = await originalPoller.pollUntilDone();

      // Use serialized state to retrieve the result
      const serializedState = originalPoller.toString();
      const rehydratedPoller = getLongRunningPoller(client, response, {
        intervalInMs: pollingInterval,
        resumeFrom: serializedState,
      });
      const rehydratedResult =
        (await rehydratedPoller.pollUntilDone()) as SearchGetFuzzySearchBatch200Response;
      assert.deepEqual(originalResult.body, rehydratedResult.body);
    });
  });

  describe("Begin search address batch", function () {
    it("could take an array of search address requests as input", async function () {
      const batchItems = createBatchItems([
        { query: "400 Broad St, Seattle, WA 98109", limit: 3 },
        { query: "One, Microsoft Way, Redmond, WA 98052", limit: 3 },
        { query: "350 5th Ave, New York, NY 10118", limit: 1 },
      ]);

      const response = await client
        .path("/search/address/batch/{format}", "json")
        .post({ body: { batchItems } });
      const poller = getLongRunningPoller(client, response, { intervalInMs: pollingInterval });
      const batchResult = (await poller.pollUntilDone()) as SearchSearchAddressBatch200Response;

      assert.equal(batchResult.body.summary.totalRequests, batchItems.length);
      assert.equal(batchResult.body.batchItems.length, batchItems.length);
    });
  });

  describe("Resume search address batch", function () {
    it("should be able to resume the previous request", async function () {
      const batchItems = createBatchItems([
        { query: "400 Broad St, Seattle, WA 98109", limit: 3 },
        { query: "One, Microsoft Way, Redmond, WA 98052", limit: 3 },
        { query: "350 5th Ave, New York, NY 10118", limit: 1 },
      ]);

      // Initiate address search batch
      const response = await client
        .path("/search/address/batch/{format}", "json")
        .post({ body: { batchItems } });
      const originalPoller = getLongRunningPoller(client, response, {
        intervalInMs: pollingInterval,
      });
      const serializedState = originalPoller.toString();

      // Use serialized state to retrieve the result
      const rehydratedPoller = getLongRunningPoller(client, response, {
        intervalInMs: pollingInterval,
        resumeFrom: serializedState,
      });
      const batchResult =
        (await rehydratedPoller.pollUntilDone()) as SearchGetFuzzySearchBatch200Response;
      assert.equal(batchResult.body.summary.totalRequests, batchItems.length);
      assert.equal(batchResult.body.batchItems.length, batchItems.length);
    });

    it("should obtain the same result from the rehydrated poller after the lro is finished", async function () {
      const batchItems = createBatchItems([
        { query: "400 Broad St, Seattle, WA 98109", limit: 3 },
        { query: "One, Microsoft Way, Redmond, WA 98052", limit: 3 },
        { query: "350 5th Ave, New York, NY 10118", limit: 1 },
      ]);

      // Initiate address search batch
      const response = await client
        .path("/search/address/batch/{format}", "json")
        .post({ body: { batchItems } });
      const originalPoller = getLongRunningPoller(client, response, {
        intervalInMs: pollingInterval,
      });
      const originalResult = await originalPoller.pollUntilDone();

      // Use serialized state to retrieve the result
      const serializedState = originalPoller.toString();
      const rehydratedPoller = getLongRunningPoller(client, response, {
        intervalInMs: pollingInterval,
        resumeFrom: serializedState,
      });
      const rehydratedResult =
        (await rehydratedPoller.pollUntilDone()) as SearchGetFuzzySearchBatch200Response;
      assert.deepEqual(originalResult.body, rehydratedResult.body);
    });
  });

  describe("Begin reverse search address batch", function () {
    it("could take an array of reverse search address requests as input", async function () {
      const batchItems = createBatchItems([
        { query: [48.858561, 2.294911] },
        {
          query: [47.639765, -122.127896],
          radius: 5000,
        },
        { query: [47.621028, -122.34817] },
      ]);

      const response = await client
        .path("/search/address/reverse/batch/{format}", "json")
        .post({ body: { batchItems } });
      const poller = getLongRunningPoller(client, response, { intervalInMs: pollingInterval });
      const batchResult =
        (await poller.pollUntilDone()) as SearchReverseSearchAddressBatch200Response;

      assert.equal(batchResult.body.summary.totalRequests, batchItems.length);
      assert.equal(batchResult.body.batchItems.length, batchItems.length);
    });
  });

  describe("Resume reverse search address batch", function () {
    it("should be able to resume the previous request", async function () {
      const batchItems = createBatchItems([
        { query: [48.858561, 2.294911] },
        {
          query: [47.639765, -122.127896],
          radius: 5000,
        },
        { query: [47.621028, -122.34817] },
      ]);

      // Initiate reverse address search batch
      const response = await client
        .path("/search/address/reverse/batch/{format}", "json")
        .post({ body: { batchItems } });
      const originalPoller = getLongRunningPoller(client, response, {
        intervalInMs: pollingInterval,
      });
      const originalResult = await originalPoller.pollUntilDone();

      // Use serialized state to retrieve the result
      const serializedState = originalPoller.toString();
      const rehydratedPoller = getLongRunningPoller(client, response, {
        intervalInMs: pollingInterval,
        resumeFrom: serializedState,
      });
      const rehydratedResult =
        (await rehydratedPoller.pollUntilDone()) as SearchReverseSearchAddressBatch200Response;
      assert.deepEqual(originalResult.body, rehydratedResult.body);
    });

    it("should obtain the same result from the rehydrated poller after the lro is finished", async function () {
      const batchItems = createBatchItems([
        { query: [48.858561, 2.294911] },
        {
          query: [47.639765, -122.127896],
          radius: 5000,
        },
        { query: [47.621028, -122.34817] },
      ]);

      // Initiate reverse address search batch
      const response = await client
        .path("/search/address/reverse/batch/{format}", "json")
        .post({ body: { batchItems } });
      const originalPoller = getLongRunningPoller(client, response, {
        intervalInMs: pollingInterval,
      });
      const originalResult = await originalPoller.pollUntilDone();

      // Use serialized state to retrieve the result
      const serializedState = originalPoller.toString();
      const rehydratedPoller = getLongRunningPoller(client, response, {
        intervalInMs: pollingInterval,
        resumeFrom: serializedState,
      });
      const rehydratedResult =
        (await rehydratedPoller.pollUntilDone()) as SearchReverseSearchAddressBatch200Response;
      assert.deepEqual(originalResult.body, rehydratedResult.body);
    });
  });
});

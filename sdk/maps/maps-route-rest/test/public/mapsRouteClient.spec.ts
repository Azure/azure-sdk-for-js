// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context, Suite } from "mocha";
import {
  RouteDirectionParameters,
  RouteMatrixQuery,
  createRouteDirectionsBatchRequest,
  toColonDelimitedLatLonString,
} from "../../src";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder, testLogger } from "./utils/recordedClient";
import {
  MapsRouteClient,
  RouteGetRouteDirectionsBatch200Response,
  RouteGetRouteDirectionsQueryParamProperties,
  RouteGetRouteMatrix200Response,
  getLongRunningPoller,
  isUnexpected,
} from "../../src/generated";
import { LatLon } from "@azure/maps-common";

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

  it("should be executed without specifying baseUrl", async function () {
    const client = createClient(recorder.configureClientOptions({}));
    const routeDirectionsResult = await client.path("/route/directions/{format}", "json").get({
      queryParameters: {
        query: toColonDelimitedLatLonString([
          [52.50931, 13.42936],
          [52.50274, 13.43872],
        ]),
      },
    });

    assert.isOk(!isUnexpected(routeDirectionsResult));
  });

  it("should be executed with different baseUrl", async function () {
    const client = createClient(
      recorder.configureClientOptions({ baseUrl: "https://us.atlas.microsoft.com/" }),
    );
    const routeDirectionsResult = await client.path("/route/directions/{format}", "json").get({
      queryParameters: {
        query: toColonDelimitedLatLonString([
          [52.50931, 13.42936],
          [52.50274, 13.43872],
        ]),
      },
    });

    assert.isOk(!isUnexpected(routeDirectionsResult));
  });
});

describe("Get Route Directions", function (this: Suite) {
  let recorder: Recorder;
  let client: MapsRouteClient;
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

  it("should accept LatLon[] and return route directions", async function () {
    const routePoints: LatLon[] = [
      [52.50931, 13.42936],
      [52.50274, 13.43872],
    ];
    const routeDirectionsResult = await client
      .path("/route/directions/{format}", "json")
      .get({ queryParameters: { query: toColonDelimitedLatLonString(routePoints) } });

    if (isUnexpected(routeDirectionsResult)) {
      assert.fail(routeDirectionsResult.body.error?.message);
    } else {
      assert.isNotEmpty(routeDirectionsResult.body.routes);
    }
  });

  it("should accept additional parameters and return route directions", async function () {
    const routePoints: LatLon[] = [
      [47.6133869, -122.0235832],
      [47.5565375, -122.1411044],
    ];

    const additionalParams: RouteDirectionParameters = {
      supportingPoints: {
        type: "GeometryCollection",
        geometries: [
          {
            type: "Point",
            coordinates: [-122.2471259, 47.5434278],
          },
          {
            type: "Point",
            coordinates: [-122.2962099, 47.526172],
          },
        ],
      },
      avoidVignette: ["AUS", "CHE"],
    };
    const routeDirectionsResult = await client.path("/route/directions/{format}", "json").post({
      queryParameters: { query: toColonDelimitedLatLonString(routePoints) },
      body: additionalParams,
    });

    if (isUnexpected(routeDirectionsResult)) {
      assert.fail(routeDirectionsResult.body.error?.message);
    }
    assert.isNotEmpty(routeDirectionsResult.body.routes);
  });
});

describe("Get Route Range", function () {
  let recorder: Recorder;
  let client: MapsRouteClient;
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

  it("should accept LatLon and return reachable range", async function () {
    const startCoordinates: LatLon = [50.97452, 5.86605];

    const routeRangeResult = await client
      .path("/route/range/{format}", "json")
      .get({ queryParameters: { query: startCoordinates, timeBudgetInSec: 600 } });

    if (isUnexpected(routeRangeResult)) {
      assert.fail(routeRangeResult.body.error?.message);
    }
    assert.isNotEmpty(routeRangeResult.body.reachableRange);
  });
});

describe("LRO", function (this: Suite) {
  let recorder: Recorder;
  let client: MapsRouteClient;
  const CLITimeout = this.timeout();
  const fastTimeout = 10000;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  const pollingInterval = isPlaybackMode() ? 0 : 2000;

  before(function (this: Context) {
    this.timeout(isPlaybackMode() ? fastTimeout : CLITimeout);
  });

  describe("Begin Request Route Directions Batch", function () {
    it("could take an array of route directions requests as input", async function () {
      const batchRequests: RouteGetRouteDirectionsQueryParamProperties[] = [
        {
          query: toColonDelimitedLatLonString([
            [47.639987, -122.128384],
            [47.621252, -122.184408],
            [47.596437, -122.332],
          ]),
          routeType: "fastest",
          travelMode: "car",
          maxAlternatives: 3,
        },
        {
          query: toColonDelimitedLatLonString([
            [47.620659, -122.348934],
            [47.610101, -122.342015],
          ]),
          routeType: "eco",
          travelMode: "bicycle",
          traffic: false,
        },
        {
          query: toColonDelimitedLatLonString([
            [40.759856, -73.985108],
            [40.771136, -73.973506],
          ]),
          routeType: "shortest",
          travelMode: "pedestrian",
        },
      ];
      const initialResponse = await client.path("/route/directions/batch/{format}", "json").post({
        body: createRouteDirectionsBatchRequest(batchRequests),
      });
      const poller = getLongRunningPoller(client, initialResponse, {
        intervalInMs: pollingInterval,
      });

      const batchResult = (await poller.pollUntilDone()) as RouteGetRouteDirectionsBatch200Response;

      assert.equal(batchResult.body.summary.totalRequests, batchRequests.length);
      assert.equal(batchResult.body.batchItems.length, batchRequests.length);
    });
  });

  describe("Resume Route Directions Batch Result", function () {
    it("should be able to resume the previous request", async function () {
      const batchRequests: RouteGetRouteDirectionsQueryParamProperties[] = [
        {
          query: toColonDelimitedLatLonString([
            [47.639987, -122.128384],
            [47.621252, -122.184408],
            [47.596437, -122.332],
          ]),
          routeType: "fastest",
          travelMode: "car",
          maxAlternatives: 3,
        },
        {
          query: toColonDelimitedLatLonString([
            [47.620659, -122.348934],
            [47.610101, -122.342015],
          ]),
          routeType: "eco",
          travelMode: "bicycle",
          traffic: false,
        },
        {
          query: toColonDelimitedLatLonString([
            [40.759856, -73.985108],
            [40.771136, -73.973506],
          ]),
          routeType: "shortest",
          travelMode: "pedestrian",
        },
      ];

      // Initiate route directions batch
      const initialResponse = await client.path("/route/directions/batch/{format}", "json").post({
        body: createRouteDirectionsBatchRequest(batchRequests),
      });
      const originalPoller = getLongRunningPoller(client, initialResponse, {
        intervalInMs: pollingInterval,
      });
      const serializedState = originalPoller.toString();

      // Use serialized state to retrieve the result
      const rehydratedPoller = getLongRunningPoller(client, initialResponse, {
        resumeFrom: serializedState,
        intervalInMs: pollingInterval,
      });
      const batchResult =
        (await rehydratedPoller.pollUntilDone()) as RouteGetRouteDirectionsBatch200Response;

      assert.equal(batchResult.body.summary.totalRequests, batchRequests.length);
      assert.equal(batchResult.body.batchItems.length, batchRequests.length);
    });

    it("should obtain the same result from the rehydrated poller after the lro is finished", async function () {
      const batchRequests: RouteGetRouteDirectionsQueryParamProperties[] = [
        {
          query: toColonDelimitedLatLonString([
            [47.639987, -122.128384],
            [47.621252, -122.184408],
            [47.596437, -122.332],
          ]),
          routeType: "fastest",
          travelMode: "car",
          maxAlternatives: 3,
        },
        {
          query: toColonDelimitedLatLonString([
            [47.620659, -122.348934],
            [47.610101, -122.342015],
          ]),
          routeType: "eco",
          travelMode: "bicycle",
          traffic: false,
        },
        {
          query: toColonDelimitedLatLonString([
            [40.759856, -73.985108],
            [40.771136, -73.973506],
          ]),
          routeType: "shortest",
          travelMode: "pedestrian",
        },
      ];

      // Initiate route directions batch
      const initialResponse = await client.path("/route/directions/batch/{format}", "json").post({
        body: createRouteDirectionsBatchRequest(batchRequests),
      });
      const originalPoller = getLongRunningPoller(client, initialResponse, {
        intervalInMs: pollingInterval,
      });
      const originalResult = await originalPoller.pollUntilDone();

      // Use serialized state to retrieve the result
      const serializedState = originalPoller.toString();
      const rehydratedPoller = getLongRunningPoller(client, initialResponse, {
        resumeFrom: serializedState,
        intervalInMs: pollingInterval,
      });
      const rehydratedResult = await rehydratedPoller.pollUntilDone();

      assert.deepEqual(originalResult.body, rehydratedResult.body);
    });
  });

  describe("Begin Request Route Matrix", function () {
    it("should accept routeMatrixQuery as input", async function () {
      const routeMatrixQuery: RouteMatrixQuery = {
        origins: {
          type: "MultiPoint",
          coordinates: [
            [4.85106, 52.36006],
            [4.85056, 52.36187],
          ],
        },
        destinations: {
          type: "MultiPoint",
          coordinates: [
            [4.85003, 52.36241],
            [13.42937, 52.50931],
          ],
        },
      };

      const initialResponse = await client
        .path("/route/matrix/{format}", "json")
        .post({ body: routeMatrixQuery });
      const poller = getLongRunningPoller(client, initialResponse, {
        intervalInMs: pollingInterval,
      });
      const routeMatrixResult = (await poller.pollUntilDone()) as RouteGetRouteMatrix200Response;

      assert.isNotEmpty(routeMatrixResult.body.matrix);
      assert.isNotEmpty(routeMatrixResult.body.summary);
      assert.equal(routeMatrixResult.body.summary.totalRoutes, 4);
    });
  });

  describe("Resume Get Route Matrix Result", function () {
    it("should be able to resume the previous request", async function () {
      const routeMatrixQuery: RouteMatrixQuery = {
        origins: {
          type: "MultiPoint",
          coordinates: [
            [4.85106, 52.36006],
            [4.85056, 52.36187],
          ],
        },
        destinations: {
          type: "MultiPoint",
          coordinates: [
            [4.85003, 52.36241],
            [13.42937, 52.50931],
          ],
        },
      };

      // Initiate route directions batch
      const initialResponse = await client.path("/route/matrix/{format}", "json").post({
        body: routeMatrixQuery,
      });
      const originalPoller = getLongRunningPoller(client, initialResponse, {
        intervalInMs: pollingInterval,
      });
      const serializedState = originalPoller.toString();

      // Use saved batchId to retrieve the result
      const rehydratedPoller = getLongRunningPoller(client, initialResponse, {
        intervalInMs: pollingInterval,
        resumeFrom: serializedState,
      });
      const routeMatrixResult =
        (await rehydratedPoller.pollUntilDone()) as RouteGetRouteMatrix200Response;

      assert.isNotEmpty(routeMatrixResult.body.matrix);
      assert.isNotEmpty(routeMatrixResult.body.summary);
      assert.equal(routeMatrixResult.body.summary.totalRoutes, 4);
    });

    it("should obtain the same result as beginRequestRouteMatrix ", async function () {
      const routeMatrixQuery: RouteMatrixQuery = {
        origins: {
          type: "MultiPoint",
          coordinates: [
            [4.85106, 52.36006],
            [4.85056, 52.36187],
          ],
        },
        destinations: {
          type: "MultiPoint",
          coordinates: [
            [4.85003, 52.36241],
            [13.42937, 52.50931],
          ],
        },
      };

      // Initiate route directions batch
      const initialResponse = await client.path("/route/matrix/{format}", "json").post({
        body: routeMatrixQuery,
      });
      const originalPoller = getLongRunningPoller(client, initialResponse, {
        intervalInMs: pollingInterval,
      });
      const originalResult = await originalPoller.pollUntilDone();

      // Use serialized state to retrieve the result
      const serializedState = originalPoller.toString();
      const rehydratedPoller = getLongRunningPoller(client, initialResponse, {
        intervalInMs: pollingInterval,
        resumeFrom: serializedState,
      });
      const rehydratedResult = await rehydratedPoller.pollUntilDone();

      assert.deepEqual(originalResult.body, rehydratedResult.body);
    });
  });
});

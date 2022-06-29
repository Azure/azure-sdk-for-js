// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthMethod, createClient, createRecorder } from "./utils/createClient";
import { Context, Suite } from "mocha";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { MapsRouteClient } from "src/mapsRouteClient";
import { assert, use as chaiUse } from "chai";
import { matrix } from "@azure/test-utils";
import chaiPromises from "chai-as-promised";
import {
  KnownRouteType,
  KnownTravelMode,
  RouteDirectionParameters,
  RouteDirectionsRequest,
  RouteMatrixQuery,
} from "../../src";
chaiUse(chaiPromises);

matrix([["SubscriptionKey"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] MapsRouteClient`, function (this: Suite) {
    let recorder: Recorder;
    let client: MapsRouteClient;
    const CLITimeout = this.timeout();
    const fastTimeout = 10000;

    beforeEach(function (this: Context) {
      recorder = createRecorder(this);
      client = createClient(authMethod);
    });

    afterEach(async function () {
      await recorder.stop();
    });

    describe("fast tests", function () {
      before(function (this: Context) {
        this.timeout(fastTimeout);
      });

      describe("#getRouteDirections", function () {
        it("should accept LatLon[] and return route directions", async function () {
          const routePoints = [
            {
              latitude: 52.50931,
              longitude: 13.42936,
            },
            { latitude: 52.50274, longitude: 13.43872 },
          ];
          const routeDirectionsResult = await client.getRouteDirections(routePoints);

          assert.isNotEmpty(routeDirectionsResult.routes);
        });

        it("should throw error on empty routePoints array", async function () {
          // "routePoints must be a non-empty array"
          assert.isRejected(client.getRouteDirections([]));
        });
      });

      describe("#getRouteDirectionsWithAdditionalParameters", function () {
        it("should accept LatLon[] with additional parameters, and return route directions", async function () {
          const routePoints = [
            {
              latitude: 47.6133869,
              longitude: -122.0235832,
            },
            { latitude: 47.5565375, longitude: -122.1411044 },
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
          const routeDirectionsResult = await client.getRouteDirectionsWithAdditionalParameters(
            routePoints,
            additionalParams
          );

          assert.isNotEmpty(routeDirectionsResult.routes);
        });

        it("should throw error on empty routePoints array", async function () {
          const additionalParams: RouteDirectionParameters = {
            avoidVignette: ["AUS", "CHE"],
          };

          // "routePoints must be a non-empty array"
          assert.isRejected(
            client.getRouteDirectionsWithAdditionalParameters([], additionalParams)
          );
        });
      });

      describe("#getRouteRange", function () {
        it("should accept LatLon and return reachable range", async function () {
          const startCoordinates = { latitude: 50.97452, longitude: 5.86605 };
          const routeRangeBudget = { timeBudgetInSec: 6000 };

          const routeRangeResult = await client.getRouteRange(startCoordinates, routeRangeBudget);

          assert.isNotEmpty(routeRangeResult.reachableRange);
        });
      });
    });

    describe("LROs", function () {
      const pollingInterval = isPlaybackMode() ? 0 : 2000;

      before(function (this: Context) {
        this.timeout(isPlaybackMode() ? fastTimeout : CLITimeout);
      });

      describe("#beginRequestRouteDirectionsBatch", function () {
        it("should throw errors if given empty array as queries", async function () {
          // "Number of queries must be between 1 and 700 inclusive.""
          assert.isRejected(client.beginRequestRouteDirectionsBatch([]));
        });

        it("could take an array of route directions requests as input", async function () {
          const batchRequests: RouteDirectionsRequest[] = [
            {
              routePoints: [
                { latitude: 47.639987, longitude: -122.128384 },
                { latitude: 47.621252, longitude: -122.184408 },
                { latitude: 47.596437, longitude: -122.332 },
              ],
              options: {
                routeType: KnownRouteType.Fastest,
                travelMode: KnownTravelMode.Car,
                maxAlternatives: 3,
              },
            },
            {
              routePoints: [
                { latitude: 47.620659, longitude: -122.348934 },
                { latitude: 47.610101, longitude: -122.342015 },
              ],
              options: {
                routeType: KnownRouteType.Economy,
                travelMode: KnownTravelMode.Bicycle,
                useTrafficData: false,
              },
            },
            {
              routePoints: [
                { latitude: 40.759856, longitude: -73.985108 },
                { latitude: 40.771136, longitude: -73.973506 },
              ],
              options: {
                routeType: KnownRouteType.Shortest,
                travelMode: KnownTravelMode.Pedestrian,
              },
            },
          ];

          const poller = await client.beginRequestRouteDirectionsBatch(batchRequests, {
            updateIntervalInMs: pollingInterval,
          });

          const batchResult = await poller.pollUntilDone();

          assert.equal(batchResult.totalRequests, batchRequests.length);
          assert.equal(batchResult.batchItems.length, batchRequests.length);
        });

        it("should return a poller that can be used to retrieve the batchId", async function () {
          const batchRequests: RouteDirectionsRequest[] = [
            {
              routePoints: [
                { latitude: 47.620659, longitude: -122.348934 },
                { latitude: 47.610101, longitude: -122.342015 },
              ],
              options: {
                routeType: KnownRouteType.Economy,
                travelMode: KnownTravelMode.Bicycle,
                useTrafficData: false,
              },
            },
          ];

          const poller = await client.beginRequestRouteDirectionsBatch(batchRequests, {
            updateIntervalInMs: pollingInterval,
          });

          assert.isDefined(poller.getBatchId());

          await poller.pollUntilDone();

          assert.isDefined(poller.getBatchId());
        });
      });

      describe("#beginGetRouteDirectionsBatchResult", function () {
        it("should throw error if batchId is missing", async function () {
          // "query is missing or empty"
          assert.isRejected(client.beginGetRouteDirectionsBatchResult(""));
        });

        it("should throw error if invalid batchId is given", async function () {
          // "Invalid value : [batchId] for parameter batchRequestId"
          assert.isRejected(
            client.beginGetRouteDirectionsBatchResult("11111111-2222-3333-4444-5555555555557")
          );
        });

        it("could retrieve a previous submitted batch results", async function () {
          const batchRequests: RouteDirectionsRequest[] = [
            {
              routePoints: [
                { latitude: 47.639987, longitude: -122.128384 },
                { latitude: 47.621252, longitude: -122.184408 },
                { latitude: 47.596437, longitude: -122.332 },
              ],
              options: {
                routeType: KnownRouteType.Fastest,
                travelMode: KnownTravelMode.Car,
                maxAlternatives: 3,
              },
            },
            {
              routePoints: [
                { latitude: 47.620659, longitude: -122.348934 },
                { latitude: 47.610101, longitude: -122.342015 },
              ],
              options: {
                routeType: KnownRouteType.Economy,
                travelMode: KnownTravelMode.Bicycle,
                useTrafficData: false,
              },
            },
          ];

          // Initiate route directions batch
          const poller1 = await client.beginRequestRouteDirectionsBatch(batchRequests, {
            updateIntervalInMs: pollingInterval,
          });
          const batchId = poller1.getBatchId() as string;
          assert.ok(batchId);

          // Use saved batchId to retrieve the result
          const poller2 = await client.beginGetRouteDirectionsBatchResult(batchId, {
            updateIntervalInMs: pollingInterval,
          });
          const batchResult = await poller2.pollUntilDone();

          assert.equal(batchResult.totalRequests, batchRequests.length);
          assert.equal(batchResult.batchItems.length, batchRequests.length);
        });

        it("should obtain the same result as beginRequestRouteDirectionsBatch ", async function () {
          const batchRequests: RouteDirectionsRequest[] = [
            {
              routePoints: [
                { latitude: 47.639987, longitude: -122.128384 },
                { latitude: 47.621252, longitude: -122.184408 },
                { latitude: 47.596437, longitude: -122.332 },
              ],
              options: {
                routeType: KnownRouteType.Fastest,
                travelMode: KnownTravelMode.Car,
                maxAlternatives: 3,
              },
            },
            {
              routePoints: [
                { latitude: 47.620659, longitude: -122.348934 },
                { latitude: 47.610101, longitude: -122.342015 },
              ],
              options: {
                routeType: KnownRouteType.Economy,
                travelMode: KnownTravelMode.Bicycle,
                useTrafficData: false,
              },
            },
          ];

          // Initiate route directions batch
          const poller1 = await client.beginRequestRouteDirectionsBatch(batchRequests, {
            updateIntervalInMs: pollingInterval,
          });
          const batchResult1 = await poller1.pollUntilDone();
          const batchId = poller1.getBatchId() as string;
          assert.ok(batchId);

          // Use saved batchId to retrieve the result
          const poller2 = await client.beginGetRouteDirectionsBatchResult(batchId, {
            updateIntervalInMs: pollingInterval,
          });
          const batchResult2 = await poller2.pollUntilDone();

          assert.deepEqual(batchResult1, batchResult2);
        });
      });

      describe("#beginRequestRouteMatrix", function () {
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

          const poller = await client.beginRequestRouteMatrix(routeMatrixQuery, {
            updateIntervalInMs: pollingInterval,
          });

          const routeMatrixResult = await poller.pollUntilDone();

          assert.isNotEmpty(routeMatrixResult.matrix);
          assert.isNotEmpty(routeMatrixResult.summary);
          assert.equal(routeMatrixResult.summary.totalRoutes, 4);
        });

        it("should return a poller that can be used to retrieve the batchId", async function () {
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

          const poller = await client.beginRequestRouteMatrix(routeMatrixQuery, {
            updateIntervalInMs: pollingInterval,
          });

          assert.isDefined(poller.getBatchId());

          await poller.pollUntilDone();

          assert.isDefined(poller.getBatchId());
        });
      });

      describe("#beginGetRouteMatrixResult", function () {
        it("should throw error if matrixId is missing", async function () {
          // "query is missing or empty"
          assert.isRejected(client.beginGetRouteMatrixResult(""));
        });

        it("should throw error if invalid batchId is given", async function () {
          // "Invalid value : [batchId] for parameter batchRequestId"
          assert.isRejected(
            client.beginGetRouteDirectionsBatchResult("11111111-2222-3333-4444-5555555555557")
          );
        });

        it("could retrieve a previous submitted batch results", async function () {
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
          const poller1 = await client.beginRequestRouteMatrix(routeMatrixQuery, {
            updateIntervalInMs: pollingInterval,
          });
          const batchId = poller1.getBatchId() as string;
          assert.ok(batchId);

          // Use saved batchId to retrieve the result
          const poller2 = await client.beginGetRouteMatrixResult(batchId, {
            updateIntervalInMs: pollingInterval,
          });
          const routeMatrixResult = await poller2.pollUntilDone();

          assert.isNotEmpty(routeMatrixResult.matrix);
          assert.isNotEmpty(routeMatrixResult.summary);
          assert.equal(routeMatrixResult.summary.totalRoutes, 4);
        });

        it("should obtain the same result as beginFuzzySearchBatch ", async function () {
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
          const poller1 = await client.beginRequestRouteMatrix(routeMatrixQuery, {
            updateIntervalInMs: pollingInterval,
          });
          const routeMatrixResult1 = await poller1.pollUntilDone();
          const matrixId = poller1.getBatchId() as string;
          assert.ok(matrixId);

          // Use saved batchId to retrieve the result
          const poller2 = await client.beginGetRouteMatrixResult(matrixId, {
            updateIntervalInMs: pollingInterval,
          });
          const routeMatrixResult2 = await poller2.pollUntilDone();

          assert.deepEqual(routeMatrixResult1, routeMatrixResult2);
        });
      });
    });
  });
});

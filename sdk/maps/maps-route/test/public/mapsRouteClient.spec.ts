// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthMethod, createClient, createRecorder } from "./utils/createClient";
import { Context, Suite } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { MapsRouteClient } from "src/mapsRouteClient";
import { assert, use as chaiUse } from "chai";
import { matrix } from "@azure/test-utils";
import chaiPromises from "chai-as-promised";
import {
  KnownRouteType,
  KnownTravelMode,
  RouteDirectionParameters,
  RouteDirectionsRequest,
} from "../../src";
chaiUse(chaiPromises);

matrix([["SubscriptionKey"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] MapsRouteClient`, function (this: Suite) {
    let recorder: Recorder;
    let client: MapsRouteClient;
    // const CLITimeout = this.timeout();
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

          // TODO: Test result difference on supportingPoints / avoidAreas

          assert.isNotEmpty(routeDirectionsResult.routes);
        });

        it("should throw error on empty routePoints array or additionParameters", async function () {
          const routePoints = [
            {
              latitude: 52.50931,
              longitude: 13.42936,
            },
            { latitude: 52.50274, longitude: 13.43872 },
          ];

          const additionalParams: RouteDirectionParameters = {
            avoidVignette: ["AUS", "CHE"],
          };

          // "routePoints must be a non-empty array"
          assert.isRejected(
            client.getRouteDirectionsWithAdditionalParameters([], additionalParams)
          );

          // "routePoints must be a non-empty array"
          assert.isRejected(client.getRouteDirectionsWithAdditionalParameters(routePoints, {}));
        });
      });

      describe("#getRouteRange", function () {
        it("should accept LatLon and return reachable range", async function () {
          const startCoordinates = { latitude: 50.97452, longitude: 5.86605 };
          const routeRangeBudget = { timeBudgetInSec: 6000 };

          const routeRangeResult = await client.getRouteRange(startCoordinates, routeRangeBudget);

          // TODO: Should we add required attributes for reachableRange?
          assert.isNotEmpty(routeRangeResult.reachableRange);
        });
      });

      describe("#requestRouteDirectionsBatch", function () {
        it("should throw error on empty requests array", async function () {
          // Number of queries must be between 1 and 100 inclusive.
          assert.isRejected(client.requestRouteDirectionsBatch([]));
        });
        it("could take an array of route directions requests as input", async function () {
          const requests: RouteDirectionsRequest[] = [
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

          const batchResult = await client.requestRouteDirectionsBatch(requests);

          assert.equal(batchResult.totalRequests, requests.length);
          assert.equal(batchResult.batchItems?.length, requests.length);
        });
      });

      describe("#requestRouteMatrix", function () {
        xit("should accept LatLon[] and return route directions", async function () {});

        xit("should throw error on empty routePoints array", async function () {});
      });
    });

    describe("LROs", function () {
      //const pollingInterval = isPlaybackMode() ? 0 : 2000;

      before(function (this: Context) {
        //this.timeout(isPlaybackMode() ? fastTimeout : CLITimeout);
      });

      describe("#beginRequestRouteDirectionsBatch", function () {
        xit("should throw errors if given empty array as queries", async function () {});

        xit("could take an array of fuzzy search queries as input", async function () {});

        xit("should return a poller that can be used to retrieve the batchId", async function () {});
      });

      describe("#beginGetRouteDirectionsBatchResult", function () {
        xit("should throw error if batchId is missing", async function () {});

        xit("should throw error if invalid batchId is given", async function () {});

        xit("could retrieve a previous submitted batch results", async function () {});

        xit("should obtain the same result as beginFuzzySearchBatch ", async function () {});
      });

      describe("#beginRequestRouteMatrix", function () {
        xit("should throw errors if given empty array as queries", async function () {});

        xit("could take an array of fuzzy search queries as input", async function () {});

        xit("should return a poller that can be used to retrieve the batchId", async function () {});
      });

      describe("#beginGetRouteMatrixResult", function () {
        xit("should throw error if batchId is missing", async function () {});

        xit("should throw error if invalid batchId is given", async function () {});

        xit("could retrieve a previous submitted batch results", async function () {});

        xit("should obtain the same result as beginFuzzySearchBatch ", async function () {});
      });
    });
  });
});

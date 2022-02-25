// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthMethod, createClient, createRecorder } from "./utils/createClient";
import { Context, Suite } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { MapsRouteClient } from "src/mapsRouteClient";
import { assert, use as chaiUse } from "chai";
import { matrix } from "@azure/test-utils";
import chaiPromises from "chai-as-promised";
import {} from "../../src";
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
          assert.isRejected(client.getRouteDirections([]));
        });
      });

      describe("#getRouteDirectionsWithAdditionalParameters", function () {
        xit("should accept LatLon[] and return route directions", async function () {});

        xit("should throw error on empty routePoints array", async function () {});
      });

      describe("#getRouteRange", function () {
        xit("should accept LatLon[] and return route directions", async function () {});

        xit("should throw error on empty routePoints array", async function () {});
      });

      describe("#requestRouteDirectionsBatch", function () {
        xit("should accept LatLon[] and return route directions", async function () {});

        xit("should throw error on empty routePoints array", async function () {});
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

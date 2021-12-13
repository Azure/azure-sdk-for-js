// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthMethod, createClient, createRecorder } from "./utils/createClient";
import { Context, Suite } from "mocha";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { MapsSearchClient } from "src/searchClient";
import { assert, use as chaiUse } from "chai";
import { matrix } from "@azure/test-utils";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

matrix([["SubscriptionKey"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] MapsSearchClient`, function(this: Suite) {
    let recorder: Recorder;
    let client: MapsSearchClient;
    const CLITimeout = this.timeout();
    const fastTimeout = 10000;

    beforeEach(function(this: Context) {
      recorder = createRecorder(this);
      client = createClient(authMethod);
    });

    afterEach(async function() {
      await recorder.stop();
    });

    describe("fast tests", function() {
      before(function(this: Context) {
        this.timeout(fastTimeout);
      });
      describe("#listPolygons", function() {
        it("throws error on empty geometryIds array", async function() {
          return assert.isRejected(client.listPolygons([]), /non-empty array/);
        });
        it("accepts string[]", async function() {
          const geometryId: string[] = ["00005858-5800-1200-0000-0000773670cd"];
          const results = await client.listPolygons(geometryId);
          assert.equal(results.length, geometryId.length);
          results.forEach((r) => assert.ok(r.geometryData));
        });
      });
      // describe("#fuzzySearch", function() {});
      // describe("#searchPointOfInterest", function() {});
      // describe("#searchNearbyPointOfInterest", function() {});
      // describe("#searchPointOfInterestCategory", function() {});
      describe("#getPointOfInterestCategoryTree", function() {
        it("return a list of POI categories", async function() {
          const results = await client.getPointOfInterestCategoryTree();
          assert.isAtLeast(results.length, 1);
        });
      });
      // describe("#searchAddress", function() {});
      // describe("#reverseSearchAddress", function() {});
      // describe("#reverseSearchCrossStreetAddress", function() {});
      // describe("#searchStructuredAddress", function() {});
      // describe("#searchInsideGeometry", function() {});
      // describe("#searchAlongRoute", function() {});
      // describe("#fuzzySearchBatchSync", function() {});
      // describe("#searchAddressBatchSync", function() {});
      // describe("#reverseSearchAddressBatchSync", function() {});
    });
    describe("LROs", function() {
      // const pollingInterval = isPlaybackMode() ? 0 : 2000;

      before(function(this: Context) {
        this.timeout(isPlaybackMode() ? fastTimeout : CLITimeout);
      });
      // describe("#beginFuzzySearchBatch", function() {});
      // describe("#beginSearchAddressBatch", function() {});
      // describe("#beginReverseSearchAddressBatch", function() {});
    });
  });
});

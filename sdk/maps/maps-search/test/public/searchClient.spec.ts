// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthMethod, createClient, createRecorder } from "./utils/createClient";
import { Context, Suite } from "mocha";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { SearchClient } from "src/searchClient";
import { assert } from "chai";
import { matrix } from "@azure/test-utils";

matrix([["SubscriptionKey", "AAD"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] SearchClient`, function(this: Suite) {
    let recorder: Recorder;
    let client: SearchClient;
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
          // TODO: Come up with test data
          const geometryId: string[] = [];
          const results = await client.listPolygons(geometryId);
          assert.equal(results.length, geometryId.length);
          // TODO: Assert the OK results
        });
      });
      // describe("#fuzzySearch", function() {});
      // describe("#searchPointOfInterest", function() {});
      // describe("#searchNearbyPointOfInterest", function() {});
      // describe("#searchPointOfInterestCategory", function() {});
      // describe("#getPointOfInterestCategoryTree", function() {});
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

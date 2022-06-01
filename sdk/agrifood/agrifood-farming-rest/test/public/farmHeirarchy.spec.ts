// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { FarmBeatsRestClient, getLongRunningPoller } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";
import { isNode } from "@azure/core-util";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

const startDateTime = new Date("2020-02-01T08:00:00.000Z");
const endDateTime = new Date("2020-03-02T08:00:00.000Z");
const suffix = isNode ? "node" : "browser";
const farmerId = `tst103${suffix}`;
const jobId = `jhjob103${suffix}`;
const boundaryId = `jhboundary103${suffix}`;
const testFarmer = {
  name: "Contoso Farmer",
  description: "Your custom farmer description here",
  status: "Active",
  properties: { foo: "bar", "numeric one": 1, "1": "numeric key" },
};

describe("Farmer Operations", () => {
  let recorder: Recorder;
  let client: FarmBeatsRestClient;

  beforeEach(function (this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create a farmer", async () => {
    const result = await client.path("/farmers/{farmerId}", farmerId).patch({
      body: testFarmer,
      contentType: "application/merge-patch+json",
    });

    assert.include(["200", "201"], result.status);
  });

  it("should get a farmer", async () => {
    const result = await client.path("/farmers/{farmerId}", farmerId).get();
    assert.deepInclude(result.body, testFarmer);
  });

  it("should create a boundary", async () => {
    const result = await client
      .path("/farmers/{farmerId}/boundaries/{boundaryId}", farmerId, boundaryId)
      .patch({
        body: {
          geometry: {
            coordinates: [
              [
                [-6.6730517, 43.5298824],
                [-6.676265, 43.5262614],
                [-6.6757983, 43.5260669],
                [-6.6760236, 43.5254835],
                [-6.6768819, 43.5245228],
                [-6.6760075, 43.5243322],
                [-6.6753209, 43.5252112],
                [-6.6744518, 43.5247095],
                [-6.6730678, 43.525114],
                [-6.6723222, 43.5256702],
                [-6.6739959, 43.5264753],
                [-6.6726387, 43.5274282],
                [-6.6712493, 43.5279261],
                [-6.6703159, 43.5280428],
                [-6.6693288, 43.5277394],
                [-6.6692644, 43.52807],
                [-6.6694576, 43.5282256],
                [-6.671319, 43.5294274],
                [-6.6717964, 43.5296024],
                [-6.6730303, 43.5298824],
                [-6.6730517, 43.5298824],
              ],
            ],
            type: "Polygon",
          },
          description: "Created by SDK",
        },
        contentType: "application/merge-patch+json",
      });

    if (result.status !== "200" && result.status !== "201") {
      throw result.body;
    }

    assert.include(["200", "201"], result.status);
  });

  it("should create a satelite job", async () => {
    const initialResponse = await client.path("/scenes/satellite/ingest-data/{jobId}", jobId).put({
      body: {
        farmerId,
        boundaryId,
        startDateTime,
        endDateTime,
        data: { imageNames: ["LAI"] },
      },
    });

    if (initialResponse.status !== "202") {
      throw initialResponse.body.error;
    }

    const poller = getLongRunningPoller(client, initialResponse);
    const result = await poller.pollUntilDone();

    assert.equal(result.body.boundaryId, boundaryId);
  });

  it("should get corresponding scenes", async () => {
    const result = await client.path("/scenes").get({
      queryParameters: {
        farmerId,
        boundaryId,
        startDateTime,
        endDateTime,
        provider: "Microsoft",
        source: "Sentinel_2_L2A",
        maxCloudCoveragePercentage: 100,
        maxDarkPixelCoveragePercentage: 100,
        $maxPageSize: 50,
      },
    });

    if (result.status !== "200") {
      throw new Error(`Unexpected status ${result.status}`);
    }

    assert.ok(result.body.value?.length, "Expected to list scenes, but got nothing");
  });
});

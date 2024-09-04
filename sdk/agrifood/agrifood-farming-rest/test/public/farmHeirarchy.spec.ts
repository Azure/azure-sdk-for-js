// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  FarmBeatsClient,
  getLongRunningPoller,
  SatelliteDataIngestionJobOutput,
  SceneListResponseOutput,
  isUnexpected,
} from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { isNode } from "@azure/core-util";

const startDateTime = new Date("2020-02-01T08:00:00.000Z");
const endDateTime = new Date("2020-03-02T08:00:00.000Z");
const suffix = isNode ? "node" : "browser";
const partyId = `${suffix}-contoso-party`;
const boundaryId = `${suffix}-contoso-boundary`;
const testparty = {
  name: "Contoso party",
  description: "Your custom party description here",
  status: "Active",
  properties: { foo: "bar", "numeric one": 1, "1": "numeric key" },
};
let jobId: string;

describe("party Operations", () => {
  let recorder: Recorder;
  let client: FarmBeatsClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
    jobId = recorder.variable("jobId", `${suffix}-job-${Math.ceil(Math.random() * 1000)}`);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create a party", async () => {
    const result = await client.path("/parties/{partyId}", partyId).patch({
      body: testparty,
      contentType: "application/merge-patch+json",
    });

    assert.include(["200", "201"], result.status);
  });

  it("should get a party", async () => {
    const result = await client.path("/parties/{partyId}", partyId).get();
    assert.deepInclude(result.body, testparty);
  });

  it("should create a boundary", async () => {
    const result = await client
      .path("/parties/{partyId}/boundaries/{boundaryId}", partyId, boundaryId)
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

    if (isUnexpected(result)) {
      throw result.body.error;
    }

    assert.include(["200", "201"], result.status);
  });

  it("should create a satelite job", async () => {
    const initialResponse = await client.path("/scenes/satellite/ingest-data/{jobId}", jobId).put({
      body: {
        partyId,
        boundaryId,
        startDateTime,
        endDateTime,
        data: { imageNames: ["NDVI"] },
        source: "Sentinel_2_L2A",
        provider: "Microsoft",
      },
    });

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }

    const poller = getLongRunningPoller(client, initialResponse);
    const result = await (await poller).pollUntilDone();

    const jobOutput = <SatelliteDataIngestionJobOutput>result.body;
    assert.equal(jobOutput.boundaryId, boundaryId);
  });

  it("should get corresponding scenes", async () => {
    const result = await client.path("/scenes").get({
      queryParameters: {
        partyId,
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

    if (isUnexpected(result)) {
      throw result.body.error;
    } else {
      const scenes = <SceneListResponseOutput>result.body;
      assert.ok(scenes.value?.length, "Expected to list scenes, but got nothing");
    }
  });
});

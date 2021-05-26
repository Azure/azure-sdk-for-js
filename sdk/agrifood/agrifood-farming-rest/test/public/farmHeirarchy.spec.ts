// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  FarmBeatsRestClient,
  ScenesGetSatelliteDataIngestionJobDetails200Response,
  ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse,
} from "../../src";
import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { wait } from "./utils/wait";

const startDateTime = new Date(2020, 1, 1);
const endDateTime = new Date(2020, 1, 31);
const farmerId = `test-farmer-id-${Date.now()}`;
const jobId = `test-job-id-${Date.now()}`;
const boundaryId = `test-boundary-id-${Date.now()}`;
const testFarmer = {
  name: "Contoso Farmer",
  description: "Your custom farmer description here",
  status: "Active",
  properties: { foo: "bar", "numeric one": 1, "1": "numeric key" },
};

describe("Farmer Operations", () => {
  let recorder: Recorder;
  let client: FarmBeatsRestClient;
  let pollWaitInMs: number;

  beforeEach(function (this: Context) {
    recorder = createRecorder(this);
    client = createClient();

    if (isPlaybackMode()) {
      pollWaitInMs = 0;
    } else {
      pollWaitInMs = 5000;
    }
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
                [73.70457172393799, 20.545385304358106],
                [73.70457172393799, 20.545385304358106],
                [73.70448589324951, 20.542411534243367],
                [73.70877742767334, 20.541688176010233],
                [73.71023654937744, 20.545083911372505],
                [73.70663166046143, 20.546992723579137],
                [73.70457172393799, 20.545385304358106],
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
    const result = await client.path("/scenes/satellite/ingest-data/{jobId}", jobId).put({
      body: {
        farmerId,
        boundaryId,
        startDateTime,
        endDateTime,
        data: { imageNames: ["LAI"] },
      },
    });

    if (result.status !== "202") {
      throw result.body.error;
    }

    assert.equal(result.body.farmerId, farmerId);

    let operationStatus: string;

    do {
      const statusResult = await client.path("/scenes/satellite/ingest-data/{jobId}", jobId).get();
      if (statusResult.status !== "200") {
        throw statusResult.body.error;
      }

      operationStatus = statusResult.body.status ?? "Failed";

      if (["Failed", "Cancelled"].includes(operationStatus)) {
        throw new Error("Job Failed");
      }

      if (statusResult.body.status === "Succeeded") {
        break;
      }

      await wait(pollWaitInMs);
    } while (["Waiting", "Running"].includes(operationStatus));

    assert.ok("Job completed");
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
      throw result.body.error;
    }

    assert.ok(result.body.value?.length, "Expected to list scenes, but got nothing");
  });
});

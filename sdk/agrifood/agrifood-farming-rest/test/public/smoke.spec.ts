// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { FarmBeatsRestClient, Farmer, paginate } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

const farmerId = "test-farmer";
const boundaryId = "test-boundary";
describe("List farmers", () => {
  let recorder: Recorder;
  let client: FarmBeatsRestClient;

  beforeEach(function (this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all farmers", async () => {
    const result = await client.path("/farmers").get();

    if (result.status !== "200") {
      assert.fail(`GET "/farmers" failed with ${result.status}`);
    }

    const farmers = paginate(client, result);

    let lastFarmer: Farmer | undefined = undefined;
    for await (const farmer of farmers) {
      lastFarmer = farmer;
    }

    assert.isDefined(lastFarmer);
  });

  it("should create a farmer", async () => {
    const result = await client.path("/farmers/{farmerId}", farmerId).patch({
      body: {
        name: "Contoso Farmer",
        description: "Your custom farmer description here",
        status: "Active",
        properties: { foo: "bar", "numeric one": 1, "1": "numeric key" },
      },
      contentType: "application/merge-patch+json",
    });

    assert.include(["200", "201"], result.status);
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

  it("should delete a boundary", async () => {
    const result = await client
      .path("/farmers/{farmerId}/boundaries/{boundaryId}", farmerId, boundaryId)
      .delete();

    assert.equal(result.status, "204");
  });

  it("should delete a farmer", async () => {
    const result = await client.path("/farmers/{farmerId}", farmerId).delete();
    assert.equal(result.status, "204");
  });
});

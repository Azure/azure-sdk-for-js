// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { FarmBeatsRestClient } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

const farmerId = "test-farmer-1";
const testFarmer = {
  name: "Contoso Farmer",
  description: "Your custom farmer description here",
  status: "Active",
  properties: { foo: "bar", "numeric one": 1, "1": "numeric key" },
};

describe("Satelite Flow", () => {
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

  it("should update a farmer", async () => {
    const result = await client.path("/farmers/{farmerId}", farmerId).patch({
      body: { ...testFarmer, name: "Updated" },
      contentType: "application/merge-patch+json",
    });

    assert.include(["200", "201"], result.status);

    const updatedResult = await client.path("/farmers/{farmerId}", farmerId).get();

    if (updatedResult.status !== "200") {
      throw updatedResult.body.error;
    }

    assert.equal(updatedResult.body.name, "Updated");
  });

  it("should delete a farmer", async () => {
    const result = await client.path("/farmers/{farmerId}", farmerId).delete();
    assert.include(["204"], result.status);
  });
});

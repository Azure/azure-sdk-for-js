import { ArtifactsClient } from "../../src/artifactsClient";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("BigDataPools", () => {
  let recorder: Recorder;
  let client: ArtifactsClient;

  beforeEach(function() {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list bigDataPools", async () => {
    const result = await client.bigDataPools.list();
    assert.ok(result.value && result.value.length >= 1, "Result doesn't contain any values");
  });

  it("should get a bigDataPool by name", async () => {
    const expectedPoolName = "testsparkpool";
    const result = await client.bigDataPools.get(expectedPoolName);
    assert.equal(result.name, expectedPoolName);
  });
});

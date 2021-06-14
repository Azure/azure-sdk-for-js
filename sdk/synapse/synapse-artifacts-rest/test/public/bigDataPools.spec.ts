import { ArtifactsClientRestClient } from "../../src";
import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("BigDataPools", () => {
  let recorder: Recorder;
  let client: ArtifactsClientRestClient;

  beforeEach(function() {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list bigDataPools", async () => {
    try {
      const result = await client.path("/bigDataPools").get();

      if (result.status !== "200") {
        throw result.body.error;
      }

      assert.ok(
        result.body?.value && result.body.value.length >= 1,
        "Result doesn't contain any values"
      );
    } catch (e) {
      console.log(e.request);
      throw e;
    }
  });

  it("should get a bigDataPool by name", async () => {
    const expectedPoolName = "testsparkpool";
    const result = await client.path("/bigDataPools/{bigDataPoolName}", expectedPoolName).get();
    if (result.status !== "200") {
      throw result.body.error;
    }
    assert.equal(result?.body?.name, expectedPoolName);
  });
});

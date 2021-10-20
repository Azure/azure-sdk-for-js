import { AccessControlRestClient } from "../../src/accessControl";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("Access Control smoke", () => {
  let recorder: Recorder;
  let client: AccessControlRestClient;

  beforeEach(function() {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list roles", async () => {
    const result = await client.path("/roleDefinitions").get();

    if (result.status !== "200") {
      assert.fail(`Unexpected status ${result.status}`);
    }

    assert.isTrue(result.body.length > 0);
  });
});

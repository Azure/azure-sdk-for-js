import { AccessControlClient } from "../../src/accessControlClient";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("Access Control smoke", () => {
  let recorder: Recorder;
  let client: AccessControlClient;

  beforeEach(async function() {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list roles", async () => {
    const result = await client.roleDefinitions.listRoleDefinitions();
    assert.isTrue(result.length > 0);
  });
});

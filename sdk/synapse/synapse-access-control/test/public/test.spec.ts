import { AccessControlClient } from "../../src/accessControlClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

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

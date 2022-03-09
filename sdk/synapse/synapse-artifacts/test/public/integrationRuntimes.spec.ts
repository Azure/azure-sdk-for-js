import { ArtifactsClient } from "../../src/artifactsClient";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("IntegrationRuntimes", () => {
  let recorder: Recorder;
  let client: ArtifactsClient;

  beforeEach(function() {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list integrationRuntimes", async () => {
    const result = await client.integrationRuntimes.list();
    if (result.value.length) {
      assert.equal(result.value[0].name, "AutoResolveIntegrationRuntime");
    } else {
      assert.fail("No integrationRuntimes found");
    }
  });

  it("should get integrationRuntimes", async () => {
    const result = await client.integrationRuntimes.get("AutoResolveIntegrationRuntime");
    assert.equal(result.name, "AutoResolveIntegrationRuntime");
  });
});

import { ArtifactsClientRestClient } from "../../src/artifactsClient";
import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("IntegrationRuntimes", () => {
  let recorder: Recorder;
  let client: ArtifactsClientRestClient;

  beforeEach(function() {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list integrationRuntimes", async () => {
    const result = await client.path("/integrationRuntimes").get();
    if (result.status !== "200") {
      throw new Error(`Unexpected status code ${result.status}`);
    }

    const integrationRuntimes = result.body.value;

    if (integrationRuntimes) {
      assert.equal(integrationRuntimes[0].name, "AutoResolveIntegrationRuntime");
    } else {
      assert.fail("No integrationRuntimes found");
    }
  });

  it("should get integrationRuntimes", async () => {
    const runtimeName = "AutoResolveIntegrationRuntime";
    const result = await client
      .path("/integrationRuntimes/{integrationRuntimeName}", runtimeName)
      .get();

    if (result.status !== "200") {
      throw new Error(`Unexpected status code ${result.status}`);
    }

    assert.equal(result.body.name, "AutoResolveIntegrationRuntime");
  });
});

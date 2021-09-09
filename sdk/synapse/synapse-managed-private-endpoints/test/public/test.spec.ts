import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { ManagedPrivateEndpoint, ManagedPrivateEndpointsClient } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("Synapse Managed Private Endpoints", () => {
  let recorder: Recorder;
  let client: ManagedPrivateEndpointsClient;

  beforeEach(function() {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list endpoints", async () => {
    const result = client.managedPrivateEndpoints.list("default");
    let endpoints: ManagedPrivateEndpoint[] = [];

    for await (const endpoint of result) {
      endpoints.push(endpoint);
    }
    assert.isTrue(endpoints.length > 0);
  });
});

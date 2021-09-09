import { MonitoringClient } from "../../src/monitoringClient";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";

describe("Access Control smoke", () => {
  let recorder: Recorder;
  let client: MonitoringClient;

  beforeEach(function() {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list roles", async () => {
    const result = await client.monitoring.getSparkJobList();
    assert.isTrue((result.sparkJobs || []).length > 0);
  });
});

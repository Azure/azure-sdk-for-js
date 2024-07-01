import { MonitoringClient } from "../../src/monitoringClient";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "@azure-tools/test-utils";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("Access Control smoke", () => {
  let recorder: Recorder;
  let client: MonitoringClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this.currentTest);
    client = createClient({ recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list roles", async function () {
    const result = await client.monitoring.getSparkJobList();
    assert.isNumber(result.nJobs);
  });
});

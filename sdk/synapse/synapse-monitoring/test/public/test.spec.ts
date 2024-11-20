import { MonitoringClient } from "../../src/monitoringClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "@azure-tools/test-utils";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { Context } from "mocha";

describe("Access Control smoke", () => {
  let recorder: Recorder;
  let client: MonitoringClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
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

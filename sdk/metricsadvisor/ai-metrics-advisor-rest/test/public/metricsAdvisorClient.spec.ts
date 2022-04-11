import { Recorder } from "@azure-tools/test-recorder";
import assert from "assert";
import { Context } from "mocha";
import { GeneratedClient, paginatePost } from "../../src";
import { createMAClient } from "./metricsAdvisorAdminClient.spec";
import { createRecorder } from "./utils/recordedClient";

describe("Metrics Advisor Client", () => {
  let recorder: Recorder;
  let client: GeneratedClient;
  let existingConfigId: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createMAClient(true, recorder);
    existingConfigId = process.env["METRICS_ADVISOR_EXISTING_CONFIG_ID"] || "";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("could list ingestion status by config id", async function () {
    const initResponse = await client.getDataFeedIngestionStatus(existingConfigId, {
      body: {
        startTime: new Date(Date.UTC(2020, 9, 30)),
        endTime: new Date(Date.UTC(2023, 9, 30))
      },
      queryParameters: {
        $maxpagesize: 100
      }
    });
    const iterator = paginatePost(client, initResponse);
    let count = 0;
    for await (const farmer of iterator) {
      assert.ok(!!farmer);
      count++;
    }
    assert.ok(count > 0);
  });
});

import { ClientOptions } from "@azure-rest/core-client";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder } from "@azure-tools/test-recorder";
import assert from "assert";
import { Context } from "mocha";
import { createBatchClient, MetricsAdvisorClient, MetricsAdvisorKeyCredential, paginatePost } from "../../src";
import { createRecorder } from "./utils/recordedClient";

function createMAClient(isAAD: boolean = true, recorder: Recorder, options?: ClientOptions): MetricsAdvisorClient.Client.MetricsAdvisorClient {
  let credential;
  if (isAAD) {
    credential = createTestCredential();
  } else {
    const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
    const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
    credential = {
      key: apiKey,
      subscriptionKey: subscriptionKey
    } as MetricsAdvisorKeyCredential;
  }
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  return createBatchClient(endpoint, credential, recorder.configureClientOptions({ options }));
}
describe("[Batch Generation] Metrics Advisor Client", () => {
  let recorder: Recorder;
  let client: MetricsAdvisorClient.Client.MetricsAdvisorClient;
  let existingConfigId: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createMAClient(false, recorder);
    existingConfigId = process.env["METRICS_ADVISOR_EXISTING_CONFIG_ID"] || "";
    existingConfigId = existingConfigId;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("could list incidents by config id", async function () {
    const initResponse = await client.getIncidentsByAnomalyDetectionConfiguration(existingConfigId, {
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
    for await (const inc of iterator) {
      assert.ok(!!inc);
      count++;
    }
    assert.ok(count > 0);
  });

  it("could list alters by config id", async function () {
    const initResponse = await client.getAlertsByAnomalyAlertingConfiguration(existingConfigId, {
      body: {
        startTime: new Date(Date.UTC(2020, 9, 30)),
        endTime: new Date(Date.UTC(2023, 9, 30)),
        timeMode: "AnomalyTime"
      },
      queryParameters: {
        $maxpagesize: 100
      }
    });
    // console.dir(initResponse);
    const iterator = paginatePost(client, initResponse);
    let count = 0;
    for await (const inc of iterator) {
      assert.ok(!!inc);
      count++;
    }
    assert.ok(count > 0);
  });
});

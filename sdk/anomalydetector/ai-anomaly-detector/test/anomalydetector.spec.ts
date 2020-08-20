import { assert } from "chai";
import { Recorder } from "@azure/test-utils-recorder";
import { AnomalyDetectorClient } from "../src/AnomalyDetectorClient";
import { AzureKeyCredential } from "@azure/core-auth";
import { createRecordedAnomalyDetectorClient, testEnv } from "./utils/recordedClients";
import {
  testPointSeries1,
  expectedEntireResult,
  testTrendPointseries,
  changeExpectedResult
} from "./testData";
import { LastDetectResponse, ChangePointDetectResponse } from "../src";

describe("AnomalyDetectorClient", () => {
  let client: AnomalyDetectorClient;
  let recorder: Recorder;
  const apiKey = new AzureKeyCredential(testEnv.ANOMALY_DETECTOR_API_KEY);

  beforeEach(function() {
    ({ recorder, client } = createRecordedAnomalyDetectorClient(this, apiKey));
  });

  afterEach(async function() {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("should get result for entireDetect", async () => {
    const result = await client.entireDetect(testPointSeries1);
    assert.deepEqual(result, expectedEntireResult);
  });

  it("should get result for  lastDetect", async () => {
    const expected: LastDetectResponse = {
      expectedValue: 809.5658016931228,
      isAnomaly: false,
      isNegativeAnomaly: false,
      isPositiveAnomaly: false,
      lowerMargin: 40.47829008465612,
      period: 12,
      suggestedWindow: 49,
      upperMargin: 40.47829008465612
    };

    const result = await client.lastDetect(testPointSeries1);
    assert.deepEqual(result, expected);
  });

  it("should get result for changePointDetect", async () => {
    const result: ChangePointDetectResponse = await client.changePointDetect(testTrendPointseries);
    assert.deepEqual(result, changeExpectedResult);
  });
});

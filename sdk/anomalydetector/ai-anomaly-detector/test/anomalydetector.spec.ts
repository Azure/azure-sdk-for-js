// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
import { DetectLastPointResponse, DetectChangePointResponse } from "../src";

describe("AnomalyDetectorClient", () => {
  let client: AnomalyDetectorClient;
  let recorder: Recorder;
  const apiKey = new AzureKeyCredential(testEnv.ANOMALY_DETECTOR_API_KEY);

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    ({ recorder, client } = createRecordedAnomalyDetectorClient(this, apiKey));
  });

  afterEach(async function() {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("should get result for entireDetect", async () => {
    const result = await client.detectEntireSeries(testPointSeries1);
    assert.deepEqual(result, expectedEntireResult);
  });

  it("should get result for  lastDetect", async () => {
    const expected: DetectLastPointResponse = {
      expectedValue: 809.5658016931228,
      isAnomaly: false,
      isNegativeAnomaly: false,
      isPositiveAnomaly: false,
      lowerMargin: 40.47829008465612,
      period: 12,
      suggestedWindow: 49,
      upperMargin: 40.47829008465612
    };

    const result = await client.detectLastPoint(testPointSeries1);
    assert.deepEqual(result, expected);
  });

  it("should get result for changePointDetect", async () => {
    const result: DetectChangePointResponse = await client.detectChangePoint(testTrendPointseries);
    assert.deepEqual(result, changeExpectedResult);
  });
});

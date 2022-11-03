// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import { Context } from "mocha";
import AnomalyDetector from "../../src/anomalyDetectorRest";
import {
  DetectUnivariateChangePointParameters,
  DetectUnivariateEntireSeriesParameters,
} from "../../src/parameters";
import {
  changeExpectedResult,
  expectedEntireResult,
  testPointSeries1,
  testTrendPointseries,
} from "./testData";
import { createRecorder } from "./utils/recordedClient";

describe("AnomalyDetectorClient", () => {
  let recorder: Recorder;
  const apiKey = process.env["ANOMALY_DETECTOR_API_KEY"] || "";
  const credential = new AzureKeyCredential(apiKey);
  const endpoint = process.env["ANOMALY_DETECTOR_ENDPOINT"] || "";
  const apiVersion = "v1.1";
  const client = AnomalyDetector(endpoint, apiVersion, credential);
  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("should get result for entireDetect", async () => {
    const options: DetectUnivariateEntireSeriesParameters = {
      body: {
        granularity: "daily",
        imputeMode: "auto",
        maxAnomalyRatio: 0.25,
        sensitivity: 95,
        series: testPointSeries1,
      },
      headers: { "Content-Type": "application/json" },
    };
    const result = await client.path("/timeseries/entire/detect").post(options);
    assert.deepEqual(result.body, expectedEntireResult);
  });

  it("should get result for lastDetect", async () => {
    const expected = {
      expectedValue: 809.5658016931228,
      isAnomaly: false,
      isNegativeAnomaly: false,
      isPositiveAnomaly: false,
      lowerMargin: 40.47829008465612,
      period: 12,
      suggestedWindow: 49,
      upperMargin: 40.47829008465612,
      severity: 0,
    };
    const options: DetectUnivariateEntireSeriesParameters = {
      body: {
        granularity: "daily",
        imputeMode: "auto",
        maxAnomalyRatio: 0.25,
        sensitivity: 95,
        series: testPointSeries1,
      },
      headers: { "Content-Type": "application/json" },
    };

    // get last detect result
    const result = await client.path("/timeseries/last/detect").post(options);
    assert.deepEqual(result.body, expected);
  });

  it("should get result for changePointDetect", async () => {
    const options: DetectUnivariateChangePointParameters = {
      body: {
        granularity: "daily",
        series: testTrendPointseries,
      },
      headers: { "Content-Type": "application/json" },
    };
    const result = await client.path("/timeseries/changepoint/detect").post(options);
    assert.deepEqual(result.body, changeExpectedResult);
  });
});

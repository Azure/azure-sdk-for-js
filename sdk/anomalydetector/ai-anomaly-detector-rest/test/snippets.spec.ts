// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { readFileSync } from "node:fs";
import { parse } from "csv-parse/sync";
import { AzureKeyCredential } from "@azure/core-auth";
import type {
  DetectUnivariateChangePointParameters,
  DetectUnivariateEntireSeriesParameters,
  DetectUnivariateLastPointParameters,
  TimeSeriesPoint,
} from "@azure-rest/ai-anomaly-detector";
import AnomalyDetector, { isUnexpected } from "@azure-rest/ai-anomaly-detector";
import { setLogLevel } from "@azure/logger";

describe("snippets", () => {
  it("batch_detection", async () => {
    const apiKey = process.env["ANOMALY_DETECTOR_API_KEY"] || "";
    const endpoint = process.env["ANOMALY_DETECTOR_ENDPOINT"] || "";
    const timeSeriesDataPath = "./samples-dev/example-data/request-data.csv";
    // @ts-preserve-whitespace
    function read_series_from_file(path: string): Array<TimeSeriesPoint> {
      const result = Array<TimeSeriesPoint>();
      const input = readFileSync(path).toString();
      const parsed = parse(input, { skip_empty_lines: true });
      parsed.forEach(function (e: Array<string>) {
        result.push({ timestamp: new Date(e[0]), value: Number(e[1]) });
      });
      return result;
    }
    // @ts-preserve-whitespace
    // create client
    const credential = new AzureKeyCredential(apiKey);
    const client = AnomalyDetector(endpoint, credential);
    // @ts-preserve-whitespace
    // construct request
    const options: DetectUnivariateEntireSeriesParameters = {
      body: {
        granularity: "daily",
        imputeMode: "auto",
        maxAnomalyRatio: 0.25,
        sensitivity: 95,
        series: read_series_from_file(timeSeriesDataPath),
      },
      headers: { "Content-Type": "application/json" },
    };
    // @ts-preserve-whitespace
    // get last detect result
    const result = await client.path("/timeseries/entire/detect").post(options);
    if (isUnexpected(result)) {
      throw result;
    }
    // @ts-preserve-whitespace
    if (result.body.isAnomaly) {
      result.body.isAnomaly.forEach(function (anomaly, index) {
        if (anomaly === true) {
          console.log(index);
        }
      });
    } else {
      console.log("There is no anomaly detected from the series.");
    }
  });

  it("streaming_detection", async () => {
    const apiKey = process.env["ANOMALY_DETECTOR_API_KEY"] || "";
    const endpoint = process.env["ANOMALY_DETECTOR_ENDPOINT"] || "";
    const timeSeriesDataPath = "./samples-dev/example-data/request-data.csv";
    // @ts-preserve-whitespace
    function read_series_from_file(path: string): Array<TimeSeriesPoint> {
      const result = Array<TimeSeriesPoint>();
      const input = readFileSync(path).toString();
      const parsed = parse(input, { skip_empty_lines: true });
      parsed.forEach(function (e: Array<string>) {
        result.push({ timestamp: new Date(e[0]), value: Number(e[1]) });
      });
      return result;
    }
    // @ts-preserve-whitespace
    // create client
    const credential = new AzureKeyCredential(apiKey);
    const client = AnomalyDetector(endpoint, credential);
    // @ts-preserve-whitespace
    // construct request
    const options: DetectUnivariateLastPointParameters = {
      body: {
        granularity: "daily",
        imputeFixedValue: 800,
        imputeMode: "fixed",
        maxAnomalyRatio: 0.25,
        sensitivity: 95,
        series: read_series_from_file(timeSeriesDataPath),
      },
      headers: { "Content-Type": "application/json" },
    };
    // @ts-preserve-whitespace
    // get last detect result
    const result = await client.path("/timeseries/last/detect").post(options);
    if (isUnexpected(result)) {
      throw result;
    }
    // @ts-preserve-whitespace
    if (result.body.isAnomaly) {
      console.log("The latest point is detected as anomaly.");
    } else {
      console.log("The latest point is not detected as anomaly.");
    }
  });

  it("detect_change_points", async () => {
    const apiKey = process.env["ANOMALY_DETECTOR_API_KEY"] || "";
    const endpoint = process.env["ANOMALY_DETECTOR_ENDPOINT"] || "";
    const timeSeriesDataPath = "./samples-dev/example-data/request-data.csv";
    // @ts-preserve-whitespace
    function read_series_from_file(path: string): Array<TimeSeriesPoint> {
      const result = Array<TimeSeriesPoint>();
      const input = readFileSync(path).toString();
      const parsed = parse(input, { skip_empty_lines: true });
      parsed.forEach(function (e: Array<string>) {
        result.push({ timestamp: new Date(e[0]), value: Number(e[1]) });
      });
      return result;
    }
    // @ts-preserve-whitespace
    const credential = new AzureKeyCredential(apiKey);
    const client = AnomalyDetector(endpoint, credential);
    const options: DetectUnivariateChangePointParameters = {
      body: {
        granularity: "daily",
        series: read_series_from_file(timeSeriesDataPath),
      },
      headers: { "Content-Type": "application/json" },
    };
    const result = await client.path("/timeseries/changepoint/detect").post(options);
    if (isUnexpected(result)) {
      throw result;
    }
    // @ts-preserve-whitespace
    if (result.body.isChangePoint === undefined) throw new Error("Empty isChangePoint");
    if (
      result.body.isChangePoint.some(function (changePoint) {
        return changePoint === true;
      })
    ) {
      console.log("Change points were detected from the series at index:");
      result.body.isChangePoint.forEach(function (changePoint, index) {
        if (changePoint === true) console.log(index);
      });
    } else {
      console.log("There is no change point detected from the series.");
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});

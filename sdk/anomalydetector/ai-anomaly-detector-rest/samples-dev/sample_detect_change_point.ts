// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to detect change points on entire series.
 *
 * @summary detects change points.
 */

import type {
  DetectUnivariateChangePointParameters,
  TimeSeriesPoint,
} from "@azure-rest/ai-anomaly-detector";
import AnomalyDetector, { isUnexpected } from "@azure-rest/ai-anomaly-detector";
import { AzureKeyCredential } from "@azure/core-auth";

import { parse } from "csv-parse/sync";
import fs from "node:fs";

// Load the .env file if it exists
import "dotenv/config";

// You will need to set this environment variables or edit the following values

const apiKey = process.env["ANOMALY_DETECTOR_API_KEY"] || "";
const endpoint = process.env["ANOMALY_DETECTOR_ENDPOINT"] || "";
const timeSeriesDataPath = "./samples-dev/example-data/request-data.csv";

function read_series_from_file(path: string): Array<TimeSeriesPoint> {
  const result = Array<TimeSeriesPoint>();
  const input = fs.readFileSync(path).toString();
  const parsed = parse(input, { skip_empty_lines: true });
  parsed.forEach(function (e: Array<string>) {
    result.push({ timestamp: new Date(e[0]), value: Number(e[1]) });
  });
  return result;
}

export async function main(): Promise<void> {
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

  // output:
  // Change points were detected from the series at index:
  // 20
  // 27
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

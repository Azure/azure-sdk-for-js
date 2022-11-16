// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to detect anomaly for the last point on the series.
 *
 * @summary detects anomaly for the last point on the series.
 */

import AnomalyDetector, {
  UnivariateDetectUnivariateLastPointParameters,
  isUnexpected,
  TimeSeriesPoint,
} from "@azure-rest/ai-anomaly-detector";
import { AzureKeyCredential } from "@azure/core-auth";

import { parse } from "csv-parse/sync";
import * as fs from "fs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const apiKey = process.env["ANOMALY_DETECTOR_API_KEY"] || "";
const endpoint = process.env["ANOMALY_DETECTOR_ENDPOINT"] || "";
const timeSeriesDataPath = "./samples-dev/example-data/request-data.csv";

function read_series_from_file(path: string): Array<TimeSeriesPoint> {
  let result = Array<TimeSeriesPoint>();
  let input = fs.readFileSync(path).toString();
  let parsed = parse(input, { skip_empty_lines: true });
  parsed.forEach(function (e: Array<string>) {
    result.push({ timestamp: new Date(e[0]), value: Number(e[1]) });
  });
  return result;
}

export async function main() {
  // create client
  const credential = new AzureKeyCredential(apiKey);
  const apiVersion = "v1.1";
  const client = AnomalyDetector(endpoint, apiVersion, credential);

  // construct request
  const options: UnivariateDetectUnivariateLastPointParameters = {
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

  // get last detect result
  const result = await client.path("/timeseries/last/detect").post(options);
  if (isUnexpected(result)) {
    throw result;
  }

  if (result.body.isAnomaly) {
    console.log("The latest point is detected as anomaly.");
  } else {
    console.log("The latest point is not detected as anomaly.");
  }
  // output
  // The latest point is not detected as anomaly.
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

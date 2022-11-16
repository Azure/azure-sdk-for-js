// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to detect anomaly for the last point on the series.
 *
 * @summary detects anomaly for the last point on the series.
 */

const AnomalyDetector = require("@azure-rest/ai-anomaly-detector").default,
  { isUnexpected } = require("@azure-rest/ai-anomaly-detector");
const { AzureKeyCredential } = require("@azure/core-auth");

const { parse } = require("csv-parse/sync");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set this environment variables or edit the following values
const apiKey = process.env["ANOMALY_DETECTOR_API_KEY"] || "";
const endpoint = process.env["ANOMALY_DETECTOR_ENDPOINT"] || "";
const timeSeriesDataPath = "./samples-dev/example-data/request-data.csv";

function read_series_from_file(path) {
  let result = Array();
  let input = fs.readFileSync(path).toString();
  let parsed = parse(input, { skip_empty_lines: true });
  parsed.forEach(function (e) {
    result.push({ timestamp: new Date(e[0]), value: Number(e[1]) });
  });
  return result;
}

async function main() {
  // create client
  const credential = new AzureKeyCredential(apiKey);
  const apiVersion = "v1.1";
  const client = AnomalyDetector(endpoint, apiVersion, credential);

  // construct request
  const options = {
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

module.exports = { main };

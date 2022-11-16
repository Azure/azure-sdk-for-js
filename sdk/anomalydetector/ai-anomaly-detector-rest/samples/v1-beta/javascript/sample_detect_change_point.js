// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to detect change points on entire series.
 *
 * @summary detects change points.
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
  const credential = new AzureKeyCredential(apiKey);
  const apiVersion = "v1.1";
  const client = AnomalyDetector(endpoint, apiVersion, credential);
  const options = {
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

module.exports = { main };

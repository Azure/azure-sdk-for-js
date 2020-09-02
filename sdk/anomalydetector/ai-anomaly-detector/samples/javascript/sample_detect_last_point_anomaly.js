// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to detect anomaly for the last point on the series.
 */

const { AnomalyDetectorClient } = require("@azure/ai-anomaly-detector");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");
const parse = require("csv-parse/lib/sync");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set this environment variables in .env file or edit the following values
const apiKey = process.env["API_KEY"] || "";
const endpoint = process.env["ENDPOINT"] || "";
const timeSeriesDataPath = "../example-data/request-data.csv";

function read_series_from_file(path) {
  let result = Array();
  let input = fs.readFileSync(path).toString();
  let parsed = parse(input, { skip_empty_lines: true });
  parsed.forEach(function(e) {
    result.push({ timestamp: new Date(e[0]), value: Number(e[1]) });
  });
  return result;
}

async function main() {
  // create client
  const client = new AnomalyDetectorClient(endpoint, new AzureKeyCredential(apiKey));

  // construct request
  const request = {
    series: read_series_from_file(timeSeriesDataPath),
    granularity: "daily"
  };

  // get last detect result
  const result = client.detectLastPoint(request);

  if (result.isAnomaly) {
    console.log("The latest point is detected as anomaly.");
  } else {
    console.log("The latest point is not detected as anomaly.");
  }
  // output:
  // The latest point is not detected as anomaly.
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

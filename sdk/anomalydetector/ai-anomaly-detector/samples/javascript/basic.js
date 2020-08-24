// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to send an entireDetect operation request
 */

const { AnomalyDetectorClient, AzureKeyCredential } = require("../../dist");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set this environment variables or edit the following values
const apiKey = process.env["API_KEY"] || "";
const endpoint = process.env["ENDPOINT"] || "";

const testData = {
  series: [
    {
      value: 116168307,
      timestamp: new Date("2019-01-01T00:00:00Z")
    },
    {
      value: 116195090,
      timestamp: new Date("2019-01-02T00:00:00Z")
    },
    {
      value: 116219292,
      timestamp: new Date("2019-01-03T00:00:00Z")
    },
    {
      value: 116218498,
      timestamp: new Date("2019-01-04T00:00:00Z")
    },
    {
      value: 116217643,
      timestamp: new Date("2019-01-05T00:00:00Z")
    },
    {
      value: 116234219,
      timestamp: new Date("2019-01-06T00:00:00Z")
    },
    {
      value: 116291400,
      timestamp: new Date("2019-01-07T00:00:00Z")
    }
  ],
  granularity: "daily",
  customInterval: 1,
  stableTrendWindow: 5,
  threshold: 0.9,
  period: 0
};

async function main() {
  const client = new AnomalyDetectorClient(endpoint, new AzureKeyCredential(apiKey));

  const result = await client.entireDetect(testData);

  console.log(result);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

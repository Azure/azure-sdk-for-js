// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all threat intelligence indicators.
 *
 * @summary get all threat intelligence indicators.
 * x-ms-original-file: 2025-07-01-preview/threatintelligence/GetThreatIntelligence.json
 */
async function getAllThreatIntelligenceIndicators() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.threatIntelligenceIndicators.list("myRg", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllThreatIntelligenceIndicators();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Analyze a custom hostname.
 *
 * @summary description for Analyze a custom hostname.
 * x-ms-original-file: 2025-05-01/AnalyzeCustomHostNameSlot.json
 */
async function analyzeCustomHostnameForSlot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.analyzeCustomHostnameSlot(
    "testrg123",
    "sitef6141",
    "staging",
  );
  console.log(result);
}

async function main() {
  await analyzeCustomHostnameForSlot();
}

main().catch(console.error);

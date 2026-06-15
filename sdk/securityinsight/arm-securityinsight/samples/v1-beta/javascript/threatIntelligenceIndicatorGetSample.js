// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to view a threat intelligence indicator by name.
 *
 * @summary view a threat intelligence indicator by name.
 * x-ms-original-file: 2025-07-01-preview/threatintelligence/GetThreatIntelligenceById.json
 */
async function viewAThreatIntelligenceIndicatorByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.threatIntelligenceIndicator.get(
    "myRg",
    "myWorkspace",
    "e16ef847-962e-d7b6-9c8b-a33e4bd30e47",
  );
  console.log(result);
}

async function main() {
  await viewAThreatIntelligenceIndicatorByName();
}

main().catch(console.error);

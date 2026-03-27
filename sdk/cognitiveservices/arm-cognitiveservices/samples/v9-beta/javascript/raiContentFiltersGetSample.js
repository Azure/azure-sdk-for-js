// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Content Filters by Name.
 *
 * @summary get Content Filters by Name.
 * x-ms-original-file: 2026-01-15-preview/GetRaiContentFilter.json
 */
async function getRaiContentFilters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiContentFilters.get("WestUS", "IndirectAttack");
  console.log(result);
}

async function main() {
  await getRaiContentFilters();
}

main().catch(console.error);

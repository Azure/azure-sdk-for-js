// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgriculturePlatformClient } = require("@azure/arm-agricultureplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the list of available agri solutions.
 *
 * @summary returns the list of available agri solutions.
 * x-ms-original-file: 2024-06-01-preview/AgriService_ListAvailableSolutions_MaximumSet_Gen.json
 */
async function agriServiceListAvailableSolutions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "83D293F5-DEFD-4D48-B120-1DC713BE338A";
  const client = new AgriculturePlatformClient(credential, subscriptionId);
  const result = await client.agriService.listAvailableSolutions("rgopenapi", "abc123");
  console.log(result);
}

async function main() {
  await agriServiceListAvailableSolutions();
}

main().catch(console.error);

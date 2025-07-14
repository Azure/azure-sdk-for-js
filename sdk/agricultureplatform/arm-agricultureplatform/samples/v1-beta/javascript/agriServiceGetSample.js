// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgriculturePlatformClient } = require("@azure/arm-agricultureplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AgriServiceResource
 *
 * @summary get a AgriServiceResource
 * x-ms-original-file: 2024-06-01-preview/AgriService_Get_MaximumSet_Gen.json
 */
async function agriServiceGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "83D293F5-DEFD-4D48-B120-1DC713BE338A";
  const client = new AgriculturePlatformClient(credential, subscriptionId);
  const result = await client.agriService.get("rgopenapi", "abc123");
  console.log(result);
}

async function main() {
  await agriServiceGet();
}

main().catch(console.error);

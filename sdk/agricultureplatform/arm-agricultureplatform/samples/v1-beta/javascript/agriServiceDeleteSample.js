// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgriculturePlatformClient } = require("@azure/arm-agricultureplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a AgriServiceResource
 *
 * @summary delete a AgriServiceResource
 * x-ms-original-file: 2024-06-01-preview/AgriService_Delete_MaximumSet_Gen.json
 */
async function agriServiceDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "83D293F5-DEFD-4D48-B120-1DC713BE338A";
  const client = new AgriculturePlatformClient(credential, subscriptionId);
  await client.agriService.delete("rgopenapi", "abc123");
}

async function main() {
  await agriServiceDelete();
}

main().catch(console.error);

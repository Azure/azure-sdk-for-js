// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an Action resource for a given location.
 *
 * @summary get an Action resource for a given location.
 * x-ms-original-file: 2026-05-01-preview/Actions_Get.json
 */
async function getAnActionForWestus2Location() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.actions.get("westus2", "microsoft-compute-shutdown");
  console.log(result);
}

async function main() {
  await getAnActionForWestus2Location();
}

main().catch(console.error);

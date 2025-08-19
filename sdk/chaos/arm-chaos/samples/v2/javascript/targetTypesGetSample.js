// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Target Type resources for given location.
 *
 * @summary get a Target Type resources for given location.
 * x-ms-original-file: 2025-01-01/TargetTypes_Get.json
 */
async function getATargetTypeForWestus2Location() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.targetTypes.get("westus2", "Microsoft-Agent");
  console.log(result);
}

async function main() {
  await getATargetTypeForWestus2Location();
}

main().catch(console.error);

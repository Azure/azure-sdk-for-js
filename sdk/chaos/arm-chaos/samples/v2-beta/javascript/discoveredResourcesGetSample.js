// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a discovered resource.
 *
 * @summary get a discovered resource.
 * x-ms-original-file: 2026-05-01-preview/DiscoveredResources_Get.json
 */
async function getADiscoveredResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.discoveredResources.get(
    "exampleRG",
    "exampleWorkspace",
    "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  );
  console.log(result);
}

async function main() {
  await getADiscoveredResource();
}

main().catch(console.error);

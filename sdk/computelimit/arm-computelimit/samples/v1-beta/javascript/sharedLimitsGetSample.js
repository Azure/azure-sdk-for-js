// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of a compute limit shared by the host subscription with its guest subscriptions.
 *
 * @summary gets the properties of a compute limit shared by the host subscription with its guest subscriptions.
 * x-ms-original-file: 2025-08-15/SharedLimits_Get.json
 */
async function getASharedLimit() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.sharedLimits.get("eastus", "StandardDSv3Family");
  console.log(result);
}

async function main() {
  await getASharedLimit();
}

main().catch(console.error);

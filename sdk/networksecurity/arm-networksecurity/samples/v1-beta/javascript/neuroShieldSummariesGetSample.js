// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkSecurityManagementClient } = require("@azure/arm-networksecurity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the aggregate fleet overview singleton for a NeuroShield resource.
 *
 * @summary gets the aggregate fleet overview singleton for a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldSummaries_Get.json
 */
async function getANeuroShieldFleetSummary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldSummaries.get("myResourceGroup", "myNeuroShield");
  console.log(result);
}

async function main() {
  await getANeuroShieldFleetSummary();
}

main().catch(console.error);

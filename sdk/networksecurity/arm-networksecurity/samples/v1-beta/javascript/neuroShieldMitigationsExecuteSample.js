// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkSecurityManagementClient } = require("@azure/arm-networksecurity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to approves and queues a mitigation for execution.
 *
 * @summary approves and queues a mitigation for execution.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Execute.json
 */
async function executeMitigation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldMitigations.execute(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
    "mitigation-01",
  );
  console.log(result);
}

async function main() {
  await executeMitigation();
}

main().catch(console.error);

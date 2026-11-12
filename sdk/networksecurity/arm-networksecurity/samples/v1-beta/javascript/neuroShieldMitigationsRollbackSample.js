// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkSecurityManagementClient } = require("@azure/arm-networksecurity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to rolls back a mitigation when rollback is available.
 *
 * @summary rolls back a mitigation when rollback is available.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Rollback.json
 */
async function rollbackMitigation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldMitigations.rollback(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
    "mitigation-01",
  );
  console.log(result);
}

async function main() {
  await rollbackMitigation();
}

main().catch(console.error);

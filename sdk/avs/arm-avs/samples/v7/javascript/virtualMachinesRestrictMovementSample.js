// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enable or disable DRS-driven VM movement restriction
 *
 * @summary enable or disable DRS-driven VM movement restriction
 * x-ms-original-file: 2025-09-01/VirtualMachines_RestrictMovement.json
 */
async function virtualMachinesRestrictMovement() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.virtualMachines.restrictMovement("group1", "cloud1", "cluster1", "vm-209", {
    restrictMovement: "Enabled",
  });
}

async function main() {
  await virtualMachinesRestrictMovement();
}

main().catch(console.error);

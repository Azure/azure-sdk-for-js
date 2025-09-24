// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to enable or disable DRS-driven VM movement restriction
 *
 * @summary enable or disable DRS-driven VM movement restriction
 * x-ms-original-file: 2024-09-01/VirtualMachines_RestrictMovement.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function virtualMachinesRestrictMovement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.virtualMachines.restrictMovement("group1", "cloud1", "cluster1", "vm-209", {
    restrictMovement: "Enabled",
  });
}

async function main(): Promise<void> {
  await virtualMachinesRestrictMovement();
}

main().catch(console.error);

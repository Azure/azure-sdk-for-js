// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a hybrid machine.
 *
 * @summary the operation to update a hybrid machine.
 * x-ms-original-file: 2025-09-16-preview/machine/Machines_Update.json
 */
async function updateAMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machines.update("myResourceGroup", "myMachine", {
    identity: { type: "SystemAssigned" },
    identityKeyStore: "TPM",
    locationData: { name: "Redmond" },
    osProfile: {
      linuxConfiguration: { assessmentMode: "ImageDefault", patchMode: "Manual" },
      windowsConfiguration: {
        assessmentMode: "ImageDefault",
        enableHotpatching: true,
        patchMode: "AutomaticByPlatform",
      },
    },
    parentClusterResourceId:
      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.AzureStackHCI/clusters/myAzureStackHCICluster",
    privateLinkScopeResourceId:
      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.HybridCompute/privateLinkScopes/privateLinkScopeName",
    tpmEkCertificate: "string",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAMachine();
}

main().catch(console.error);

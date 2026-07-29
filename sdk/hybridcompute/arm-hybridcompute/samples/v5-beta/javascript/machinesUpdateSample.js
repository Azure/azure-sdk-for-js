// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update a hybrid machine.
 *
 * @summary the operation to update a hybrid machine.
 * x-ms-original-file: 2026-06-16-preview/machine/Machines_Update.json
 */
async function updateAMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
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
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.AzureStackHCI/clusters/myAzureStackHCICluster",
    privateLinkScopeResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.HybridCompute/privateLinkScopes/privateLinkScopeName",
    tpmEkCertificate: "string",
  });
  console.log(result);
}

async function main() {
  await updateAMachine();
}

main().catch(console.error);

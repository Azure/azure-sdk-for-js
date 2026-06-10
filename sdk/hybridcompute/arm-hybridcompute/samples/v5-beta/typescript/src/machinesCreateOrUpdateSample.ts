// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a hybrid machine. Please note some properties can be set only during machine creation.
 *
 * @summary the operation to create or update a hybrid machine. Please note some properties can be set only during machine creation.
 * x-ms-original-file: 2025-09-16-preview/machine/Machines_CreateOrUpdate.json
 */
async function createOrUpdateAMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machines.createOrUpdate("myResourceGroup", "myMachine", {
    identity: { type: "SystemAssigned" },
    location: "eastus2euap",
    clientPublicKey: "string",
    identityKeyStore: "TPM",
    locationData: { name: "Redmond" },
    osProfile: { windowsConfiguration: { enableHotpatching: true } },
    parentClusterResourceId:
      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.AzureStackHCI/clusters/myAzureStackHCICluster",
    privateLinkScopeResourceId:
      "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.HybridCompute/privateLinkScopes/privateLinkScopeName",
    tpmEkCertificate: "string",
    vmId: "b7a098cc-b0b8-46e8-a205-62f301a62a8f",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAMachine();
}

main().catch(console.error);

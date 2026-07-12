// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a compute associated with the Cognitive Services account.
 *
 * @summary creates or updates a compute associated with the Cognitive Services account.
 * x-ms-original-file: 2026-05-15-preview/PutCompute.json
 */
async function putCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.computes.createOrUpdate(
    "rgcognitiveservices",
    "myAccount",
    "myCompute",
    {
      properties: {
        computeType: "Cluster",
        pools: [
          { name: "default", vmPriority: "Regular", instanceType: "Standard_DS3_v2", nodeCount: 2 },
        ],
        subnetArmId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/rgcognitiveservices/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/default",
      },
      location: "eastus",
      identity: { type: "None" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a compute associated with the Cognitive Services account.
 *
 * @summary creates or updates a compute associated with the Cognitive Services account.
 * x-ms-original-file: 2026-05-15-preview/PutContainerInstanceCompute.json
 */
async function putContainerInstanceCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.computes.createOrUpdate(
    "rgcognitiveservices",
    "myAccount",
    "myContainerInstance",
    {
      properties: {
        computeType: "ContainerInstance",
        targetClusterId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/rgcognitiveservices/providers/Microsoft.CognitiveServices/accounts/myAccount/computes/myCluster",
        imageLink: "mcr.microsoft.com/azureml/curated/pytorch-gpu:latest",
        idleTimeBeforeShutdown: "PT30M",
        sshSettings: {
          sshPublicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQ...",
          adminEnabled: true,
        },
      },
      location: "eastus",
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/rgcognitiveservices/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity":
            {},
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putCompute();
  await putContainerInstanceCompute();
}

main().catch(console.error);

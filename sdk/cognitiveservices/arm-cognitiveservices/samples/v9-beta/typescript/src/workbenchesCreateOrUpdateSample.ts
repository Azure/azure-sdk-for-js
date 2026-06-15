// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a workbench associated with the project.
 *
 * @summary creates or updates a workbench associated with the project.
 * x-ms-original-file: 2026-03-15-preview/PutWorkbench.json
 */
async function putWorkbench(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.workbenches.createOrUpdate(
    "rgcognitiveservices",
    "myAccount",
    "myProject",
    "myWorkbench",
    {
      properties: {
        targetClusterId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/rgcognitiveservices/providers/Microsoft.CognitiveServices/accounts/myAccount/computes/myCluster",
        imageLink: "mcr.microsoft.com/azureml/curated/pytorch-gpu:latest",
        idleTimeBeforeShutdown: "PT30M",
        datasetId: "dataset-12345",
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
  await putWorkbench();
}

main().catch(console.error);

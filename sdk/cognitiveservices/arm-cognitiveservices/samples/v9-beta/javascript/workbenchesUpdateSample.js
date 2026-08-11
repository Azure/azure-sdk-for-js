// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a workbench associated with the project.
 *
 * @summary updates a workbench associated with the project.
 * x-ms-original-file: 2026-05-15-preview/UpdateWorkbench.json
 */
async function updateWorkbench() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.workbenches.update(
    "rgcognitiveservices",
    "myAccount",
    "myProject",
    "myWorkbench",
    {
      properties: {
        targetClusterId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/rgcognitiveservices/providers/Microsoft.CognitiveServices/accounts/myAccount/computes/myCluster",
        imageLink: "mcr.microsoft.com/azureml/curated/pytorch-gpu:v2",
        idleTimeBeforeShutdown: "PT1H",
        datasetId: "dataset-67890",
        sshSettings: {
          sshPublicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQ...",
          adminEnabled: true,
        },
      },
      tags: { environment: "production" },
    },
  );
  console.log(result);
}

async function main() {
  await updateWorkbench();
}

main().catch(console.error);

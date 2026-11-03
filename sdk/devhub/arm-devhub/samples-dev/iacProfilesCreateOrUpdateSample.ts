// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a IacProfile
 *
 * @summary creates or updates a IacProfile
 * x-ms-original-file: 2025-03-01-preview/IacProfile_CreateOrUpdate.json
 */
async function createIacProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a0a37f63-7183-4e86-9ac7-ce8036a3ed31";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.iacProfiles.createOrUpdate("resourceGroup1", "profile1", {
    location: "location1",
    githubProfile: {
      repositoryMainBranch: "main",
      repositoryName: "localtest",
      repositoryOwner: "owner",
    },
    stages: [
      { dependencies: [], gitEnvironment: "Terraform", stageName: "dev" },
      { dependencies: ["dev"], gitEnvironment: "Terraform", stageName: "qa" },
      { dependencies: ["qa"], gitEnvironment: "Terraform", stageName: "prod" },
    ],
    templates: [
      {
        instanceName: "contoso",
        instanceStage: "dev",
        sourceResourceId: "/subscriptions/xxxx/resourceGroups/xxxx",
        templateDetails: [
          { count: 1, namingConvention: "$sitid-hci", productName: "HCI" },
          { count: 1, namingConvention: "$sitid-aks", productName: "AKSarc" },
        ],
        templateName: "base",
      },
    ],
    terraformProfile: {
      storageAccountName: "hybridiac",
      storageAccountResourceGroup: "hybrid-iac",
      storageAccountSubscription: "subscription",
      storageContainerName: "hybridiac",
    },
    tags: { appname: "testApp" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createIacProfile();
}

main().catch(console.error);

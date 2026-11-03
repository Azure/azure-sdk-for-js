// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to export a template
 *
 * @summary export a template
 * x-ms-original-file: 2025-03-01-preview/IacProfile_ExportTemplate.json
 */
async function createIacProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a0a37f63-7183-4e86-9ac7-ce8036a3ed31";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.iacProfiles.export("resourceGroup1", "iacprofile", {
    instanceName: "sample",
    instanceStage: "dev",
    resourceGroupIds: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroup1",
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroup2",
    ],
    templateName: "base",
  });
  console.log(result);
}

async function main() {
  await createIacProfile();
}

main().catch(console.error);

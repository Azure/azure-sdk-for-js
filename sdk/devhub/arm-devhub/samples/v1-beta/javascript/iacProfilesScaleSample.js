// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to scale by template
 *
 * @summary scale by template
 * x-ms-original-file: 2025-03-01-preview/IacProfile_ScaleTemplate.json
 */
async function createIacProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a0a37f63-7183-4e86-9ac7-ce8036a3ed31";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.iacProfiles.scale("resourceGroup1", "iacprofile", {
    scaleRequirement: [{ numberOfStore: 10, region: "useast", stage: "dev" }],
    templateName: "base",
  });
  console.log(result);
}

async function main() {
  await createIacProfile();
}

main().catch(console.error);

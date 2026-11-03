// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a IacProfile.
 *
 * @summary gets a IacProfile.
 * x-ms-original-file: 2025-03-01-preview/IacProfile_Get.json
 */
async function getIacProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a0a37f63-7183-4e86-9ac7-ce8036a3ed31";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.iacProfiles.get("resourceGroup1", "iacprofile");
  console.log(result);
}

async function main() {
  await getIacProfile();
}

main().catch(console.error);

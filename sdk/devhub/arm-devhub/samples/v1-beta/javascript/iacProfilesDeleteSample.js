// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a IacProfile
 *
 * @summary deletes a IacProfile
 * x-ms-original-file: 2025-03-01-preview/IacProfile_Delete.json
 */
async function deleteIacProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a0a37f63-7183-4e86-9ac7-ce8036a3ed31";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  await client.iacProfiles.delete("resourceGroup1", "iacprofile");
}

async function main() {
  await deleteIacProfile();
}

main().catch(console.error);

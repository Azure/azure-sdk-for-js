// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates tags on a IacProfile.
 *
 * @summary updates tags on a IacProfile.
 * x-ms-original-file: 2025-03-01-preview/IacProfile_UpdateTags.json
 */
async function updateIacProfileTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a0a37f63-7183-4e86-9ac7-ce8036a3ed31";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.iacProfiles.updateTags("resourceGroup1", "iacprofile", {
    tags: { promote: "false", resourceEnv: "testing" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateIacProfileTags();
}

main().catch(console.error);

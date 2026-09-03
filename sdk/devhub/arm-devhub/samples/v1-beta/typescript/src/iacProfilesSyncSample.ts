// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sync template
 *
 * @summary sync template
 * x-ms-original-file: 2025-03-01-preview/IacProfile_SyncTemplate.json
 */
async function createIacProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a0a37f63-7183-4e86-9ac7-ce8036a3ed31";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  await client.iacProfiles.sync("resourceGroup1", "iacprofile");
}

async function main(): Promise<void> {
  await createIacProfile();
}

main().catch(console.error);

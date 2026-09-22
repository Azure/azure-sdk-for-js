// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to scale by template
 *
 * @summary scale by template
 * x-ms-original-file: 2025-03-01-preview/IacProfile_ScaleTemplate.json
 */
async function createIacProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a0a37f63-7183-4e86-9ac7-ce8036a3ed31";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.iacProfiles.scale("resourceGroup1", "iacprofile", {
    scaleRequirement: [{ numberOfStore: 10, region: "useast", stage: "dev" }],
    templateName: "base",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createIacProfile();
}

main().catch(console.error);

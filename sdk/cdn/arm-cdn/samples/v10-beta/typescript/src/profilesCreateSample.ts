// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new Azure Front Door Standard or Azure Front Door Premium or CDN profile with a profile name under the specified subscription and resource group.
 *
 * @summary creates a new Azure Front Door Standard or Azure Front Door Premium or CDN profile with a profile name under the specified subscription and resource group.
 * x-ms-original-file: 2025-12-01/Profiles_Create.json
 */
async function profilesCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.profiles.create("RG", "profile1", {
    location: "global",
    sku: { name: "Premium_AzureFrontDoor" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await profilesCreate();
}

main().catch(console.error);

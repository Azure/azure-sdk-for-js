// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProfileUpdateParameters } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an existing Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group.
 *
 * @summary Updates an existing Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Profiles_Update.json
 */
async function profilesUpdate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const profileUpdateParameters: ProfileUpdateParameters = {
    tags: { additionalProperties: "Tag1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.profiles.beginUpdateAndWait(
    resourceGroupName,
    profileName,
    profileUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await profilesUpdate();
}

main().catch(console.error);

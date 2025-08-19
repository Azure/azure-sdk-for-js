// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group.
 *
 * @summary Gets an Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Profiles_Get.json
 */

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function profilesGet(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.profiles.get(resourceGroupName, profileName);
  console.log(result);
}

async function main(): Promise<void> {
  await profilesGet();
}

main().catch(console.error);

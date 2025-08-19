// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an existing origin group within a profile.
 *
 * @summary Gets an existing origin group within a profile.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/AFDOriginGroups_Get.json
 */

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function afdOriginGroupsGet(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const originGroupName = "origingroup1";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOriginGroups.get(resourceGroupName, profileName, originGroupName);
  console.log(result);
}

async function main(): Promise<void> {
  await afdOriginGroupsGet();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets an existing origin group within an endpoint.
 *
 * @summary Gets an existing origin group within an endpoint.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/OriginGroups_Get.json
 */
async function originGroupsGet(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const endpointName = "endpoint1";
  const originGroupName = "originGroup1";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.originGroups.get(
    resourceGroupName,
    profileName,
    endpointName,
    originGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await originGroupsGet();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the supported optimization types for the current profile. A user can create an endpoint with an optimization type from the listed values.
 *
 * @summary Gets the supported optimization types for the current profile. A user can create an endpoint with an optimization type from the listed values.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Profiles_ListSupportedOptimizationTypes.json
 */

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function profilesListSupportedOptimizationTypes(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.profiles.listSupportedOptimizationTypes(
    resourceGroupName,
    profileName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await profilesListSupportedOptimizationTypes();
}

main().catch(console.error);

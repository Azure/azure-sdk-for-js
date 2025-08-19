// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint.
 *
 * @summary Gets an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Routes_Get.json
 */

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function routesGet(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const endpointName = "endpoint1";
  const routeName = "route1";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.routes.get(resourceGroupName, profileName, endpointName, routeName);
  console.log(result);
}

async function main(): Promise<void> {
  await routesGet();
}

main().catch(console.error);

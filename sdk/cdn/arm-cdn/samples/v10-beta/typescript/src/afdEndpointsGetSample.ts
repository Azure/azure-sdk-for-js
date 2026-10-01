// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 *
 * @summary gets an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 * x-ms-original-file: 2025-12-01/AFDEndpoints_Get.json
 */
async function afdEndpointsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdEndpoints.get("RG", "profile1", "endpoint1");
  console.log(result);
}

async function main(): Promise<void> {
  await afdEndpointsGet();
}

main().catch(console.error);

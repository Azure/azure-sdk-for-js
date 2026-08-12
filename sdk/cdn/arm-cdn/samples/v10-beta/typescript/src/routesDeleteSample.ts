// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint.
 *
 * @summary deletes an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint.
 * x-ms-original-file: 2025-12-01/Routes_Delete.json
 */
async function routesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.routes.delete("RG", "profile1", "endpoint1", "route1");
}

async function main(): Promise<void> {
  await routesDelete();
}

main().catch(console.error);

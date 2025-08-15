// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a Traffic Manager profile.
 *
 * @summary Deletes a Traffic Manager profile.
 * x-ms-original-file: specification/trafficmanager/resource-manager/Microsoft.Network/stable/2022-04-01/examples/Profile-DELETE.json
 */
async function profileDelete(): Promise<void> {
  const subscriptionId = process.env["TRAFFICMANAGER_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["TRAFFICMANAGER_RESOURCE_GROUP"] || "azuresdkfornetautoresttrafficmanager1323";
  const profileName = "azuresdkfornetautoresttrafficmanager3880";
  const credential = new DefaultAzureCredential();
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.delete(resourceGroupName, profileName);
  console.log(result);
}

async function main(): Promise<void> {
  await profileDelete();
}

main().catch(console.error);

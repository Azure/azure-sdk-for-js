// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List private link resources for given Digital Twin.
 *
 * @summary List private link resources for given Digital Twin.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/PrivateLinkResourcesList_example.json
 */

import { AzureDigitalTwinsManagementClient } from "@azure/arm-digitaltwins";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listPrivateLinkResourcesForGivenDigitalTwin(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.list(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await listPrivateLinkResourcesForGivenDigitalTwin();
}

main().catch(console.error);

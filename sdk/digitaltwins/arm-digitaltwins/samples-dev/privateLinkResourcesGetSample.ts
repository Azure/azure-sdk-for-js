// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDigitalTwinsManagementClient } from "@azure/arm-digitaltwins";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the specified private link resource for the given Digital Twin.
 *
 * @summary Get the specified private link resource for the given Digital Twin.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/PrivateLinkResourcesByGroupId_example.json
 */
async function getTheSpecifiedPrivateLinkResourceForTheGivenDigitalTwin(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const resourceId = "subResource";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(resourceGroupName, resourceName, resourceId);
  console.log(result);
}

async function main(): Promise<void> {
  await getTheSpecifiedPrivateLinkResourceForTheGivenDigitalTwin();
}

main().catch(console.error);

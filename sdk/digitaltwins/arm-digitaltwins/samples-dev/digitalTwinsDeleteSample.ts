// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDigitalTwinsManagementClient } from "@azure/arm-digitaltwins";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete a DigitalTwinsInstance.
 *
 * @summary Delete a DigitalTwinsInstance.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsDelete_example.json
 */
async function deleteADigitalTwinsInstanceResource(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwins.beginDeleteAndWait(resourceGroupName, resourceName);
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a DigitalTwinsInstance.
 *
 * @summary Delete a DigitalTwinsInstance.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsDelete_WithIdentity_example.json
 */
async function deleteADigitalTwinsInstanceResourceWithIdentity(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwins.beginDeleteAndWait(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteADigitalTwinsInstanceResource();
  await deleteADigitalTwinsInstanceResourceWithIdentity();
}

main().catch(console.error);

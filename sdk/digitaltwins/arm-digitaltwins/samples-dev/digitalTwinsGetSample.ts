// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDigitalTwinsManagementClient } from "@azure/arm-digitaltwins";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get DigitalTwinsInstances resource.
 *
 * @summary Get DigitalTwinsInstances resource.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsGet_example.json
 */
async function getADigitalTwinsInstanceResource(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwins.get(resourceGroupName, resourceName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get DigitalTwinsInstances resource.
 *
 * @summary Get DigitalTwinsInstances resource.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsGet_WithPrivateEndpointConnection_example.json
 */
async function getADigitalTwinsInstanceResourceWithAPrivateEndpointConnection(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwins.get(resourceGroupName, resourceName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get DigitalTwinsInstances resource.
 *
 * @summary Get DigitalTwinsInstances resource.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsGet_WithIdentity_example.json
 */
async function getADigitalTwinsInstanceResourceWithIdentity(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwins.get(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await getADigitalTwinsInstanceResource();
  await getADigitalTwinsInstanceResourceWithAPrivateEndpointConnection();
  await getADigitalTwinsInstanceResourceWithIdentity();
}

main().catch(console.error);

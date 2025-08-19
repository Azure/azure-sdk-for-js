// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get DigitalTwinsInstances Endpoint.
 *
 * @summary Get DigitalTwinsInstances Endpoint.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsEndpointGet_example.json
 */

import { AzureDigitalTwinsManagementClient } from "@azure/arm-digitaltwins";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getADigitalTwinsInstanceEndpoint(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const endpointName = "myServiceBus";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwinsEndpoint.get(
    resourceGroupName,
    resourceName,
    endpointName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get DigitalTwinsInstances Endpoint.
 *
 * @summary Get DigitalTwinsInstances Endpoint.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsEndpointGet_WithIdentity_example.json
 */
async function getADigitalTwinsInstanceEndpointWithIdentity(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const endpointName = "myServiceBus";
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwinsEndpoint.get(
    resourceGroupName,
    resourceName,
    endpointName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADigitalTwinsInstanceEndpoint();
  await getADigitalTwinsInstanceEndpointWithIdentity();
}

main().catch(console.error);

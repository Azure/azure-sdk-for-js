// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update DigitalTwinsInstance endpoint.
 *
 * @summary Create or update DigitalTwinsInstance endpoint.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsEndpointPut_example.json
 */

import type { DigitalTwinsEndpointResource } from "@azure/arm-digitaltwins";
import { AzureDigitalTwinsManagementClient } from "@azure/arm-digitaltwins";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function putADigitalTwinsEndpointResource(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const endpointName = "myServiceBus";
  const endpointDescription: DigitalTwinsEndpointResource = {
    properties: {
      authenticationType: "KeyBased",
      endpointType: "ServiceBus",
      primaryConnectionString:
        "Endpoint=sb://mysb.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=xyzxyzoX4=;EntityPath=abcabc",
      secondaryConnectionString:
        "Endpoint=sb://mysb.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=xyzxyzoX4=;EntityPath=abcabc",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwinsEndpoint.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    endpointName,
    endpointDescription,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update DigitalTwinsInstance endpoint.
 *
 * @summary Create or update DigitalTwinsInstance endpoint.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsEndpointPut_WithIdentity_example.json
 */
async function putADigitalTwinsEndpointResourceWithIdentity(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const endpointName = "myServiceBus";
  const endpointDescription: DigitalTwinsEndpointResource = {
    properties: {
      authenticationType: "IdentityBased",
      endpointType: "ServiceBus",
      endpointUri: "sb://mysb.servicebus.windows.net/",
      entityPath: "mysbtopic",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwinsEndpoint.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    endpointName,
    endpointDescription,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update DigitalTwinsInstance endpoint.
 *
 * @summary Create or update DigitalTwinsInstance endpoint.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsEndpointPut_WithUserIdentity_example.json
 */
async function putADigitalTwinsEndpointResourceWithUserAssignedIdentity(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const resourceGroupName = process.env["DIGITALTWINS_RESOURCE_GROUP"] || "resRg";
  const resourceName = "myDigitalTwinsService";
  const endpointName = "myServiceBus";
  const endpointDescription: DigitalTwinsEndpointResource = {
    properties: {
      authenticationType: "IdentityBased",
      endpointType: "ServiceBus",
      endpointUri: "sb://mysb.servicebus.windows.net/",
      entityPath: "mysbtopic",
      identity: {
        type: "UserAssigned",
        userAssignedIdentity:
          "/subscriptions/50016170-c839-41ba-a724-51e9df440b9e/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testidentity",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwinsEndpoint.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    endpointName,
    endpointDescription,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putADigitalTwinsEndpointResource();
  await putADigitalTwinsEndpointResourceWithIdentity();
  await putADigitalTwinsEndpointResourceWithUserAssignedIdentity();
}

main().catch(console.error);

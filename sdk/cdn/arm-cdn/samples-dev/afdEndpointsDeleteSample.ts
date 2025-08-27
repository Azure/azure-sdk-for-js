// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 *
 * @summary Deletes an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/AFDEndpoints_Delete.json
 */

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function afdEndpointsDelete(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const endpointName = "endpoint1";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdEndpoints.beginDeleteAndWait(
    resourceGroupName,
    profileName,
    endpointName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await afdEndpointsDelete();
}

main().catch(console.error);

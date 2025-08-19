// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a Maps Creator resource.
 *
 * @summary Delete a Maps Creator resource.
 * x-ms-original-file: specification/maps/resource-manager/Microsoft.Maps/stable/2023-06-01/examples/DeleteMapsCreator.json
 */

import { AzureMapsManagementClient } from "@azure/arm-maps";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteCreatorResource(): Promise<void> {
  const subscriptionId =
    process.env["MAPS_SUBSCRIPTION_ID"] || "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const resourceGroupName = process.env["MAPS_RESOURCE_GROUP"] || "myResourceGroup";
  const accountName = "myMapsAccount";
  const creatorName = "myCreator";
  const credential = new DefaultAzureCredential();
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.creators.delete(resourceGroupName, accountName, creatorName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteCreatorResource();
}

main().catch(console.error);

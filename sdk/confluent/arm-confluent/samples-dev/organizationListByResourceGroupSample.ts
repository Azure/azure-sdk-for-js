// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all Organizations under the specified resource group.
 *
 * @summary List all Organizations under the specified resource group.
 * x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/stable/2024-02-13/examples/Organization_ListByResourceGroup.json
 */
async function organizationListByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["CONFLUENT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONFLUENT_RESOURCE_GROUP"] || "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organization.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await organizationListByResourceGroup();
}

main().catch(console.error);

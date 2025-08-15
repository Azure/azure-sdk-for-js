// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AvailableSkuRequest,
  DataBoxManagementClient,
} from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to This method provides the list of available skus for the given subscription, resource group and location.
 *
 * @summary This method provides the list of available skus for the given subscription, resource group and location.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/AvailableSkusPost.json
 */
async function availableSkusPost(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const resourceGroupName =
    process.env["DATABOX_RESOURCE_GROUP"] || "YourResourceGroupName";
  const location = "westus";
  const availableSkuRequest: AvailableSkuRequest = {
    country: "XX",
    location: "westus",
    transferType: "ImportToAzure",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.service.listAvailableSkusByResourceGroup(
    resourceGroupName,
    location,
    availableSkuRequest,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await availableSkusPost();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List private link resources for the given IotHub
 *
 * @summary List private link resources for the given IotHub
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/stable/2023-06-30/examples/iothub_listprivatelinkresources.json
 */

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateLinkResourcesList(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const resourceGroupName = process.env["IOTHUB_RESOURCE_GROUP"] || "myResourceGroup";
  const resourceName = "testHub";
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.privateLinkResourcesOperations.list(resourceGroupName, resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkResourcesList();
}

main().catch(console.error);

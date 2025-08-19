// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the usage for a subscription
 *
 * @summary Get the usage for a subscription
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupUsage.json
 */

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function containerUsage(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "westcentralus";
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.location.listUsage(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await containerUsage();
}

main().catch(console.error);

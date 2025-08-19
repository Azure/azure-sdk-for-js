// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List resource usage quotas by location.
 *
 * @summary List resource usage quotas by location.
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/Usages_List.json
 */

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function usagesList(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "eastus";
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await usagesList();
}

main().catch(console.error);

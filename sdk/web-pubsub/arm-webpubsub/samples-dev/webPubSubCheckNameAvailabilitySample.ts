// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks that the resource name is valid and is not already in use.
 *
 * @summary Checks that the resource name is valid and is not already in use.
 * x-ms-original-file: specification/webpubsub/resource-manager/Microsoft.SignalRService/stable/2024-03-01/examples/WebPubSub_CheckNameAvailability.json
 */

import type { NameAvailabilityParameters } from "@azure/arm-webpubsub";
import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webPubSubCheckNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["WEB-PUBSUB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "eastus";
  const parameters: NameAvailabilityParameters = {
    name: "myWebPubSubService",
    type: "Microsoft.SignalRService/WebPubSub",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSub.checkNameAvailability(location, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubCheckNameAvailability();
}

main().catch(console.error);

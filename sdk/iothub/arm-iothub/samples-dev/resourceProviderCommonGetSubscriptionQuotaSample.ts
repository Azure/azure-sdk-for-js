// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the number of free and paid iot hubs in the subscription
 *
 * @summary Get the number of free and paid iot hubs in the subscription
 * x-ms-original-file: specification/iothub/resource-manager/Microsoft.Devices/stable/2023-06-30/examples/iothub_usages.json
 */

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function resourceProviderCommonGetSubscriptionQuota(): Promise<void> {
  const subscriptionId =
    process.env["IOTHUB_SUBSCRIPTION_ID"] || "91d12660-3dec-467a-be2a-213b5544ddc0";
  const credential = new DefaultAzureCredential();
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.resourceProviderCommon.getSubscriptionQuota();
  console.log(result);
}

async function main(): Promise<void> {
  await resourceProviderCommonGetSubscriptionQuota();
}

main().catch(console.error);

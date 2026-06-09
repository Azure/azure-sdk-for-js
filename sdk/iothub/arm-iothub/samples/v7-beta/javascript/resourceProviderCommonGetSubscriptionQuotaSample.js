// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IotHubClient } = require("@azure/arm-iothub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the number of free and paid iot hubs in the subscription
 *
 * @summary get the number of free and paid iot hubs in the subscription
 * x-ms-original-file: 2026-03-01-preview/iothub_usages.json
 */
async function resourceProviderCommonGetSubscriptionQuota() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.resourceProviderCommon.getSubscriptionQuota();
  console.log(result);
}

async function main() {
  await resourceProviderCommonGetSubscriptionQuota();
}

main().catch(console.error);

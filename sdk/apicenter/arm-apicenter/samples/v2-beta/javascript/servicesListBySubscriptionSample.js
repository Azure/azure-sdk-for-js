// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists services within an Azure subscription.
 *
 * @summary lists services within an Azure subscription.
 * x-ms-original-file: 2024-06-01-preview/Services_ListBySubscription.json
 */
async function servicesListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.services.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await servicesListBySubscription();
}

main().catch(console.error);

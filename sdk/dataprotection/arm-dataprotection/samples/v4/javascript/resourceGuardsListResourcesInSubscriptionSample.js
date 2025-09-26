// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns ResourceGuards collection belonging to a subscription.
 *
 * @summary returns ResourceGuards collection belonging to a subscription.
 * x-ms-original-file: 2025-07-01/ResourceGuardCRUD/GetResourceGuardsInSubscription.json
 */
async function getResourceGuardsInSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceGuards.listResourcesInSubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getResourceGuardsInSubscription();
}

main().catch(console.error);

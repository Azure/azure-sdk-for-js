// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SovereignClient } = require("@azure/arm-sovereign");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the Sovereign View resources within a subscription.
 *
 * @summary lists the Sovereign View resources within a subscription.
 * x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ListBySubscription.json
 */
async function sovereignViewOperationsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "22b62f96-c8d5-4131-97f8-f820a5a3c55f";
  const client = new SovereignClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sovereignViewOperations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await sovereignViewOperationsListBySubscription();
}

main().catch(console.error);

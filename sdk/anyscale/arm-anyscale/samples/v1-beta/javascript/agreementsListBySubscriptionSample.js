// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the agreements available to the subscription.
 *
 * @summary list the agreements available to the subscription.
 * x-ms-original-file: 2026-09-01/Agreements_ListBySubscription.json
 */
async function listTheAgreementsInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agreements.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheAgreementsInASubscription();
}

main().catch(console.error);

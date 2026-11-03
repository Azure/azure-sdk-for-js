// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the partner destinations under an Azure subscription.
 *
 * @summary list all the partner destinations under an Azure subscription.
 * x-ms-original-file: 2025-07-15-preview/PartnerDestinations_ListBySubscription.json
 */
async function partnerDestinationsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.partnerDestinations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await partnerDestinationsListBySubscription();
}

main().catch(console.error);

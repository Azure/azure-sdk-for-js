// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceGraphClient } = require("@azure/arm-resourcegraph");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all graph queries defined within a specified subscription.
 *
 * @summary get all graph queries defined within a specified subscription.
 * x-ms-original-file: 2024-04-01/GraphQueryList.json
 */
async function getAListOfGraphQueriesInEntireSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "024e2271-06fa-46b6-9079-f1ed3c7b070e";
  const client = new ResourceGraphClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.graphQuery.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAListOfGraphQueriesInEntireSubscription();
}

main().catch(console.error);

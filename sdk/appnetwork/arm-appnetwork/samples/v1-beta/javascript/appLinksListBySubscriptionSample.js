// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppLinkClient } = require("@azure/arm-appnetwork");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AppLink resources by subscription.
 *
 * @summary list AppLink resources by subscription.
 * x-ms-original-file: 2025-08-01-preview/AppLinks_ListBySubscription.json
 */
async function appLinksListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appLinks.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await appLinksListBySubscription();
}

main().catch(console.error);

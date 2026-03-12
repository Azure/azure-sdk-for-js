// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeClient } = require("@azure/arm-sitemanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Site resources by subscription ID
 *
 * @summary list Site resources by subscription ID
 * x-ms-original-file: 2025-06-01/SitesBySubscription_List_MaximumSet_Gen.json
 */
async function listBySubscriptionGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0154f7fe-df09-4981-bf82-7ad5c1f596eb";
  const client = new EdgeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sitesBySubscription.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listBySubscriptionGeneratedByMaximumSetRule();
}

main().catch(console.error);

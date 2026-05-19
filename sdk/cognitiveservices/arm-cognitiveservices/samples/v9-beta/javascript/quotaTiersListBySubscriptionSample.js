// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns all the resources of a particular type belonging to a subscription.
 *
 * @summary returns all the resources of a particular type belonging to a subscription.
 * x-ms-original-file: 2026-01-15-preview/ListQuotaTiers.json
 */
async function listTheQuotaTierForASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.quotaTiers.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheQuotaTierForASubscription();
}

main().catch(console.error);

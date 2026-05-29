// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of Microsoft.CognitiveServices SKUs available for your Subscription.
 *
 * @summary gets the list of Microsoft.CognitiveServices SKUs available for your Subscription.
 * x-ms-original-file: 2026-01-15-preview/GetSkus.json
 */
async function regenerateKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "f1c637e4-72ec-4f89-8d2b-0f933c036002";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceSkus.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await regenerateKeys();
}

main().catch(console.error);

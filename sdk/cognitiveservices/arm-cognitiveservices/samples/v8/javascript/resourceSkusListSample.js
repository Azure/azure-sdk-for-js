// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the list of Microsoft.CognitiveServices SKUs available for your Subscription.
 *
 * @summary Gets the list of Microsoft.CognitiveServices SKUs available for your Subscription.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/GetSkus.json
 */
async function regenerateKeys() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "f1c637e4-72ec-4f89-8d2b-0f933c036002";
  const credential = new DefaultAzureCredential();
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

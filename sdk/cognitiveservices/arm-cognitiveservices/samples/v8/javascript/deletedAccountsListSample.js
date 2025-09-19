// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Returns all the resources of a particular type belonging to a subscription.
 *
 * @summary Returns all the resources of a particular type belonging to a subscription.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ListDeletedAccountsBySubscription.json
 */
async function listDeletedAccountsBySubscription() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedAccounts.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listDeletedAccountsBySubscription();
}

main().catch(console.error);

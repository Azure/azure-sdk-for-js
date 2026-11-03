// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to handles requests to list all resources in a subscription.
 *
 * @summary handles requests to list all resources in a subscription.
 * x-ms-original-file: 2026-03-18/emailServices/listBySubscription.json
 */
async function listEmailServiceResourcesBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.emailServices.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listEmailServiceResourcesBySubscription();
}

main().catch(console.error);

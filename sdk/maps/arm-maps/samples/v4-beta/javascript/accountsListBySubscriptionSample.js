// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all Maps Accounts in a Subscription
 *
 * @summary get all Maps Accounts in a Subscription
 * x-ms-original-file: 2025-10-01-preview/ListAccountsBySubscription.json
 */
async function listAccountsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAccountsBySubscription();
}

main().catch(console.error);

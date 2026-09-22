// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerPlatformClient } = require("@azure/arm-powerplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of accounts within a subscription.
 *
 * @summary retrieve a list of accounts within a subscription.
 * x-ms-original-file: 2020-10-30-preview/listAccountsBySubscription.json
 */
async function listAccountsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
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

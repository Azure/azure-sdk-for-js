// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-resources-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the tenants for your account.
 *
 * @summary gets the tenants for your account.
 * x-ms-original-file: 2022-12-01/GetTenants.json
 */
async function getAllTenants() {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const resArray = new Array();
  for await (const item of client.tenants.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllTenants();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets service administrator, account administrator, and co-administrators for the subscription.
 *
 * @summary gets service administrator, account administrator, and co-administrators for the subscription.
 * x-ms-original-file: 2015-07-01/GetClassicAdministrators.json
 */
async function listClassicAdministrators() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.classicAdministrators.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listClassicAdministrators();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets service administrator, account administrator, and co-administrators for the subscription.
 *
 * @summary gets service administrator, account administrator, and co-administrators for the subscription.
 * x-ms-original-file: 2015-07-01/GetClassicAdministrators.json
 */
async function listClassicAdministrators(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.classicAdministrators.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listClassicAdministrators();
}

main().catch(console.error);

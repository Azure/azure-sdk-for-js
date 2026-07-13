// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all interconnect groups in a subscription.
 *
 * @summary gets all interconnect groups in a subscription.
 * x-ms-original-file: 2025-07-01/InterconnectGroupListAll.json
 */
async function listAllInterconnectGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.interconnectGroups.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllInterconnectGroups();
}

main().catch(console.error);

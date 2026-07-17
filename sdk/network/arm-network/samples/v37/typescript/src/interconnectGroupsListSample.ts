// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all interconnect groups in a resource group.
 *
 * @summary gets all interconnect groups in a resource group.
 * x-ms-original-file: 2025-07-01/InterconnectGroupList.json
 */
async function listInterconnectGroupsInResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.interconnectGroups.list("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listInterconnectGroupsInResourceGroup();
}

main().catch(console.error);

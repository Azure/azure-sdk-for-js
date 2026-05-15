// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all application security groups in a subscription.
 *
 * @summary gets all application security groups in a subscription.
 * x-ms-original-file: 2025-05-01/ApplicationSecurityGroupListAll.json
 */
async function listAllApplicationSecurityGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationSecurityGroups.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllApplicationSecurityGroups();
}

main().catch(console.error);

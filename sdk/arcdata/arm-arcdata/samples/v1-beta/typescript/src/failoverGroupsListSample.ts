// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the failover groups associated with the given sql managed instance.
 *
 * @summary list the failover groups associated with the given sql managed instance.
 * x-ms-original-file: 2026-03-01-preview/ListBySqlManagedInstanceFailoverGroup.json
 */
async function getsAllFailoverGroupsAssociatedWithASqlManagedInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.failoverGroups.list("testrg", "testSqlManagedInstance")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsAllFailoverGroupsAssociatedWithASqlManagedInstance();
}

main().catch(console.error);

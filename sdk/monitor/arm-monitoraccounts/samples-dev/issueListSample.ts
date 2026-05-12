// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitoraccounts";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all issues under the parent
 *
 * @summary list all issues under the parent
 * x-ms-original-file: 2025-10-03/Issue_List_MaximumSet_Gen.json
 */
async function issueListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aceaa046-91f0-492a-96dc-45e10a9183dc";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.issue.list("rg1", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await issueListMaximumSet();
}

main().catch(console.error);

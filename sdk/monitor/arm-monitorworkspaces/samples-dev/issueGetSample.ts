// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get issue properties
 *
 * @summary get issue properties
 * x-ms-original-file: 2025-10-03/Issue_Get_MaximumSet_Gen.json
 */
async function issueGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aceaa046-91f0-492a-96dc-45e10a9183dc";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.issue.get("rg1", "myWorkspace", "3f29e1b2b05f8371595dc761fed8e8b3");
  console.log(result);
}

async function main(): Promise<void> {
  await issueGetMaximumSet();
}

main().catch(console.error);

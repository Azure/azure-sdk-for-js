// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all resources in the issue - this method uses pagination to return all resources
 *
 * @summary list all resources in the issue - this method uses pagination to return all resources
 * x-ms-original-file: 2025-10-03/Issue_ListResources_MaximumSet_Gen.json
 */
async function issueListResourcesMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aceaa046-91f0-492a-96dc-45e10a9183dc";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.issue.listResources(
    "rg1",
    "myWorkspace",
    "3f29e1b2b05f8371595dc761fed8e8b3",
    { filter: "" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await issueListResourcesMaximumSet();
}

main().catch(console.error);

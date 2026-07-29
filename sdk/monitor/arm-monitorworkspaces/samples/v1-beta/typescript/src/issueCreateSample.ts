// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new issue or updates an existing one
 *
 * @summary create a new issue or updates an existing one
 * x-ms-original-file: 2025-10-03/Issue_Create_MaximumSet_Gen.json
 */
async function issueCreateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aceaa046-91f0-492a-96dc-45e10a9183dc";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.issue.create(
    "rg1",
    "myWorkspace",
    "3f29e1b2b05f8371595dc761fed8e8b3",
    {
      properties: {
        title: "Alert fired on VM CPU",
        status: "New",
        severity: "Sev2",
        impactTime: new Date("2024-12-13T02:45:33"),
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await issueCreateMaximumSet();
}

main().catch(console.error);

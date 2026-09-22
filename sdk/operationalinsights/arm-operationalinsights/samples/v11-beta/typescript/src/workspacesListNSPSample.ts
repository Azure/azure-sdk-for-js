// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of NSP configurations for specified workspace.
 *
 * @summary gets a list of NSP configurations for specified workspace.
 * x-ms-original-file: 2025-07-01/NSPForWorkspaces_List.json
 */
async function listNSPConfigsByScheduledQueryRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listNSP("exampleRG", "someWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNSPConfigsByScheduledQueryRule();
}

main().catch(console.error);

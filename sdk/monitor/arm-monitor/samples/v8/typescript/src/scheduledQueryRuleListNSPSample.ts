// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of NSP configurations for specified scheduled query rule.
 *
 * @summary gets a list of NSP configurations for specified scheduled query rule.
 * x-ms-original-file: 2021-10-01/NSPForScheduledQueryRule_List.json
 */
async function listNSPConfigsByScheduledQueryRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledQueryRule.listNSP("exampleRG", "someRule")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNSPConfigsByScheduledQueryRule();
}

main().catch(console.error);

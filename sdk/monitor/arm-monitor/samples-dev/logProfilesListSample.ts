// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the log profiles.
 *
 * @summary list the log profiles.
 * x-ms-original-file: 2016-03-01/listLogProfile.json
 */
async function listLogProfiles(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "df602c9c-7aa0-407d-a6fb-eb20c8bd1192";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.logProfiles.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listLogProfiles();
}

main().catch(console.error);

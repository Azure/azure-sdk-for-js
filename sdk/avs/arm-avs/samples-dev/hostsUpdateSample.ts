// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Host
 *
 * @summary update a Host
 * x-ms-original-file: 2026-03-01/Hosts_Update.json
 */
async function hostsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.hosts.update(
    "group1",
    "cloud1",
    "cluster1",
    "esx03-r52.1111111111111111111.westcentralus.prod.azure.com",
    { properties: { licenses: [{ kind: "WindowsServer" }] } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hostsUpdate();
}

main().catch(console.error);

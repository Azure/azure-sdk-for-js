// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Host
 *
 * @summary get a Host
 * x-ms-original-file: 2024-09-01/Hosts_Get.json
 */
async function hostsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.hosts.get(
    "group1",
    "cloud1",
    "cluster1",
    "esx03-r52.1111111111111111111.westcentralus.prod.azure.com",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hostsGet();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get geodata for a single IP address
 *
 * @summary get geodata for a single IP address
 * x-ms-original-file: 2025-07-01-preview/enrichment/GetGeodataWithWorkspaceByIp.json
 */
async function getGeodataForASingleIPAddress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.listGeodataByIp("myRg", "myWorkspace", "main", {
    ipAddress: "1.2.3.4",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getGeodataForASingleIPAddress();
}

main().catch(console.error);

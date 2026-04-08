// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a server advisor.
 *
 * @summary gets a server advisor.
 * x-ms-original-file: 2025-02-01-preview/ServerAdvisorGet.json
 */
async function getServerAdvisor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverAdvisors.get(
    "workloadinsight-demos",
    "misosisvr",
    "CreateIndex",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getServerAdvisor();
}

main().catch(console.error);

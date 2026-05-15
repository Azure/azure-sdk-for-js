// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of server advisors.
 *
 * @summary gets a list of server advisors.
 * x-ms-original-file: 2025-02-01-preview/ServerAdvisorList.json
 */
async function listOfServerAdvisors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverAdvisors.listByServer("workloadinsight-demos", "misosisvr");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of server advisors.
 *
 * @summary gets a list of server advisors.
 * x-ms-original-file: 2025-02-01-preview/ServerRecommendedActionListExpand.json
 */
async function listOfServerRecommendedActionsForAllAdvisors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverAdvisors.listByServer("workloadinsight-demos", "misosisvr", {
    expand: "recommendedActions",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await listOfServerAdvisors();
  await listOfServerRecommendedActionsForAllAdvisors();
}

main().catch(console.error);

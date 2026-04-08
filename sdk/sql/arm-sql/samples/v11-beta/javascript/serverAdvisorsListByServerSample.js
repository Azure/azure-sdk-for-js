// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of server advisors.
 *
 * @summary gets a list of server advisors.
 * x-ms-original-file: 2025-02-01-preview/ServerAdvisorList.json
 */
async function listOfServerAdvisors() {
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
async function listOfServerRecommendedActionsForAllAdvisors() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverAdvisors.listByServer("workloadinsight-demos", "misosisvr", {
    expand: "recommendedActions",
  });
  console.log(result);
}

async function main() {
  await listOfServerAdvisors();
  await listOfServerRecommendedActionsForAllAdvisors();
}

main().catch(console.error);

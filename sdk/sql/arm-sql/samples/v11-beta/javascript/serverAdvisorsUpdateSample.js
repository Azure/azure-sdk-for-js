// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a server advisor.
 *
 * @summary updates a server advisor.
 * x-ms-original-file: 2025-02-01-preview/ServerAdvisorUpdate.json
 */
async function updateServerAdvisor() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverAdvisors.update(
    "workloadinsight-demos",
    "misosisvr",
    "CreateIndex",
    { autoExecuteStatus: "Disabled" },
  );
  console.log(result);
}

async function main() {
  await updateServerAdvisor();
}

main().catch(console.error);

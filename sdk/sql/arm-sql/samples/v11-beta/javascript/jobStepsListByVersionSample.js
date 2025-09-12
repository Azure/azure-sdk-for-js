// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all job steps in the specified job version.
 *
 * @summary Gets all job steps in the specified job version.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ListJobStepsByVersion.json
 */
async function listJobStepsForTheSpecifiedVersionOfAJob() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const serverName = "server1";
  const jobAgentName = "agent1";
  const jobName = "job1";
  const jobVersion = 1;
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.jobSteps.listByVersion(
    resourceGroupName,
    serverName,
    jobAgentName,
    jobName,
    jobVersion,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listJobStepsForTheSpecifiedVersionOfAJob();
}

main().catch(console.error);

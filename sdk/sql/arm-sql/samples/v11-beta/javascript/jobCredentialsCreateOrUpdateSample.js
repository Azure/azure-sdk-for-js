// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a job credential.
 *
 * @summary Creates or updates a job credential.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/CreateOrUpdateJobCredential.json
 */
async function createOrUpdateACredential() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const serverName = "server1";
  const jobAgentName = "agent1";
  const credentialName = "cred1";
  const parameters = {
    password: "<password>",
    username: "myuser",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.jobCredentials.createOrUpdate(
    resourceGroupName,
    serverName,
    jobAgentName,
    credentialName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateACredential();
}

main().catch(console.error);

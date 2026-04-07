// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a job credential.
 *
 * @summary creates or updates a job credential.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateJobCredential.json
 */
async function createOrUpdateACredential() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.jobCredentials.createOrUpdate(
    "group1",
    "server1",
    "agent1",
    "cred1",
    { password: "<password>", username: "myuser" },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateACredential();
}

main().catch(console.error);

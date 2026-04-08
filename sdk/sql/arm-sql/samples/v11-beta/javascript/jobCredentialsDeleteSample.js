// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a job credential.
 *
 * @summary deletes a job credential.
 * x-ms-original-file: 2025-02-01-preview/DeleteJobCredential.json
 */
async function deleteACredential() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.jobCredentials.delete("group1", "server1", "agent1", "cred1");
}

async function main() {
  await deleteACredential();
}

main().catch(console.error);

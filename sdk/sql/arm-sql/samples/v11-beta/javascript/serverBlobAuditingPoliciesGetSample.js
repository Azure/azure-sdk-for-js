// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a server's blob auditing policy.
 *
 * @summary Gets a server's blob auditing policy.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-11-01-preview/examples/ServerBlobAuditingGet.json
 */
async function getAServerBlobAuditingPolicy() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "blobauditingtest-4799";
  const serverName = "blobauditingtest-6440";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverBlobAuditingPolicies.get(resourceGroupName, serverName);
  console.log(result);
}

async function main() {
  await getAServerBlobAuditingPolicy();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a server trust group.
 *
 * @summary Gets a server trust group.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ServerTrustGroupGet.json
 */
async function getServerTrustGroup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const locationName = "Japan East";
  const serverTrustGroupName = "server-trust-group-test";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverTrustGroups.get(
    resourceGroupName,
    locationName,
    serverTrustGroupName,
  );
  console.log(result);
}

async function main() {
  await getServerTrustGroup();
}

main().catch(console.error);

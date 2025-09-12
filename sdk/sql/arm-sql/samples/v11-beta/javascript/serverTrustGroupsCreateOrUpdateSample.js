// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a server trust group.
 *
 * @summary Creates or updates a server trust group.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ServerTrustGroupCreate.json
 */
async function createServerTrustGroup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const locationName = "Japan East";
  const serverTrustGroupName = "server-trust-group-test";
  const parameters = {
    groupMembers: [
      {
        serverId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/managedInstances/managedInstance-1",
      },
      {
        serverId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/managedInstances/managedInstance-2",
      },
    ],
    trustScopes: ["GlobalTransactions", "ServiceBroker"],
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverTrustGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    locationName,
    serverTrustGroupName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createServerTrustGroup();
}

main().catch(console.error);

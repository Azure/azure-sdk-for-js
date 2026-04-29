// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a server trust group.
 *
 * @summary creates or updates a server trust group.
 * x-ms-original-file: 2025-02-01-preview/ServerTrustGroupCreate.json
 */
async function createServerTrustGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverTrustGroups.createOrUpdate(
    "Default",
    "Japan East",
    "server-trust-group-test",
    {
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
    },
  );
  console.log(result);
}

async function main() {
  await createServerTrustGroup();
}

main().catch(console.error);

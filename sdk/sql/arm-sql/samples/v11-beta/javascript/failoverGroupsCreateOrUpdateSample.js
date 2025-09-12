// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a failover group.
 *
 * @summary Creates or updates a failover group.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-05-01-preview/examples/FailoverGroupCreateOrUpdate.json
 */
async function createFailoverGroup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const serverName = "failover-group-primary-server";
  const failoverGroupName = "failover-group-test-3";
  const parameters = {
    databases: [
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/servers/failover-group-primary-server/databases/testdb-1",
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/servers/failover-group-primary-server/databases/testdb-2",
    ],
    partnerServers: [
      {
        id: "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/servers/failover-group-secondary-server",
      },
    ],
    readOnlyEndpoint: { failoverPolicy: "Disabled" },
    readWriteEndpoint: {
      failoverPolicy: "Automatic",
      failoverWithDataLossGracePeriodMinutes: 480,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.failoverGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    failoverGroupName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a failover group.
 *
 * @summary Creates or updates a failover group.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-05-01-preview/examples/FailoverGroupCreateOrUpdateStandbySecondary.json
 */
async function createFailoverGroupWithStandbySecondaryDatabaseOnPartnerServer() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const serverName = "failover-group-primary-server";
  const failoverGroupName = "failover-group-test-3";
  const parameters = {
    databases: [
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/servers/failover-group-primary-server/databases/testdb-1",
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/servers/failover-group-primary-server/databases/testdb-2",
    ],
    partnerServers: [
      {
        id: "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/servers/failover-group-secondary-server",
      },
    ],
    readOnlyEndpoint: { failoverPolicy: "Disabled" },
    readWriteEndpoint: {
      failoverPolicy: "Automatic",
      failoverWithDataLossGracePeriodMinutes: 480,
    },
    secondaryType: "Standby",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.failoverGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    failoverGroupName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createFailoverGroup();
  await createFailoverGroupWithStandbySecondaryDatabaseOnPartnerServer();
}

main().catch(console.error);

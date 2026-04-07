// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a failover group.
 *
 * @summary creates or updates a failover group.
 * x-ms-original-file: 2025-02-01-preview/FailoverGroupCreateOrUpdate.json
 */
async function createFailoverGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.failoverGroups.createOrUpdate(
    "Default",
    "failover-group-primary-server",
    "failover-group-test-3",
    {
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
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a failover group.
 *
 * @summary creates or updates a failover group.
 * x-ms-original-file: 2025-02-01-preview/FailoverGroupCreateOrUpdateStandbySecondary.json
 */
async function createFailoverGroupWithStandbySecondaryDatabaseOnPartnerServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.failoverGroups.createOrUpdate(
    "Default",
    "failover-group-primary-server",
    "failover-group-test-3",
    {
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
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createFailoverGroup();
  await createFailoverGroupWithStandbySecondaryDatabaseOnPartnerServer();
}

main().catch(console.error);

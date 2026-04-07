// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a failover group.
 *
 * @summary updates a failover group.
 * x-ms-original-file: 2025-02-01-preview/FailoverGroupUpdate.json
 */
async function updateFailoverGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.failoverGroups.update(
    "Default",
    "failover-group-primary-server",
    "failover-group-test-1",
    {
      databases: [
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/servers/failover-group-primary-server/databases/testdb-1",
      ],
      readWriteEndpoint: {
        failoverPolicy: "Automatic",
        failoverWithDataLossGracePeriodMinutes: 120,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a failover group.
 *
 * @summary updates a failover group.
 * x-ms-original-file: 2025-02-01-preview/FailoverGroupUpdateStandbySecondary.json
 */
async function addDatabaseToFailoverGroupWithStandbySecondaryOnPartnerServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.failoverGroups.update(
    "Default",
    "failover-group-primary-server",
    "failover-group-test-1",
    {
      databases: [
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default/providers/Microsoft.Sql/servers/failover-group-primary-server/databases/testdb-1",
      ],
      readWriteEndpoint: {
        failoverPolicy: "Automatic",
        failoverWithDataLossGracePeriodMinutes: 120,
      },
      secondaryType: "Standby",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateFailoverGroup();
  await addDatabaseToFailoverGroupWithStandbySecondaryOnPartnerServer();
}

main().catch(console.error);

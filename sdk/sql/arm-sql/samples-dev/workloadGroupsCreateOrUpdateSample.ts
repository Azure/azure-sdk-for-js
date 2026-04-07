// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a workload group.
 *
 * @summary creates or updates a workload group.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateWorkloadGroupMax.json
 */
async function createAWorkloadGroupWithAllPropertiesSpecified(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.workloadGroups.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "smallrc",
    {
      importance: "normal",
      maxResourcePercent: 100,
      maxResourcePercentPerRequest: 3,
      minResourcePercent: 0,
      minResourcePercentPerRequest: 3,
      queryExecutionTimeout: 0,
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a workload group.
 *
 * @summary creates or updates a workload group.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateWorkloadGroupMin.json
 */
async function createAWorkloadGroupWithTheRequiredPropertiesSpecified(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.workloadGroups.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "smallrc",
    { maxResourcePercent: 100, minResourcePercent: 0, minResourcePercentPerRequest: 3 },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAWorkloadGroupWithAllPropertiesSpecified();
  await createAWorkloadGroupWithTheRequiredPropertiesSpecified();
}

main().catch(console.error);

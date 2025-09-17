// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LongTermRetentionPolicy, SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Set or update a database's long term retention policy.
 *
 * @summary Set or update a database's long term retention policy.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/LongTermRetentionPolicyCreateOrUpdate.json
 */
async function createOrUpdateTheLongTermRetentionPolicyForTheDatabase(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["SQL_RESOURCE_GROUP"] || "resourceGroup";
  const serverName = "testserver";
  const databaseName = "testDatabase";
  const policyName = "default";
  const parameters: LongTermRetentionPolicy = {
    monthlyRetention: "P1Y",
    timeBasedImmutability: "Enabled",
    timeBasedImmutabilityMode: "Unlocked",
    weekOfYear: 5,
    weeklyRetention: "P1M",
    yearlyRetention: "P5Y",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result =
    await client.longTermRetentionPolicies.beginCreateOrUpdateAndWait(
      resourceGroupName,
      serverName,
      databaseName,
      policyName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateTheLongTermRetentionPolicyForTheDatabase();
}

main().catch(console.error);

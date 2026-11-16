// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ExascaleDbStorageVault
 *
 * @summary create a ExascaleDbStorageVault
 * x-ms-original-file: 2026-06-01/ExascaleDbStorageVaults_Create_MaximumSet_Gen.json
 */
async function exascaleDbStorageVaultsCreateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exascaleDbStorageVaults.create("rgopenapi", "resource1", {
    properties: {
      additionalFlashCacheInPercent: 0,
      description: "example",
      displayName: "resource1",
      highCapacityDatabaseStorageInput: { totalSizeInGbs: 24 },
      timeZone: "2026-06-01T00:00:00Z",
      exadataInfrastructureId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/cloudExadataInfrastructures/infra1",
      isAutoscaleEnabled: true,
      autoscaleLimitInGbs: 10,
    },
    zones: ["zsw"],
    tags: { key4308: "example" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await exascaleDbStorageVaultsCreateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);

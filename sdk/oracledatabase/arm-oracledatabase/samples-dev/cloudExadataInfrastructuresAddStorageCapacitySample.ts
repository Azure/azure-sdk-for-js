// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to perform add storage capacity on exadata infra
 *
 * @summary perform add storage capacity on exadata infra
 * x-ms-original-file: 2025-03-01/exaInfra_addStorageCapacity.json
 */
async function cloudExadataInfrastructuresAddStorageCapacity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.addStorageCapacity("rg000", "infra1");
  console.log(result);
}

async function main(): Promise<void> {
  await cloudExadataInfrastructuresAddStorageCapacity();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an instance pool.
 *
 * @summary creates or updates an instance pool.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateInstancePoolMax.json
 */
async function createAnInstancePoolWithAllProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.instancePools.createOrUpdate("group1", "testIP", {
    location: "japaneast",
    licenseType: "LicenseIncluded",
    maintenanceConfigurationId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_JapanEast_MI_1",
    subnetId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Network/virtualNetworks/myvnet/subnets/mysubnet1",
    vCores: 8,
    sku: { name: "GP_Gen5", family: "Gen5", tier: "GeneralPurpose" },
    tags: { a: "b" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an instance pool.
 *
 * @summary creates or updates an instance pool.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateInstancePoolMin.json
 */
async function createAnInstancePoolWithMinProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.instancePools.createOrUpdate("group1", "testIP", {
    location: "japaneast",
    licenseType: "LicenseIncluded",
    subnetId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/group1/providers/Microsoft.Network/virtualNetworks/myvnet/subnets/mysubnet1",
    vCores: 8,
    sku: { name: "GP_Gen5", family: "Gen5", tier: "GeneralPurpose" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createAnInstancePoolWithAllProperties();
  await createAnInstancePoolWithMinProperties();
}

main().catch(console.error);

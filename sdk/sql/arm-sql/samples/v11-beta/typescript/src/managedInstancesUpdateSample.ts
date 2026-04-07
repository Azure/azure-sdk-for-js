// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a managed instance.
 *
 * @summary updates a managed instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceRemoveMaintenanceConfiguration.json
 */
async function removeMaintenancePolicyFromManagedInstanceSelectDefaultMaintenancePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstances.update("testrg", "testinstance", {
    maintenanceConfigurationId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_Default",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a managed instance.
 *
 * @summary updates a managed instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceUpdateMax.json
 */
async function updateManagedInstanceWithAllProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstances.update("testrg", "testinstance", {
    administratorLogin: "dummylogin",
    administratorLoginPassword: "PLACEHOLDER",
    authenticationMetadata: "Windows",
    collation: "SQL_Latin1_General_CP1_CI_AS",
    databaseFormat: "AlwaysUpToDate",
    hybridSecondaryUsage: "Passive",
    licenseType: "BasePrice",
    maintenanceConfigurationId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_JapanEast_MI_1",
    minimalTlsVersion: "1.2",
    proxyOverride: "Redirect",
    publicDataEndpointEnabled: false,
    requestedBackupStorageRedundancy: "Geo",
    requestedLogicalAvailabilityZone: "1",
    storageSizeInGB: 448,
    vCores: 8,
    sku: { name: "GP_Gen5", capacity: 8, tier: "GeneralPurpose" },
    tags: { tagKey1: "TagValue1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a managed instance.
 *
 * @summary updates a managed instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceUpdateMin.json
 */
async function updateManagedInstanceWithMinimalProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstances.update("testrg", "testinstance", {
    tags: { tagKey1: "TagValue1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await removeMaintenancePolicyFromManagedInstanceSelectDefaultMaintenancePolicy();
  await updateManagedInstanceWithAllProperties();
  await updateManagedInstanceWithMinimalProperties();
}

main().catch(console.error);

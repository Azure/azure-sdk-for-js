// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a managed instance.
 *
 * @summary creates or updates a managed instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceCreateMax.json
 */
async function createManagedInstanceWithAllProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20D7082A-0FC7-4468-82BD-542694D5042B";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstances.createOrUpdate("testrg", "testinstance", {
    location: "Japan East",
    administratorLogin: "dummylogin",
    administratorLoginPassword: "PLACEHOLDER",
    administrators: {
      azureADOnlyAuthentication: true,
      login: "bob@contoso.com",
      principalType: "User",
      sid: "00000011-1111-2222-2222-123456789111",
      tenantId: "00000011-1111-2222-2222-123456789111",
    },
    authenticationMetadata: "AzureAD",
    collation: "SQL_Latin1_General_CP1_CI_AS",
    databaseFormat: "AlwaysUpToDate",
    dnsZonePartner:
      "/subscriptions/20D7082A-0FC7-4468-82BD-542694D5042B/resourceGroups/testrg/providers/Microsoft.Sql/managedInstances/testinstance",
    hybridSecondaryUsage: "Passive",
    instancePoolId:
      "/subscriptions/20D7082A-0FC7-4468-82BD-542694D5042B/resourceGroups/testrg/providers/Microsoft.Sql/instancePools/pool1",
    licenseType: "LicenseIncluded",
    maintenanceConfigurationId:
      "/subscriptions/20D7082A-0FC7-4468-82BD-542694D5042B/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_JapanEast_MI_1",
    minimalTlsVersion: "1.2",
    proxyOverride: "Redirect",
    publicDataEndpointEnabled: false,
    requestedBackupStorageRedundancy: "Geo",
    requestedLogicalAvailabilityZone: "1",
    servicePrincipal: { type: "SystemAssigned" },
    storageSizeInGB: 1024,
    subnetId:
      "/subscriptions/20D7082A-0FC7-4468-82BD-542694D5042B/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
    timezoneId: "UTC",
    vCores: 8,
    sku: { name: "GP_Gen5", tier: "GeneralPurpose" },
    tags: { tagKey1: "TagValue1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a managed instance.
 *
 * @summary creates or updates a managed instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceCreateMin.json
 */
async function createManagedInstanceWithMinimalProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20D7082A-0FC7-4468-82BD-542694D5042B";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstances.createOrUpdate("testrg", "testinstance", {
    location: "Japan East",
    administratorLogin: "dummylogin",
    administratorLoginPassword: "PLACEHOLDER",
    licenseType: "LicenseIncluded",
    storageSizeInGB: 1024,
    subnetId:
      "/subscriptions/20D7082A-0FC7-4468-82BD-542694D5042B/resourceGroups/testrg/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
    vCores: 8,
    sku: { name: "GP_Gen5", tier: "GeneralPurpose" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createManagedInstanceWithAllProperties();
  await createManagedInstanceWithMinimalProperties();
}

main().catch(console.error);

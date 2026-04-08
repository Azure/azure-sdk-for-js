// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an elastic pool.
 *
 * @summary updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolUpdateAssignMaintenanceConfiguration.json
 */
async function assignsMaintenanceConfigurationToAnElasticPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.update(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    {
      maintenanceConfigurationId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_JapanEast_1",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an elastic pool.
 *
 * @summary updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolUpdateMax.json
 */
async function updateAnElasticPoolWithAllParameter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.update(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    {
      licenseType: "LicenseIncluded",
      perDatabaseSettings: { maxCapacity: 1, minCapacity: 0.25 },
      zoneRedundant: true,
      sku: { name: "BC_Gen4", capacity: 2, tier: "BusinessCritical" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an elastic pool.
 *
 * @summary updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolUpdateMin.json
 */
async function updateAnElasticPoolWithMinimumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.update(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    {},
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an elastic pool.
 *
 * @summary updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolUpdateResetMaintenanceConfiguration.json
 */
async function resetsMaintenanceConfigurationOfAnElasticPoolToDefault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.update(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    {
      maintenanceConfigurationId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_Default",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an elastic pool.
 *
 * @summary updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolUpdateServerlessProperties.json
 */
async function updateAnElasticPoolWithServerlessProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.update(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    {
      autoPauseDelay: 60,
      minCapacity: 0.5,
      perDatabaseSettings: { autoPauseDelay: 80, maxCapacity: 2, minCapacity: 0 },
      sku: { name: "GP_S_Gen5_2", capacity: 2, tier: "GeneralPurpose" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an elastic pool.
 *
 * @summary updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolUpdateWithDefaultPreferredEnclaveType.json
 */
async function updateAnElasticPoolWithPreferredEnclaveTypeParameterAsDefault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.update(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    { preferredEnclaveType: "Default", sku: { name: "GP_Gen5_4" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an elastic pool.
 *
 * @summary updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolUpdateWithVBSPreferredEnclaveType.json
 */
async function updateAnElasticPoolWithPreferredEnclaveTypeParameterAsVBS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.update(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    { preferredEnclaveType: "VBS", sku: { name: "GP_Gen5_4" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an elastic pool.
 *
 * @summary updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/HyperscaleElasticPoolUpdateSetHighAvailabilityReplicaCount.json
 */
async function updateHighAvailabilityReplicaCountOfAHyperscaleElasticPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.update(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    { highAvailabilityReplicaCount: 2 },
  );
  console.log(result);
}

async function main() {
  await assignsMaintenanceConfigurationToAnElasticPool();
  await updateAnElasticPoolWithAllParameter();
  await updateAnElasticPoolWithMinimumParameters();
  await resetsMaintenanceConfigurationOfAnElasticPoolToDefault();
  await updateAnElasticPoolWithServerlessProperties();
  await updateAnElasticPoolWithPreferredEnclaveTypeParameterAsDefault();
  await updateAnElasticPoolWithPreferredEnclaveTypeParameterAsVBS();
  await updateHighAvailabilityReplicaCountOfAHyperscaleElasticPool();
}

main().catch(console.error);

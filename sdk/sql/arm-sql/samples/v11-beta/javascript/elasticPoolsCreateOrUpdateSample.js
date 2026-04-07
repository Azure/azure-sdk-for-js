// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an elastic pool.
 *
 * @summary creates or updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/CreateElasticPoolWithAvailabilityZone.json
 */
async function createOrUpdateAnElasticPoolWithAvailabilityZone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.createOrUpdate(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    {
      location: "Japan East",
      availabilityZone: "1",
      perDatabaseSettings: { maxCapacity: 2, minCapacity: 0.25 },
      zoneRedundant: true,
      sku: { name: "HS_Gen5_4" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an elastic pool.
 *
 * @summary creates or updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolCreateOrUpdateMax.json
 */
async function createOrUpdateElasticPoolWithAllParameter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.createOrUpdate(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    {
      location: "Japan East",
      perDatabaseSettings: { maxCapacity: 2, minCapacity: 0.25 },
      sku: { name: "GP_Gen4_2", capacity: 2, tier: "GeneralPurpose" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an elastic pool.
 *
 * @summary creates or updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolCreateOrUpdateMin.json
 */
async function createOrUpdateElasticPoolWithMinimumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.createOrUpdate(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    { location: "Japan East" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an elastic pool.
 *
 * @summary creates or updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolCreateOrUpdateServerlessProperties.json
 */
async function createOrUpdateAnElasticPoolWithServerlessProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.createOrUpdate(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    {
      location: "Japan East",
      autoPauseDelay: 60,
      minCapacity: 0.5,
      perDatabaseSettings: { autoPauseDelay: 80, maxCapacity: 2, minCapacity: 0 },
      sku: { name: "GP_S_Gen5_2", capacity: 2, tier: "GeneralPurpose" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an elastic pool.
 *
 * @summary creates or updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolCreateOrUpdateSetMaintenanceConfiguration.json
 */
async function createOrUpdateElasticPoolWithMaintenanceConfigurationParameter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.createOrUpdate(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    {
      location: "Japan East",
      maintenanceConfigurationId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_JapanEast_1",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an elastic pool.
 *
 * @summary creates or updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolCreateWithDefaultPreferredEnclaveType.json
 */
async function createOrUpdateElasticPoolWithPreferredEnclaveTypeParameterAsDefault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.createOrUpdate(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    { location: "Japan East", preferredEnclaveType: "Default", sku: { name: "GP_Gen5_4" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an elastic pool.
 *
 * @summary creates or updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolCreateWithVBSPreferredEnclaveType.json
 */
async function createOrUpdateElasticPoolWithPreferredEnclaveTypeParameterAsVBS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.createOrUpdate(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    { location: "Japan East", preferredEnclaveType: "VBS", sku: { name: "GP_Gen5_4" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an elastic pool.
 *
 * @summary creates or updates an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/HyperscaleElasticPoolCreateOrUpdateSetHighAvailabilityReplicaCount.json
 */
async function createOrUpdateHyperscaleElasticPoolWithHighAvailabilityReplicaCountParameter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.createOrUpdate(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
    { location: "Japan East", highAvailabilityReplicaCount: 2, sku: { name: "HS_Gen5_4" } },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAnElasticPoolWithAvailabilityZone();
  await createOrUpdateElasticPoolWithAllParameter();
  await createOrUpdateElasticPoolWithMinimumParameters();
  await createOrUpdateAnElasticPoolWithServerlessProperties();
  await createOrUpdateElasticPoolWithMaintenanceConfigurationParameter();
  await createOrUpdateElasticPoolWithPreferredEnclaveTypeParameterAsDefault();
  await createOrUpdateElasticPoolWithPreferredEnclaveTypeParameterAsVBS();
  await createOrUpdateHyperscaleElasticPoolWithHighAvailabilityReplicaCountParameter();
}

main().catch(console.error);

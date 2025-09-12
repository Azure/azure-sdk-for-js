// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates an elastic pool.
 *
 * @summary Updates an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ElasticPoolUpdateAssignMaintenanceConfiguration.json
 */
async function assignsMaintenanceConfigurationToAnElasticPool() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-2369";
  const serverName = "sqlcrudtest-8069";
  const elasticPoolName = "sqlcrudtest-8102";
  const parameters = {
    maintenanceConfigurationId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_JapanEast_1",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    elasticPoolName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an elastic pool.
 *
 * @summary Updates an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ElasticPoolUpdateWithDefaultPreferredEnclaveType.json
 */
async function createOrUpdateElasticPoolWithPreferredEnclaveTypeParameterAsDefault() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-2369";
  const serverName = "sqlcrudtest-8069";
  const elasticPoolName = "sqlcrudtest-8102";
  const parameters = {
    preferredEnclaveType: "Default",
    sku: { name: "GP_Gen5_4" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    elasticPoolName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an elastic pool.
 *
 * @summary Updates an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ElasticPoolUpdateWithVBSPreferredEnclaveType.json
 */
async function createOrUpdateElasticPoolWithPreferredEnclaveTypeParameterAsVbs() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-2369";
  const serverName = "sqlcrudtest-8069";
  const elasticPoolName = "sqlcrudtest-8102";
  const parameters = {
    preferredEnclaveType: "VBS",
    sku: { name: "GP_Gen5_4" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    elasticPoolName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an elastic pool.
 *
 * @summary Updates an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ElasticPoolUpdateResetMaintenanceConfiguration.json
 */
async function resetsMaintenanceConfigurationOfAnElasticPoolToDefault() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-2369";
  const serverName = "sqlcrudtest-8069";
  const elasticPoolName = "sqlcrudtest-8102";
  const parameters = {
    maintenanceConfigurationId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_Default",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    elasticPoolName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an elastic pool.
 *
 * @summary Updates an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ElasticPoolUpdateMax.json
 */
async function updateAnElasticPoolWithAllParameter() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-2369";
  const serverName = "sqlcrudtest-8069";
  const elasticPoolName = "sqlcrudtest-8102";
  const parameters = {
    licenseType: "LicenseIncluded",
    perDatabaseSettings: { maxCapacity: 1, minCapacity: 0.25 },
    sku: { name: "BC_Gen4", capacity: 2, tier: "BusinessCritical" },
    zoneRedundant: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    elasticPoolName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an elastic pool.
 *
 * @summary Updates an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ElasticPoolUpdateMin.json
 */
async function updateAnElasticPoolWithMinimumParameters() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-2369";
  const serverName = "sqlcrudtest-8069";
  const elasticPoolName = "sqlcrudtest-8102";
  const parameters = {};
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    elasticPoolName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an elastic pool.
 *
 * @summary Updates an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/HyperscaleElasticPoolUpdateSetHighAvailabilityReplicaCount.json
 */
async function updateHighAvailabilityReplicaCountOfAHyperscaleElasticPool() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-2369";
  const serverName = "sqlcrudtest-8069";
  const elasticPoolName = "sqlcrudtest-8102";
  const parameters = { highAvailabilityReplicaCount: 2 };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    elasticPoolName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await assignsMaintenanceConfigurationToAnElasticPool();
  await createOrUpdateElasticPoolWithPreferredEnclaveTypeParameterAsDefault();
  await createOrUpdateElasticPoolWithPreferredEnclaveTypeParameterAsVbs();
  await resetsMaintenanceConfigurationOfAnElasticPoolToDefault();
  await updateAnElasticPoolWithAllParameter();
  await updateAnElasticPoolWithMinimumParameters();
  await updateHighAvailabilityReplicaCountOfAHyperscaleElasticPool();
}

main().catch(console.error);

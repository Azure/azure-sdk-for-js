// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a distributed availability group between Sql On-Prem and Sql Managed Instance.
 *
 * @summary creates a distributed availability group between Sql On-Prem and Sql Managed Instance.
 * x-ms-original-file: 2025-02-01-preview/DistributedAvailabilityGroupsCreateMax.json
 */
async function createADistributedAvailabilityGroupWithAllProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.distributedAvailabilityGroups.createOrUpdate(
    "testrg",
    "testcl",
    "dag",
    {
      databases: [{ databaseName: "testdb" }],
      failoverMode: "None",
      instanceAvailabilityGroupName: "testcl",
      instanceLinkRole: "Primary",
      partnerAvailabilityGroupName: "BoxLocalAg1",
      partnerEndpoint: "TCP://SERVER:7022",
      seedingMode: "Automatic",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a distributed availability group between Sql On-Prem and Sql Managed Instance.
 *
 * @summary creates a distributed availability group between Sql On-Prem and Sql Managed Instance.
 * x-ms-original-file: 2025-02-01-preview/DistributedAvailabilityGroupsCreateMin.json
 */
async function createADistributedAvailabilityGroupWithMinimalProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.distributedAvailabilityGroups.createOrUpdate(
    "testrg",
    "testcl",
    "dag",
    {
      databases: [{ databaseName: "testdb" }],
      instanceAvailabilityGroupName: "testcl",
      partnerAvailabilityGroupName: "BoxLocalAg1",
      partnerEndpoint: "TCP://SERVER:7022",
    },
  );
  console.log(result);
}

async function main() {
  await createADistributedAvailabilityGroupWithAllProperties();
  await createADistributedAvailabilityGroupWithMinimalProperties();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DistributedAvailabilityGroup,
  SqlManagementClient,
} from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a distributed availability group between Sql On-Prem and Sql Managed Instance.
 *
 * @summary Creates a distributed availability group between Sql On-Prem and Sql Managed Instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-08-01-preview/examples/DistributedAvailabilityGroupsCreateMax.json
 */
async function createADistributedAvailabilityGroupWithAllProperties(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "testcl";
  const distributedAvailabilityGroupName = "dag";
  const parameters: DistributedAvailabilityGroup = {
    databases: [{ databaseName: "testdb" }],
    failoverMode: "None",
    instanceAvailabilityGroupName: "testcl",
    instanceLinkRole: "Primary",
    partnerAvailabilityGroupName: "BoxLocalAg1",
    partnerEndpoint: "TCP://SERVER:7022",
    seedingMode: "Automatic",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result =
    await client.distributedAvailabilityGroups.beginCreateOrUpdateAndWait(
      resourceGroupName,
      managedInstanceName,
      distributedAvailabilityGroupName,
      parameters,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a distributed availability group between Sql On-Prem and Sql Managed Instance.
 *
 * @summary Creates a distributed availability group between Sql On-Prem and Sql Managed Instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-08-01-preview/examples/DistributedAvailabilityGroupsCreateMin.json
 */
async function createADistributedAvailabilityGroupWithMinimalProperties(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "testcl";
  const distributedAvailabilityGroupName = "dag";
  const parameters: DistributedAvailabilityGroup = {
    databases: [{ databaseName: "testdb" }],
    instanceAvailabilityGroupName: "testcl",
    partnerAvailabilityGroupName: "BoxLocalAg1",
    partnerEndpoint: "TCP://SERVER:7022",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result =
    await client.distributedAvailabilityGroups.beginCreateOrUpdateAndWait(
      resourceGroupName,
      managedInstanceName,
      distributedAvailabilityGroupName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createADistributedAvailabilityGroupWithAllProperties();
  await createADistributedAvailabilityGroupWithMinimalProperties();
}

main().catch(console.error);

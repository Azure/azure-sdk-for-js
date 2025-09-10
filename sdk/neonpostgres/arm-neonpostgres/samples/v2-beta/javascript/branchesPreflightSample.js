// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to action to validate preflight checks.
 *
 * @summary action to validate preflight checks.
 * x-ms-original-file: 2025-06-23-preview/Branches_Preflight_Database_Gen.json
 */
async function branchesPreflightDatabaseGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.branches.preflight(
    "rgneon",
    "myOrganization",
    "myProject",
    "myBranch",
    {
      projectId: "project-123",
      branchId: "branch-123",
      entityType: "database",
      databaseProperties: { databaseName: "analytics" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to action to validate preflight checks.
 *
 * @summary action to validate preflight checks.
 * x-ms-original-file: 2025-06-23-preview/Branches_Preflight_Endpoint_Gen.json
 */
async function branchesPreflightEndpointGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.branches.preflight(
    "rgneon",
    "myOrganization",
    "myProject",
    "myBranch",
    {
      projectId: "project-123",
      branchId: "branch-123",
      entityType: "endpoint",
      endpointProperties: {
        endpointId: "endpoint-456",
        endpointType: "read_write",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to action to validate preflight checks.
 *
 * @summary action to validate preflight checks.
 * x-ms-original-file: 2025-06-23-preview/Branches_Preflight_MaximumSet_Gen.json
 */
async function branchesPreflightMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.branches.preflight(
    "rgneon",
    "myOrganization",
    "myProject",
    "myBranch",
    {
      projectId: "project-123",
      branchId: "branch-123",
      entityType: "branch",
      branchProperties: {
        branch: "myBranch",
        branchId: "branch-123",
        roleName: "admin",
        databaseName: "application",
        projectId: "project-123",
      },
    },
  );
  console.log(result);
}

async function main() {
  await branchesPreflightDatabaseGen();
  await branchesPreflightEndpointGen();
  await branchesPreflightMaximumSet();
}

main().catch(console.error);

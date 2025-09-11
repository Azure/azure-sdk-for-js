// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to action to retrieve the connection URI for the Neon Database.
 *
 * @summary action to retrieve the connection URI for the Neon Database.
 * x-ms-original-file: 2025-06-23-preview/Projects_GetConnectionUri_MaximumSet_Gen.json
 */
async function projectsGetConnectionUriMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.projects.getConnectionUri("rgneon", "myOrganization", "myProject", {
    projectId: "project-123",
    branchId: "branch-123",
    databaseName: "application",
    roleName: "admin",
    endpointId: "endpoint-123",
    isPooled: true,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await projectsGetConnectionUriMaximumSet();
}

main().catch(console.error);

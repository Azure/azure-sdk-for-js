// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Branch
 *
 * @summary delete a Branch
 * x-ms-original-file: 2025-06-23-preview/Branches_Delete_MaximumSet_Gen.json
 */
async function branchesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  await client.branches.delete("rgneon", "myOrganization", "myProject", "feature");
}

async function main() {
  await branchesDeleteMaximumSet();
}

main().catch(console.error);

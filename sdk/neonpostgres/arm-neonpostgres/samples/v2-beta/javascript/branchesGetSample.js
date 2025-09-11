// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Branch
 *
 * @summary get a Branch
 * x-ms-original-file: 2025-06-23-preview/Branches_Get_MaximumSet_Gen.json
 */
async function branchesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.branches.get("rgneon", "myOrganization", "myProject", "feature");
  console.log(result);
}

async function main() {
  await branchesGetMaximumSet();
}

main().catch(console.error);

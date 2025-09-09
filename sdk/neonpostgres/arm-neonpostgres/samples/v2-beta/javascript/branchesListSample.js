// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Branch resources by Project
 *
 * @summary list Branch resources by Project
 * x-ms-original-file: 2025-06-23-preview/Branches_List_MaximumSet_Gen.json
 */
async function branchesListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.branches.list("rgneon", "myOrganization", "myProject")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await branchesListMaximumSet();
}

main().catch(console.error);

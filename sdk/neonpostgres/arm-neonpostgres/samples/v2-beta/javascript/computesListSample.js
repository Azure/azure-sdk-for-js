// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Compute resources by Branch
 *
 * @summary list Compute resources by Branch
 * x-ms-original-file: 2025-06-23-preview/Computes_List_MaximumSet_Gen.json
 */
async function computesListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.computes.list(
    "rgneon",
    "myOrganization",
    "myProject",
    "feature",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await computesListMaximumSet();
}

main().catch(console.error);

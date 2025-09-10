// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Project
 *
 * @summary get a Project
 * x-ms-original-file: 2025-06-23-preview/Projects_Get_MaximumSet_Gen.json
 */
async function projectsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.projects.get("rgneon", "myOrganization", "myProject");
  console.log(result);
}

async function main() {
  await projectsGetMaximumSet();
}

main().catch(console.error);

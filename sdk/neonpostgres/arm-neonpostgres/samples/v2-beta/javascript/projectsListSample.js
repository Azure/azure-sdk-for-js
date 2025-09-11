// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Project resources by OrganizationResource
 *
 * @summary list Project resources by OrganizationResource
 * x-ms-original-file: 2025-06-23-preview/Projects_List_MaximumSet_Gen.json
 */
async function projectsListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projects.list("rgneon", "myOrganization")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await projectsListMaximumSet();
}

main().catch(console.error);

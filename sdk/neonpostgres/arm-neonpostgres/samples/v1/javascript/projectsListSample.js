// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Project resources by OrganizationResource
 *
 * @summary list Project resources by OrganizationResource
 * x-ms-original-file: 2025-03-01/Projects_List_MaximumSet_Gen.json
 */
async function projectsListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projects.list("rgneon", "test-org")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await projectsListMaximumSet();
}

main().catch(console.error);

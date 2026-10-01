// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all entities (Management Groups, Subscriptions, etc.) for the authenticated user.
 *
 * @summary list all entities (Management Groups, Subscriptions, etc.) for the authenticated user.
 * x-ms-original-file: 2023-04-01/GetEntities.json
 */
async function getEntities() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const resArray = new Array();
  for await (const item of client.entities.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getEntities();
}

main().catch(console.error);

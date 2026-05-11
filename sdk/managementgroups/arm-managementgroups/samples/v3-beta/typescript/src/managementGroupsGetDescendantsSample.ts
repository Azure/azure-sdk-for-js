// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all entities that descend from a management group.
 *
 * @summary list all entities that descend from a management group.
 * x-ms-original-file: 2023-04-01/GetDescendants.json
 */
async function getDescendants(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const resArray = new Array();
  for await (const item of client.managementGroups.getDescendants(
    "20000000-0000-0000-0000-000000000000",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getDescendants();
}

main().catch(console.error);

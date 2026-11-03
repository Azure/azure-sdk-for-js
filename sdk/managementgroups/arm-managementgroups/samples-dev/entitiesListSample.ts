// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all entities (Management Groups, Subscriptions, etc.) for the authenticated user.
 *
 * @summary list all entities (Management Groups, Subscriptions, etc.) for the authenticated user.
 * x-ms-original-file: 2023-04-01/GetEntities.json
 */
async function getEntities(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const resArray = new Array();
  for await (const item of client.entities.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getEntities();
}

main().catch(console.error);

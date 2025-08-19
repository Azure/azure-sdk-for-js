// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to List all entities (Management Groups, Subscriptions, etc.) for the authenticated user.

 *
 * @summary List all entities (Management Groups, Subscriptions, etc.) for the authenticated user.

 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetEntities.json
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

getEntities().catch(console.error);

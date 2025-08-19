// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available Management REST API operations.
 *
 * @summary Lists all of the available Management REST API operations.
 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/ListOperations.json
 */

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

async function listOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listOperations().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available Microsoft.Solutions REST API operations.
 *
 * @summary Lists all of the available Microsoft.Solutions REST API operations.
 * x-ms-original-file: specification/solutions/resource-manager/Microsoft.Solutions/stable/2021-07-01/examples/listSolutionsOperations.json
 */

import { ApplicationClient } from "@azure/arm-managedapplications";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listSolutionsOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ApplicationClient(credential);
  const resArray = new Array();
  for await (const item of client.listOperations()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listSolutionsOperations();
}

main().catch(console.error);

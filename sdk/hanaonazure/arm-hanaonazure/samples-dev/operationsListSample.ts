// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HanaManagementClient } from "@azure/arm-hanaonazure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of SAP HANA management operations.
 *
 * @summary gets a list of SAP HANA management operations.
 * x-ms-original-file: 2020-02-07-preview/HanaOperations_List.json
 */
async function listAllHanaManagementOperationsSupportedByHanaRP(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HanaManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllHanaManagementOperationsSupportedByHanaRP();
}

main().catch(console.error);

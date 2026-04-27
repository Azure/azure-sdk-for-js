// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to return the list of available operations.
 *
 * @summary operation to return the list of available operations.
 * x-ms-original-file: 2025-08-01/Operations_List.json
 */
async function returnsTheListOfAvailableOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list("resourceGroupPS1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await returnsTheListOfAvailableOperations();
}

main().catch(console.error);

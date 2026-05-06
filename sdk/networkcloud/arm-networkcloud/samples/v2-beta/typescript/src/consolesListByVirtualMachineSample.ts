// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of consoles for the provided virtual machine.
 *
 * @summary get a list of consoles for the provided virtual machine.
 * x-ms-original-file: 2026-05-01-preview/Consoles_ListByVirtualMachine.json
 */
async function listConsolesOfTheVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.consoles.listByVirtualMachine(
    "resourceGroupName",
    "virtualMachineName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listConsolesOfTheVirtualMachine();
}

main().catch(console.error);
